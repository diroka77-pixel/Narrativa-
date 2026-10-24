package com.mibiblioteca.narrador

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.IBinder
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import android.support.v4.media.session.MediaSessionCompat
import android.support.v4.media.session.PlaybackStateCompat
import androidx.core.app.NotificationCompat
import org.json.JSONArray
import org.json.JSONObject
import java.util.Locale

/** v0.9: lectura continua con pantalla apagada y controles multimedia. */
class NarrationService : Service(), TextToSpeech.OnInitListener {
    companion object {
        const val ACTION_START = "hv.tts.START"
        const val ACTION_TOGGLE = "hv.tts.TOGGLE"
        const val ACTION_NEXT = "hv.tts.NEXT"
        const val ACTION_STOP = "hv.tts.STOP"
        private const val CHANNEL = "historias_lectura"
        private const val NOTIFICATION_ID = 9209
        private const val PREFS = "tts_state"

        fun state(context: Context): String = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .getString("json", null) ?: JSONObject().put("status", "stopped").put("index", 0).put("total", 0).toString()
    }

    private data class Part(val text: String, val rate: Float)
    private val queue = ArrayList<Part>()
    private var index = 0
    private var paused = false
    private var ready = false
    private var tts: TextToSpeech? = null
    private lateinit var mediaSession: MediaSessionCompat

    override fun onCreate() {
        super.onCreate()
        createChannel()
        mediaSession = MediaSessionCompat(this, "HistoriasVivasNarrador").apply {
            setCallback(object : MediaSessionCompat.Callback() {
                override fun onPlay() = resumeReading()
                override fun onPause() = pauseReading()
                override fun onSkipToNext() = nextPart()
                override fun onStop() = stopReading()
            })
            isActive = true
        }
        tts = TextToSpeech(this, this)
    }

    override fun onInit(status: Int) {
        ready = status == TextToSpeech.SUCCESS
        if (ready) {
            tts?.language = Locale("es", "ES")
            tts?.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
                override fun onStart(utteranceId: String?) { saveState("playing"); updateNotification() }
                override fun onDone(utteranceId: String?) { index++; if (index < queue.size) speakCurrent() else stopReading() }
                @Deprecated("Deprecated in Java") override fun onError(utteranceId: String?) { index++; if (index < queue.size) speakCurrent() else stopReading() }
            })
            if (queue.isNotEmpty() && !paused) speakCurrent()
        } else stopReading()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_START -> loadQueue(intent.getStringExtra("queue") ?: "[]")
            ACTION_TOGGLE -> if (paused) resumeReading() else pauseReading()
            ACTION_NEXT -> nextPart()
            ACTION_STOP -> stopReading()
        }
        return START_NOT_STICKY
    }

    private fun loadQueue(raw: String) {
        queue.clear(); index = 0; paused = false
        try {
            val a = JSONArray(raw)
            for (i in 0 until a.length()) {
                val value = a.opt(i)
                if (value is JSONObject) {
                    val text = value.optString("text").trim()
                    if (text.isNotBlank()) queue.add(Part(text, value.optDouble("rate", 1.0).toFloat().coerceIn(0.5f, 2f)))
                } else {
                    val text = value?.toString()?.trim().orEmpty()
                    if (text.isNotBlank()) queue.add(Part(text, 1f))
                }
            }
        } catch (_: Exception) {}
        if (queue.isEmpty()) { stopReading(); return }
        startForeground(NOTIFICATION_ID, notification())
        saveState("playing")
        if (ready) speakCurrent()
    }

    private fun speakCurrent() {
        if (!ready || paused || index !in queue.indices) return
        val p = queue[index]
        tts?.setSpeechRate(p.rate)
        tts?.speak(p.text, TextToSpeech.QUEUE_FLUSH, null, "hv-bg-$index-${System.nanoTime()}")
        saveState("playing")
        updatePlayback(PlaybackStateCompat.STATE_PLAYING)
    }

    private fun pauseReading() {
        if (queue.isEmpty()) return
        paused = true; tts?.stop(); saveState("paused"); updatePlayback(PlaybackStateCompat.STATE_PAUSED); updateNotification()
    }

    private fun resumeReading() {
        if (queue.isEmpty()) return
        paused = false; speakCurrent(); updateNotification()
    }

    private fun nextPart() {
        if (queue.isEmpty()) return
        tts?.stop(); index++
        if (index >= queue.size) stopReading() else { paused = false; speakCurrent(); updateNotification() }
    }

    private fun stopReading() {
        tts?.stop(); queue.clear(); index = 0; paused = false; saveState("stopped")
        updatePlayback(PlaybackStateCompat.STATE_STOPPED)
        stopForeground(STOP_FOREGROUND_REMOVE); stopSelf()
    }

    private fun saveState(status: String) {
        val value = JSONObject().put("status", status).put("index", index).put("total", queue.size).toString()
        getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().putString("json", value).apply()
    }

    private fun updatePlayback(state: Int) {
        mediaSession.setPlaybackState(PlaybackStateCompat.Builder()
            .setActions(PlaybackStateCompat.ACTION_PLAY or PlaybackStateCompat.ACTION_PAUSE or PlaybackStateCompat.ACTION_SKIP_TO_NEXT or PlaybackStateCompat.ACTION_STOP)
            .setState(state, index.toLong(), 1f).build())
    }

    private fun pending(action: String, code: Int): PendingIntent = PendingIntent.getService(
        this, code, Intent(this, NarrationService::class.java).setAction(action), PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
    )

    private fun notification(): Notification {
        val open = PendingIntent.getActivity(this, 1, Intent(this, MainActivity::class.java), PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
        val toggleLabel = if (paused) "Reanudar" else "Pausa"
        val toggleIcon = if (paused) android.R.drawable.ic_media_play else android.R.drawable.ic_media_pause
        return NotificationCompat.Builder(this, CHANNEL)
            .setSmallIcon(com.mibiblioteca.narrador.R.drawable.ic_launcher_monochrome)
            .setContentTitle("Historias vivas")
            .setContentText(if (queue.isEmpty()) "Lectura detenida" else "Leyendo fragmento ${index + 1} de ${queue.size}")
            .setContentIntent(open).setOnlyAlertOnce(true).setOngoing(!paused).setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .addAction(toggleIcon, toggleLabel, pending(ACTION_TOGGLE, 2))
            .addAction(android.R.drawable.ic_media_next, "Siguiente", pending(ACTION_NEXT, 3))
            .addAction(android.R.drawable.ic_menu_close_clear_cancel, "Parar", pending(ACTION_STOP, 4))
            .setStyle(androidx.media.app.NotificationCompat.MediaStyle().setMediaSession(mediaSession.sessionToken).setShowActionsInCompactView(0, 1))
            .build()
    }

    private fun updateNotification() {
        if (queue.isNotEmpty()) (getSystemService(NOTIFICATION_SERVICE) as NotificationManager).notify(NOTIFICATION_ID, notification())
    }

    private fun createChannel() {
        val nm = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
        nm.createNotificationChannel(NotificationChannel(CHANNEL, "Lectura en voz alta", NotificationManager.IMPORTANCE_LOW))
    }

    override fun onDestroy() { tts?.stop(); tts?.shutdown(); mediaSession.release(); super.onDestroy() }
    override fun onBind(intent: Intent?): IBinder? = null
}
