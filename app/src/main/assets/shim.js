/* Puente de la APK: da a la página lo que en claude.ai da la plataforma
   (almacenamiento, IA, descargas, voz). Solo actúa si existe window.Native. */
(function () {
  var N = window.Native;
  if (!N) return;

  /* ---------- Almacenamiento en ficheros del móvil (sin límite de 5 MB) ---------- */
  var S = {};
  try { S = JSON.parse(N.storeLoadAll() || "{}") || {}; } catch (e) { S = {}; }
  try {   // migración: datos que la versión anterior guardó en el almacenamiento del navegador
    var real = window.localStorage;
    for (var i = 0; i < real.length; i++) {
      var k0 = real.key(i);
      if (/^(narrador:|hv:)/.test(k0) && !(k0 in S)) { S[k0] = real.getItem(k0); N.storeSet(k0, S[k0]); }
    }
  } catch (e) {}
  var store = {
    getItem: function (k) { k = String(k); return Object.prototype.hasOwnProperty.call(S, k) ? S[k] : null; },
    setItem: function (k, v) { k = String(k); S[k] = String(v); N.storeSet(k, S[k]); },
    removeItem: function (k) { k = String(k); delete S[k]; N.storeRemove(k); },
    clear: function () { Object.keys(S).forEach(function (k) { N.storeRemove(k); }); S = {}; },
    key: function (i) { return Object.keys(S)[i] || null; }
  };
  Object.defineProperty(store, "length", { get: function () { return Object.keys(S).length; } });
  try { Object.defineProperty(window, "localStorage", { value: store, configurable: true }); } catch (e) {}

  /* ---------- Ajustes de IA (las claves van cifradas en el Keystore de Android) ---------- */
  var KEY = "hv:ai:v1";
  var GEM_MODELS = [
    ["gemini-3.5-flash-lite", "Gemini 3.5 Flash-Lite (gratuito, recomendado)"],
    ["gemini-3.1-flash-lite", "Gemini 3.1 Flash-Lite (gratuito, alternativa)"],
    ["gemini-3.6-flash", "Gemini 3.6 Flash (mejor redacción, si tu cuenta lo ofrece)"],
    ["gemini-2.5-flash", "Gemini 2.5 Flash (antiguo; puede no estar disponible)"]
  ];
  var PROV = {
    manual: { name: "Copiar y pegar", sub: "Funciona con cualquier IA" },
    gemini: { name: "Gemini", sub: "Recomendado · clave de API", model: "gemini-3.5-flash-lite", url: "https://aistudio.google.com/apikey" },
    openai: { name: "ChatGPT / OpenAI", sub: "Clave de API (de pago)", model: "gpt-6-luna", url: "https://platform.openai.com/api-keys" },
    anthropic: { name: "Claude / Anthropic", sub: "Clave de API", model: "claude-haiku-5-5", url: "https://console.anthropic.com/settings/keys" }
  };
  var KEYS = {};
  ["gemini", "openai", "anthropic"].forEach(function (k) { try { KEYS[k] = N.secretGet("key_" + k) || ""; } catch (e) { KEYS[k] = ""; } });
  function cfg() {
    var c = null;
    try { c = JSON.parse(store.getItem(KEY) || "null"); } catch (e) {}
    c = c || { mode: "", models: {} };
    if (c.keys) {   // migrar claves antiguas en texto plano al almacén cifrado
      Object.keys(c.keys).forEach(function (k) { if (c.keys[k] && !KEYS[k]) { KEYS[k] = c.keys[k]; N.secretSet("key_" + k, KEYS[k]); } });
      delete c.keys; store.setItem(KEY, JSON.stringify(c));
    }
    c.models = c.models || {};
    if (c.models.gemini === "gemini-flash-latest") c.models.gemini = PROV.gemini.model;   // modelo antiguo que no funciona
    c.keys = KEYS;
    return c;
  }
  function saveCfg(c) {
    ["gemini", "openai", "anthropic"].forEach(function (k) { if (c.keys && k in c.keys) { KEYS[k] = c.keys[k] || ""; N.secretSet("key_" + k, KEYS[k]); } });
    store.setItem(KEY, JSON.stringify({ mode: c.mode, models: c.models || {} }));
  }

  var css = document.createElement("style");
  css.textContent = "#hvai{position:fixed;inset:0;z-index:60;background:rgba(2,5,12,.82);display:flex;align-items:flex-end;padding-top:env(safe-area-inset-top,0px)}" +
    "#hvai .hv-sheet{display:block!important;width:100%;max-width:36rem;margin:0 auto;background:rgba(10,14,24,.98);color:var(--ink,#fff);border:1px solid rgba(255,255,255,.14);border-radius:24px 24px 0 0;padding:1rem 1rem calc(1rem + env(safe-area-inset-bottom,0px));max-height:92vh;overflow-x:hidden;overflow-y:auto;box-shadow:0 -18px 50px rgba(0,0,0,.45)}" +
    "#hvai .hv-head{display:flex;align-items:center;gap:.7rem;margin-bottom:.25rem}" +
    "#hvai .hv-head h2{flex:1;margin:0;font-size:1.55rem}" +
    "#hvai .hv-close{width:44px;min-width:44px;height:44px;min-height:44px;padding:0;text-align:center;border-radius:50%;font-size:1.5rem}" +
    "#hvai .hv-intro{margin:.2rem 0 1rem;color:var(--mute,#aaa);font-size:.9rem;line-height:1.45}" +
    "#hvai label.o{display:block!important;width:100%;min-width:0;border:1.5px solid rgba(255,255,255,.14);border-radius:16px;padding:.8rem .85rem;margin:.65rem 0;background:rgba(255,255,255,.035);overflow:hidden}" +
    "#hvai label.o.on{border-color:var(--acc,#b45f06);box-shadow:inset 0 0 0 1px var(--acc,#b45f06);background:rgba(255,255,255,.065)}" +
    "#hvai .hv-choice{display:flex;align-items:center;gap:.65rem;line-height:1.2;white-space:normal}" +
    "#hvai .hv-choice strong{display:block;font-size:1rem;overflow-wrap:anywhere}" +
    "#hvai .hv-choice small{display:block;color:var(--mute,#aaa);font-size:.8rem;margin-top:.2rem}" +
    "#hvai input[type=radio]{width:20px!important;height:20px!important;min-width:20px;display:block;margin:0;accent-color:var(--acc,#b45f06)}" +
    "#hvai .hv-detail{display:block;width:100%;min-width:0;padding-top:.7rem}" +
    "#hvai input[type=text],#hvai input[type=password],#hvai textarea,#hvai select{display:block;width:100%!important;max-width:100%;margin-top:.55rem;font:inherit;font-size:.92rem;padding:.72rem .75rem;border-radius:11px;border:1.5px solid var(--line,#ccc);background:#080d18;color:var(--ink,#fff)}" +
    "#hvai textarea{min-height:9rem}" +
    "#hvai .r{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-top:.7rem}" +
    "#hvai .r button{width:100%;min-width:0;text-align:center;padding:.65rem .45rem;font-size:.88rem}" +
    "#hvai .hv-save{position:sticky;bottom:-1rem;padding-top:.8rem;background:linear-gradient(180deg,transparent 0,rgba(10,14,24,.98) 25%)}" +
    "@media(max-width:390px){#hvai .r{grid-template-columns:1fr}#hvai .hv-sheet{padding-left:.8rem;padding-right:.8rem}}";
  document.head.appendChild(css);

  function overlay(title) {
    var o = document.getElementById("hvai");
    if (o) o.remove();
    o = document.createElement("div"); o.id = "hvai"; o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true"); if (title) o.setAttribute("aria-label", title);
    var sh = document.createElement("div"); sh.className = "hv-sheet"; o.appendChild(sh);
    document.body.appendChild(o);
    return { o: o, sh: sh };
  }
  function mk(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }

  function openSettings() {
    return new Promise(function (resolve) {
      var c = cfg(), v = overlay("Conecta tu IA"), sh = v.sh;
      var head = mk("div", "hv-head"), title = mk("h2", null, "Conecta tu IA"), close = mk("button", "hv-close", "×");
      close.setAttribute("aria-label", "Cerrar"); close.onclick = function () { v.o.remove(); resolve(false); };
      head.appendChild(title); head.appendChild(close); sh.appendChild(head);
      sh.appendChild(mk("p", "hv-intro", "Elige un servicio. Para Gemini solo necesitas pegar tu clave una vez; queda cifrada en este móvil."));
      var wr = mk("div", "r"), w1 = mk("button", null, "Asistente paso a paso"), w2 = mk("button", null, "Comparar IAs y costes");
      w1.onclick = function () { v.o.remove(); resolve(false); wiz({}); }; w2.onclick = function () { v.o.remove(); resolve(false); wiz({ start: "compare" }); };
      wr.appendChild(w1); wr.appendChild(w2); sh.appendChild(wr);
      var sel = c.mode || "manual", boxes = {};
      ["gemini", "manual", "openai", "anthropic"].forEach(function (k) {
        var l = mk("label", "o" + (sel === k ? " on" : "")), r = document.createElement("input");
        r.type = "radio"; r.name = "hvm"; r.checked = sel === k;
        var choice = mk("div", "hv-choice"), tx = mk("span"); tx.appendChild(mk("strong", null, PROV[k].name)); tx.appendChild(mk("small", null, PROV[k].sub || ""));
        choice.appendChild(r); choice.appendChild(tx); l.appendChild(choice);
        var d = mk("div", "hv-detail"); d.hidden = sel !== k; boxes[k] = d;
        if (k === "manual") {
          d.appendChild(mk("p", "hint", "La app te da el texto, lo pegas en tu IA (ChatGPT, Gemini, Claude…, gratis o de pago) y pegas aquí su respuesta. Sirve con cualquier IA, pero en una novela larga son muchos pasos: con clave de Gemini es mucho más cómodo."));
        } else {
          var ki = document.createElement("input"); ki.type = "password"; ki.placeholder = "Pega aquí tu clave de API"; ki.value = KEYS[k] || ""; ki.id = "hvk_" + k; ki.setAttribute("aria-label", "Clave de API");
          var mi;
          if (k === "gemini") {
            mi = document.createElement("select"); mi.id = "hvmo_gemini"; mi.setAttribute("aria-label", "Modelo de Gemini");
            var cur = (c.models.gemini || PROV.gemini.model), known = false;
            GEM_MODELS.forEach(function (m) { var o = document.createElement("option"); o.value = m[0]; o.textContent = m[1]; if (m[0] === cur) { o.selected = true; known = true; } mi.appendChild(o); });
            if (!known) { var o2 = document.createElement("option"); o2.value = cur; o2.textContent = cur + " (personalizado)"; o2.selected = true; mi.appendChild(o2); }
            d.appendChild(mk("p", "hint", "Cómo conseguir tu clave de Gemini: 1) Pulsa «Abrir Google AI Studio» e inicia sesión con tu cuenta de Google. 2) Pulsa «Create API key» (crear clave). 3) Copia la clave. 4) Vuelve aquí y pulsa «Pegar clave». Con el modelo Flash-Lite el uso es gratuito dentro de los límites de Google, que pueden cambiar. Usa una clave de un proyecto sin facturación para no tener cargos."));
          } else {
            mi = document.createElement("input"); mi.type = "text"; mi.placeholder = "Modelo"; mi.value = c.models[k] || PROV[k].model; mi.id = "hvmo_" + k; mi.setAttribute("aria-label", "Modelo");
            d.appendChild(mk("p", "hint", "Crea tu clave en " + PROV[k].url + ", cópiala y pulsa «Pegar clave». La clave de API es distinta de la suscripción de chat y puede tener coste o límites propios."));
          }
          var ob = mk("button", null, "Abrir " + (k === "gemini" ? "Google AI Studio" : "la página de claves"));
          ob.onclick = function (e) { e.preventDefault(); N.openUrl(PROV[k].url); };
          var pb = mk("button", null, "Pegar clave");
          pb.onclick = function (e) { e.preventDefault(); var t = N.paste().trim(); if (t) ki.value = t; else N.toast("No hay nada copiado."); };
          var tb = mk("button", null, "Probar conexión");
          tb.onclick = async function (e) {
            e.preventDefault();
            var tc = { mode: k, keys: {}, models: {} }; tc.keys[k] = ki.value.trim(); tc.models[k] = mi.value.trim();
            if (!tc.keys[k]) { N.toast("Falta la clave."); return; }
            tb.textContent = "Probando…";
            try {
              var f = k === "gemini" ? viaGemini : k === "openai" ? viaOpenAI : viaAnthropic;
              await f("Responde solo con la palabra: listo", tc);
              N.toast("Conexión correcta.");
            } catch (er) { N.toast((er && er.message) || "No se pudo conectar."); }
            tb.textContent = "Probar conexión";
          };
          d.appendChild(ki);
          var br = mk("div", "r"); br.appendChild(ob); br.appendChild(pb); br.appendChild(tb);
          d.appendChild(br);
          d.appendChild(mi);
          var dc = mk("button", null, "Borrar la clave de este móvil"); dc.style.marginTop = ".6rem";
          dc.onclick = function (e) { e.preventDefault(); ki.value = ""; KEYS[k] = ""; N.secretSet("key_" + k, ""); N.toast("Clave borrada."); setStatus("none"); };
          d.appendChild(dc);
        }
        l.appendChild(d); sh.appendChild(l);
        r.onchange = function () {
          sel = k;
          Object.keys(boxes).forEach(function (z) { boxes[z].hidden = z !== k; boxes[z].parentNode.className = "o" + (z === k ? " on" : ""); });
        };
      });
      var row = mk("div", "r hv-save"), ok = mk("button", "go", "Guardar y conectar"), no = mk("button", null, "Cancelar");
      ok.onclick = function () {
        var n = { mode: sel, keys: {}, models: c.models || {} };
        ["gemini", "openai", "anthropic"].forEach(function (k) {
          var ki = document.getElementById("hvk_" + k), mi = document.getElementById("hvmo_" + k);
          n.keys[k] = ki ? ki.value.trim() : (KEYS[k] || "");
          if (mi) n.models[k] = mi.value.trim();
        });
        if (n.mode !== "manual" && !n.keys[n.mode]) { N.toast("Falta la clave de API."); return; }
        saveCfg(n); v.o.remove(); paintStatus(); resolve(true);
        checkNow().then(function (okc) { N.toast(n.mode === "manual" ? "Modo copiar y pegar activado." : okc ? "Conectada correctamente." : "No se pudo conectar. Revisa la clave."); });
      };
      no.onclick = function () { v.o.remove(); resolve(false); };
      row.appendChild(ok); row.appendChild(no); sh.appendChild(row);
    });
  }
  window.openAISettings = openSettings;
  window.hvIsManual = function () { return cfg().mode === "manual"; };
  /* ---------- Asistente de conexión paso a paso ---------- */
  var AI_INFO = {
    checked: "24 de octubre de 2026",
    avgIn: 5500, avgOut: 1500,   // tokens medios por escena (estimación; el contexto real crece con la memoria)
    items: [
      { prov: "gemini", model: "gemini-3.5-flash-lite", name: "Gemini 3.5 Flash-Lite", free: true, inP: 0.30, outP: 2.50, quality: "Buena", speed: "Muy rápida", best: true,
        note: "Gratis y sin tarjeta, con límites por minuto y por día que Google muestra en AI Studio (varían según el proyecto). En el plan gratuito Google puede usar tus textos para mejorar sus productos; con facturación activada, no." },
      { prov: "gemini", model: "gemini-3.1-flash-lite", name: "Gemini 3.1 Flash-Lite", free: true, inP: 0.25, outP: 1.50, quality: "Buena", speed: "Muy rápida",
        note: "Alternativa gratuita si el otro llega a su límite del día. Mismas condiciones de privacidad del plan gratuito." },
      { prov: "gemini", model: "gemini-3.6-flash", name: "Gemini 3.6 Flash", free: true, inP: 0.75, outP: 3.75, quality: "Muy buena", speed: "Rápida",
        note: "Mejor redacción. También tiene capa gratuita, pero sus límites pueden ser más ajustados. El precio de pago sube a 1,50 / 7,50 US$ por millón de tokens desde el 1 de enero de 2027. Solo aparece si tu cuenta lo ofrece." },
      { prov: "anthropic", model: "claude-haiku-5-5", name: "Claude Haiku 5.5", free: false, inP: 0.10, outP: 0.50, quality: "Muy buena", speed: "Rápida",
        note: "No tiene API gratuita: hay que añadir saldo en la consola de Anthropic. Tu suscripción de Claude no incluye la API. Precio válido para peticiones de hasta 100.000 tokens; por encima cuesta cinco veces más." },
      { prov: "openai", model: "gpt-6-luna", name: "OpenAI GPT-6 Luna", free: false, inP: 0.10, outP: 0.50, quality: "Buena", speed: "Rápida",
        note: "De pago: hay que añadir saldo en la plataforma de OpenAI. Tu suscripción de ChatGPT no incluye la API. Los modelos GPT-4o y GPT-4o-mini dejan de estar disponibles en la API el 14 de enero de 2027." }
    ],
    sources: "Datos de las páginas oficiales de precios de Google (ai.google.dev), Anthropic y OpenAI, comprobados el 24 de octubre de 2026. Los precios y límites cambian: compruébalos antes de pagar. Las valoraciones de calidad y velocidad son orientativas."
  };
  var AI_GUIDE = {
    gemini: { name: "Gemini", url: "https://aistudio.google.com/apikey", page: "Google AI Studio", steps: [
      ["Abre Google AI Studio", "Pulsa el botón de abajo: se abre la página de Google donde se crean las claves. Inicia sesión con tu cuenta de Google (la de Gmail o la de tu móvil). Si no tienes una, créala antes desde los ajustes del móvil o en la web de Google.", true],
      ["Crea la clave", "Si te pide aceptar los términos, acéptalos. Después pulsa «Create API key» («Crear clave de API»). Si pregunta por un proyecto, elige crear la clave en un proyecto nuevo o usa el que aparezca por defecto. No hace falta tarjeta de crédito.", false],
      ["Copia la clave", "Cuando aparezca la clave (una cadena larga que suele empezar por «AIza…»), pulsa el icono de copiar o mantén el dedo sobre ella y elige «Copiar». Después vuelve a esta app: la verás en el siguiente paso.", false]
    ] },
    anthropic: { name: "Claude (Anthropic)", url: "https://console.anthropic.com/settings/keys", page: "la consola de Anthropic", steps: [
      ["Abre la consola de Anthropic", "Pulsa el botón de abajo e inicia sesión o crea una cuenta. La API es de pago: no funciona con la suscripción de chat.", true],
      ["Añade saldo", "En la sección de facturación («Billing») añade saldo prepago (unos pocos dólares bastan para empezar) y activa un límite de gasto mensual para estar tranquilo.", false],
      ["Crea y copia la clave", "En «API keys» pulsa «Create key», ponle un nombre y copia la clave que aparece (solo se muestra una vez).", false]
    ] },
    openai: { name: "ChatGPT (OpenAI)", url: "https://platform.openai.com/api-keys", page: "la plataforma de OpenAI", steps: [
      ["Abre la plataforma de OpenAI", "Pulsa el botón de abajo e inicia sesión o crea una cuenta. La API es de pago y es distinta de la suscripción de ChatGPT.", true],
      ["Añade saldo", "En «Billing» añade saldo prepago (unos pocos dólares bastan) y fija un límite de gasto mensual.", false],
      ["Crea y copia la clave", "En «API keys» pulsa «Create new secret key», ponle un nombre y copia la clave (solo se muestra una vez).", false]
    ] }
  };
  function money(v) { return (v < 0.01 ? "<0,01" : v.toFixed(2).replace(".", ",")) + " US$"; }
  function costOf(it, scenes) { return (AI_INFO.avgIn * scenes / 1e6) * it.inP + (AI_INFO.avgOut * scenes / 1e6) * it.outP; }
  function wzStat(id) { try { var s = JSON.parse(store.getItem("hv:wiz") || "{}"); s[id] = (s[id] || 0) + 1; store.setItem("hv:wiz", JSON.stringify(s)); } catch (e) {} }
  window.hvWizStats = function () { try { return JSON.parse(store.getItem("hv:wiz") || "{}"); } catch (e) { return {}; } };
  var wcss = document.createElement("style");
  wcss.textContent = ".wz-prog{display:flex;gap:.3rem;margin:.5rem 0 .2rem}.wz-prog i{flex:1;height:5px;border-radius:5px;background:rgba(255,255,255,.16)}.wz-prog i.on{background:var(--acc,#b45f06)}" +
    ".wz-step{margin:.1rem 0 .8rem;color:var(--mute,#aaa);font-size:.8rem}" +
    "#hvai .wz-card{display:block;width:100%;text-align:left;padding:1rem;margin:.6rem 0;border-radius:16px;border:1.5px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:inherit}" +
    "#hvai .wz-card strong{display:block;font-size:1.05rem;margin-bottom:.15rem}#hvai .wz-card small{display:block;color:var(--mute,#aaa);font-size:.85rem;line-height:1.4}" +
    "#hvai .wz-card.rec{border-color:var(--acc,#b45f06);box-shadow:inset 0 0 0 1px var(--acc,#b45f06)}" +
    ".wz-badge{display:inline-block;font-size:.68rem;font-weight:700;letter-spacing:.06em;padding:.15rem .6rem;border-radius:999px;background:var(--acc,#b45f06);color:var(--accink,#fff);margin-bottom:.4rem}" +
    ".wz-body{font-size:1rem;line-height:1.55}.wz-body p{margin:.5rem 0}" +
    ".wz-ok,.wz-bad,.wz-info{border-radius:14px;padding:.8rem .9rem;margin:.8rem 0;font-size:.95rem;line-height:1.45}" +
    ".wz-ok{background:rgba(46,158,91,.18);border:1px solid rgba(46,158,91,.5)}.wz-bad{background:rgba(208,64,64,.16);border:1px solid rgba(208,64,64,.5)}.wz-info{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.14)}" +
    "#hvai .wz-actions{display:grid;gap:.5rem;margin-top:1rem}#hvai .wz-actions button{width:100%;text-align:center;min-height:50px}" +
    ".wz-model{border:1.5px solid rgba(255,255,255,.14);border-radius:16px;padding:.85rem .9rem;margin:.6rem 0;background:rgba(255,255,255,.04)}" +
    ".wz-model h3{margin:0 0 .3rem;font-size:1.05rem;font-variant:normal;font-family:inherit;font-weight:700;letter-spacing:0}.wz-tags{display:flex;flex-wrap:wrap;gap:.3rem;margin:.3rem 0}.wz-tags span{font-size:.72rem;padding:.12rem .55rem;border-radius:999px;background:rgba(255,255,255,.08)}" +
    ".wz-model p{margin:.35rem 0;font-size:.88rem;line-height:1.4;color:var(--mute,#bbb)}.wz-model b{color:var(--ink,#fff)}" +
    "#hvai input.wz-key{font-size:1rem;letter-spacing:.02em}";
  document.head.appendChild(wcss);

  function wiz(opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      var v = overlay("Asistente de conexión"), sh = v.sh, hist = [], finished = false;
      function end(ok) { if (finished) return; finished = true; v.o.remove(); resolve(!!ok); }
      function show(id, d) { hist.push([id, d]); render(id, d); }
      function back() { if (hist.length > 1) { hist.pop(); var p = hist[hist.length - 1]; render(p[0], p[1]); } else end(false); }
      function frame(title, prog) {
        sh.innerHTML = "";
        var head = mk("div", "hv-head");
        if (hist.length > 1) { var bk = mk("button", "hv-close", "‹"); bk.setAttribute("aria-label", "Atrás"); bk.onclick = back; head.appendChild(bk); }
        head.appendChild(mk("h2", null, title));
        var cl = mk("button", "hv-close", "×"); cl.setAttribute("aria-label", "Cerrar"); cl.onclick = function () { end(false); }; head.appendChild(cl);
        sh.appendChild(head);
        if (prog) {
          var pr = mk("div", "wz-prog"); pr.setAttribute("role", "img"); pr.setAttribute("aria-label", "Paso " + prog[0] + " de " + prog[1]);
          for (var i = 1; i <= prog[1]; i++) pr.appendChild(mk("i", i <= prog[0] ? "on" : ""));
          sh.appendChild(pr); sh.appendChild(mk("p", "wz-step", "Paso " + prog[0] + " de " + prog[1]));
        }
        sh.scrollTop = 0;
        return mk("div", "wz-body");
      }
      function btn(label, cls, fn) { var b = mk("button", cls || null, label); b.onclick = fn; return b; }
      function card(t, sub, badge, fn, rec) { var b = mk("button", "wz-card" + (rec ? " rec" : "")); if (badge) b.appendChild(mk("span", "wz-badge", badge)); b.appendChild(mk("strong", null, t)); b.appendChild(mk("small", null, sub)); b.onclick = fn; return b; }
      function p(t) { return mk("p", null, t); }
      function actions() { return mk("div", "wz-actions"); }
      function total(prov) { return AI_GUIDE[prov].steps.length + 3; }

      function render(id, d) {
        wzStat(id);
        var b, a;
        if (id === "choose") {
          b = frame("Conecta tu IA");
          b.appendChild(p("Historias vivas escribe con una inteligencia artificial que eliges tú. Así no pagas ninguna suscripción a la app. Elige cómo quieres empezar:"));
          b.appendChild(card("Gemini gratis", "Se consigue en unos 2 minutos, desde el móvil y sin tarjeta. La mejor opción para escribir una novela larga.", "Recomendado", function () { show("intro", "gemini"); }, true));
          b.appendChild(card("Sin cuenta ni clave: copiar y pegar", "Usas cualquier IA que ya tengas (ChatGPT, Gemini, Claude…) copiando y pegando. Es lo más fácil para probar, pero incómodo para una novela larga.", "Lo más rápido", function () { show("manual"); }));
          b.appendChild(card("Ya tengo una clave de API", "De Gemini, ChatGPT/OpenAI o Claude/Anthropic.", null, function () { show("have"); }));
          a = actions(); a.appendChild(btn("Comparar IAs, límites y costes", null, function () { show("compare"); })); a.appendChild(btn("Me ha pasado algo: no me funciona", null, function () { show("help"); })); b.appendChild(a);
          sh.appendChild(b);
        } else if (id === "have") {
          b = frame("¿De qué servicio es tu clave?");
          ["gemini", "openai", "anthropic"].forEach(function (k) { b.appendChild(card(AI_GUIDE[k].name, k === "gemini" ? "Gratis con límites" : "De pago (necesita saldo)", null, function () { show("paste", { prov: k, have: true }); })); });
          b.appendChild(btn("Aún no tengo la clave: quiero conseguirla", null, function () { show("choose"); }));
          sh.appendChild(b);
        } else if (id === "manual") {
          b = frame("Copiar y pegar");
          b.appendChild(p("Cada vez que la historia necesite una escena, la app te dará un texto para que lo pegues en tu IA favorita y te pedirá que pegues su respuesta."));
          b.appendChild(mk("div", "wz-info", "Ventaja: no necesitas clave ni cuenta de desarrollador. Inconveniente: son varios toques por escena. Cuando quieras, cambia a Gemini desde «Conectar mi IA»."));
          a = actions();
          a.appendChild(btn("Usar copiar y pegar", "go", function () { saveCfg({ mode: "manual", keys: KEYS, models: cfg().models }); paintStatus(); checkNow(); end(true); }));
          a.appendChild(btn("Prefiero Gemini gratis", null, function () { show("intro", "gemini"); }));
          b.appendChild(a); sh.appendChild(b);
        } else if (id === "intro") {
          var g = AI_GUIDE[d];
          b = frame(d === "gemini" ? "Consigue tu clave de Gemini" : "Consigue tu clave de " + g.name, [1, total(d)]);
          if (d === "gemini") {
            b.appendChild(p("Vas a crear una «clave de API»: una contraseña que permite a esta app hablar con la IA de Google desde tu cuenta."));
            b.appendChild(mk("div", "wz-ok", "Gratis y sin tarjeta con el modelo Gemini Flash-Lite, dentro de los límites diarios de Google."));
            b.appendChild(mk("div", "wz-info", "Para que lo sepas: con el plan gratuito, Google puede usar lo que envías para mejorar sus productos. No escribas en tus historias datos personales reales. Si lo prefieres, activar la facturación lo evita (entonces se paga por uso, y es muy barato)."));
          } else {
            b.appendChild(p("La clave de API de " + g.name + " es de pago por uso. Te explicamos cómo conseguirla, cómo poner un límite de gasto y qué cuesta aproximadamente."));
            b.appendChild(mk("div", "wz-info", "Usa un límite de gasto mensual en su panel. Una novela completa suele costar unos céntimos o pocos euros (mira «Comparar IAs»)."));
          }
          a = actions(); a.appendChild(btn("Empezar", "go", function () { show("gstep", { prov: d, i: 0 }); })); a.appendChild(btn("Comparar IAs y costes", null, function () { show("compare"); })); b.appendChild(a); sh.appendChild(b);
        } else if (id === "gstep") {
          var G = AI_GUIDE[d.prov], s0 = G.steps[d.i];
          b = frame(s0[0], [d.i + 2, total(d.prov)]);
          b.appendChild(p(s0[1]));
          a = actions();
          if (s0[2]) a.appendChild(btn("Abrir " + G.page, "go", function () { N.openUrl(G.url); }));
          var last = d.i === G.steps.length - 1;
          a.appendChild(btn(last ? "Ya la tengo copiada · Siguiente" : "Hecho · Siguiente", s0[2] ? null : "go", function () { show(last ? "paste" : "gstep", last ? { prov: d.prov } : { prov: d.prov, i: d.i + 1 }); }));
          if (d.i === 0 && d.prov === "gemini") a.appendChild(btn("No tengo cuenta de Google", null, function () { show("nogoogle"); }));
          b.appendChild(a); sh.appendChild(b);
        } else if (id === "nogoogle") {
          b = frame("Si no tienes cuenta de Google");
          b.appendChild(p("Necesitas una cuenta de Google (gratuita). Si tu móvil es Android, probablemente ya tienes una: mira en Ajustes → Cuentas. Si no, créala en Ajustes → Cuentas → Añadir cuenta → Google → Crear cuenta, y luego vuelve aquí."));
          b.appendChild(p("Si prefieres no crear ninguna cuenta ahora, puedes empezar con «copiar y pegar»."));
          a = actions(); a.appendChild(btn("Ya tengo cuenta · Seguir", "go", back)); a.appendChild(btn("Usar copiar y pegar", null, function () { show("manual"); })); b.appendChild(a); sh.appendChild(b);
        } else if (id === "paste") {
          var P = AI_GUIDE[d.prov], c0 = cfg();
          b = frame(d.have ? "Pega tu clave de " + P.name : "Pega la clave", d.have ? null : [P.steps.length + 2, total(d.prov)]);
          b.appendChild(p("Pega aquí la clave que has copiado. Se guarda cifrada solo en este móvil."));
          var ki = document.createElement("input"); ki.type = "password"; ki.className = "wz-key"; ki.placeholder = "Pega aquí tu clave"; ki.setAttribute("aria-label", "Clave de API"); ki.autocomplete = "off"; ki.value = KEYS[d.prov] || ""; b.appendChild(ki);
          var msg = mk("div"); msg.setAttribute("role", "status"); b.appendChild(msg);
          function looks(t) { return d.prov === "gemini" ? /^AIza[0-9A-Za-z_\-]{30,}$/.test(t) : d.prov === "anthropic" ? /^sk-ant-/.test(t) : /^sk-/.test(t); }
          function note(t, cls) { msg.className = cls || ""; msg.textContent = t || ""; }
          var clip = ""; try { clip = (N.paste() || "").trim(); } catch (e) {}
          a = actions();
          if (clip && looks(clip) && clip !== ki.value) a.appendChild(btn("Usar la clave que tienes copiada", "go", function () { ki.value = clip; note("Clave pegada. Pulsa «Conectar y probar».", "wz-ok"); }));
          else a.appendChild(btn("Pegar desde el portapapeles", null, function () { var t = ""; try { t = (N.paste() || "").trim(); } catch (e) {} if (!t) { note("No hay nada copiado. Vuelve a la página de claves, copia la clave y regresa.", "wz-bad"); return; } ki.value = t; note(looks(t) ? "Parece una clave válida. Pulsa «Conectar y probar»." : "Esto no se parece a una clave de " + P.name + ". Puedes probar igualmente.", looks(t) ? "wz-ok" : "wz-info"); }));
          var mi = null;
          if (d.prov === "gemini") {
            var det = document.createElement("details"); det.appendChild(mk("summary", null, "Elegir otro modelo (opcional)")); det.style.margin = ".6rem 0";
            mi = document.createElement("select"); mi.setAttribute("aria-label", "Modelo de Gemini"); var cur = (c0.models.gemini || PROV.gemini.model);
            GEM_MODELS.forEach(function (m) { var o = document.createElement("option"); o.value = m[0]; o.textContent = m[1]; if (m[0] === cur) o.selected = true; mi.appendChild(o); });
            det.appendChild(mi); b.appendChild(det);
          }
          var tb = btn("Conectar y probar", "go", async function () {
            var key = ki.value.trim();
            if (!key) { note("Falta la clave. Pégala arriba.", "wz-bad"); return; }
            tb.disabled = true; tb.textContent = "Probando la conexión…"; note("", "");
            var mdl = mi ? mi.value : (c0.models[d.prov] || PROV[d.prov].model);
            var tc = { mode: d.prov, keys: {}, models: {} }; tc.keys[d.prov] = key; tc.models[d.prov] = mdl;
            try {
              var f = d.prov === "gemini" ? viaGemini : d.prov === "openai" ? viaOpenAI : viaAnthropic;
              await f("Responde solo con la palabra: listo", tc, true);
              var n = cfg(); n.mode = d.prov; n.keys[d.prov] = key; n.models[d.prov] = mdl; saveCfg(n); setStatus("ok");
              show("done", { prov: d.prov, model: mdl });
            } catch (er) {
              tb.disabled = false; tb.textContent = "Conectar y probar";
              note(((er && er.message) || "No se pudo conectar.") + " ¿Qué hago? Pulsa «Ayuda».", "wz-bad");
            }
          });
          a.appendChild(tb);
          a.appendChild(btn("Ayuda: no me funciona", null, function () { show("help"); }));
          if (d.have) a.appendChild(btn("No tengo la clave: cómo conseguirla", null, function () { show("intro", d.prov); }));
          b.appendChild(a); sh.appendChild(b);
        } else if (id === "done") {
          b = frame("¡Conectada!");
          b.appendChild(mk("div", "wz-ok", "Ya puedes escribir con " + AI_GUIDE[d.prov].name + " (modelo " + d.model + ")."));
          if (d.prov === "gemini") b.appendChild(mk("div", "wz-info", "Si alguna vez ves «límite alcanzado», es normal en el plan gratuito: espera un minuto. Si es el límite del día, se renueva solo (sobre las 9:00 de la mañana en España). También puedes cambiar a otro modelo gratuito en «Conectar mi IA»."));
          else b.appendChild(mk("div", "wz-info", "Recuerda poner un límite de gasto mensual en tu panel de " + AI_GUIDE[d.prov].name + "."));
          a = actions(); a.appendChild(btn("Empezar a escribir", "go", function () { end(true); })); b.appendChild(a); sh.appendChild(b);
        } else if (id === "compare") {
          b = frame("¿Qué IA elijo?");
          b.appendChild(p("Una novela de 40 capítulos son unas 200 escenas. Estos son los costes aproximados según los precios oficiales (si pagaras por uso):"));
          AI_INFO.items.forEach(function (it) {
            var m = mk("div", "wz-model"); m.appendChild(mk("h3", null, it.name));
            var tg = mk("div", "wz-tags"); [it.free ? "Gratis con límites" : "De pago", "Calidad: " + it.quality, "Velocidad: " + it.speed].forEach(function (t) { tg.appendChild(mk("span", null, t)); }); m.appendChild(tg);
            var cp = mk("p"); cp.innerHTML = ""; cp.appendChild(document.createTextNode("Coste por 100 escenas: ")); cp.appendChild(mk("b", null, (it.free ? "gratis, o " : "") + "≈ " + money(costOf(it, 100)))); cp.appendChild(document.createTextNode(" · Novela de 40 capítulos: ")); cp.appendChild(mk("b", null, "≈ " + money(costOf(it, 200)))); m.appendChild(cp);
            m.appendChild(mk("p", null, it.note));
            b.appendChild(m);
          });
          b.appendChild(mk("div", "wz-info", "Cálculo: unos " + AI_INFO.avgIn.toLocaleString("es-ES") + " tokens de entrada y " + AI_INFO.avgOut.toLocaleString("es-ES") + " de salida por escena (estimación). " + AI_INFO.sources));
          a = actions(); a.appendChild(btn("Conseguir clave de Gemini (gratis)", "go", function () { show("intro", "gemini"); })); a.appendChild(btn("Volver", null, back)); b.appendChild(a); sh.appendChild(b);
        } else if (id === "help") {
          b = frame("No me funciona");
          [["La clave no se acepta", "Cópiala otra vez entera, sin espacios al principio ni al final. Una clave de Gemini empieza por «AIza». Si dudas, crea una nueva en AI Studio."],
           ["«Límite alcanzado»", "Has agotado el uso gratuito del minuto o del día. Espera un minuto; si es del día, se renueva sobre las 9:00 de la mañana en España. Puedes elegir otro modelo gratuito en «Conectar mi IA»."],
           ["«Modelo no disponible»", "Tu cuenta no tiene ese modelo. En «Conectar mi IA» elige «Gemini 3.5 Flash-Lite» u otro de la lista."],
           ["No puedo crear la clave", "Algunas cuentas (de menores, de trabajo o de centros educativos) y algunos países no tienen acceso. Prueba con otra cuenta de Google personal."],
           ["Sin internet", "Comprueba que tienes datos o wifi. La app solo necesita conexión mientras la IA escribe."],
           ["Nada de esto funciona", "Usa «copiar y pegar»: no necesita clave y funciona con cualquier IA."]
          ].forEach(function (x) { var m = mk("div", "wz-model"); m.appendChild(mk("h3", null, x[0])); m.appendChild(mk("p", null, x[1])); b.appendChild(m); });
          a = actions(); a.appendChild(btn("Volver a intentarlo", "go", back)); a.appendChild(btn("Usar copiar y pegar", null, function () { show("manual"); })); b.appendChild(a); sh.appendChild(b);
        }
      }
      show(opts.start || "choose", opts.data);
    });
  }
  window.openAIWizard = function (start, data) { return wiz({ start: start, data: data }); };


  /* ---------- Indicador de conexión ---------- */
  var ST = { s: "none", msg: "" };
  function label() {
    var c = cfg();
    if (!c.mode) return { s: "none", t: "Sin conectar. Toca para conectar tu IA" };
    if (c.mode === "manual") return { s: "manual", t: "Modo copiar y pegar (no necesita conexión)" };
    var n = PROV[c.mode].name.split(" (")[0];
    if (!KEYS[c.mode]) return { s: "none", t: "Falta la clave de " + n + ". Toca para añadirla" };
    if (ST.s === "checking") return { s: "checking", t: "Comprobando conexión con " + n + "…" };
    if (ST.s === "ok") return { s: "ok", t: "Conectada: " + n };
    if (ST.s === "fail") return { s: "fail", t: "Sin conexión con " + n + (ST.msg ? ": " + ST.msg : "") };
    return { s: "checking", t: "Comprobando conexión con " + n + "…" };
  }
  var COL = { none: "#9a9a9a", manual: "#4a90d9", checking: "#e0a030", ok: "#2e9e5b", fail: "#d04040" };
  function paintStatus() {
    window.hvCtxBudget = (cfg().mode === "manual") ? 10000 : 18000;
    var l = label(), b = document.getElementById("hvstat");
    if (b) { b.textContent = ""; var d = mk("span"); d.setAttribute("aria-hidden", "true"); d.style.cssText = "display:inline-block;width:.7rem;height:.7rem;border-radius:50%;margin-right:.5rem;background:" + COL[l.s]; b.appendChild(d); b.appendChild(document.createTextNode(l.t)); }
    var m = document.getElementById("hvmenu");
    if (m) m.textContent = "Conectar mi IA · " + (l.s === "ok" ? "conectada" : l.s === "fail" ? "sin conexión" : l.s === "manual" ? "copiar y pegar" : l.s === "checking" ? "comprobando…" : "sin conectar");
  }
  function setStatus(s, msg) { ST = { s: s, msg: msg || "" }; paintStatus(); }
  async function checkNow() {
    var c = cfg();
    if (!c.mode || c.mode === "manual") { setStatus(c.mode ? "manual" : "none"); return true; }
    if (!KEYS[c.mode]) { setStatus("none"); return false; }
    setStatus("checking");
    try {
      var f = c.mode === "gemini" ? viaGemini : c.mode === "openai" ? viaOpenAI : viaAnthropic;
      await f("Responde solo con la palabra: listo", c, true);
      setStatus("ok"); return true;
    } catch (e) { setStatus("fail", (e && e.message ? e.message : "no se pudo conectar").slice(0, 90)); return false; }
  }

  /* ---------- HTTP nativo (con reintentos ante límites o saturación) ---------- */
  var waits = {}, hid = 0;
  window.__httpDone = function (id, status, text) { var w = waits[id]; delete waits[id]; if (w) w(status, text); };
  function http1(url, headers, body) {
    return new Promise(function (res) {
      var id = "h" + (++hid); waits[id] = function (s, t) { res({ status: s, text: t }); };
      N.http(id, url, JSON.stringify(headers), JSON.stringify(body));
    });
  }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  async function http(url, headers, body, quick) {
    var waitsMs = quick ? [] : [6000, 15000], r = await http1(url, headers, body), i = 0;
    while ((r.status === 429 || r.status === 503 || r.status === 500) && i < waitsMs.length) { await sleep(waitsMs[i++]); r = await http1(url, headers, body); }
    return r;
  }
  function fail(r, who, model) {
    var m = "";
    try { var j = JSON.parse(r.text); m = (j.error && (j.error.message || j.error)) || ""; } catch (e) {}
    if (typeof m !== "string") m = JSON.stringify(m);
    if (r.status === 429) return { code: "rate_limited", message: "Has llegado al límite gratuito de " + who + " (por minuto o por día). Espera un minuto y reinténtalo; si es el límite del día, se renueva solo sobre las 9:00 de la mañana en España. En «Conectar mi IA» puedes cambiar a otro modelo gratuito o usar «copiar y pegar»." };
    if (r.status === 401 || r.status === 403 || (r.status === 400 && /api key|API_KEY/i.test(m))) return { code: "bad_key", message: "La clave de " + who + " no es válida o no tiene permiso. Revísala en «Conectar mi IA». " + m };
    if (r.status === 404) return { code: "bad_model", message: "El modelo «" + model + "» no está disponible para tu clave. Elige otro en «Conectar mi IA». " + m };
    if (r.status === 503 || r.status === 500) return { code: "busy", message: who + " está saturado en este momento. Reinténtalo en unos segundos." };
    if (r.status === 0) return { code: "network", message: "No hay conexión a internet. " + r.text };
    return { code: "error", message: who + " respondió con error " + r.status + ". " + m };
  }
  async function viaGemini(prompt, c, quick) {
    var model = (c.models && c.models.gemini) || PROV.gemini.model;
    var r = await http("https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(model) + ":generateContent",
      { "Content-Type": "application/json", "x-goog-api-key": c.keys.gemini },
      { contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { temperature: 0.9, maxOutputTokens: 6000 } }, quick);
    if (r.status !== 200) throw fail(r, "Gemini", model);
    var j = JSON.parse(r.text), cd = (j.candidates || [])[0] || {}, p = (cd.content || {}).parts || [];
    var t = p.map(function (x) { return x.text || ""; }).join("");
    if (!t) {
      var why = (j.promptFeedback && j.promptFeedback.blockReason) || cd.finishReason || "";
      throw { code: "blocked", message: "Gemini no ha devuelto texto" + (why ? " (" + why + ")" : "") + ". Suele ser por sus filtros de contenido: prueba a reformular la acción o a bajar la intensidad en «Ajustes de la partida»." };
    }
    return t;
  }
  async function viaOpenAI(prompt, c, quick) {
    var model = (c.models && c.models.openai) || PROV.openai.model;
    var r = await http("https://api.openai.com/v1/chat/completions",
      { "Content-Type": "application/json", "Authorization": "Bearer " + c.keys.openai },
      { model: model, messages: [{ role: "user", content: prompt }] }, quick);
    if (r.status !== 200) throw fail(r, "OpenAI", model);
    var j = JSON.parse(r.text);
    var t = (((j.choices || [])[0] || {}).message || {}).content || "";
    if (!t) throw { code: "blocked", message: "OpenAI no ha devuelto texto. Prueba a reformular la acción." };
    return t;
  }
  async function viaAnthropic(prompt, c, quick) {
    var model = (c.models && c.models.anthropic) || PROV.anthropic.model;
    var r = await http("https://api.anthropic.com/v1/messages",
      { "Content-Type": "application/json", "x-api-key": c.keys.anthropic, "anthropic-version": "2023-06-01" },
      { model: model, max_tokens: 4096, messages: [{ role: "user", content: prompt }] }, quick);
    if (r.status !== 200) throw fail(r, "Anthropic", model);
    var j = JSON.parse(r.text);
    var t = (j.content || []).map(function (x) { return x.text || ""; }).join("");
    if (!t) throw { code: "blocked", message: "Anthropic no ha devuelto texto. Prueba a reformular la acción." };
    return t;
  }

  function viaManual(prompt) {
    return new Promise(function (resolve, reject) {
      var v = overlay("Pásale esto a tu IA"), sh = v.sh;
      sh.appendChild(mk("h2", null, "Pásale esto a tu IA")).style.marginTop = "0";
      sh.appendChild(mk("p", "hint", "1) Pulsa «Copiar texto». 2) Pégalo en tu IA y espera su respuesta. 3) Copia la respuesta completa y vuelve aquí. 4) Pulsa «Pegar respuesta»."));
      var ta = mk("textarea"); ta.readOnly = true; ta.value = prompt; ta.setAttribute("aria-label", "Texto para tu IA"); sh.appendChild(ta);
      var r1 = mk("div", "r"), cp = mk("button", "go", "Copiar texto");
      cp.onclick = function () { N.copy(prompt); };
      r1.appendChild(cp); sh.appendChild(r1);
      sh.appendChild(mk("p", "hint", "Respuesta de tu IA"));
      var ans = mk("textarea"); ans.placeholder = "Aquí aparecerá la respuesta"; ans.setAttribute("aria-label", "Respuesta de tu IA"); sh.appendChild(ans);
      var r2 = mk("div", "r"), pg = mk("button", null, "Pegar respuesta"), use = mk("button", "go", "Usar respuesta"), no = mk("button", null, "Cancelar");
      pg.onclick = function () { ans.value = N.paste(); };
      use.onclick = function () {
        var t = ans.value.trim();
        if (!t) { N.toast("Pega primero la respuesta."); return; }
        v.o.remove(); resolve(t);
      };
      no.onclick = function () { v.o.remove(); reject({ code: "cancelled", message: "Cancelado." }); };
      r2.appendChild(pg); r2.appendChild(use); r2.appendChild(no); sh.appendChild(r2);
    });
  }

  async function sample(input) {
    var prompt = typeof input === "string" ? input : (input || []).map(function (m) { return m.content; }).join("\n\n");
    // v0.9: no intentamos enviar cuando Android confirma que no hay red.
    if (typeof N.online === "function" && !N.online()) throw { code: "offline", message: "No hay conexión. La acción se guardará en el móvil." };
    var c = cfg();
    if (!c.mode || (c.mode !== "manual" && !KEYS[c.mode])) { var ok = await wiz({}); if (!ok) throw { code: "not_granted", message: "No has conectado ninguna IA." }; c = cfg(); }
    var t;
    try {
      if (c.mode === "gemini") t = await viaGemini(prompt, c);
      else if (c.mode === "openai") t = await viaOpenAI(prompt, c);
      else if (c.mode === "anthropic") t = await viaAnthropic(prompt, c);
      else t = await viaManual(prompt);
    } catch (e) {
      if (e && (e.code === "bad_key" || e.code === "network" || e.code === "bad_model")) setStatus("fail", e.message ? e.message.slice(0, 90) : "");
      throw e;
    }
    if (c.mode !== "manual") setStatus("ok");
    return { text: String(t), truncated: false };
  }

  /* ---------- Descargas ---------- */
  function b64(u8) {
    var s = "", i, n = 0x8000;
    for (i = 0; i < u8.length; i += n) s += String.fromCharCode.apply(null, u8.subarray(i, i + n));
    return btoa(s);
  }
  var MIME = { epub: "application/epub+zip", pdf: "application/pdf", zip: "application/zip", txt: "text/plain", json: "application/json", png: "image/png", jpg: "image/jpeg" };
  var downloads = {
    save: async function (o) {
      var d = o.data;
      if (typeof d === "string") d = new TextEncoder().encode(d);
      else if (d instanceof Blob) d = new Uint8Array(await d.arrayBuffer());
      else if (d instanceof ArrayBuffer) d = new Uint8Array(d);
      var ext = String(o.filename).split(".").pop().toLowerCase();
      if (!N.saveFile(o.filename, b64(d), MIME[ext] || "application/octet-stream")) throw { code: "error", message: "No se pudo guardar el archivo." };
    }
  };

  window.claude = {
    use: function (name) {
      if (name === "sample") return Promise.resolve(sample);
      if (name === "downloads") return Promise.resolve(downloads);
      return Promise.resolve(null);
    }
  };

  /* ---------- Dictado, soporte y voz nativa ---------- */
  var dictCb = null;
  window.__dictDone = function (t) { var f = dictCb; dictCb = null; if (f) f(String(t || "")); };
  window.hvDictate = function (cb) { dictCb = cb; N.dictate(); };
  window.hvSupport = { email: "", send: function (subject, body) { N.sendMail(this.email || "", subject, body); } };

  // v0.9: puente asíncrono de copias SAF, uso local, red y lectura en segundo plano.
  var backupWait = {}, backupSeq = 0;
  window.__backupDone = function (id, payload) { var f = backupWait[id]; delete backupWait[id]; if (f) f(payload); };
  function backupCall(method, args) {
    return new Promise(function (resolve) {
      if (typeof N[method] !== "function") { resolve(null); return; }
      var id = "b" + (++backupSeq); backupWait[id] = resolve;
      // Android WebView no garantiza Function.apply sobre objetos @JavascriptInterface.
      try {
        if (method === "backupChooseFolder") N.backupChooseFolder(id);
        else if (method === "backupStatus") N.backupStatus(id);
        else if (method === "backupWrite") N.backupWrite(id, args[0]);
        else if (method === "backupList") N.backupList(id);
        else if (method === "backupRead") N.backupRead(id, args[0]);
        else if (method === "backupClear") N.backupClear(id);
        else throw new Error("Método de copia no permitido");
      } catch (e) { delete backupWait[id]; resolve(null); }
    });
  }
  window.hvBackup = {
    available: typeof N.backupStatus === "function",
    choose: function () { return backupCall("backupChooseFolder"); },
    status: function () { return backupCall("backupStatus"); },
    write: function (json) { return backupCall("backupWrite", [String(json || "")]); },
    list: function () { return backupCall("backupList"); },
    read: function (name) { return backupCall("backupRead", [String(name || "")]); },
    clear: function () { return backupCall("backupClear"); }
  };
  window.hvUsage = {
    get: function () { try { return JSON.parse(typeof N.usageGet === "function" ? N.usageGet() : "{}"); } catch (e) { return {}; } },
    add: function (model) { try { return JSON.parse(typeof N.usageAdd === "function" ? N.usageAdd(model) : "{}"); } catch (e) { return {}; } }
  };
  window.hvOnline = function () { try { return typeof N.online !== "function" || !!N.online(); } catch (e) { return true; } };
  window.hvBackgroundSpeech = {
    available: typeof N.speakQueue === "function",
    play: function (parts, rate) { if (typeof N.speakQueue !== "function") return false; N.speakQueue(JSON.stringify((parts || []).map(function (t) { return { text: String(t || ""), rate: rate || 1 }; }))); return true; },
    state: function () { try { return JSON.parse(typeof N.speakState === "function" ? N.speakState() : "{}"); } catch (e) { return {}; } },
    action: function (a) { if (typeof N.speakAction === "function") N.speakAction(a); }
  };

  var cbs = {}, k = 0;
  window.__ttsDone = function (id) { var u = cbs[id]; delete cbs[id]; if (u && u.onend) u.onend(); };
  function Utt(t) { this.text = t; this.lang = "es-ES"; this.rate = 1; this.voice = null; this.onend = null; this.onerror = null; }
  window.SpeechSynthesisUtterance = Utt;
  Object.defineProperty(window, "speechSynthesis", {
    configurable: true,
    value: {
      speak: function (u) { var id = "u" + (++k); cbs[id] = u; N.speak(u.text, u.rate || 1, id); },
      cancel: function () { cbs = {}; N.stopSpeak(); },
      getVoices: function () { return []; }
    }
  });

  /* ---------- Menú e indicador ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector(".dnav"), th = document.getElementById("dtheme");
    if (nav && th) {
      var b = mk("button", null, "Conectar mi IA"); b.id = "hvmenu";
      b.onclick = function () { var d = document.getElementById("drawer"); if (d) d.hidden = true; if (!cfg().mode || (cfg().mode !== "manual" && !KEYS[cfg().mode])) wiz({}); else openSettings(); };
      nav.insertBefore(b, th);
    }
    var lib = document.getElementById("lib"), hero = document.getElementById("hero");
    if (lib && hero) {
      var st = mk("button", "small"); st.id = "hvstat"; st.style.cssText = "width:100%;text-align:left;margin:.2rem 0 .8rem";
      st.onclick = function () { var c = cfg(); if (!c.mode || (c.mode !== "manual" && !KEYS[c.mode])) wiz({}); else openSettings(); };
      lib.insertBefore(st, hero);
    }
    paintStatus();
    checkNow();
  });
})();
