const { chromium } = require('playwright');
const fs = require('fs');
const assert = require('assert');
const A = '/home/claude/v08/assets/';
const SECRET = 'AIzaSy-CLAVE-SEÑUELO-QUE-NUNCA-DEBE-SALIR';

(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.route('https://appassets.androidplatform.net/**', route => {
      const rel = route.request().url().replace('https://appassets.androidplatform.net/', '').replace(/^assets\//, '').split('?')[0] || 'index.html';
      try {
        const ext = rel.split('.').pop();
        route.fulfill({ body: fs.readFileSync(A + rel), contentType: { js: 'text/javascript', html: 'text/html', webp: 'image/webp' }[ext] || 'application/octet-stream' });
      } catch (_) { route.fulfill({ status: 404 }); }
    });
    await page.addInitScript(secret => {
      const store = {
        'narrador:v1': JSON.stringify([{ id: 'segura', title: 'Historia segura', scenes: [{ t: 'Texto' }], at: 1 }]),
        'narrador:chars:v1': '[]',
        'hv:ai:v1': JSON.stringify({ mode: 'gemini', models: { gemini: 'gemini-3.5-flash-lite' } })
      };
      window.__writtenBackup = '';
      window.Native = {
        storeLoadAll: () => JSON.stringify(store), storeSet: (k, v) => { store[k] = v; }, storeRemove: k => { delete store[k]; },
        secretGet: () => secret, secretSet: () => {}, online: () => true,
        backupStatus: id => setTimeout(() => window.__backupDone(id, { folder: 'Prueba', last: 0, error: '', keep: 5 }), 0),
        backupWrite: (id, json) => { window.__writtenBackup = json; setTimeout(() => window.__backupDone(id, { ok: true, name: 'copia.json', error: '' }), 0); },
        backupList: id => setTimeout(() => window.__backupDone(id, []), 0), backupRead: (id) => setTimeout(() => window.__backupDone(id, ''), 0),
        backupClear: id => setTimeout(() => window.__backupDone(id, { ok: true }), 0), backupChooseFolder: id => setTimeout(() => window.__backupDone(id, { ok: false }), 0),
        toast: () => {}, copy: () => {}, paste: () => '', openUrl: () => {}, speak: () => {}, stopSpeak: () => {}, dictate: () => {}, saveFile: () => true, sendMail: () => {}
      };
    }, SECRET);
    await page.goto('https://appassets.androidplatform.net/index.html');
    await page.waitForTimeout(400);
    const result = await page.evaluate(async () => {
      const payload = window.hvBackupPayload();
      const reply = await window.hvBackup.write(payload);
      return { payload, written: window.__writtenBackup, reply };
    });
    assert.strictEqual(result.reply.ok, true);
    assert.ok(result.payload.includes('Historia segura'));
    assert.ok(result.written.includes('Historia segura'));
    assert.ok(!result.payload.includes(SECRET), 'La clave secreta apareció en el JSON de copia');
    assert.ok(!result.written.includes(SECRET), 'backupWrite recibió una clave secreta');
    console.log('Copia SAF simulada: OK; la clave señuelo no aparece.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
