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
    ["gemini-2.5-flash", "Gemini 2.5 Flash (si está disponible en tu cuenta)"]
  ];
  var PROV = {
    manual: { name: "Copiar y pegar", sub: "Funciona con cualquier IA" },
    gemini: { name: "Gemini", sub: "Recomendado · clave de API", model: "gemini-3.5-flash-lite", url: "https://aistudio.google.com/apikey" },
    openai: { name: "ChatGPT / OpenAI", sub: "Clave de API", model: "gpt-4o-mini", url: "https://platform.openai.com/api-keys" },
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
    if (r.status === 429) return { code: "rate_limited", message: "Has llegado al límite de uso de " + who + ". Espera un minuto y reinténtalo. " + m };
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
    var c = cfg();
    if (!c.mode || (c.mode !== "manual" && !KEYS[c.mode])) { var ok = await openSettings(); if (!ok) throw { code: "not_granted", message: "No has conectado ninguna IA." }; c = cfg(); }
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
  var MIME = { epub: "application/epub+zip", pdf: "application/pdf", zip: "application/zip", txt: "text/plain", json: "application/json" };
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

  /* ---------- Copia automática en carpeta de Drive elegida por el usuario ---------- */
  var cloudSeq = 0, cloudWait = {}, cloudFolderCb = null;
  window.__cloudFolderDone = function (ok, name) {
    var cb = cloudFolderCb; cloudFolderCb = null;
    if (cb) cb({ ok: !!ok, folder: String(name || "") });
  };
  window.__cloudSaved = function (id, ok) {
    var cb = cloudWait[id]; delete cloudWait[id]; if (cb) cb({ ok: !!ok });
  };
  window.__cloudRead = function (id, data) {
    var cb = cloudWait[id]; delete cloudWait[id]; if (cb) cb({ ok: !!data, data: String(data || "") });
  };
  window.hvCloud = {
    state: function () { try { return JSON.parse(N.cloudState() || "{}"); } catch (e) { return { linked: false }; } },
    choose: function () { return new Promise(function (res) { cloudFolderCb = res; N.cloudChooseFolder(); }); },
    save: function () { return new Promise(function (res) { var id = "c" + (++cloudSeq); cloudWait[id] = res; N.cloudSaveNow(id); }); },
    read: function () { return new Promise(function (res) { var id = "c" + (++cloudSeq); cloudWait[id] = res; N.cloudRead(id); }); },
    disconnect: function () { N.cloudDisconnect(); }
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
      b.onclick = function () { var d = document.getElementById("drawer"); if (d) d.hidden = true; openSettings(); };
      nav.insertBefore(b, th);
    }
    var lib = document.getElementById("lib"), hero = document.getElementById("hero");
    if (lib && hero) {
      var st = mk("button", "small"); st.id = "hvstat"; st.style.cssText = "width:100%;text-align:left;margin:.2rem 0 .8rem";
      st.onclick = function () { openSettings(); };
      lib.insertBefore(st, hero);
    }
    paintStatus();
    checkNow();
  });
})();
