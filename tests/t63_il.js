const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  await page.addInitScript(() => {
    window.claude = { use: async () => null };
    localStorage.setItem('hv:welcome', '1');
  });
  const app = pathToFileURL(path.resolve(__dirname, '../app/src/main/assets/index.html')).href;
  await page.goto(app);
  await page.waitForTimeout(400);
  const result = await page.evaluate(async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 600;
    canvas.getContext('2d').fillRect(0, 0, 400, 600);
    const image = canvas.toDataURL('image/jpeg');
    LIB.push({ id: 'i1', title: 'T', syn: 'x', genre: 'Ciberpunk', genres: [], scenes: [{ t: 'Hola.', m: {}, img: image }, { t: 'Adiós.', m: {}, img: image }], lore: [], turn: 2, at: 1, state: {}, opts: [], premise: 'p', prot: [], ce: [] });
    save();
    openStory(LIB[0]);
    const buttons = () => [...document.querySelectorAll('button')].filter(x => x.textContent.startsWith('Formato:'));
    buttons()[0].click();
    const vertical = document.querySelectorAll('.simg.v').length;
    const verticalPrompt = localPrompt(LIB[0], 'scene', 0);
    buttons()[0].click();
    return {
      vertical,
      verticalPrompt,
      fullPage: document.querySelectorAll('.simg.p').length,
      fullPagePrompt: localPrompt(LIB[0], 'scene', 0)
    };
  });
  await browser.close();
  if (errors.length) throw new Error(`Errores de página: ${errors.join(' | ')}`);
  if (result.vertical !== 1 || !result.verticalPrompt.includes('formato vertical 2:3')) throw new Error('El formato vertical no se aplicó correctamente.');
  if (result.fullPage !== 1 || !result.fullPagePrompt.includes('página completa')) throw new Error('El formato de página completa no se aplicó correctamente.');
  console.log(JSON.stringify(result));
})().catch(error => {
  console.error(error);
  process.exit(1);
});
