package com.mibiblioteca.narrador

import android.annotation.SuppressLint
import android.Manifest
import android.app.AlertDialog
import android.content.ClipData
import android.content.ClipboardManager
import android.content.ContentValues
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.os.Build
import android.os.Bundle
import android.provider.MediaStore
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.speech.RecognizerIntent
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import android.util.Base64
import android.webkit.JavascriptInterface
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import android.content.pm.PackageManager
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat
import androidx.webkit.WebViewAssetLoader
import org.json.JSONObject
import java.io.File
import java.net.HttpURLConnection
import java.net.URL
import java.net.URLDecoder
import java.net.URLEncoder
import java.security.KeyStore
import java.util.Locale
import java.util.concurrent.atomic.AtomicBoolean
import java.util.concurrent.CountDownLatch
import java.util.concurrent.Executors
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec

class MainActivity : ComponentActivity() {

    private lateinit var web: WebView
    private var tts: TextToSpeech? = null
    private var ttsReady = false
    private val ttsPending = ArrayList<Triple<String, Float, String>>()
    private var chooserCb: ValueCallback<Array<Uri>>? = null
    private val writer = Executors.newSingleThreadExecutor()
    private lateinit var backupManager: BackupManager
    private lateinit var usageTracker: UsageTracker
    private var pendingBackupPickerId: String? = null
    private var pendingSpeechQueue: String? = null
    private var pendingStoryId: String? = null
    private lateinit var connectivity: ConnectivityManager
    private val networkRegistered = AtomicBoolean(false)

    // Solo estas webs pueden recibir peticiones de IA o abrirse desde la app
    private val apiHosts = setOf(
        "generativelanguage.googleapis.com",
        "api.openai.com",
        "api.anthropic.com"
    )
    private val openHosts = setOf(
        "aistudio.google.com",
        "ai.google.dev",
        "accounts.google.com",
        "support.google.com",
        "platform.openai.com",
        "openai.com",
        "console.anthropic.com",
        "www.anthropic.com",
        "anthropic.com"
    )

    private val chooser = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { r ->
        chooserCb?.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(r.resultCode, r.data))
        chooserCb = null
    }

    private val dictation = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { r ->
        val t = r.data?.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)?.firstOrNull() ?: ""
        js("window.__dictDone&&window.__dictDone(${JSONObject.quote(t)})")
    }

    private val backupFolder = registerForActivityResult(ActivityResultContracts.OpenDocumentTree()) { uri ->
        val id = pendingBackupPickerId ?: ""
        pendingBackupPickerId = null
        if (uri == null) { backupDone(id, JSONObject().put("ok", false).put("name", "")); return@registerForActivityResult }
        try {
            val name = backupManager.setFolder(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_GRANT_WRITE_URI_PERMISSION)
            backupDone(id, JSONObject().put("ok", true).put("name", name))
        } catch (e: Exception) {
            backupDone(id, JSONObject().put("ok", false).put("name", "").put("error", e.message ?: "No se pudo usar esa carpeta."))
        }
    }

    private val notificationPermission = registerForActivityResult(ActivityResultContracts.RequestPermission()) {
        pendingSpeechQueue?.let { q -> pendingSpeechQueue = null; launchNarration(q) }
    }

    private val networkCallback = object : ConnectivityManager.NetworkCallback() {
        override fun onAvailable(network: Network) { js("window.__onlineChanged&&window.__onlineChanged(true)") }
        override fun onLost(network: Network) { js("window.__onlineChanged&&window.__onlineChanged(${online()})") }
    }

    @SuppressLint("SetJavaScriptEnabled", "AddJavascriptInterface")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        backupManager = BackupManager(this)
        usageTracker = UsageTracker(this)
        connectivity = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        pendingStoryId = intent.getStringExtra("story_id")

        tts = TextToSpeech(this) { status ->
            if (status == TextToSpeech.SUCCESS) {
                val r = tts?.setLanguage(Locale("es", "ES"))
                if (r == TextToSpeech.LANG_MISSING_DATA || r == TextToSpeech.LANG_NOT_SUPPORTED) {
                    toast("Falta la voz en español. Instálala en Ajustes > Idioma > Texto a voz.")
                }
                tts?.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
                    override fun onStart(id: String?) {}
                    override fun onDone(id: String?) { ttsDone(id) }
                    @Deprecated("Deprecated in Java")
                    override fun onError(id: String?) { ttsDone(id) }
                })
                ttsReady = true
                synchronized(ttsPending) {
                    ttsPending.forEach { doSpeak(it.first, it.second, it.third) }
                    ttsPending.clear()
                }
            } else {
                toast("Este móvil no tiene voz de lectura disponible.")
            }
        }

        web = WebView(this)
        setContentView(web)
        web.setBackgroundColor(0xFF10232B.toInt())

        val loader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        with(web.settings) {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = false
            allowContentAccess = true
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            mediaPlaybackRequiresUserGesture = false
            cacheMode = WebSettings.LOAD_DEFAULT
            textZoom = (resources.configuration.fontScale * 100).toInt().coerceIn(90, 170)
        }

        web.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse? =
                loader.shouldInterceptRequest(request.url)

            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                val u = request.url
                if (u.host == "appassets.androidplatform.net") return false
                if (u.scheme == "https" && u.host in openHosts) {
                    try { startActivity(Intent(Intent.ACTION_VIEW, u)) } catch (e: Exception) {}
                }
                return true
            }

            override fun onPageFinished(view: WebView, url: String) {
                pendingStoryId?.let { id ->
                    js("window.hvOpenStory&&window.hvOpenStory(${JSONObject.quote(id)})")
                    pendingStoryId = null
                }
            }
        }

        web.webChromeClient = object : WebChromeClient() {
            override fun onShowFileChooser(
                view: WebView,
                cb: ValueCallback<Array<Uri>>,
                params: FileChooserParams
            ): Boolean {
                chooserCb?.onReceiveValue(null)
                chooserCb = cb
                return try {
                    chooser.launch(params.createIntent())
                    true
                } catch (e: Exception) {
                    chooserCb = null
                    toast("No se pudo abrir la galería.")
                    false
                }
            }
        }

        web.addJavascriptInterface(Bridge(), "Native")
        web.loadUrl("https://appassets.androidplatform.net/assets/index.html")

        // v0.9.1: el callback puede responder de inmediato; se registra cuando el WebView ya existe.
        try { connectivity.registerDefaultNetworkCallback(networkCallback); networkRegistered.set(true) } catch (_: Exception) {}

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                web.evaluateJavascript(
                    "(function(){if(window.hvBack&&hvBack())return 'back';var l=document.getElementById('lib');if(l&&l.hidden&&window.goHome){goHome();return 'back'}return 'exit'})()"
                ) { res ->
                    if (res == null || !res.contains("back")) finish()
                }
            }
        })
    }

    override fun onDestroy() {
        if (networkRegistered.get()) try { connectivity.unregisterNetworkCallback(networkCallback) } catch (_: Exception) {}
        tts?.stop()
        tts?.shutdown()
        super.onDestroy()
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        intent.getStringExtra("story_id")?.let { js("window.hvOpenStory&&window.hvOpenStory(${JSONObject.quote(it)})") }
    }

    private fun toast(t: String) = runOnUiThread { Toast.makeText(this, t, Toast.LENGTH_LONG).show() }

    // v0.9.1: evita cierres si Android entrega un callback durante el arranque o la destrucción.
    private fun js(code: String) {
        if (!::web.isInitialized || isFinishing || isDestroyed) return
        web.post { if (!isFinishing && !isDestroyed) web.evaluateJavascript(code, null) }
    }

    private fun backupDone(id: String, payload: Any) = js("window.__backupDone&&window.__backupDone(${JSONObject.quote(id)},${payload})")

    private fun online(): Boolean {
        val network = connectivity.activeNetwork ?: return false
        val caps = connectivity.getNetworkCapabilities(network) ?: return false
        return caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) && caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
    }

    private fun launchNarration(queueJson: String) {
        val intent = Intent(this, NarrationService::class.java).setAction(NarrationService.ACTION_START).putExtra("queue", queueJson)
        ContextCompat.startForegroundService(this, intent)
    }

    private fun startBackgroundNarration(queueJson: String) = runOnUiThread {
        if (Build.VERSION.SDK_INT >= 33 && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            val prefs = getSharedPreferences("permissions", Context.MODE_PRIVATE)
            if (!prefs.getBoolean("tts_notice", false)) {
                pendingSpeechQueue = queueJson
                AlertDialog.Builder(this).setTitle("Lectura con la pantalla apagada")
                    .setMessage("Historias vivas usa una notificación con Pausa y Siguiente mientras lee. Android puede pedir permiso para mostrarla.")
                    .setPositiveButton("Continuar") { _, _ -> prefs.edit().putBoolean("tts_notice", true).apply(); notificationPermission.launch(Manifest.permission.POST_NOTIFICATIONS) }
                    .setNegativeButton("Ahora no") { _, _ -> pendingSpeechQueue = null }.show()
                return@runOnUiThread
            }
        }
        launchNarration(queueJson)
    }

    private fun ttsDone(id: String?) {
        if (id != null) js("window.__ttsDone&&window.__ttsDone(${JSONObject.quote(id)})")
    }

    private fun doSpeak(text: String, rate: Float, id: String) {
        tts?.setSpeechRate(rate)
        tts?.speak(text, TextToSpeech.QUEUE_ADD, null, id)
    }

    // ---------- Almacenamiento en ficheros ----------
    private fun storeDir(): File = File(filesDir, "store").also { it.mkdirs() }
    private fun storeFile(key: String) = File(storeDir(), URLEncoder.encode(key, "UTF-8") + ".json")

    // ---------- Claves cifradas con el Keystore de Android ----------
    private fun secretKey(): SecretKey {
        val ks = KeyStore.getInstance("AndroidKeyStore")
        ks.load(null)
        (ks.getKey("hv_secrets", null) as? SecretKey)?.let { return it }
        val g = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore")
        g.init(
            KeyGenParameterSpec.Builder("hv_secrets", KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                .setKeySize(256)
                .build()
        )
        return g.generateKey()
    }

    private fun encrypt(plain: String): String {
        val c = Cipher.getInstance("AES/GCM/NoPadding")
        c.init(Cipher.ENCRYPT_MODE, secretKey())
        val iv = c.iv
        val ct = c.doFinal(plain.toByteArray(Charsets.UTF_8))
        return Base64.encodeToString(iv + ct, Base64.NO_WRAP)
    }

    private fun decrypt(data: String): String {
        val b = Base64.decode(data, Base64.NO_WRAP)
        val c = Cipher.getInstance("AES/GCM/NoPadding")
        c.init(Cipher.DECRYPT_MODE, secretKey(), GCMParameterSpec(128, b, 0, 12))
        return String(c.doFinal(b, 12, b.size - 12), Charsets.UTF_8)
    }

    inner class Bridge {

        // ----- voz -----
        @JavascriptInterface
        fun speak(text: String, rate: Double, id: String) {
            runOnUiThread {
                if (ttsReady) doSpeak(text, rate.toFloat(), id)
                else synchronized(ttsPending) { ttsPending.add(Triple(text, rate.toFloat(), id)) }
            }
        }

        @JavascriptInterface
        fun stopSpeak() {
            runOnUiThread {
                synchronized(ttsPending) { ttsPending.clear() }
                tts?.stop()
            }
        }

        @JavascriptInterface
        fun speakQueue(arrayJson: String) = startBackgroundNarration(arrayJson)

        @JavascriptInterface
        fun speakState(): String = NarrationService.state(this@MainActivity)

        @JavascriptInterface
        fun speakAction(action: String) {
            val a = when (action) { "toggle" -> NarrationService.ACTION_TOGGLE; "next" -> NarrationService.ACTION_NEXT; else -> NarrationService.ACTION_STOP }
            runOnUiThread { startService(Intent(this@MainActivity, NarrationService::class.java).setAction(a)) }
        }

        // ----- dictado -----
        @JavascriptInterface
        fun dictate() {
            runOnUiThread {
                try {
                    val i = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
                        .putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
                        .putExtra(RecognizerIntent.EXTRA_LANGUAGE, "es-ES")
                        .putExtra(RecognizerIntent.EXTRA_PROMPT, "Habla ahora")
                    dictation.launch(i)
                } catch (e: Exception) {
                    toast("Este móvil no tiene dictado por voz.")
                }
            }
        }

        // ----- portapapeles -----
        @JavascriptInterface
        fun copy(text: String) {
            runOnUiThread {
                val cm = getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                cm.setPrimaryClip(ClipData.newPlainText("texto", text))
                toast("Copiado")
            }
        }

        @JavascriptInterface
        fun paste(): String {
            var out = ""
            val latch = CountDownLatch(1)
            runOnUiThread {
                try {
                    val cm = getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                    out = cm.primaryClip?.getItemAt(0)?.coerceToText(this@MainActivity)?.toString() ?: ""
                } catch (e: Exception) {
                }
                latch.countDown()
            }
            latch.await()
            return out
        }

        @JavascriptInterface
        fun toast(t: String) = this@MainActivity.toast(t)

        // ----- enlaces y correo -----
        @JavascriptInterface
        fun openUrl(u: String) {
            val uri = try { Uri.parse(u) } catch (e: Exception) { return }
            if (uri.scheme != "https" || uri.host !in openHosts) return
            runOnUiThread {
                try { startActivity(Intent(Intent.ACTION_VIEW, uri)) } catch (e: Exception) {}
            }
        }

        @JavascriptInterface
        fun sendMail(to: String, subject: String, body: String) {
            runOnUiThread {
                try {
                    val i = Intent(Intent.ACTION_SENDTO, Uri.parse("mailto:"))
                        .putExtra(Intent.EXTRA_SUBJECT, subject)
                        .putExtra(Intent.EXTRA_TEXT, body)
                    if (to.isNotBlank()) i.putExtra(Intent.EXTRA_EMAIL, arrayOf(to))
                    startActivity(i)
                } catch (e: Exception) {
                    toast("No hay ninguna app de correo.")
                }
            }
        }

        // ----- guardado en Descargas -----
        @JavascriptInterface
        fun saveFile(name: String, b64: String, mime: String): Boolean {
            return try {
                val bytes = Base64.decode(b64, Base64.DEFAULT)
                val values = ContentValues().apply {
                    put(MediaStore.Downloads.DISPLAY_NAME, name)
                    put(MediaStore.Downloads.MIME_TYPE, mime)
                    put(MediaStore.Downloads.RELATIVE_PATH, "Download")
                }
                val uri = contentResolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values)
                    ?: return false
                contentResolver.openOutputStream(uri)?.use { it.write(bytes) } ?: return false
                toast("Guardado en Descargas: $name")
                true
            } catch (e: Exception) {
                false
            }
        }

        // ----- almacenamiento persistente (sin límite de 5 MB) -----
        @JavascriptInterface
        fun storeLoadAll(): String {
            val o = JSONObject()
            storeDir().listFiles()?.forEach { f ->
                if (f.name.endsWith(".json")) {
                    try {
                        val key = URLDecoder.decode(f.name.removeSuffix(".json"), "UTF-8")
                        o.put(key, f.readText(Charsets.UTF_8))
                    } catch (e: Exception) {
                    }
                }
            }
            return o.toString()
        }

        @JavascriptInterface
        fun storeSet(key: String, value: String) {
            writer.execute {
                try {
                    val f = storeFile(key)
                    val tmp = File(f.parentFile, f.name + ".tmp")
                    tmp.writeText(value, Charsets.UTF_8)
                    if (!tmp.renameTo(f)) {
                        f.delete()
                        tmp.renameTo(f)
                    }
                } catch (e: Exception) {
                }
                if (key == "narrador:v1") WidgetUpdater.update(this@MainActivity)
            }
        }

        @JavascriptInterface
        fun storeRemove(key: String) {
            writer.execute { try { storeFile(key).delete() } catch (e: Exception) {} }
        }

        // ----- claves de API cifradas -----
        @JavascriptInterface
        fun secretSet(name: String, value: String) {
            val prefs = getSharedPreferences("secrets", Context.MODE_PRIVATE)
            try {
                if (value.isEmpty()) prefs.edit().remove(name).apply()
                else prefs.edit().putString(name, encrypt(value)).apply()
            } catch (e: Exception) {
                toast("No se pudo guardar la clave de forma segura.")
            }
        }

        @JavascriptInterface
        fun secretGet(name: String): String {
            val prefs = getSharedPreferences("secrets", Context.MODE_PRIVATE)
            val v = prefs.getString(name, null) ?: return ""
            return try { decrypt(v) } catch (e: Exception) { "" }
        }

        // v0.9: copias SAF. Todas responden por window.__backupDone(id, payload).
        @JavascriptInterface
        fun backupChooseFolder(id: String) = runOnUiThread { pendingBackupPickerId = id; backupFolder.launch(null) }

        @JavascriptInterface
        fun backupStatus(id: String) { writer.execute { backupDone(id, backupManager.status()) } }

        @JavascriptInterface
        fun backupWrite(id: String, json: String) { writer.execute { backupDone(id, backupManager.write(json)) } }

        @JavascriptInterface
        fun backupList(id: String) { writer.execute { backupDone(id, backupManager.list()) } }

        @JavascriptInterface
        fun backupRead(id: String, name: String) { writer.execute { backupDone(id, JSONObject.quote(backupManager.read(name))) } }

        @JavascriptInterface
        fun backupClear(id: String) { writer.execute { backupManager.clear(); backupDone(id, JSONObject().put("ok", true)) } }

        @JavascriptInterface
        fun usageGet(): String = usageTracker.get().toString()

        @JavascriptInterface
        fun usageAdd(model: String): String = usageTracker.add(model).toString()

        @JavascriptInterface
        fun online(): Boolean = this@MainActivity.online()

        // ----- red: solo hacia los proveedores de IA permitidos -----
        @JavascriptInterface
        fun http(id: String, url: String, headersJson: String, body: String) {
            Thread {
                var status = 0
                var text = ""
                try {
                    val u = URL(url)
                    if (u.protocol != "https" || u.host !in apiHosts) throw SecurityException("Dirección no permitida")
                    val c = u.openConnection() as HttpURLConnection
                    c.requestMethod = "POST"
                    c.connectTimeout = 30000
                    c.readTimeout = 180000
                    c.doOutput = true
                    val h = JSONObject(headersJson)
                    for (k in h.keys()) c.setRequestProperty(k, h.getString(k))
                    c.outputStream.use { it.write(body.toByteArray(Charsets.UTF_8)) }
                    status = c.responseCode
                    val stream = if (status >= 400) c.errorStream else c.inputStream
                    text = stream?.bufferedReader(Charsets.UTF_8)?.use { it.readText() } ?: ""
                    if (status in 200..299) {
                        val model = try {
                            if (u.host == "generativelanguage.googleapis.com") u.path.substringAfter("/models/").substringBefore(":")
                            else JSONObject(body).optString("model", u.host)
                        } catch (_: Exception) { u.host }
                        usageTracker.add(model)
                    }
                } catch (e: Exception) {
                    status = 0
                    text = e.message ?: "Sin conexión"
                }
                js("window.__httpDone(${JSONObject.quote(id)},$status,${JSONObject.quote(text)})")
            }.start()
        }
    }
}
