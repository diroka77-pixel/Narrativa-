# PROMPT — HISTORIAS VIVAS v0.10.0 (para Codex)

Adjunto `HistoriasVivas-web-v0.10.0.zip`. Cambios solo de web, pero hay UN ARCHIVO NUEVO:
1. Copia en `app/src/main/assets/`: `index.html`, `shim.js` (sustituyen a los actuales) y **`es_dict.js` (nuevo, ~1,5 MB; diccionario español para el corrector ortográfico, licencia MPL 1.1)**. No toques `jszip` ni `pdf-lib`. La carpeta `art/` ahora incluye una subcarpeta NUEVA `art/bg/` (17 fondos WebP + miniaturas, ~2 MB; la carpeta `fondos_privados/` del zip NO va en la app): copia `art/` completa y confirma que entra en el APK.
2. Añade a la raíz del repositorio `LICENCIAS_TERCEROS.md` y la carpeta `licencias/` del zip, y las herramientas de `tools/` (conversión del diccionario). No van dentro del APK.
3. Comprueba que `es_dict.js` entra en el APK y que el WebView lo carga con `<script src="es_dict.js">` igual que `jszip.min.js` (la CSP ya permite `script-src 'self'`). Si el empaquetado comprime o excluye `.js` grandes, avísame.
4. `versionCode` = el actual + 1 (20) y `versionName` "0.10.0". Misma firma.
5. Compila con `Compilar APK`, ejecuta las pruebas de `tests/` (t41 genera captura; t26 está retirada) y confirma que instala encima de la 0.9.10.
5b. Novedad: pantalla «Importar mi material» (Crear → «Ya tengo material escrito»). Usa un selector de archivos (`<input type=file>` con `.pdf,.docx,.txt,.md`): comprueba que el WebView abre el selector y entrega esos tipos de archivo (ya funciona para copias de seguridad .json e imágenes). Lee PDF con pdf-lib y Word con JSZip (ambos ya incluidos). Si puedes, prueba con un PDF real de texto y uno de Word en un dispositivo/emulador.
5c. Novedad: voz natural opcional (Ajustes → Lectura → «Voz para escuchar»). `shim.js` añade `window.hvTTS`, que llama a la API de Gemini con la misma clave del texto (usa `N.http`; la respuesta JSON trae audio PCM en base64, de 1-3 MB: comprueba que el puente aguanta ese tamaño) y la app lo reproduce con Web Audio (`AudioContext`). Comprueba en el WebView: (a) que el audio suena al pulsar «Escuchar la última escena» (si el WebView bloquea la reproducción sin gesto, pon `mediaPlaybackRequiresUserGesture=false`); (b) que «Probar la voz natural» funciona; (c) que con la pantalla apagada el audio se corta (esperado; avísame); (d) que si falla la red, vuelve a la voz del teléfono. No cambies el servicio nativo de lectura.
5d. Novedad: subrayar texto y crear fichas desde la selección. La pulsación larga sobre una palabra YA NO abre la definición directamente: selecciona la palabra y aparece una barra flotante (sobre las pestañas inferiores) con «Definición», «Subrayar», «Crear ficha» y «Copiar». Comprueba en el WebView que la selección por pulsación larga funciona, que la barra aparece y no impide usar el menú nativo de selección, que «Definición» abre el diccionario y que el subrayado se conserva al cerrar y abrir la historia.
5e. Novedad: «Rincón de los olvidados» (estantería de historias archivadas) y menú «⋯ Opciones» en cada historia (pulsación larga en la portada también lo abre). Comprueba que la pulsación larga no abre a la vez la historia y el menú, y que la estantería se ve bien en vertical y horizontal.
5f. Novedad: modo Aventura RPG (solo web; no requiere cambios nativos). Comprueba en el WebView: crear una historia en formato RPG, que salgan las barras de Salud y recurso, que las opciones muestren 🟢/🟠/🔴 y que el dado funcione (usa `crypto.getRandomValues`). Revisa que la sección «Elige tu acción» se abra sola y que «🎲 Repetir tirada» y la hoja «Has caído» funcionen.
5g. Novedad: «Vocabulario» en el Atlas de cada historia (cambiar o prohibir palabras). Solo web. Comprueba que se abre y se pueden añadir/quitar entradas con el teclado del móvil.
5h. Novedad: modo claro rediseñado (fondos visibles, menús y paneles blancos). Revisa en el WebView con el tema del teléfono en claro y en oscuro que el texto se lee bien, que la barra superior y la inferior se ven y que el panel de salud del modo RPG no se corta.
5i. Novedad: en Atlas → Personajes se pueden separar personajes fusionados y editar una «Ficha fija» (nombre, sexo, edad…). Solo web. Comprueba que los campos se pueden escribir con el teclado del móvil.
5j. Novedad: fondos desbloqueables por logros (botón «Cambiar fondo» en la historia: galería con candados). Solo web. Comprueba que las imágenes de `art/bg/` cargan en el WebView, que la galería se ve bien en vertical y horizontal, y el peso final del APK.
5k. Novedad: guardado seguro y versiones de cada historia (solo web, usa IndexedDB del WebView). Comprueba en el WebView que `indexedDB` funciona y persiste tras cerrar la app y tras actualizar el APK (si el WebView tiene el almacenamiento DOM habilitado, ya debería). Revisa que el almacén NO se incluye en copias automáticas de Android con claves. Prueba: escribir 6 escenas, cerrar la app a la fuerza, abrir; menú ☰ → «Recuperación y versiones»; en una historia, «Versiones anteriores».
5l. Arreglo: la barra flotante de selección (Definición, Subrayar, Crear ficha, Copiar) se cortaba por los lados en el móvil; ahora ocupa el ancho en dos filas. Comprueba que se ven los cuatro botones y se pueden pulsar.
5m. Novedad: el texto que escribe el jugador se ve plegado («▸ Tu acción (toca para ver)») y se abre al tocar. Comprueba que tocarlo funciona y no interfiere con la selección de texto por pulsación larga.
5n. AUDITORÍA DE RESPALDO (sin añadir funciones nuevas; documenta y arregla solo lo necesario, sin coste ni servicios de pago):
  a) Revisa en `AndroidManifest.xml` y en `res/xml/` los valores reales de `allowBackup`, `dataExtractionRules` y `fullBackupContent`. Objetivo: las claves de API NUNCA salen del móvil (ni por la copia automática de Android ni por transferencia a otro teléfono). Si hay duda, deja `allowBackup="false"` y dímelo; no actives la copia automática de Android del WebView (puede restaurar bases de datos dañadas).
  b) Confirma que la compilación de entrega no es `debuggable` y que no hay permisos innecesarios.
  c) Copia a carpeta (Android SAF) con una carpeta de Google Drive elegida desde el selector: comprueba y documenta (sin marcarlo como probado si no lo has hecho en un móvil): permiso persistente (`takePersistableUriPermission`), escritura, lectura, rotación, que sigue funcionando tras reiniciar el teléfono y tras instalar la APK nueva encima, y qué ocurre si Drive no tiene red (debe avisar sin bloquear la escritura).
  d) NO implementes login de Google ni la API de Drive (`drive.appdata`). Queda como estudio futuro.
6. Si puedes, mide cuánto tarda en cargar y descodificar `es_dict.js` en el WebView y cuánta memoria usa (debería ser menos de 1 s y unos 3 MB).
7. Informe corto en español: qué cambiaste, compilado sí/no, qué no pudiste probar en móvil.

5o. Detector de repeticiones (solo web): en una historia abre Atlas → Estilo y confirma que lista repeticiones y que «Ir a la escena» funciona. No cambies nada nativo.

5p. Formato de imagen por escena (solo web): en una escena con imagen, Opciones → «Formato» alterna Horizontal/Vertical/Página completa; comprueba que se ve bien en el móvil y que el prompt de imagen cambia de formato.

5q. Escuchar por rango (web, pero toca el servicio nativo): «Elegir qué escuchar» puede enviar a hvBackgroundSpeech.play() una lista muy larga (novela entera). Comprueba que NarrationService la acepta sin cortarse ni agotar memoria y que la pausa/parar siguen funcionando con la pantalla apagada.

5r. Fondo de inicio (solo web): menú → «Fondo de inicio»; comprueba que alterna entre fondo del género y portada de la última historia, y que la opción se conserva al cerrar y abrir la app.

5s. Corrección del fondo de inicio: cierra la app del todo y reábrela; debe mostrar la portada de la última historia abierta (si el ajuste está activo) o el fondo del género (si no). Comprueba también al volver a Inicio desde una historia.

5t. Portada ampliada (web): en Inicio, tocar una portada la amplía y tocarla otra vez entra. Comprueba en el móvil que el botón Atrás de Android cierra la ampliación en vez de salir de la app; si no, gestiónalo en MainActivity sin cambiar nada más.

5u. Comparar versiones (web): en modo novela pulsa «Otra versión»; en la escena nueva, Opciones → «Comparar con la otra versión». Comprueba que muestra ambos textos y que «Usar la versión anterior» cambia el texto y se guarda tras cerrar la app.

5v. Lore del universo (web): en una historia, menú → «Lore del universo»; añade una idea, otra con «Disponible desde el capítulo 2» y una «Siempre presente». Comprueba que se guardan tras cerrar la app, que van en la copia de seguridad y que se restauran.

5w. Lore largo (web): pega un texto de ~10 páginas en Lore del universo → «Dividir y guardar» → «Que El Cronista lo lea ahora». Con IA real comprueba que el resumen es fiel y que no revienta el almacenamiento ni el límite de consultas; revisa que `wlsum` entra en las copias.
