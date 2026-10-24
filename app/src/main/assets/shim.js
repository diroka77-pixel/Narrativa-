/* Puente de la APK: da a la página lo que en claude.ai da la plataforma
   (IA, descargas, voz). Solo actúa si existe window.Native (dentro de la APK). */
(function () {
  var N = window.Native;
  if (!N) return;

  /* ---------- Ajustes de IA ---------- */
  var KEY = "hv:ai:v1";
  var PROV = {
    manual: { name: "Copiar y pegar (cualquier IA, gratis)" },
    gemini: { name: "Gemini (clave de API)", model: "gemini-flash-latest", url: "https://aistudio.google.com/apikey" },
    openai: { name: "ChatGPT / OpenAI (clave de API)", model: "gpt-4o-mini", url: "https://platform.openai.com/api-keys" },
    anthropic: { name: "Claude / Anthropic (clave de API)", model: "claude-haiku-5-5", url: "https://console.anthropic.com/settings/keys" }
  };
  function cfg() {
    try { var c = JSON.parse(localStorage.getItem(KEY) || "null"); if (c) return c; } catch (e) {}
    return { mode: "", keys: {}, models: {} };
  }
  function saveCfg(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} }

  var css = document.createElement("style");
  css.textContent = "#hvai{position:fixed;inset:0;z-index:60;background:rgba(0,0,0,.6);display:flex;align-items:flex-end}" +
    "#hvai .sh{width:100%;max-width:36rem;margin:0 auto;background:var(--card,#fff);color:var(--ink,#111);border-radius:18px 18px 0 0;padding:1rem 1.1rem 1.2rem;max-height:90vh;overflow:auto}" +
    "#hvai label.o{display:block;border:1.5px solid var(--line,#ccc);border-radius:12px;padding:.7rem .8rem;margin:.5rem 0}" +
    "#hvai label.o.on{border-color:var(--acc,#b45f06)}" +
    "#hvai input[type=radio]{width:auto!important;display:inline-block;vertical-align:middle;margin:0 .4rem 0 0}" +
    "#hvai input[type=text],#hvai input[type=password],#hvai textarea{width:100%;margin-top:.4rem}" +
    "#hvai textarea{min-height:9rem}" +
    "#hvai .r{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.7rem}" +
    "#hvai .r button{flex:1}";
  document.head.appendChild(css);

  function overlay() {
    var o = document.getElementById("hvai");
    if (o) o.remove();
    o = document.createElement("div"); o.id = "hvai";
    var sh = document.createElement("div"); sh.className = "sh"; o.appendChild(sh);
    document.body.appendChild(o);
    return { o: o, sh: sh };
  }
  function mk(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }

  function openSettings() {
    return new Promise(function (resolve) {
      var c = cfg(), v = overlay(), sh = v.sh;
      sh.appendChild(mk("h2", null, "Conecta tu IA")).style.marginTop = "0";
      sh.appendChild(mk("p", "hint", "Usa la IA que ya tienes. No hay coste para la app: cada uno usa su propia cuenta y sus propios límites."));
      var sel = c.mode || "manual", boxes = {};
      Object.keys(PROV).forEach(function (k) {
        var l = mk("label", "o" + (sel === k ? " on" : "")), r = document.createElement("input");
        r.type = "radio"; r.name = "hvm"; r.checked = sel === k;
        l.appendChild(r); l.appendChild(document.createTextNode(" " + PROV[k].name));
        var d = mk("div"); d.hidden = sel !== k; boxes[k] = d;
        if (k === "manual") {
          d.appendChild(mk("p", "hint", "La app te da el texto, lo pegas en tu IA (ChatGPT, Gemini, Claude…, gratis o de pago) y pegas aquí su respuesta. Sirve con cualquier IA."));
        } else {
          var ki = document.createElement("input"); ki.type = "password"; ki.placeholder = "Pega aquí tu clave de API"; ki.value = (c.keys || {})[k] || ""; ki.id = "hvk_" + k;
          var mi = document.createElement("input"); mi.type = "text"; mi.placeholder = "Modelo"; mi.value = (c.models || {})[k] || PROV[k].model; mi.id = "hvmo_" + k;
          d.appendChild(mk("p", "hint", "La clave se guarda solo en este móvil. Consíguela en " + PROV[k].url + ". La clave de API es distinta de la suscripción de chat y puede tener coste o límites propios según el proveedor."));
          d.appendChild(ki); d.appendChild(mi);
        }
        l.appendChild(d); sh.appendChild(l);
        r.onchange = function () {
          sel = k;
          Object.keys(boxes).forEach(function (z) { boxes[z].hidden = z !== k; boxes[z].parentNode.className = "o" + (z === k ? " on" : ""); });
        };
      });
      var row = mk("div", "r"), ok = mk("button", "go", "Guardar"), no = mk("button", null, "Cancelar");
      ok.onclick = function () {
        var n = { mode: sel, keys: c.keys || {}, models: c.models || {} };
        Object.keys(PROV).forEach(function (k) {
          var ki = document.getElementById("hvk_" + k), mi = document.getElementById("hvmo_" + k);
          if (ki) n.keys[k] = ki.value.trim();
          if (mi) n.models[k] = mi.value.trim();
        });
        if (n.mode !== "manual" && !n.keys[n.mode]) { N.toast("Falta la clave de API."); return; }
        saveCfg(n); v.o.remove(); resolve(true);
      };
      no.onclick = function () { v.o.remove(); resolve(false); };
      row.appendChild(ok); row.appendChild(no); sh.appendChild(row);
    });
  }
  window.openAISettings = openSettings;

  /* ---------- HTTP nativo ---------- */
  var waits = {}, hid = 0, HTTP_TIMEOUT = 65000;
  window.__httpDone = function (id, status, text) {
    var w = waits[id];
    if (!w) return;
    delete waits[id]; clearTimeout(w.timer); w.done(status, text);
  };
  function http(url, headers, body) {
    return new Promise(function (res) {
      var id = "h" + (++hid);
      waits[id] = {
        done: function (s, t) { res({ status: s, text: t }); },
        timer: setTimeout(function () {
          if (!waits[id]) return;
          delete waits[id];
          res({ status: 0, text: "La conexión ha superado 65 segundos." });
        }, HTTP_TIMEOUT)
      };
      try { N.http(id, url, JSON.stringify(headers), JSON.stringify(body)); }
      catch (e) {
        clearTimeout(waits[id].timer); delete waits[id];
        res({ status: 0, text: e && e.message ? e.message : "No se pudo iniciar la conexión." });
      }
    });
  }
  function fail(r, who) {
    var m = "";
    try { var j = JSON.parse(r.text); m = (j.error && (j.error.message || j.error)) || ""; } catch (e) {}
    if (typeof m !== "string") m = JSON.stringify(m);
    if (r.status === 429) return { code: "rate_limited", message: "Has llegado al límite de " + who + ". " + m };
    if (r.status === 401 || r.status === 403) return { code: "bad_key", message: "La clave de " + who + " no es válida o no tiene permiso. " + m };
    if (r.status === 0) return { code: "network", message: "No hay conexión. " + r.text };
    return { code: "error", message: who + " respondió con error " + r.status + ". " + m };
  }

  async function viaGemini(prompt, c) {
    var model = c.models.gemini || PROV.gemini.model;
    var r = await http("https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(model) + ":generateContent",
      { "Content-Type": "application/json", "x-goog-api-key": c.keys.gemini },
      { contents: [{ role: "user", parts: [{ text: prompt }] }] });
    if (r.status !== 200) throw fail(r, "Gemini");
    var j = JSON.parse(r.text), p = (((j.candidates || [])[0] || {}).content || {}).parts || [];
    var t = p.map(function (x) { return x.text || ""; }).join("");
    if (!t) throw { code: "error", message: "Gemini no devolvió texto (puede haber bloqueado la respuesta)." };
    return t;
  }
  async function viaOpenAI(prompt, c) {
    var r = await http("https://api.openai.com/v1/chat/completions",
      { "Content-Type": "application/json", "Authorization": "Bearer " + c.keys.openai },
      { model: c.models.openai || PROV.openai.model, messages: [{ role: "user", content: prompt }] });
    if (r.status !== 200) throw fail(r, "OpenAI");
    var j = JSON.parse(r.text);
    return (((j.choices || [])[0] || {}).message || {}).content || "";
  }
  async function viaAnthropic(prompt, c) {
    var r = await http("https://api.anthropic.com/v1/messages",
      { "Content-Type": "application/json", "x-api-key": c.keys.anthropic, "anthropic-version": "2023-06-01" },
      { model: c.models.anthropic || PROV.anthropic.model, max_tokens: 4096, messages: [{ role: "user", content: prompt }] });
    if (r.status !== 200) throw fail(r, "Anthropic");
    var j = JSON.parse(r.text);
    return (j.content || []).map(function (x) { return x.text || ""; }).join("");
  }

  function viaManual(prompt) {
    return new Promise(function (resolve, reject) {
      var v = overlay(), sh = v.sh;
      sh.appendChild(mk("h2", null, "Pásale esto a tu IA")).style.marginTop = "0";
      sh.appendChild(mk("p", "hint", "1) Pulsa «Copiar texto». 2) Pégalo en tu IA y espera su respuesta. 3) Copia la respuesta completa y vuelve aquí. 4) Pulsa «Pegar respuesta»."));
      var ta = mk("textarea"); ta.readOnly = true; ta.value = prompt; sh.appendChild(ta);
      var r1 = mk("div", "r"), cp = mk("button", "go", "Copiar texto");
      cp.onclick = function () { N.copy(prompt); };
      r1.appendChild(cp); sh.appendChild(r1);
      sh.appendChild(mk("p", "hint", "Respuesta de tu IA"));
      var ans = mk("textarea"); ans.placeholder = "Aquí aparecerá la respuesta"; sh.appendChild(ans);
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
    if (!c.mode) { var ok = await openSettings(); if (!ok) throw { code: "not_granted", message: "No has conectado ninguna IA." }; c = cfg(); }
    var t;
    if (c.mode === "manual") t = await viaManual(prompt);
    else {
      try {
        if (c.mode === "gemini") t = await viaGemini(prompt, c);
        else if (c.mode === "openai") t = await viaOpenAI(prompt, c);
        else if (c.mode === "anthropic") t = await viaAnthropic(prompt, c);
        else t = await viaManual(prompt);
      } catch (e) {
        var reason = e && e.message ? e.message : "El proveedor no respondió.";
        N.toast(reason + " Puedes continuar con copiar y pegar.");
        t = await viaManual(prompt);
      }
    }
    return { text: String(t), truncated: false };
  }

  /* ---------- Descargas ---------- */
  function b64(u8) {
    var s = "", i, n = 0x8000;
    for (i = 0; i < u8.length; i += n) s += String.fromCharCode.apply(null, u8.subarray(i, i + n));
    return btoa(s);
  }
  var MIME = { epub: "application/epub+zip", pdf: "application/pdf", zip: "application/zip", txt: "text/plain" };
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

  /* ---------- Voz nativa ---------- */
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

  /* ---------- Menú: «Conectar mi IA» ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector(".dnav"), th = document.getElementById("dtheme");
    if (nav && th) {
      var b = mk("button", null, "Conectar mi IA");
      b.onclick = function () { var d = document.getElementById("drawer"); if (d) d.hidden = true; openSettings(); };
      nav.insertBefore(b, th);
    }
  });
})();
