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
