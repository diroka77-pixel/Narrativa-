package com.mibiblioteca.narrador

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.documentfile.provider.DocumentFile
import org.json.JSONArray
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone

/** v0.9: copias SAF en la carpeta que el usuario elige. No conoce ni toca las claves API. */
class BackupManager(private val context: Context) {
    companion object {
        const val KEEP = 5
        private const val PREFS = "backup_saf"
        private const val URI_KEY = "tree_uri"
        private const val PREFIX = "historias-vivas-copia-"
    }

    private val prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)

    fun setFolder(uri: Uri, flags: Int): String {
        val takeFlags = flags and (Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_GRANT_WRITE_URI_PERMISSION)
        context.contentResolver.takePersistableUriPermission(uri, takeFlags)
        prefs.edit().putString(URI_KEY, uri.toString()).remove("error").apply()
        return DocumentFile.fromTreeUri(context, uri)?.name ?: "Carpeta elegida"
    }

    private fun folder(): DocumentFile? {
        val raw = prefs.getString(URI_KEY, null) ?: return null
        return try { DocumentFile.fromTreeUri(context, Uri.parse(raw))?.takeIf { it.isDirectory } } catch (_: Exception) { null }
    }

    fun status(): JSONObject {
        val dir = folder()
        return JSONObject()
            .put("folder", dir?.name ?: "")
            .put("last", prefs.getLong("last", 0L))
            .put("error", prefs.getString("error", "") ?: "")
            .put("keep", KEEP)
    }

    @Synchronized
    fun write(json: String): JSONObject {
        if (json.isBlank()) return result(false, "", "La copia está vacía.")
        return try {
            val parsed = JSONObject(json)
            if (parsed.optString("app") != "historias-vivas") return result(false, "", "El contenido de la copia no es válido.")
            val dir = folder() ?: return result(false, "", "Elige primero una carpeta.")
            val stamp = SimpleDateFormat("yyyy-MM-dd-HHmmss", Locale.ROOT).apply {
                timeZone = TimeZone.getTimeZone("Europe/Madrid")
            }.format(Date())
            val wanted = "$PREFIX$stamp.json"
            var file = dir.createFile("application/json", wanted)
                ?: return result(false, "", "La carpeta no permite crear archivos.")
            context.contentResolver.openOutputStream(file.uri, "wt")?.use {
                it.write(json.toByteArray(Charsets.UTF_8))
            } ?: return result(false, "", "No se pudo abrir el archivo para escribir.")
            // Algunos proveedores ajustan el nombre según el MIME; devolvemos el nombre real.
            val actual = file.name ?: wanted
            rotate(dir)
            prefs.edit().putLong("last", System.currentTimeMillis()).remove("error").apply()
            result(true, actual, "")
        } catch (e: Exception) {
            val message = e.message ?: "No se pudo guardar la copia."
            prefs.edit().putString("error", message).apply()
            result(false, "", message)
        }
    }

    private fun backups(dir: DocumentFile): List<DocumentFile> = dir.listFiles()
        .filter { it.isFile && (it.name ?: "").startsWith(PREFIX) && (it.name ?: "").endsWith(".json") }
        .sortedWith(compareByDescending<DocumentFile> { it.lastModified() }.thenByDescending { it.name ?: "" })

    private fun rotate(dir: DocumentFile) {
        backups(dir).drop(KEEP).forEach { try { it.delete() } catch (_: Exception) {} }
    }

    fun list(): JSONArray {
        val out = JSONArray()
        val dir = folder() ?: return out
        backups(dir).forEach { file ->
            out.put(JSONObject().put("name", file.name ?: "").put("size", file.length()).put("modified", file.lastModified()))
        }
        return out
    }

    fun read(name: String): String {
        if (!name.startsWith(PREFIX) || !name.endsWith(".json") || name.contains('/') || name.contains('\\')) return ""
        val file = folder()?.findFile(name) ?: return ""
        return try { context.contentResolver.openInputStream(file.uri)?.bufferedReader(Charsets.UTF_8)?.use { it.readText() } ?: "" } catch (_: Exception) { "" }
    }

    fun clear() {
        val raw = prefs.getString(URI_KEY, null)
        if (!raw.isNullOrBlank()) {
            try {
                context.contentResolver.releasePersistableUriPermission(
                    Uri.parse(raw), Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_GRANT_WRITE_URI_PERMISSION
                )
            } catch (_: Exception) {}
        }
        prefs.edit().clear().apply()
    }

    private fun result(ok: Boolean, name: String, error: String) = JSONObject()
        .put("ok", ok).put("name", name).put("error", error)
}
