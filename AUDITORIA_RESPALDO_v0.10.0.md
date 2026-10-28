# Auditoría de respaldo y entrega

## Copia automática de Android

- `android:allowBackup="false"` está configurado en `AndroidManifest.xml`.
- No se declara `dataExtractionRules` ni `fullBackupContent` porque las copias y transferencias del sistema están completamente desactivadas.
- Las bases de datos del WebView, el almacén local y las claves no se entregan a la copia automática de Android ni a la transferencia entre teléfonos.

## Claves

- Las copias SAF se construyen desde la parte web y no leen el almacén nativo de secretos.
- Las pruebas de copia sin claves siguen formando parte del workflow.

## Carpeta elegida mediante SAF

- `BackupManager.setFolder` conserva permisos de lectura y escritura mediante `takePersistableUriPermission`.
- La escritura, lectura, listado, rotación y liberación del permiso están implementados.
- Los fallos se devuelven como resultado y no bloquean el guardado de la historia.
- El funcionamiento con Google Drive sin conexión, después de reiniciar el teléfono y después de actualizar la APK requiere una prueba física. No se marca como probado.

## Compilación entregada

- La APK de depuración usa la firma fija del proyecto para permitir actualizaciones.
- El tipo `debug` se configura con `isDebuggable = false` para la APK distribuida.
- No se añade login de Google ni acceso a `drive.appdata`.

## Permisos

- `INTERNET`: conexión con los proveedores de IA autorizados.
- `ACCESS_NETWORK_STATE`: detección del estado de red y cola sin conexión.
- `FOREGROUND_SERVICE` y `FOREGROUND_SERVICE_MEDIA_PLAYBACK`: lectura en voz alta.
- `POST_NOTIFICATIONS`: controles de reproducción, solicitado al usar la función.

No se detectaron permisos de almacenamiento general, contactos, cámara, ubicación, micrófono ni `DUMP`.
