package com.mibiblioteca.narrador

import android.content.Context
import org.json.JSONObject
import java.io.File
import java.time.LocalDate
import java.time.ZoneId

/** v0.9: contador privado y local. Google reinicia RPD a medianoche del Pacífico. */
class UsageTracker(context: Context) {
    companion object { val RESET_ZONE: ZoneId = ZoneId.of("America/Los_Angeles") }
    private val file = File(context.filesDir, "usage.json")

    private fun today() = LocalDate.now(RESET_ZONE).toString()

    @Synchronized
    private fun load(): JSONObject {
        val date = today()
        val old = try { JSONObject(file.takeIf { it.exists() }?.readText(Charsets.UTF_8) ?: "{}") } catch (_: Exception) { JSONObject() }
        if (old.optString("date") != date) return JSONObject().put("date", date).put("counts", JSONObject())
        if (!old.has("counts")) old.put("counts", JSONObject())
        return old
    }

    @Synchronized
    fun get(): JSONObject {
        val data = load()
        val model = data.optString("model")
        val counts = data.optJSONObject("counts") ?: JSONObject()
        return JSONObject().put("date", data.optString("date")).put("model", model)
            .put("count", if (model.isBlank()) 0 else counts.optInt(model, 0)).put("counts", counts)
    }

    @Synchronized
    fun add(model: String): JSONObject {
        val clean = model.trim().take(100)
        val data = load()
        val counts = data.optJSONObject("counts") ?: JSONObject()
        if (clean.isNotBlank()) counts.put(clean, counts.optInt(clean, 0) + 1)
        data.put("counts", counts).put("model", clean)
        val tmp = File(file.parentFile, file.name + ".tmp")
        tmp.writeText(data.toString(), Charsets.UTF_8)
        if (!tmp.renameTo(file)) { file.delete(); tmp.renameTo(file) }
        return get()
    }
}
