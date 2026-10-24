package com.mibiblioteca.narrador

import android.annotation.SuppressLint
import android.content.ClipData
import android.content.ClipboardManager
import android.content.ContentValues
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
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
import androidx.webkit.WebViewAssetLoader
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.util.Locale
import java.util.concurrent.CountDownLatch

class MainActivity : ComponentActivity() {

    private lateinit var web: WebView
    private var tts: TextToSpeech? = null
    private var ttsReady = false
    private val ttsPending = ArrayList<Triple<String, Float, String>>()
    private var chooserCb: ValueCallback<Array<Uri>>? = null

    private val chooser = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { r ->
        chooserCb?.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(r.resultCode, r.data))
        chooserCb = null
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
            mediaPlaybackRequiresUserGesture = false
            cacheMode = WebSettings.LOAD_DEFAULT
        }

        web.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse? =
                loader.shouldInterceptRequest(request.url)

            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                if (request.url.host == "appassets.androidplatform.net") return false
                try { startActivity(Intent(Intent.ACTION_VIEW, request.url)) } catch (e: Exception) {}
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
                    "(function(){var l=document.getElementById('lib');if(l&&l.hidden&&window.goHome){goHome();return 'back'}return 'exit'})()"
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

    inner class Bridge {

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
        fun openUrl(u: String) {
            if (!u.startsWith("https://")) return
            runOnUiThread {
                try { startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(u))) } catch (e: Exception) {}
            }
        }

        @JavascriptInterface
        fun toast(t: String) = this@MainActivity.toast(t)

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

        @JavascriptInterface
        fun http(id: String, url: String, headersJson: String, body: String) {
            Thread {
                var status = 0
                var text = ""
                try {
                    val c = URL(url).openConnection() as HttpURLConnection
                    c.requestMethod = "POST"
                    c.connectTimeout = 20000
                    c.readTimeout = 60000
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
