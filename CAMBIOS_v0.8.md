# Historias vivas v0.8 — cambios (parte web, lo que ya está hecho)

## Conexión de la IA (lo que más preocupaba)
- Asistente paso a paso para conseguir la clave de Gemini (también OpenAI y Anthropic): elegir, 3 pasos guiados, pegar (detecta la clave copiada), probar y confirmar.
- Pantalla "Comparar IAs y costes": precio real por 100 escenas y por novela de 200 escenas (precios revisados el 24-oct-2026, con aviso de que pueden cambiar).
- Mensajes de error claros (límite gratuito, clave mala, modelo no disponible) y alternativa "copiar y pegar" sin clave.
- Modelo por defecto: gemini-3.5-flash-lite.

## Memoria para novelas largas
- Resúmenes por capítulo (cada 5 escenas) y por acto (cada 50) + presupuesto de contexto.
- Prueba de 200 escenas: los 4 pendientes abiertos, los 5 secretos de Marta y el suceso antiguo se recuperan; prompt ≈ 5k tokens; almacenamiento ≈ 173 KB.

## Nuevo
- Lector crítico opcional por capítulo (avisos de continuidad que se inyectan en las siguientes escenas).
- Mi estilo (párrafo propio) y voz por personaje.
- Atlas: pestañas Relaciones (grafo) y Estadísticas.
- Marcador de lectura, "Ir al final", render por ventana (rápido con novelas largas).
- Compartir escena como imagen (PNG).
- Alto contraste.
- Arreglos: barra inferior (altura), teclado oculta barra/botón flotante, botón de bienvenida.

## Pendiente para Codex (código nativo)
Copia en Drive (SAF y drive.appdata), añadir hosts a openUrl (ai.google.dev, accounts.google.com…), TTS en primer plano, widget. Ver PROMPT_CODEX_v0.8.md.
Las imágenes (assets/art) no se han tocado. No compilado por mí: compilar con Codex/GitHub Actions.

## Pruebas (carpeta tests/, Playwright)
asistente IA, memoria 200 escenas, funciones v0.8, puente nativo simulado: todas sin errores.

## Ronda 2 (memoria y primera impresión)
- Si la IA no devuelve la memoria de una escena, se detecta y se repara con una consulta corta aparte (Atlas → Estadísticas muestra la "salud de la memoria" y "Reparar ahora").
- Nombres: "la Marta" y "Marta" ya no crean dos personajes; alias y botón "Fusionar" en cada ficha; la IA recibe la lista de nombres ya usados.
- Historial de relaciones por personaje.
- Pestaña Reglas: datos inamovibles que se envían siempre a la IA; "Fijar como regla" desde Mundo.
- Fichas editables: personajes, objetos, mundo y pendientes (cerrar/reabrir/borrar).
- Historia de ejemplo "El faro que no se enciende" legible sin IA ("Probar sin IA" en la bienvenida).
- Novedades y Enviar sugerencia (el correo de destino se configura en shim.js: window.hvSupport.email).
- Informe de prueba (Atlas → Estadísticas → Copiar informe de prueba): JSON fallidos, memoria sin registrar, errores y tiempos.
