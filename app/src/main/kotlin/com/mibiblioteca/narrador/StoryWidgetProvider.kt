package com.mibiblioteca.narrador

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import org.json.JSONArray
import java.io.File
import java.net.URLEncoder

/** v0.9: widget 4x1 que lee el mismo almacén de historias. */
class StoryWidgetProvider : AppWidgetProvider() {
    override fun onUpdate(context: Context, manager: AppWidgetManager, ids: IntArray) {
        ids.forEach { updateOne(context, manager, it) }
    }

    private fun updateOne(context: Context, manager: AppWidgetManager, id: Int) {
        val story = latest(context)
        val views = RemoteViews(context.packageName, R.layout.widget_continue)
        val title = story?.title ?: "Historias vivas"
        val subtitle = story?.let { "Capítulo ${it.chapter} · ${it.scenes} escenas" } ?: "Empieza una historia"
        views.setTextViewText(R.id.widget_title, title)
        views.setTextViewText(R.id.widget_subtitle, subtitle)
        val open = Intent(context, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            story?.id?.let { putExtra("story_id", it) }
        }
        views.setOnClickPendingIntent(R.id.widget_root, PendingIntent.getActivity(context, id, open, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE))
        manager.updateAppWidget(id, views)
    }

    private data class Story(val id: String, val title: String, val scenes: Int, val chapter: Int, val at: Long)

    private fun latest(context: Context): Story? {
        val name = URLEncoder.encode("narrador:v1", "UTF-8") + ".json"
        val file = File(File(context.filesDir, "store"), name)
        val data = try { JSONArray(if (file.exists()) file.readText(Charsets.UTF_8) else "[]") } catch (_: Exception) { JSONArray() }
        var best: Story? = null
        for (i in 0 until data.length()) {
            val o = data.optJSONObject(i) ?: continue
            val scenes = o.optJSONArray("scenes")?.length() ?: 0
            val item = Story(o.optString("id"), o.optString("title", "Historia"), scenes, scenes / 5 + 1, o.optLong("at", 0L))
            if (item.id.isNotBlank() && (best == null || item.at > best!!.at)) best = item
        }
        return best
    }
}

object WidgetUpdater {
    fun update(context: Context) {
        val manager = AppWidgetManager.getInstance(context)
        val component = ComponentName(context, StoryWidgetProvider::class.java)
        val ids = manager.getAppWidgetIds(component)
        if (ids.isNotEmpty()) {
            val intent = Intent(context, StoryWidgetProvider::class.java).setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE)
                .putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids)
            context.sendBroadcast(intent)
        }
    }
}
