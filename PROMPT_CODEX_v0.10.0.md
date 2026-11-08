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

5x. Comprueba en el móvil: (a) Vocabulario → añadir «vampiro»→«tenebrio» cambia también fichas, memoria y cartas; recuperar la versión «Antes de cambiar palabras…» lo deshace; (b) Cartas de lore → Editar/Borrar; (c) ya no existe el botón ☰ y Ajustes (barra inferior) abre el menú; no debe quedar ningún hueco en la cabecera. Si algún código nativo hace click en #menu, sigue funcionando (el botón está oculto, no eliminado).

5y. Sinopsis: comprueba en el móvil que «Título, portada e imágenes» permite editar la sinopsis y que el cambio de vocabulario se ve en la sinopsis de Inicio.

5z. Registro de creación (web, ver CAMBIOS «Registro de creación»). Comprueba en el móvil real:
 (a) Ajustes → «Mi biblioteca y registro de creación»: guardar nombre de autor, exportar EPUB (el archivo se guarda con claude.use("downloads") → comprueba que `dl.save` acepta Uint8Array y que el nombre es titulo-vN.epub), generar la Ficha PDF y descargarla/compartirla.
 (b) Abre el EPUB en 2-3 lectores (Google Play Libros, Lithium, Moon+…) y, si puedes, pásalo por epubcheck: debe abrir sin error y mostrar el autor y el título; los metadatos `hv:*` con `prefix` no deben dar error.
 (c) Comprueba que la huella SHA-256 que muestra la app coincide con `sha256sum` del archivo exportado.
 (d) «Comprobar un archivo EPUB»: elegir un EPUB exportado debe decir «Coincide». Verifica que el selector de archivos del WebView funciona (FileChooser).
 (e) Las copias de seguridad deben incluir `s.reg` (UUID y registro de huellas) y restaurarse sin cambiar el UUID. El perfil de autor está en localStorage `hv:author`: confirma que sobrevive a una actualización de la app y decide si entra en la copia (no contiene secretos).
 (f) Importante: no se ha implementado ningún sellado externo ni firma; la ficha NO debe presentarse en ningún texto nativo como «certificado» ni como prueba legal.

5aa. Galería del libro (web): en Cartas de lore, edita una carta → añade imagen desde la galería del móvil (FileChooser) y márcala. Exporta EPUB y PDF y comprueba que aparece «Galería de personajes y mundo» con la imagen. Revisa en un lector EPUB real que las tarjetas se ven bien y que el almacenamiento aguanta ~20 imágenes de carta (localStorage/IndexedDB).

5ab. Hojas de personaje (web): en una carta de lore sube una hoja grande (~1536×1024) y comprueba que se guarda, sale en el EPUB/PDF a página completa y que la lectura permite ampliarla. IMPORTANTE (almacenamiento): cada hoja pesa ~0,4 MB dentro de localStorage; prueba con 5-8 hojas + portada + imágenes de escenas y dime si el WebView aguanta o si hay que mover las imágenes a IndexedDB/archivos (propuesta para v0.11, con migración y sin perder copias de seguridad).

5ac. Conexión con Gemini: usa `assets/shim.js` nuevo tal cual. Comprueba que `N.http` permite el host `generativelanguage.googleapis.com` con método POST, que el tiempo de espera nativo no sea menor de 70 s y que el AndroidManifest tenga INTERNET y `usesCleartextTraffic` no sea necesario. No cambies la lógica de reintentos. Prueba en móvil real: con datos, con wifi y en modo avión (debe mostrar «Sin conexión…» y recuperarse al volver la red).
5ad. Menú lateral: `assets/index.html` incluye el CSS nuevo de `.dnav button`; no lo sobrescribas.

5ae. Capítulos controlados por el escritor: `assets/index.html` incluye el ajuste `cmode`, el panel de comienzo de capítulo y el botón «Ver mi texto original». No requiere cambios nativos; solo no sobrescribas el archivo. Prueba en móvil: activar el ajuste, cerrar un capítulo, escribir un comienzo y comparar con el original.

5af. Voz por personaje, relaciones y «Esto no cuadra»: todo está en `assets/index.html` (nuevo botón `#nocuadra`, campos `voz`/`ej` en cartas, `s.rel`). Sin cambios nativos; no sobrescribas el archivo. Prueba en móvil: añadir voz a un personaje, crear una relación y usar «Esto no cuadra» en la última escena.

5ag. «Qué recuerda ahora», pendientes olvidados y «Sorpréndeme»: todo en `assets/index.html` (botones `#memnow` y `#twist`). Sin cambios nativos; no sobrescribas el archivo. Prueba en móvil: abrir «Qué recuerda ahora», clavar un hecho, y pedir «Sorpréndeme» con tu IA real.

5ah. Preparar el libro (EPUB/PDF): todo en `assets/index.html` (botón `#prepb`, `s.lay`). Sin cambios nativos; no sobrescribas el archivo. Comprueba que la vista previa (iframe con `srcdoc` y `sandbox`) se ve en el WebView y que el PDF/EPUB exportado abre bien en un lector real tras cambiar tamaños y saltos de página.

5ai. Maquetación para papel: todo en `assets/index.html` (`bookLayout`, `pdfDoc`, `bkPreviewSheet`, `bkDesignSheet`). Usa `assets/pdf-lib.min.js` ya incluido; no hace falta nada nativo. No sobrescribas el archivo. Prueba en móvil real: abrir «Ver como libro de papel» en una historia larga (200+ escenas con imágenes), comprobar que no se congela, exportar el PDF y abrirlo en un lector de PDF: tamaño de página, capítulos en página impar, márgenes y numeración.

5aj. Maquetación entrega 2: todo en `assets/index.html`. Sin cambios nativos; no sobrescribas el archivo. Prueba en móvil: cambiar letra, papel, marco, adorno, capital y fondo, ver el libro y exportar el PDF; tocar una imagen en la vista y cambiarla.
   OPCIONAL (solo si tienes acceso a npm): letra Garamond incrustada. Añade `@pdf-lib/fontkit` (MIT, `dist/fontkit.umd.min.js`) y las fuentes EB Garamond regular/bold/italic en formato TTF (licencia SIL OFL 1.1; incluye el archivo OFL.txt y el aviso de copyright en la pantalla de créditos). Regístralo con `doc.registerFontkit(fontkit)` en `bookFonts` y añade `garamond` a `BK_FONTS` (la métrica de `widthOfTextAtSize` vale para el diseño). Solo debe usarse si las fuentes cargan; si no, caer en Times. Comprueba que el tamaño del APK sigue razonable y que `pdfSafe` no recorta caracteres.

5ak. Menú «Más» e índice/buscador: todo en `assets/index.html`. Sin cambios nativos; no sobrescribas el archivo. Prueba en móvil: abrir «⋯ Más», buscar una palabra en una historia larga (200+ escenas), tocar un resultado antiguo y comprobar que salta bien y no se congela.

5al. Almacenamiento: index.html abre IndexedDB `hv-safe` en versión 2 (nuevo almacén `img`) y añade «Espacio y almacenamiento». Comprueba en el APK que arranca con datos antiguos, que Restaurar/Recuperar versiones funciona y que reducir imágenes no corrompe historias. No cambies el almacenamiento principal.

5am. Historial de turnos: las escenas llevan un campo `pv` (máx. 40) y «⋯ Más → Volver a una escena» restaura memoria/estado. Comprueba que el botón se ve en el menú «Más» y que tras volver se puede seguir jugando y guardar sin errores.

5an. Plantillas de inicio: botón «📚 Plantillas» en la pantalla de crear. Comprueba que se ve bien en móvil y que la historia creada desde una plantilla arranca normal.

5ao. Tutorial y ayuda: botón «?» en la cabecera y «Ajustes → Tutorial y ayuda». Comprueba que el «?» no se solapa con nada en pantallas pequeñas y que la hoja de ayuda se puede desplazar y cerrar.

5ap. Pulido y calidad de impresión: (a) `confirm()` ya no se usa (hoja propia `askYes`), no hace falta `onJsConfirm`; (b) copias de seguridad v3 con campo `imgs` (el nativo solo guarda/lee el texto JSON, comprueba que no lo trunca); (c) ejecuta `bash tests/run_all.sh` y confirma que todo da OK; (d) **IMPORTANTE para imprenta: el PDF usa las tipografías estándar sin incrustar. Si es posible en el CI, instala `@pdf-lib/fontkit` y una fuente libre (OFL, p. ej. EB Garamond o Libre Baskerville), inclúyela en assets/ e incrústala en el PDF (`doc.registerFontkit`, `embedFont(bytes, {subset:true})`) para que cualquier imprenta lo acepte; mantén las estándar como plan B si falla**; (e) no cambies la resolución ni la compresión de las imágenes al exportar.

5aq. **Maquetación (nuevo, grande).** Archivos nuevos que deben entrar en `app/src/main/assets/` **con su carpeta**: `fonts/f-crimson.js`, `fonts/f-lora.js`, `fonts/f-plex.js`, `fonts/f-liberation.js` (≈4 MB en total, se cargan a demanda con `<script>`, igual que `es_dict.js`) y `licencias.js`. `index.html` actualizado. Comprueba: (a) que el APK incluye la carpeta `fonts/` y que el WebView carga `fonts/f-lora.js` (si tu cargador de assets solo sirve ciertos archivos, añade `fonts/*` y `licencias.js`); (b) abre «⋯ Más → 🎨 Maquetación del libro»: la vista previa debe mostrar dos páginas con la letra elegida; (c) exporta un PDF con cada una de las 4 letras y ábrelo en el móvil: el texto debe verse nítido y poder seleccionarse; en un ordenador, `pdffonts archivo.pdf` debe decir `emb yes` para todas las fuentes; (d) exporta un EPUB y valídalo con EPUBCheck (hay `fonts/*.ttf` declarados como `font/ttf` en el manifiesto); (e) memoria: `f-liberation.js` pesa 2 MB, comprueba que no da problemas en móviles modestos; (f) **no recortes ni renombres las fuentes** (nombres reservados OFL); (g) ya NO hace falta el apartado d de 5ap (fuentes incrustadas): está resuelto aquí; (h) no tocar `HVTTF`, `bookLayout`, `pdfDoc` salvo error probado. Pruebas de escritorio: `bash tests/run_all.sh` (nuevas: t94_font, t95_layout, t96_perf).

5ar. Solo CSS en `index.html`: menú de Ajustes desplazable con botones más grandes y botón «+ Crear nuevo» centrado en horizontal. Comprueba en el APK, con el móvil girado, que el botón no queda bajo la barra de navegación ni tapado por la barra del sistema, y que el menú de Ajustes se desplaza hasta «Historias vivas · v0.10».

### 5as. Texto web ampliado por el sistema
No hay que tocar nada nativo: `MainActivity` aplica `textZoom` según el tamaño de letra del sistema (accesibilidad) y se mantiene. La vista previa de Maquetación compensa ese zoom en JS (`hvTextZoom`). Al probar el APK con letra grande del sistema, comprobar que el texto de la vista previa no se pisa.

### 5at. Animaciones
Solo cambios web (CSS/JS en index.html). No hay que tocar nada nativo. Al probar el APK, comprobar que las hojas suben con fluidez, que el dado del modo RPG se ve al elegir una acción y que «Reducir movimiento» (Ajustes → Lectura) lo apaga todo.

### 5au. Secretos de la historia
Solo web (index.html): `sxPanel`, `sxCtx`, `sxLeak`, campo `s.sx` de cada historia. Nada nativo. Comprobar que se guarda y que entra en las copias de seguridad (va dentro de la historia).

### 5av. Lore con archivo y discreción
Solo web (index.html): `wlSplit` (corta bloques largos), subida de archivo en el panel de lore (usa `impFile`), campo `open` en las ideas, reglas «DISCRECIÓN DEL LORE» en `wlCtx`. Comprobar que el selector de archivos del WebView funciona con PDF y Word (ya lo usa «Ya tengo material escrito»).

### 5aw. Menos repetición entre escenas
Solo web (index.html): `dialogLines`, `dupDialog`, `dupParas`, ampliación de `redund` y bloque «DIÁLOGOS RECIENTES» en `build`. Nada nativo.

### 5ax. Más lore y cartas importadas
Solo web (index.html): `impAddMore`, `cardsSheet/cardsSplit/cardParse/cardsAdd`, `loreTxt(s, focus)`, selectores de archivo múltiples. Comprobar en el APK que el selector permite elegir varios archivos y que se puede volver a elegir el mismo.

### 5ay. Botón «Leer como un libro» al final
Solo web (index.html, `sceneImg`). Nada nativo.

### 5az. Revisar esta escena
Solo web (index.html): `rvLocal`, `rvAI`, `reviewScene`, botón en `sceneImg`. Usa el diccionario `es_dict.js` ya existente. Nada nativo.

### 5ba. Escena larga
Cambios en index.html (casilla `#longsc`, `LONGNEXT/LONGCUR`, `build`) y en shim.js (`viaGemini`, `viaAnthropic`, `callOne`: parámetro `long` que sube el límite de tokens de salida). Revisar que el tiempo de espera de red del APK admita respuestas de hasta ~2 minutos; si hay un timeout de HTTP más corto, subirlo a 120 s para las peticiones de generación.

### 5bb. Borrar y reescribir una escena
Solo web (index.html): `rewriteSheet`, botón en `sceneImg`. Nada nativo.
