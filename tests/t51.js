const {chromium}=require('playwright');
const SP='/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.claude={use:async k=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(300);
await p.evaluate(()=>{const G=['Ciberpunk','Fantasía Épica','Misterio','Terror','Aventura','Ciencia Ficción','Romance','Western'];const T=['Neón y Colmillos: La Caída del Fundador','El Faro','La casa de la colina','El último colmillo de acero','La Odisea de los Setenta','Nave dormida','Bajo la lluvia','Reino de los recuerdos'];
 T.forEach((t,i)=>{const sc=[];for(let k=0;k<(i+1)*14;k++)sc.push({t:'x',m:{},o:[],st:{}});LIB.push({id:'s'+i,title:t,syn:'Sinopsis de '+t,genre:G[i],genres:[G[i]],scenes:sc,lore:[],turn:i,at:1000+i,state:{},opts:[]})});save();renderLib()});
console.log('cards',await p.evaluate(()=>document.querySelectorAll('#list .cc').length));
// archivar 6 desde menú
for(let i=0;i<6;i++){await p.click('#list .cc:first-child button:has-text("Opciones")');await p.waitForTimeout(120);await p.click('#gsheet button:has-text("Guardar en el Rincón")');await p.waitForTimeout(120)}
console.log('after archive',await p.evaluate(()=>[document.querySelectorAll('#list .cc').length,document.getElementById('nookn').textContent,document.getElementById('nookrow').hidden,LIB.filter(x=>x.arch).length,lastStory().title]));
await p.click('#nookgo');await p.waitForTimeout(300);
console.log('spines',await p.evaluate(()=>[document.querySelectorAll('.spine').length,document.querySelectorAll('.srow').length]));
await p.screenshot({path:SP+'nook1.png'});
await p.click('.spine:first-child');await p.waitForTimeout(200);await p.screenshot({path:SP+'nook2.png'});
await p.click('#gsheet button:has-text("Devolver")');await p.waitForTimeout(200);
console.log('after rescue',await p.evaluate(()=>[document.querySelectorAll('.spine').length,LIB.filter(x=>x.arch).length]));
// long press / contextmenu
await p.click('#nookback');await p.waitForTimeout(200);
await p.dispatchEvent('#list .cc:first-child .cover','contextmenu');await p.waitForTimeout(150);
console.log('ctx menu',await p.evaluate(()=>!document.getElementById('gmodal').hidden));
console.log('errs',errs);await b.close()})();
