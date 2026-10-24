package com.mibiblioteca.narrador

import android.annotation.SuppressLint
import android.content.ClipData
import android.content.ClipboardManager
import android.content.ContentValues
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.os.Handler
import android.os.Looper
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
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.documentfile.provider.DocumentFile
import androidx.webkit.WebViewAssetLoader
import org.json.JSONObject
import java.io.File
import java.net.HttpURLConnection
import java.net.URL
import java.net.URLDecoder
import java.net.URLEncoder
import java.security.KeyStore
import java.util.Locale
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
    private val cloudHandler = Handler(Looper.getMainLooper())
    private val cloudPrefs by lazy { getSharedPreferences("cloud_backup", Context.MODE_PRIVATE) }
    private val cloudBackupRunnable = Runnable { writer.execute { writeCloudBackup() } }

    // Solo estas webs pueden recibir peticiones de IA o abrirse desde la app
    private val apiHosts = setOf(
        "generativelanguage.googleapis.com",
        "api.openai.com",
        "api.anthropic.com"
    )
    private val openHosts = setOf(
        "aistudio.google.com",
        "platform.openai.com",
        "console.anthropic.com"
    )

    private val chooser = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { r ->
        chooserCb?.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(r.resultCode, r.data))
        chooserCb = null
    }

    private val cloudFolder = registerForActivityResult(ActivityResultContracts.OpenDocumentTree()) { uri ->
        if (uri == null) {
            js("window.__cloudFolderDone&&window.__cloudFolderDone(false,'')")
            return@registerForActivityResult
        }
        try {
            contentResolver.takePersistableUriPermission(
                uri,
                Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_GRANT_WRITE_URI_PERMISSION
            )
            cloudPrefs.edit().putString("tree_uri", uri.toString()).apply()
            val name = DocumentFile.fromTreeUri(this, uri)?.name ?: "Google Drive"
            js("window.__cloudFolderDone&&window.__cloudFolderDone(true,${JSONObject.quote(name)})")
            writer.execute { writeCloudBackup() }
        } catch (e: Exception) {
            cloudPrefs.edit().remove("tree_uri").apply()
            toast("No se pudo conservar el acceso a esa carpeta.")
            js("window.__cloudFolderDone&&window.__cloudFolderDone(false,'')")
        }
    }

    private val dictation = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { r ->
        val t = r.data?.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)?.firstOrNull() ?: ""
        js("window.__dictDone&&window.__dictDone(${JSONObject.quote(t)})")
    }

    @SuppressLint("SetJavaScriptEnabled", "AddJavascriptInterface")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

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
        tts?.stop()
        tts?.shutdown()
        super.onDestroy()
    }

    private fun toast(t: String) = runOnUiThread { Toast.makeText(this, t, Toast.LENGTH_LONG).show() }

    private fun js(code: String) = web.post { web.evaluateJavascript(code, null) }

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

    // ---------- Copia privada en una carpeta elegida por el usuario ----------
    private fun cloudRoot(): DocumentFile? {
        val value = cloudPrefs.getString("tree_uri", null) ?: return null
        return try { DocumentFile.fromTreeUri(this, Uri.parse(value)) } catch (e: Exception) { null }
    }

    private fun appCloudDir(create: Boolean): DocumentFile? {
        val root = cloudRoot() ?: return null
        var dir = root.findFile("HistoriasVivas")
        if (dir == null && create) dir = root.createDirectory("HistoriasVivas")
        return dir?.takeIf { it.isDirectory && it.canRead() }
    }

    private fun backupJson(): String {
        val data = JSONObject()
        storeDir().listFiles()?.forEach { file ->
            if (!file.name.endsWith(".json")) return@forEach
            try {
                val key = URLDecoder.decode(file.name.removeSuffix(".json"), "UTF-8")
                // Las claves de API viven en Keystore y la configuración del proveedor tampoco se copia.
                if (key != "hv:ai:v1") data.put(key, file.readText(Charsets.UTF_8))
            } catch (_: Exception) {}
        }
        return JSONObject()
            .put("app", "historias-vivas")
            .put("v", 2)
            .put("date", java.time.Instant.now().toString())
            .put("data", data)
            .toString()
    }

    private fun writeCloudBackup(): Boolean {
        return try {
            val dir = appCloudDir(true) ?: return false
            var file = dir.findFile("historias-vivas-respaldo.json")
            if (file == null) file = dir.createFile("application/json", "historias-vivas-respaldo.json")
            val uri = file?.uri ?: return false
            contentResolver.openOutputStream(uri, "wt")?.use {
                it.write(backupJson().toByteArray(Charsets.UTF_8))
            } ?: return false
            cloudPrefs.edit().putLong("last_ok", System.currentTimeMillis()).remove("last_error").apply()
            true
        } catch (e: Exception) {
            cloudPrefs.edit().putString("last_error", e.message ?: "No se pudo escribir en Drive").apply()
            false
        }
    }

    private fun scheduleCloudBackup() {
        if (cloudPrefs.getString("tree_uri", null).isNullOrBlank()) return
        cloudHandler.removeCallbacks(cloudBackupRunnable)
        cloudHandler.postDelayed(cloudBackupRunnable, 5000)
    }

    private fun cloudStateJson(): String {
        val linked = !cloudPrefs.getString("tree_uri", null).isNullOrBlank()
        val name = if (linked) cloudRoot()?.name ?: "Carpeta seleccionada" else ""
        return JSONObject()
            .put("linked", linked)
            .put("folder", name)
            .put("lastOk", cloudPrefs.getLong("last_ok", 0L))
            .put("error", cloudPrefs.getString("last_error", "") ?: "")
            .toString()
    }

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
            }
            if (key != "hv:ai:v1") scheduleCloudBackup()
        }

        @JavascriptInterface
        fun storeRemove(key: String) {
            writer.execute { try { storeFile(key).delete() } catch (e: Exception) {} }
            if (key != "hv:ai:v1") scheduleCloudBackup()
        }

        // ----- sincronización opcional con Drive mediante el selector de Android -----
        @JavascriptInterface
        fun cloudChooseFolder() = runOnUiThread { cloudFolder.launch(null) }

        @JavascriptInterface
        fun cloudState(): String = cloudStateJson()

        @JavascriptInterface
        fun cloudSaveNow(id: String) {
            writer.execute {
                val ok = writeCloudBackup()
                js("window.__cloudSaved&&window.__cloudSaved(${JSONObject.quote(id)},$ok)")
            }
        }

        @JavascriptInterface
        fun cloudRead(id: String) {
            writer.execute {
                var text = ""
                try {
                    val file = appCloudDir(false)?.findFile("historias-vivas-respaldo.json")
                    if (file != null) text = contentResolver.openInputStream(file.uri)?.bufferedReader(Charsets.UTF_8)?.use { it.readText() } ?: ""
                } catch (_: Exception) {}
                js("window.__cloudRead&&window.__cloudRead(${JSONObject.quote(id)},${JSONObject.quote(text)})")
            }
        }

        @JavascriptInterface
        fun cloudDisconnect() {
            val value = cloudPrefs.getString("tree_uri", null)
            if (!value.isNullOrBlank()) {
                try {
                    contentResolver.releasePersistableUriPermission(
                        Uri.parse(value),
                        Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_GRANT_WRITE_URI_PERMISSION
                    )
                } catch (_: Exception) {}
            }
            cloudHandler.removeCallbacks(cloudBackupRunnable)
            cloudPrefs.edit().clear().apply()
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
                } catch (e: Exception) {
                    status = 0
                    text = e.message ?: "Sin conexión"
                }
                js("window.__httpDone(${JSONObject.quote(id)},$status,${JSONObject.quote(text)})")
            }.start()
        }
    }
}
