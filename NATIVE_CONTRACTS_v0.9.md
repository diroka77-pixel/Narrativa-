# Contratos nativos v0.9

## Copia SAF (asíncrona)

La web crea un identificador y el nativo responde con `window.__backupDone(id, payload)`.

- `Native.backupChooseFolder(id)` → `{ok, name, error?}`
- `Native.backupStatus(id)` → `{folder, last, error, keep:5}`
- `Native.backupWrite(id, json)` → `{ok, name, error}`
- `Native.backupList(id)` → `[{name,size,modified}]`
- `Native.backupRead(id, name)` → texto JSON
- `Native.backupClear(id)` → `{ok:true}`

Solo se aceptan archivos con prefijo `historias-vivas-copia-` y sufijo `.json`. El nativo no lee claves ni preferencias secretas.

## Uso local de IA (síncrono)

- `Native.usageGet()` → `{date, model, count, counts}`
- `Native.usageAdd(model)` → el mismo objeto después de incrementar.

El cambio de día usa `America/Los_Angeles`. `Native.http` suma una petición exitosa automáticamente. La interfaz de aviso al 80 % queda pendiente porque `AI_INFO` no contiene límites diarios fiables y estos dependen del modelo/cuenta; no se inventa una cifra.

## Red y cola

- `Native.online()` → booleano basado en una red con capacidad `VALIDATED`.
- Android llama `window.__onlineChanged(boolean)` al cambiar la conectividad.
- La web guarda una única acción pendiente en `hv:offline:v1`. Al volver la red pide confirmación y nunca reenvía sola.

## Lectura en segundo plano

- `Native.speakQueue(arrayJson)`: inicia una cola de `{text,rate}`.
- `Native.speakState()` → `{status:"playing|paused|stopped",index,total}`.
- `Native.speakAction("toggle|next|stop")`.
- `Native.speak` y `Native.stopSpeak` siguen disponibles para compatibilidad.

## Widget

El widget abre `MainActivity` con el extra `story_id`. La web recibe el ID en `window.hvOpenStory(id)`.
