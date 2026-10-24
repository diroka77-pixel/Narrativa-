# Cambios de Historias vivas v0.9

## Resultado

La v0.9 conserva la web y el arte de la v0.8 y añade las piezas nativas que faltaban. Se ha subido `versionCode` a 9 y `versionName` a `0.9`.

### Corrección 0.9.1

- Corregido un cierre inmediato en algunos móviles: `ConnectivityManager` podía ejecutar su callback antes de que el WebView estuviera creado.
- El detector de red se registra después de inicializar la vista y `js()` ignora callbacks durante el arranque incompleto o la destrucción de la actividad.
- `versionCode` 10 / `versionName` `0.9.1`.

## Paso 0: validación de la v0.8 antes de modificarla

- ✓ El proyecto original del ZIP compiló en GitHub Actions con el workflow «Compilar APK».
- ✗ No se pudo abrir en un móvil físico desde este entorno; por tanto no se dan por probados el arranque, teclado, galería, voz, persistencia, PNG ni cinco escenas reales con Gemini.
- ✓ Las pruebas web de v0.8 se conservaron sin sustituir `index.html`, `shim.js` ni `assets/art/`.

## Cambios nativos

- `BackupManager.kt`: selector de carpeta SAF, permiso persistente, estado, escritura, listado, lectura, desvinculación y rotación de las cinco copias más recientes.
- `NarrationService.kt`: servicio en primer plano de tipo `mediaPlayback`, `MediaSession`, lectura continua, velocidad, pantalla apagada y acciones Pausa/Reanudar, Siguiente y Parar en la notificación. Si no está disponible, la web conserva su lector anterior.
- `UsageTracker.kt`: contador privado en `filesDir`, por modelo y día de cuota. La fecha cambia a medianoche de `America/Los_Angeles`, que es la regla oficial de reinicio diario de Gemini y equivale aproximadamente a las 08:00/09:00 en España según el horario estacional.
- `StoryWidgetProvider.kt` y recursos: widget 4×1 «Continuar leyendo», alimentado por el mismo archivo `filesDir/store` de la aplicación.
- `MainActivity.kt`: lista blanca ampliada de páginas de ayuda y cuentas, red validada mediante `ConnectivityManager`, contratos de copia/uso/voz, destino del widget y respeto del tamaño de fuente del sistema.
- `AndroidManifest.xml`: permisos mínimos de red, servicio multimedia y notificaciones; `allowBackup="false"` y tráfico en claro desactivado.

## Cambios web mínimos

Todos están señalados junto al código con `// v0.9:` o `/* v0.9: */`.

- Ajustes → Copia de seguridad: elegir carpeta, estado, copia inmediata, restauración fusionada, intervalo 3/5/10 y desvinculación.
- Una misma función arma la copia manual y la SAF. Solo incluye historias, personajes y preferencias de lectura; no contiene `hv:ai:v1` ni secretos del Keystore.
- Copia automática tras el intervalo elegido y al ocultar la app. Un error no interrumpe la escritura.
- Lectura nativa en segundo plano integrada, con respaldo al lector web existente.
- Una acción intentada sin red queda en cola local y solo se reenvía cuando vuelve la conexión si el usuario lo confirma.
- Tema claro corregido, contraste de texto reforzado, controles táctiles de 44 px y etiquetas de diálogo/navegación.
- Entrada segura `hvOpenStory(id)` para el widget.

## Seguridad

- Las claves siguen cifradas con Android Keystore y no entran en las copias.
- `Native.http` y `Native.openUrl` solo aceptan HTTPS y hosts exactos de sus listas blancas. Se añadieron a enlaces: `ai.google.dev`, `accounts.google.com`, `support.google.com`, `openai.com`, `www.anthropic.com` y `anthropic.com` porque el asistente conduce a documentación, creación de claves, acceso y soporte oficiales. No se amplió la lista de APIs.
- No hay permiso `DUMP`, atributo `debuggable` ni relajación de CSP.

## Pruebas y CI

- El workflow ejecuta todos los scripts Playwright sin red antes de compilar; cualquier excepción detiene el trabajo.
- `test_backup_sin_claves.js` simula `backupWrite`, crea una copia y comprueba que una clave señuelo no está ni en el JSON ni en lo recibido por el puente.
- No se modificó ningún archivo de `app/src/main/assets/art/`.

## Drive appData (fase 2)

No se activó. La fase 1 SAF debe probarse primero en un móvil con un proveedor real de Drive, y falta un ID OAuth legítimo. La alternativa actual ya permite elegir una carpeta de Drive desde el selector del sistema sin añadir cuentas ni permisos propios. Véase `DRIVE_SETUP.md`.

## Archivos tocados o añadidos

- `.github/workflows/build-apk.yml`, `package.json`, `package-lock.json`, `tests/test_backup_sin_claves.js`
- `app/build.gradle.kts`, `AndroidManifest.xml`, `MainActivity.kt`
- `BackupManager.kt`, `NarrationService.kt`, `StoryWidgetProvider.kt`, `UsageTracker.kt`
- `res/layout/widget_continue.xml`, `res/drawable/widget_background.xml`, `res/xml/story_widget_info.xml`, `res/values/strings.xml`
- `assets/index.html`, `assets/shim.js`
- `README.md`, `PRIVACIDAD.md`, `DRIVE_SETUP.md`, `NATIVE_CONTRACTS_v0.9.md`
