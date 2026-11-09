# Historias vivas v0.10.0 — Memoria y prosa

**Memoria**
- El estado de la historia se fusiona (antes se sustituía entero cada turno).
- Nada se descarta en silencio: pendientes sin cierre automático; mundo y conocimientos con topes mucho mayores y archivo.
- Los cambios de mundo, tiempo y recursos cuentan como memoria válida.
- Creencias que se desmienten (`desmiente`) dejan de enviarse al narrador.
- Estado inmediato de la escena (`escena_ahora`): lugar, medidas, presentes, qué sostiene cada uno, salidas, amenaza.
- Objetos con alias (`tambien_llamado`).
- Editar una escena: «Guardar y actualizar la memoria».

**Narración**
- Punto de vista elegible: cercana al protagonista (por defecto en historias nuevas), primera persona, omnisciente (las historias antiguas siguen en omnisciente).
- Mirada del protagonista (campo en Ajustes de la partida, con propuesta de El Cronista).
- Escenas más largas: Conciso 150–250, Regular 300–480, Detallado 550–800 palabras.
- Regla anti-volcado en el primer párrafo.

**Validador local** (antes de aceptar una escena): salto de punto de vista, muertos que actúan, acciones imposibles en el espacio, cambio de arma, párrafos que empiezan igual. En automático reescribe una vez; en copiar y pegar solo avisa.

**Corrector ortográfico**: diccionario español incluido (`es_dict.js`, ~1,5 MB, 647 000 formas). Revisa cada escena en el móvil; las tildes que faltan se corrigen solas; solo si quedan palabras dudosas hace una consulta corta (Groq 20b). Botón «Revisar la ortografía» antes de exportar.

**Informe de prueba**: IA que respondió, reescrituras y avisos del validador, ortografía, punto de vista, creencias desmentidas.

## Licencias (corrección importante)
- El diccionario del corrector es ahora el `es_ES` de LibreOffice (MPL 1.1 / LGPL 3 / GPL 3, usado bajo MPL 1.1). La versión anterior del zip usaba una lista sin licencia clara: NO usarla.
- Nuevo `LICENCIAS_TERCEROS.md`, carpeta `licencias/` y aviso en la app (Privacidad y ayuda → Créditos y licencias).
- Revisado: JSZip y pdf-lib (MIT, avisos incluidos), imágenes e icono (generados con ChatGPT). Pendiente: publicar `tools/` en un repositorio público (obligación de la MPL).

## Pantalla de la historia (añadido)
- Ajustes de la partida, Atlas, Lectura, Título/portada/imágenes y Cartas de lore van dentro de un único botón «☰ Menú de la historia», cerrado por defecto; la pestaña Mundo lo abre sola.
- «Leer como un libro» pasa de botón a todo el ancho a botón compacto. Prueba nueva: tests/t46.js.

## Importar el material del autor (añadido)
- Crear → «Ya tengo material escrito»: PDF (de texto), Word .docx, .txt/.md o texto pegado (hasta 60.000 caracteres).
- El Cronista lo estudia por partes y propone: título, géneros, sinopsis, personajes (con marca de protagonista), lugares, plan, tono/reglas y contradicciones del material. El autor lo revisa, decide las contradicciones y elige «fiel» o «inspiración».
- Al narrar, cada escena consulta solo los 1-3 apartados relevantes (por nombres de la escena y hito del plan). Los puntos sin decidir no se cierran solos.
- Ajustes de la partida: cambiar fiel/inspiración, quitar el material o fijar decisiones pendientes. Prueba nueva: tests/t47.js.
- Límite: los PDF escaneados (fotos) no se pueden leer; hay que pegar el texto.

## Voz natural opcional (añadido)
- Ajustes → Lectura → «Voz para escuchar»: «Del teléfono» (por defecto) o «Natural (Gemini)» con 6 voces a elegir y botón «Probar la voz natural».
- Usa la clave de Gemini del usuario (coste cero dentro del límite gratuito de Google), reproduce con Web Audio, genera por fragmentos y precarga el siguiente. Si falla (límite, red, clave), sigue con la voz del teléfono. Prueba nueva: tests/t48.js.
- Limitación: solo suena con la app abierta (la lectura en segundo plano sigue siendo la del teléfono). Los modelos de voz de Gemini son «preview» y pueden cambiar de nombre: la app prueba varios.

## Ficha de la historia, voz natural más estable y coherencia física (añadido)
- Exportar → «Ficha de la historia» (PDF) o «.txt»: datos generales, biblia/reglas, plan, protagonistas, personajes (estado, relaciones, lo que saben, promesas), objetos, hechos del mundo, cartas de lore, hilos, cronología y resumen. Se puede volver a cargar con «Ya tengo material escrito». Lector de PDF: ahora entiende comillas, rayas y viñetas de los PDF de la propia app. Prueba: tests/t49.js.
- Voz natural: cada petición lleva 1.100 caracteres (varios párrafos), reintenta con esperas (5, 20 y 40 s) y guarda en memoria los últimos fragmentos; muestra «Preparando la voz…». Antes saltaba a la voz del teléfono al fallar una petición (probablemente por el límite por minuto).
- Nueva regla de prosa «COHERENCIA FÍSICA» y comprobación local de frases como «pecho cubierto por chaquetas» (reescritura automática).

## Subrayar y crear fichas desde el texto (añadido)
- Al seleccionar texto en la lectura aparece una barra: «Subrayar», «Crear ficha» y «Copiar». Los subrayados se guardan por escena (se ven en amarillo; al tocarlos se pueden quitar o convertir en ficha) y salen en la Ficha exportada.
- «Crear ficha»: elige tipo (personaje, lugar, objeto, facción, otro), nombre y descripción (se rellenan con lo seleccionado; opción «Que El Cronista la redacte»). Se guarda en las cartas de lore y las fichas hechas a mano pasan primero en el contexto de la IA. Prueba: tests/t50.js.
- Para Codex: comprobar en el WebView que el menú del sistema (copiar/pegar) y la barra no se estorban al seleccionar con pulsación larga.

## Rincón de los olvidados (añadido)
- En cada historia de la página principal, «⋯ Opciones» (o pulsación larga en la portada) abre: Continuar, «Guardar en el Rincón de los olvidados» y Borrar. Archivar no borra nada (`s.arch` con la fecha) y la historia deja de salir en la portada y en «Continúa tu aventura».
- Nueva pantalla «Rincón de los olvidados» (botón bajo la lista, solo si hay archivadas): estantería de madera con lomos de colores según el género, título vertical, grosor y altura según las escenas. Al tocar un lomo: rescatar y seguir escribiendo, devolver a Mis historias o borrar. Prueba: tests/t51.js.
- La copia de seguridad incluye el estado de archivado.

## Corrección: pulsación larga en una palabra
- Antes la pulsación larga abría directamente la definición y impedía seleccionar texto (y por tanto subrayar o crear fichas). Ahora selecciona la palabra y la barra muestra «Definición» (si son 3 palabras o menos), «Subrayar», «Crear ficha» y «Copiar».

## Modo Aventura RPG (añadido)
- Crear → «Novela interactiva» o «⚔ Aventura RPG» (dificultad Relajado/Normal/Duro y recurso que se gasta: Sed, Cordura, Oxígeno, Maná…).
- Reglas locales: cada acción tiene riesgo 🟢 Seguro (CD 6), 🟠 Arriesgado (12), 🔴 Temerario (16) y la app lanza un d20 (crypto). Resultado: éxito, éxito con coste o fallo (crítico con 20, pifia con 1). La IA recibe el resultado como orden obligatoria y solo narra; las opciones llevan etiqueta de riesgo. Fallo/coste restan salud y recurso; el recurso baja 3 por escena; hay recuperación si la IA marca descanso/curación.
- Créditos de destino (3 en Normal, 1 en Duro, ilimitados en Relajado; +1 cada 12 escenas): repiten una tirada («🎲 Repetir tirada», deshace la escena) o permiten levantarse con 0 de salud (aquí, o volver al último punto de control automático, cada 6 escenas). Sin créditos, la aventura termina.
- HUD con barras (accesibles), línea de tirada en cada escena, selector de riesgo para acciones escritas.
- Mismo mundo que la novela: «⋯ Opciones» → «Jugarla también como aventura RPG» crea una partida aparte con los personajes, lugares, reglas y memoria de la novela (la novela no se toca); el RPG recibe el resumen de la novela como canon y puede «Traer novedades de la novela» (fichas y memoria nuevas). Pruebas: tests/t52.js y t53.js.
- Pendiente (v0.11): atributos, inventario avanzado, «hacer oficial» de RPG a novela, ambientar el RPG en un punto concreto de la novela.

## Modo claro rediseñado
- Los fondos ilustrados se ven igual que en modo oscuro; solo menús, barra superior, títulos, botones y paneles son blancos con letra oscura.
- Panel RPG (salud/energía/créditos) con barras degradadas, sombra y mejor contraste.

## Vocabulario del autor
- Atlas → pestaña «Vocabulario»: cambia una palabra por otra (con plurales y femenino) o prohíbela.
- Se avisa a la IA en cada escena, se corrige solo el texto y las opciones, y una palabra prohibida fuerza reescribir la escena.
- Botón «Aplicar a las escenas ya escritas». Se copia al clonar la historia (RPG).

## Personajes: deshacer fusión, separar y ficha fija
- Atlas → Personajes: botón «Deshacer la fusión» (para fusiones hechas con esta versión) y «Separar «X» como personaje distinto» (para fusiones ya hechas antes: crea una ficha nueva vacía).
- Ficha fija editable por personaje: nombre, sexo/género, edad, pelo, ojos y rasgos. La IA la recibe siempre como dato fijado por el autor.

## Fondos desbloqueables con logros
- 20 fondos nuevos (carpeta `assets/art/bg/`, ~2,4 MB, WebP + miniaturas). 5 vienen desbloqueados y 15 se consiguen con 1..15 logros.
- «Cambiar fondo» abre una galería con candados; el aviso de logro menciona el fondo nuevo; en Atlas → Logros se ve el progreso y el siguiente fondo.
- Los 5 gratuitos también entran en el reparto automático por género.

## Ajuste de fondos
- Tres fondos con algo de sangre o calaveras (guerrero con lobo, compañía de la luna roja, trono de huesos) se han apartado a `fondos_privados/` (no van en la app pública). Quedan 17 fondos: 5 libres y 12 desbloqueables con 1..12 logros.

## Guardado seguro, versiones y recuperación
- `save()` comprueba el resultado, avisa si el almacenamiento está lleno y copia siempre la biblioteca a un almacén de seguridad (IndexedDB, mucho más grande). Si falla el guardado normal, la historia no se pierde.
- Al abrir: si los datos están dañados o vacíos se recuperan del almacén (el dato dañado se conserva aparte); si el almacén tiene más escenas que lo guardado, se ofrece recuperarlas (nunca sin preguntar).
- Versiones de cada historia (últimas 10, cada 5 escenas y antes de deshacer, borrar o restaurar), pantalla «Versiones anteriores» (ver, restaurar guardando antes la actual, borrar, espacio).
- Menú ☰ → «Recuperación y versiones»: recuperar historias borradas y ver el estado.
- Barra de selección (Definición/Subrayar/Crear ficha/Copiar): ahora se ajusta al ancho en dos filas, sin cortar botones.

## Tus acciones, plegadas
- El texto que escribe el jugador (la acción) aparece plegado como «▸ Tu acción (toca para ver)» y se despliega al tocarlo. Accesible con teclado y lectores de pantalla. La lectura en voz alta ya lo omitía.

## Revisión de estilo (a partir del informe de Gemini)
- Diálogos: las rayas escritas como guion («-Hola», «-dijo Marta-.») se corrigen a raya (—) en las escenas, también dentro de los incisos.
- Reglas de prosa para la IA: máximo un gerundio por frase, sin encadenar incisos, sin repetir adjetivos de ambiente en frases cercanas y trato (tú/usted/vosotros) constante entre cada pareja de personajes.

## Detector local de repeticiones (Atlas → Estilo)
- Revisión sin IA y sin gastar consultas: palabras repetidas cerca, frases que se repiten, comienzos de párrafo iguales, adverbios en -mente, gerundios, frases muy largas, nombres repetidos y tópicos.
- Solo señala (con botón «Ir a la escena»); nunca modifica el texto.
- Heurístico: puede dar falsos positivos. Prueba: tests/t62_rep.js.
- Solo web; no toca código nativo.
- También: en modo claro, los menús desplegados (Menú de la historia, Lectura, Atlas) tienen panel blanco.

## Formato de imagen por escena
- Opciones de la escena → «Formato: Horizontal / Vertical / Página completa» (botón que alterna). Guarda `sc.il` (`v`, `p`; horizontal = sin campo).
- Vertical: imagen alta centrada. Página completa: marco oscuro que ocupa casi toda la pantalla, estilo novela gráfica.
- El «Prompt de imagen» de esa escena pide formato 2:3 vertical (y «página de novela gráfica» en página completa) o 3:2 horizontal.
- Imágenes de escena: tamaño máximo al importar 960×1280 (antes 900×900).
- Solo web. Prueba: tests/t63_il.js. No probado en móvil real; los exportadores (EPUB/PDF) siguen usando la imagen tal cual, sin distinguir formato.

## Elegir qué escuchar
- Botón «Elegir qué escuchar» junto a «Escuchar la última escena»: desde el principio, desde donde dejé de leer, solo la última, o una escena concreta (solo esa / desde ahí hasta el final).
- En «Opciones de la escena»: nuevo «Escuchar desde aquí».
- Funciona con la voz del teléfono, la nativa y la de Gemini. Con Gemini avisa de cuántas peticiones de voz gastará (≈1 por cada 1000 caracteres).
- Si la escena inicial no está cargada en pantalla, la app amplía la ventana de escenas antes de leer.
- Prueba (voz simulada): tests/t64_listen.js. NO probado con voz real ni con la pantalla apagada: Codex debe revisar que el servicio nativo acepta listas largas (novela entera).

## Fondo de inicio con la portada
- Menú (☰ / Ajustes) → «Fondo de inicio: del género / portada de mi última historia». Se guarda en localStorage `hv:homecover` (solo preferencia, no entra en copias).
- Si está activo, la página de inicio usa la portada de la última historia abierta; si no tiene portada, sigue el fondo del género y avisa. Dentro de la historia no cambia nada.
- Prueba: tests/t65_homecover.js. No probado en móvil real.

### Corrección: el fondo de inicio no se recordaba
- Causa 1: al abrir una historia se actualizaba `at` (última abierta) pero no se guardaba hasta otro guardado; si cerrabas la app, «la última historia» era otra. Ahora `openStory` guarda al instante.
- Causa 2: al volver a Inicio desde una historia el tema se aplicaba con la pantalla aún oculta y se quedaba el fondo de la historia. Ahora `view("lib")` aplica el fondo de inicio (portada o género según el ajuste).
- Prueba: tests/t66_homepersist.js (abrir, volver, recargar, desactivar). No probado en móvil real.

## Portada ampliada en Inicio
- Al tocar la portada de una historia en Inicio, se amplía a pantalla casi completa; tocar la portada ampliada entra en la historia; tocar fuera (o Escape) cierra. Pulsación larga sigue abriendo el menú de la historia.
- Menú → «Ampliar portada al tocarla: sí/no» (localStorage `hv:coverzoom`, por defecto sí). Si es «no», vuelve a entrar directamente.
- Sin portada se amplía la portada generada con el título.
- El botón «Continuar» del bloque grande de Inicio sigue entrando directo.
- Prueba: tests/t67_czoom.js. No probado en móvil real; Codex debe comprobar que el botón Atrás de Android cierra la ampliación (ahora no la gestiona).

## «Otra versión» ahora conserva la anterior y permite compararlas
- Al pulsar «Otra versión» (modo novela), la escena descartada se guarda en `s.alt`. Mientras sea la última escena, en «Opciones de la escena» aparece «Comparar con la otra versión»: muestra ambos textos y permite «Usar la versión anterior» (y volver a cambiar cuantas veces quieras).
- Solo se intercambia el texto/datos de la escena; la memoria de la historia (resumen, lore, estado) queda como la dejó la versión nueva. Al escribir la siguiente escena la comparación desaparece.
- No afecta al modo RPG (tiene su propio «volver a tirar»).
- Prueba: tests/t68_alt.js (con `turn` simulado). No probado con IA real ni en móvil.

## Lore del universo (libro del mundo ampliable)
- Menú de la historia → «Lore del universo»: ideas (título + texto) que el autor añade cuando quiera, o pega todo el lore de golpe (se divide por apartados; las líneas cortas sin punto final se toman como títulos).
- Cada idea: «Disponible desde el capítulo N» (hasta entonces NO se envía a la IA, así no adelanta nada), «Siempre presente» (📌, máx. 3 por escena), pausar, editar, borrar (confirmación en dos toques).
- En cada escena se envían las fijas y hasta 3 ideas relevantes por palabras (con un stemming simple s/es), con orden de no contradecirlas. Texto máximo por idea enviado: 1100/800/600 (700 si es fija); en modo compacto menos.
- Campo `s.wl` por historia: va en copias de seguridad, versiones, ramas (fork) y en la exportación de texto («LORE DEL UNIVERSO»). Se oculta en Modo simple.
- Distinto de las «Cartas de lore» (fichas de personajes/lugares que crea la IA) y de la «biblia» (1200 caracteres).
- Prueba: tests/t69_wl.js. No probado con IA real ni en móvil. La relevancia es heurística: si una idea importante no sale, márcala «Siempre presente».

### Lore del universo: lectura completa por El Cronista (resumen)
- «Pegar todo el lore de golpe» no tiene límite de extensión (probado con ~31.000 caracteres ≈ 10 páginas → 30 ideas).
- Botón «Que El Cronista lo lea ahora»: lee todas las ideas disponibles en el capítulo actual por trozos de ≤9000 caracteres, resume cada trozo (≤350 palabras) y, si hay varios, los une en un resumen final. Se guarda en `s.wlsum` (máx. 2400 caracteres, editable por el autor) y se envía SIEMPRE en cada escena (2000 caracteres; 700 en modo compacto), además de las ideas relevantes por palabras. Coste: ≈1 consulta por cada 9000 caracteres + 1 de unión.
- No adelanta spoilers: solo resume ideas con «disponible desde» ≤ capítulo actual al pulsar. Al desbloquearse ideas nuevas conviene pulsar «Volver a leerlo y actualizar el resumen».
- `wlsum` va en copias, versiones y ramas. Prueba: tests/t70_wl2.js con IA simulada.

## Vocabulario aplicado a TODO, cartas de lore editables, menú duplicado quitado
- Al añadir un cambio de palabra (ej. vampiro → tenebrio) se aplica enseguida a todo lo ya escrito: escenas, tus acciones, sinopsis, premisa, memoria, fichas de personajes, cartas de lore, ideas del Lore del universo, opciones… (recorrido recursivo `vocabDeep`, salta `vocab`, ids, imágenes). Antes guarda una versión de seguridad («Antes de cambiar palabras en toda la historia») para poder deshacerlo. El botón manual se llama ahora «Aplicar a todo lo ya escrito».
- Todo lo nuevo que devuelve la IA (memoria, fichas, lore) también pasa por el cambio, no solo la escena.
- Las palabras solo prohibidas (sin sustituto) siguen forzando reescritura; no se cambian solas.
- Cartas de lore («Cartas de lore» en el menú de la historia): botón «Editar» (nombre, tipo, descripción) y «Borrar carta» (dos toques).
- Se oculta el botón ☰ de la cabecera (hacía lo mismo que «Ajustes» de la barra inferior). El menú se abre desde Ajustes.
- Prueba: tests/t71_vocall.js. No probado en móvil real.

## Sinopsis de Inicio: editable y con el vocabulario
- La sinopsis (texto bajo el título en Inicio y en las tarjetas) ya se cambiaba con «vampiro → tenebrio» al aplicarlo a todo lo escrito; además ahora SIEMPRE se muestra con el vocabulario aplicado, aunque no se haya pulsado nada.
- Nuevo: «Título, portada e imágenes» → «Sinopsis» editable («Guardar sinopsis»).
- Prueba: tests/t72_syn.js.

## Registro de creación (fases 1 y 2): Mi biblioteca, autor, UUID, huella SHA-256 y Ficha de registro
Menú de Ajustes → «Mi biblioteca y registro de creación».
- **Autor:** nombre real o seudónimo (vacío por defecto) y casillas «poner mi nombre en los EPUB/ficha» e «incluir mi identificador de autor». Identificador de autor = UUID aleatorio generado una vez (`localStorage hv:author`) y copiado a cada obra (`s.reg.aid`), así sobrevive en las copias.
- **UUID por obra:** `s.reg.uid`, campo nuevo; NO se toca el `id` antiguo, así que las historias ya guardadas funcionan sin migración. Estable entre exportaciones y versiones. Las ramas (fork) reciben un UUID propio.
- **EPUB:** `dc:identifier = urn:uuid:<uid>`, `dc:creator` = nombre de autor (o «Historias vivas»), `dc:contributor` = «Historias vivas (con asistencia de IA)», y metadatos propios (`hv:work-id`, `hv:author-id`, `hv:export-date`, `hv:version`, `hv:ai-assisted`) con prefijo estándar en `<package prefix=…>`. Sin ocultación ni marcas dentro del texto. Nombre de archivo: `titulo-vN.epub`. Todo EPUB exportado (también desde el menú de exportar de siempre) se registra.
- **Huella SHA-256** de cada EPUB: usa `crypto.subtle` y, si no existe en el WebView, una implementación propia en JS (comprobada con vectores oficiales y contra `crypto.subtle`). Registro por obra: versión, fecha, huella, tamaño, nº de escenas (`s.reg.ex`, máx. 50). La huella no puede ir dentro del EPUB (sería circular): va en el registro y en la ficha.
- **Comprobar un archivo:** elige un EPUB y dice si es idéntico a alguno exportado desde este móvil. Si se reabre y se guarda con otro programa, la huella cambia.
- **Ficha de registro de creación (PDF):** nombre, título, UUID, fechas (creación registrada, última vez abierta/modificada, exportación, emisión), versión, huella, resumen del proceso (escenas, con acción del autor, editadas a mano, cartas, ideas de lore), párrafo FIJO de asistencia de IA y aviso legal (no es registro oficial, fechas del reloj del dispositivo sin verificar por terceros, no impide la copia). Nunca se llama «certificado».
- **Fechas de proceso:** desde ahora cada escena nueva guarda `d` (fecha) y cada edición manual `ed`. Las escenas antiguas no tienen fecha y la ficha lo dice.
- **Biblioteca:** lista todas las obras con portada, estado (en desarrollo/finalizada), fechas, UUID (copiable), nº de exportaciones, «Exportar EPUB», «Ficha (PDF)» (elige versión si hay varias) y «Versiones guardadas» (ya existente).
- Pruebas: tests/t73_reg.js (SHA, EPUB, PDF, verificación). XML del EPUB bien formado, `mimetype` primero y sin comprimir. NO se ha podido ejecutar epubcheck ni abrir en lectores reales.
- NO hecho (fases 3-4): sellado externo (OpenTimestamps), firma digital, sincronización en la nube, expediente exportable completo. Sin servidor.

## Galería de personajes y mundo (apéndice del libro) — fase 1
- **Cartas de lore con imagen:** «Cartas de lore» → Editar: «Añadir/Cambiar/Quitar imagen» (se reduce a 560×760 JPEG), «Prompt de imagen» (retrato vertical 3:4 para personajes, horizontal 4:3 para lugares/objetos/facciones/conceptos; sin texto; personajes adultos), y casilla «Incluir en el apéndice del libro». Nuevo botón «+ Nueva carta» para crear cartas a mano (personajes, lugares, objetos…).
- **Quién entra en el apéndice:** `c.inb === true`, o con imagen salvo que `c.inb === false`. Sin imagen y sin marcar, no entra.
- **Dónde aparece:** al terminar la historia (lectura, tras «Fin de la historia»), en el **EPUB** (página `galeria.xhtml` con tarjetas con borde, entra en el índice), en el **PDF** (páginas de tarjetas con imagen a la izquierda, tipo y texto; descripción máx. ~36 líneas) y en el **FB2**. Las exportaciones existentes no cambian si no hay cartas marcadas.
- Si no hay espacio al guardar una imagen, se revierte y se avisa (mismo mecanismo que portada/escenas).
- Prueba: tests/t74_appx.js (EPUB y FB2 con XML bien formado; PDF revisado visualmente). No probado en móvil real ni en lectores EPUB reales.
- **Fase 2 (pendiente, a petición del autor):** tarjetas más vistosas (marcos por tipo, ficha con estadísticas, tamaño de impresión).

## Hojas de personaje (tarjeta grande con varias vistas) en el apéndice
- En cada carta de lore (Editar): bloque «Hoja de personaje»: «Añadir/Cambiar/Quitar hoja» (hasta 1280×1280, JPEG; ~400 KB para una hoja de 1536×1024) y «Prompt de hoja de personaje» (genera un prompt en español para ChatGPT/Gemini con la estructura de la hoja de Diroka: retrato con nombre, detalles ampliados, expresiones, ángulos de cara, cuerpo completo, detalles de ropa, vista sin abrigo, accesorios; rasgos fijos tomados de la ficha del personaje si existe; «es un personaje adulto»). Campo `c.sheet`.
- La carta con hoja entra sola en el apéndice (casilla marcada automáticamente al subir una imagen, salvo que el autor la desmarque).
- **Lectura:** al terminar la historia, bajo la rejilla de cartas, la hoja a todo el ancho; tocarla la abre ampliada y desplazable (pellizcar o arrastrar).
- **EPUB:** página propia por hoja (salto de página, imagen a ancho completo). **PDF:** página apaisada (595×420) por hoja, imagen ajustada y título; el número de página se centra según la página. **FB2:** imagen tras la carta.
- Prueba: tests/t75_sheet.js con la hoja real de Diroka (EPUB XML ok; PDF revisado). Aviso de almacenamiento: las imágenes van dentro del mismo almacén (localStorage) que el resto; cada hoja pesa ~0,4 MB, por eso solo caben unas pocas por historia. Si `save()` falla, se revierte y se avisa. Recomendación para v0.11 (Codex): mover imágenes de portada, escenas y hojas a IndexedDB/archivos y guardar solo referencias.

## Conexión con Gemini más fiable (shim.js)
- Tiempo máximo por petición (70 s; 25 s en la comprobación) para que nunca se quede colgada.
- Reintentos automáticos: fallos de red (1,5 s y 4 s), errores 500/503 y límite 429 (6 s y 15 s). Tras un segundo tiempo agotado no se insiste.
- Comprobación ligera con `countTokens` (no gasta cuota de texto). Se repite sola al volver la conexión o al volver a abrir la app.
- Mensajes más claros (sin internet / clave no válida / límite alcanzado) y el indicador de estado, al tocarlo, reintenta.
- Probado solo con un puente Native falso (test t76); NO probado con Gemini real ni en móvil.

## Menú de ajustes
- Botones del menú lateral: texto centrado, se ajusta a varias líneas y el botón crece; ya no se sale del cuadro (test t77). Versión mostrada: v0.10.

## Capítulos: los cierra y los empieza el escritor
- Nuevo ajuste por historia (Ajustes de historia): «Los capítulos los cierro y empiezo yo». Con él activado, el Cronista nunca cierra capítulos (ni por longitud) y se le indica que no lo haga. Desactivado, todo funciona como antes.
- Se cierra con el botón «Cerrar el capítulo aquí» (ya existente).
- Tras cerrar aparece el panel «Capítulo N · tú decides cómo empieza»: título opcional + texto, con tres opciones: «Usar mi texto (el Cronista lo mejora)», «Desarrollar mi idea», «Que empiece el Cronista» (flujo normal).
- Al mejorar: el prompt prohíbe cambiar hechos, orden y nombres; los diálogos SÍ se mejoran en naturalidad y coherencia, conservando quién dice qué y la información de cada réplica. Tu texto original se guarda en la escena (`orig`); botón «Ver mi texto original» con comparación y opción de quedarse con el original (y volver a la mejorada).
- La ficha de registro cuenta los comienzos de capítulo escritos o planteados por el autor.
- Test t78 (con IA simulada). No probado con una IA real: falta comprobar si respeta bien el texto del autor.

## Coherencia de diálogos y narración (3 mejoras)
1. **Voz por personaje**: en cada carta de personaje, campos «Voz (cómo habla)» y «Réplicas de ejemplo», con botón «Tomar réplicas de la historia» (busca diálogos con raya atribuidos a ese personaje, sin IA). Al escribir, el prompt incluye la voz y muestras de los personajes que están en escena (hasta 5; si no hay ejemplos manuales, usa réplicas reales ya escritas).
2. **Relaciones entre personajes** (`s.rel`): botón en Lore; el prompt solo incluye las parejas cuyos dos personajes aparecen en las últimas escenas (máx. 8).
3. **«Esto no cuadra»**: botón junto a «Otra versión». El autor describe el fallo; se guarda como regla inamovible («Corrección del autor: …», máx. 20 reglas) y/o se reescribe la última escena con ese aviso. Sin partida RPG o sin «deshacer» disponible, solo guarda la regla.
- Test t79 (IA simulada). No probado con IA real: falta ver si las muestras de voz realmente diferencian a los personajes y si el prompt más largo afecta a IA gratuitas (en modo compacto se reduce a 3 personajes y 1 muestra).

## Memoria visible, pendientes olvidados y «Sorpréndeme»
- **Qué recuerda ahora** (botón junto a «Otra versión»): tiempo, lugar y presentes, personajes en escena (dónde está, ánimo, qué quiere, estado físico), pendientes abiertos y últimos hechos, todo editable. Se puede marcar un hecho como **clavado** (📌: entra siempre en la memoria que recibe la IA) y añadir hechos nuevos clavados.
- **Pendientes olvidados**: se calcula en local (sin IA) cuántas escenas lleva cada pendiente abierto sin mencionarse. A partir de 12 aparece «⚠ lleva N escenas sin mencionarse» en el Atlas y en «Qué recuerda ahora», y el prompt (no en modo compacto) pide retomar uno de forma natural.
- **Sorpréndeme**: pide 3 giros coherentes con la memoria (uno de tono, otro de peligro o revelación); al elegir uno se escribe esa escena. Cuesta 1 consulta extra al pedir los giros.
- **Voz unificada**: la voz del Atlas (`c.voice`) y la de la carta de lore ahora se leen juntas y se escriben a la vez; se eliminó el bloque duplicado «VOZ DE LOS PERSONAJES».
- Test t80 (IA simulada). Sin probar con IA real ni en móvil. La detección de pendientes olvidados es aproximada (compara palabras clave): puede dar falsos avisos.

## Preparar el libro antes de exportar (EPUB y PDF)
- Nuevo botón en «Exportar para leer»: «🛠 Preparar el libro: imágenes, páginas y vista previa».
- Por cada imagen de escena: tamaño (normal / pequeña / ancha / página completa), «la imagen empieza en página nueva», «la escena empieza en página nueva» y «quitar del libro». Se guarda en `s.lay` (por índice de escena) y solo afecta al libro exportado, no a la historia. Las escenas con formato «página» (`il:"p"`) salen ahora a página completa por defecto.
- Apéndice: casillas para elegir qué cartas entran.
- Vista previa del EPUB dentro de la app (iframe aislado, con el mismo CSS del EPUB y líneas rojas en los saltos de página). Es una aproximación: no pagina como un lector real.
- EPUB: clases `.pbk`, `.fpg`, `.sm`, `.wd`. PDF: respeta tamaño, página nueva, página completa y quitar. El PDF no tiene vista previa propia todavía.
- Test t81 (EPUB, PDF 5→7 páginas con los ajustes, UI y vista previa). Sin probar en lectores reales: algunos ignoran saltos de página o tamaños.

## Maquetación para papel (entrega 1)
- **Motor de páginas** (`bookLayout`): calcula todas las páginas del libro (portada, portadilla, capítulos, galería, hojas de personaje) con la métrica real de la letra Times. El PDF se dibuja desde ese modelo, y la vista previa también, así que los saltos de línea y de página coinciden.
- **Tamaños**: bolsillo 11×18 (por defecto), novela 13×20, A5, A6. Márgenes en mm con lado interior (lomo) y exterior distintos, espejados en páginas pares/impares. Letra, interlineado, justificado, sangría, cabecera (título del libro / capítulo) y numeración. Los capítulos empiezan en página impar (se insertan páginas en blanco). Control de líneas viudas y huérfanas.
- Imágenes: respetan los ajustes de «Preparar el libro» (tamaño, página nueva, página completa, quitar).
- **Vista de libro abierto**: 1 o 2 páginas, anterior/siguiente, ir a la página, ver márgenes, enlaces a «Diseño de la página» e «Imágenes y páginas», y exportar PDF. Se abre desde «Preparar el libro» → «📖 Ver como libro de papel».
- Los ajustes se guardan en `s.book`.
- Cambio visible: el PDF por defecto ya no es 420×595 pt sino bolsillo 11×18 cm, con otra paginación.
- Limitaciones: la letra del PDF sigue siendo Times estándar; en pantalla la letra se dibuja con la tipografía del móvil, así que puede verse algo más ancha que en el PDF. No es un PDF validado para imprenta (sin sangrado ni comprobación de resolución). Solo imágenes JPEG. Tests t81 y t82; no probado en móvil real.

## Maquetación para papel (entrega 2)
- **Letra**: 3 estilos con las fuentes estándar de PDF (clásica Times, moderna Helvetica, máquina de escribir Courier). Las medidas son exactas, así que la vista previa y el PDF rompen las líneas igual. NO se ha podido incrustar una letra de novela mejor (EB Garamond): en este entorno no hay acceso a npm ni a las fuentes, y pdf-lib necesita además la librería fontkit. Queda como tarea para Codex (ítem 5aj).
- **Papel**: blanco, crema, sepia o gris claro. **Marco** fino o doble. **Adorno** bajo el título del capítulo (línea, tres puntos, rombo, ninguno) y opción de usarlo entre escenas. **Letra capital** de 2 líneas al empezar cada capítulo (solo si el párrafo tiene 3+ líneas).
- **Imagen de fondo** (JPG/PNG reducida a 800×1100 y guardada en `s.book.bg`) con intensidad y alcance (todas las páginas o solo portadilla y apertura de capítulo).
- **Pies de foto** por imagen (PDF y EPUB) y opción «poner la imagen antes del texto de la escena» (PDF y EPUB).
- **Tocar una imagen en la vista de libro** abre un panel: tamaño, pasar a página nueva, antes del texto, escena en página nueva, pie de foto y quitar; al volver, la vista se recalcula.
- Tests t82 y t83. Sin probar en móvil real. El fondo con opacidad usa `opacity` de pdf-lib; comprobar que el lector de PDF lo respeta.

## Usabilidad: menú «Más» e índice con buscador
- La barra bajo cada escena deja visibles Deshacer último turno, Otra versión y Sorpréndeme, y un botón «⋯ Más» que abre un panel agrupado: Corregir y recordar (Esto no cuadra, Qué recuerda ahora), Moverme por la historia (Índice y buscador, Anteriormente… resumen, Revisar el libro) y Sacar el libro (Exportar). Los ids y funciones de los botones no cambian; el panel se cierra al elegir una opción.
- **Índice y buscador**: capítulos (con título y nº de escenas), escenas marcadas y búsqueda de texto sin distinguir mayúsculas ni tildes, también dentro de tus acciones. Al tocar un resultado se cargan las escenas anteriores si hace falta, se salta a esa escena y se resalta un momento.
- «Anteriormente…»: ya existía (se abre sola al volver tras 6 h con 6+ escenas; antes «Lo escrito hasta ahora»). Solo se renombró en el menú.
- Test t84. Sin probar en móvil real.

## Espacio y almacenamiento
- Nuevo botón del menú lateral «Espacio y almacenamiento»: muestra cuánto ocupa cada historia y sus imágenes, y el tamaño de las copias de seguridad internas.
- «Reducir el peso de sus imágenes»: recomprime a máx. 1280 px (calidad 0,8) solo las imágenes grandes, y solo si ahorra más del 10 %. Hace antes una versión de seguridad.
- «Conservar solo las 3 últimas versiones» y «Borrar imágenes sin usar».
- Las copias internas (IndexedDB `hv-safe`, ahora v2) guardan cada imagen una sola vez (almacén `img`); las versiones antiguas siguen leyéndose.
- No se ha movido el almacenamiento principal ni las copias de seguridad exportadas (riesgo de arranque asíncrono; copia nativa sin verificar). Probado solo en navegador de escritorio, no en un móvil real.

## Volver a una escena anterior
- Cada escena nueva guarda cómo estaba la historia justo antes (memoria, estado, opciones, personajes…), solo las últimas 40.
- «⋯ Más → ↩ Volver a una escena»: lista esas escenas; al elegir una, se quitan las siguientes y la historia continúa desde ahí. Antes se crea una versión de seguridad en «Versiones».
- Las escenas antiguas (anteriores a esta versión) no tienen ese dato y no aparecen en la lista.

## Plantillas de inicio
- En «Crear historia», botón «📚 Plantillas»: 8 puntos de partida (faro misterioso, nave a la deriva, heredera sin corona, novela negra, romance de pueblo, postapocalíptico, café mágico, espionaje histórico). Rellenan idea, géneros y normas del mundo; todo se puede editar. Contenido apto, sin escenas explícitas.

## Tutorial y ayuda
- Botón «?» en la cabecera: abre la guía de la pantalla actual (Inicio, Crear, Jugar, Personajes).
- «Ajustes» → «Tutorial y ayuda»: tutorial de 8 pasos (Anterior/Siguiente) y «Guía de pantallas» con cada botón explicado (Inicio, Crear, Jugar, ⋯ Más, Personajes, Ajustes).
- El modo leer ya existía («📖 Leer como un libro»); se explica en la guía.
- Corregido el texto «menú ☰» (ese botón está oculto): ahora dice «Ajustes».
- Aviso: si se añaden botones nuevos hay que añadirlos a `GUIDE` en index.html.

## Pulido final (calidad de impresión, confirmaciones, copias, ayuda)
- **Imágenes para imprimir:** al importar, las imágenes se guardan con más resolución (portada hasta 1500×2250, escenas hasta 1800×2400, calidad 0,88). El PDF incrusta los JPEG tal cual y el EPUB los copia byte a byte: no se recomprime al exportar.
- «Reducir imágenes» solo toca imágenes de más de 2400 px y mantiene calidad de imprenta (0,88).
- La vista previa del libro avisa de las imágenes por debajo de 200 ppp (poca resolución en papel) o confirma que todas valen.
- **Confirmaciones propias:** `confirm()` sustituido por una hoja propia (`askYes`), porque el WebView puede ignorarlo.
- **Copias de seguridad v3:** cada imagen una sola vez, sin pérdida; las copias antiguas (v2) se siguen leyendo; una copia incompleta se rechaza sin tocar nada.
- Hash de imágenes con todos los caracteres y comprobación de colisión.
- Guía ampliada (modos «Idea/Mi personaje hace», tono, primera historia, importar, novedades) y botón «Ver el tutorial» en la bienvenida.
- Prueba automática `t93_guide`: falla si hay un botón sin explicar en la guía.
- Aviso en «Volver a una escena» cuando hay escenas antiguas no disponibles.
- `tests/run_all.sh` ejecuta todas las pruebas. `PRUEBAS_EN_MOVIL.md`: lista de 12 comprobaciones para el móvil.

## Maquetación (v0.11): pantalla «🎨 Maquetación», fuentes incrustadas y sílabas
**Dónde se abre:** ⋯ Más → «🎨 Maquetación del libro»; la lista de exportar (entre «Pulir el texto» y los formatos, así va después de la revisión del texto); ☰ Menú de la historia; y desde «Preparar el libro».
**Pantalla:** vista previa en vivo (primera página de un capítulo + una página normal, con el texto real de la novela; se recalcula 0,3 s después de cada cambio y muestra «Preparando la vista previa…»), 4 plantillas (Clásico, Moderno, Bolsillo, Lectura cómoda), tipo de letra, tamaño (deslizador 8–14 pt), interlineado (deslizador), tamaño de página (Bolsillo 11×17, A5, 6×9 pulgadas, A4), márgenes (deslizador + ajuste fino; mínimos de imprenta: 10 mm fuera, 12 mm lomo/arriba/abajo), alineación (justificado con sílabas / sin sílabas / izquierda), sangría, «Capítulo N», letra capital, capítulo en página nueva (y en impar), adorno, separador entre escenas (* * *, ⁂, línea, rombo, espacio), cabecera (ambas / novela / capítulo / ninguna), números de página, portada, y «?» con una explicación corta de cada opción. «Usar como predeterminada» guarda la maquetación para novelas nuevas (`localStorage hv:bookdef`); cada novela recuerda la suya en `s.book`.
**PDF:** texto vectorial con fuente TrueType **incrustada** (Crimson Pro, Lora, IBM Plex Serif, Liberation Serif; SIL OFL 1.1, sin modificar). Lector TrueType propio (`HVTTF`, sin fontkit): Type0/CIDFontType2, Identity-H, ToUnicode (el texto se puede copiar y buscar), anchos exactos. Las imágenes siguen incrustándose sin recomprimir. La vista previa avisa de portada < 300 ppp e imágenes < 200 ppp.
**Sílabas:** separación silábica española (`esSyl`) en el PDF y la vista previa (máx. 2 guiones seguidos, mínimo 2 letras a cada lado, palabras de 5+ letras). En el EPUB se activa `hyphens:auto` (depende del lector).
**EPUB:** incrusta la fuente elegida (`fonts/*.ttf`), estilos de capítulo, letra capital, separadores y alineación. El EPUB conserva siempre su portada (los lectores la usan como miniatura). FB2 no cambia.
**Licencias:** «Ajustes → Licencias de terceros» (textos en `licencias.js`, cargado a demanda) y `licencias/*.txt`.
**Ayuda:** nuevo paso del tutorial y apartado «Maquetación» en la guía.
**Cambio de comportamiento importante:** la galería de personajes/lore solo entra en PDF/EPUB/FB2 si la marcas tú en «Preparar el libro» (antes entraba sola si la carta tenía imagen). Así las exportaciones llevan solo el texto de la novela.
**Pendiente / límites:** las fuentes se incrustan completas (PDF 0,2–0,7 MB más); no hay kerning ni ligaduras; EB Garamond, Literata y Merriweather no se incluyeron (sin internet en la sesión): añadirlas es copiar el `.ttf` y su licencia (ver LICENCIAS_TERCEROS.md). Nada probado en móvil real ni con EPUBCheck.

## Ajustes más cómodos y botón «Crear nuevo» en horizontal
- El menú de Ajustes (`.dnav`) se desplaza arriba y abajo; los botones ya no se encogen (`flex:0 0 auto`), miden mínimo 52 px y tienen más separación. En horizontal el menú es más ancho (60 %).
- En horizontal (alto ≤ 520 px) el botón «+ Crear nuevo» se centra y queda siempre por encima de la barra de navegación (antes se metía por la derecha). Prueba: `t97_drawer_land`.

## Vista previa de maquetación con letra grande del sistema
En el móvil el texto de la vista previa salía más grande que su hueco y se montaba. Ahora la app mide cuánto amplía Android el texto y lo compensa (`hvTextZoom`). Codex: si hay `setTextZoom` o similar en el WebView, conviene fijarlo en 100 (ver prompt 5as).

## Animaciones
- Las hojas (Ajustes, Maquetación, etc.) suben con un deslizamiento suave y el fondo aparece con un fundido.
- Dado del modo RPG: al elegir una acción se ve un dado que gira y se detiene en el número, con color (verde éxito, naranja éxito con coste, rojo fallo, dorado crítico) y sacudida en fallo. La línea de la tirada en la escena aparece con un pequeño rebote.
- La escritura progresiva ya existía (Ajustes → Lectura). Nuevo: casilla «Reducir movimiento», que apaga animaciones, efectos de fondo y el dado; también se respeta el ajuste de accesibilidad del sistema.

## Secretos de la historia
En Lore del universo hay un apartado nuevo «Secretos de la historia»: el autor escribe lo que El Cronista debe saber pero no contar (quién lo sabe, desde qué capítulo puede salir a la luz). Se envía a la IA como secreto oculto con reglas de no revelar; si una escena nueva lo desvela, el validador local lo detecta y pide reescribirla. Los secretos no salen en las exportaciones. El conocimiento por personaje (sabe/cree/sospecha/rumor/mentira/secreto) ya existía.

## Lore sin límite y con discreción
- Lore del universo: ahora se puede cargar un archivo (PDF, Word o texto) además de pegar; sin límite de extensión. Los bloques largos se dividen en ideas de tamaño manejable (antes un bloque sin saltos se quedaba en una sola idea y se recortaba).
- Cada idea es «discreta» por defecto (solo asoma de forma muy sutil en un diálogo o detalle) o «libre» (puede contarse con claridad), con botón para cambiarlo.
- Reglas nuevas para la IA: usar solo lo imprescindible para la escena, no adelantar nada y ofrecer el lore extra como una opción; solo si eliges esa opción se desarrolla.

## Menos repetición entre escenas
Antes solo se detectaban frases idénticas de 4+ palabras. Ahora, además: (1) frases de diálogo repetidas de las últimas 4 escenas, (2) frases narrativas casi iguales a las de las 2 escenas anteriores (mismos objetos y gestos con otras palabras), y (3) el prompt incluye los diálogos recientes con la orden de no repetirlos ni su sentido. Si se detecta, la escena se reescribe una vez automáticamente.

## Más lore y cartas importadas
- «Añadir más material del autor» en Ajustes de la historia: se pueden sumar archivos (varios a la vez) o texto pegado cuantas veces se quiera, también en historias que no se crearon con material (antes solo se podía al crear).
- Lore del universo: se pueden cargar varios archivos seguidos (antes el selector no volvía a funcionar con el mismo archivo).
- Nuevo «Importar cartas (archivo o texto)» en Cartas de lore: pegas o cargas un archivo, eliges cómo se separan (detectar solo, línea en blanco, una por línea, línea ---, # Título, separador propio) y ves cuántas cartas encuentra antes de importar. Reconoce «Nombre: descripción», «Lugar: Nombre. Descripción» y campos Tipo/Nombre/Descripción. Salta las que ya existen (máx. 300).
- Las cartas que entran en el prompt (máx. 30) ahora se eligen por relevancia: protagonistas, usadas y las mencionadas en la acción actual.

## «Leer como un libro» al final
Junto a «Opciones de la escena» de la última escena hay ahora un botón «📖 Leer como un libro», para no volver al principio de la pantalla. El de arriba sigue donde estaba.

## Revisar esta escena
Nuevo botón «Revisar esta escena» en las opciones de cada escena (junto a «Editar texto»), pensado para usarlo después de retocar el texto a mano. Dos niveles:
- Sin gastar consultas, en el móvil: ortografía con el diccionario (tildes que faltan, palabras dudosas), espacios de más o que faltan, mayúscula tras punto, «¿ ?» y «¡ !» sin pareja, comillas « » sin cerrar, rayas de diálogo, tres puntos, palabras repetidas, «de el»→«del», «a el»→«al».
- Con una consulta, a petición: «Revisión gramatical con El Cronista» (concordancia, formas verbales, sintaxis, puntuación). Cada propuesta se comprueba (el fragmento debe existir y el cambio ser pequeño) y tú decides: Aplicar o Ignorar. Se guarda el texto original (t0) como en las demás revisiones.
No cambia estilo ni nombres propios. En modo manual no hay revisión gramatical con IA.

## Escena larga (3-4 folios)
Debajo del cuadro «¿Qué ocurre ahora?» hay una casilla «Escena larga (3 o 4 folios): que desarrolle todo lo que he escrito». Se marca sola si el texto pasa de ~1.500 caracteres. Con ella:
- El Cronista escribe de 1.500 a 2.000 palabras, desarrollando TODO tu texto en orden, sin resumir ni saltarse nada, y sin cerrar la historia por su cuenta.
- Se amplía el límite de respuesta de la IA solo para esa escena (shim.js: Gemini 9.000, Anthropic 8.000, resto 6.500 tokens; antes 6.000/4.096/2.600).
- La casilla se desmarca tras usarla; si regeneras la escena, se mantiene la longitud larga.
Aviso: gasta una consulta como las demás, pero la respuesta tarda más y los modelos gratuitos con límite de tokens pueden fallar con escenas tan largas.

## Borrar y reescribir una escena
Cada escena (salvo la primera) tiene un botón «Borrar y reescribir». Borra esa escena (y las posteriores, avisando de cuántas) y El Cronista la escribe de nuevo entera a partir de la misma acción, sin dejar ninguna versión paralela ni comparación. Se puede indicar qué no gustó. La versión borrada queda en «Versiones» como copia de seguridad. «Otra versión» sigue existiendo para quien quiera comparar dos versiones.

**v0.10.1 — Modo viñetas y modo claro**
- Aventuras RPG: las escenas se muestran como viñetas de cómic (narración en cajas, diálogos en bocadillos con la cara del personaje). Es solo presentación: no usa IA, no cambia el texto guardado ni las exportaciones. Botón «Viñetas / Texto» por historia.
- Cara de personaje: se toca el círculo y se elige una imagen; se guarda en su carta de lore (solo en el dispositivo). Sin imagen se muestra la inicial.
- El hablante se deduce del inciso («—dijo Sora—»), de la frase anterior acabada en dos puntos o por alternancia; si no se puede saber, el bocadillo sale sin nombre.
- Sello con el dado y el resultado en la primera viñeta de cada escena con tirada.
- Salud, segundo recurso y créditos visibles junto a las acciones; opciones con franja de color según el riesgo.
- Modo claro: los textos sueltos sobre el fondo (Tono, Escena larga, sugerencias, títulos) ya son legibles.
- Prueba nueva: tests/t108_vinetas.js.

**v0.10.2 — Pantalla de juego más limpia y meta de escritura**
- Los botones de lectura van en una sola fila deslizable; «Menú» y «Consultas» comparten línea. El texto empieza antes.
- Las opciones de cada escena son un «⋯» discreto (mismas funciones) y la acción plegada es una línea fina.
- «Tono y longitud (opcional)» recoge los tonos y la casilla de escena larga; el título muestra lo elegido.
- RPG: las acciones con dado van antes del cuadro de escritura.
- Viñetas: imagen de la escena como fondo de la primera viñeta; color según el tono (se guarda en la escena como `tn`).
- Meta de escritura en Inicio: palabras nuevas de hoy, meta diaria y racha. Se guarda en `hv:goal` (solo en el dispositivo, no va en las copias).
- Modo claro: títulos de las portadas legibles; colores de riesgo visibles.
- Prueba nueva: tests/t109_limpia.js.
