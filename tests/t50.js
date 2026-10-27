const {chromium}=require('playwright');
const SP='/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.claude={use:async k=>k==='sample'?async q=>({text:'Capitán del Faro Gris, vigila la costa desde hace treinta años.'}):null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(300);
await p.evaluate(()=>{const sc=[{t:'La niebla cubría el puerto. Orlan, el capitán del Faro Gris, encendió la lámpara.\n\nNadie en el pueblo recordaba cuándo había llegado la barca roja.',m:{},o:[],st:{}}];const st={id:'q1',title:'El Faro',syn:'s',premise:'Un pueblo costero y su faro.',genre:'Misterio',genres:['Misterio'],scenes:sc,lore:[],mem:null,ce:[],turn:1,state:{},opts:['a']};LIB.push(st);openStory(st)});await p.waitForTimeout(400);
// seleccionar "Faro Gris"
await p.evaluate(()=>{const pe=document.querySelector('#sc-0 p');const tn=pe.firstChild;const i=tn.textContent.indexOf('Faro Gris');const r=document.createRange();r.setStart(tn,i);r.setEnd(tn,i+9);const s=getSelection();s.removeAllRanges();s.addRange(r);document.dispatchEvent(new Event('selectionchange'))});await p.waitForTimeout(500);
console.log('bar visible',await p.evaluate(()=>!document.getElementById('hlbar').hidden),await p.evaluate(()=>HL.sel&&HL.sel.text));
await p.screenshot({path:SP+'hl1.png'});
console.log('def btn visible',await p.evaluate(()=>!document.getElementById('hldef').hidden));await p.click('#hlsub');await p.waitForTimeout(200);
console.log('mark',await p.evaluate(()=>[document.querySelectorAll('mark.hl').length,document.querySelector('mark.hl')&&document.querySelector('mark.hl').textContent,cur.scenes[0].hl,document.getElementById('hlbar').hidden]));
// persiste tras render
await p.evaluate(()=>render(true));console.log('after render',await p.evaluate(()=>document.querySelectorAll('mark.hl').length));
// crear ficha desde seleccion
await p.evaluate(()=>{const pe=document.querySelector('#sc-0 p');const w=document.createTreeWalker(pe,NodeFilter.SHOW_TEXT);let n,tn;while(n=w.nextNode()){if(n.textContent.indexOf('Orlan')>=0){tn=n;break}}const i=tn.textContent.indexOf('Orlan');const r=document.createRange();r.setStart(tn,i);r.setEnd(tn,i+5);const s=getSelection();s.removeAllRanges();s.addRange(r);document.dispatchEvent(new Event('selectionchange'))});await p.waitForTimeout(500);
await p.click('#hlfic');await p.waitForTimeout(300);
console.log('sheet',await p.evaluate(()=>[document.querySelector('#gsheet input').value,document.querySelector('#gsheet textarea').value]));
await p.screenshot({path:SP+'hl2.png'});
await p.click('#gsheet button:has-text("Que El Cronista")');await p.waitForTimeout(500);
console.log('gen',await p.evaluate(()=>document.querySelector('#gsheet textarea').value));
await p.click('#gsheet button:has-text("Guardar")');await p.waitForTimeout(300);
console.log('lore',await p.evaluate(()=>[JSON.stringify(cur.lore),Object.keys(ensureMem(cur).chars),loreTxt(cur).slice(0,90)]));
await p.evaluate(()=>{const pe=document.querySelector('#sc-0 p');const w=document.createTreeWalker(pe,NodeFilter.SHOW_TEXT);let n,tn;while(n=w.nextNode()){if(n.textContent.indexOf('puerto')>=0){tn=n;break}}const i=tn.textContent.indexOf('puerto');const r=document.createRange();r.setStart(tn,i);r.setEnd(tn,i+6);const s=getSelection();s.removeAllRanges();s.addRange(r);document.dispatchEvent(new Event('selectionchange'))});await p.waitForTimeout(500);await p.click('#hldef');await p.waitForTimeout(300);console.log('dict sheet',await p.evaluate(()=>document.querySelector('#gsheet h2').textContent));await p.click('#gsheet button:has-text("Cerrar")');await p.waitForTimeout(150);
// quitar subrayado
await p.click('mark.hl');await p.waitForTimeout(200);await p.click('#gsheet button:has-text("Quitar")');await p.waitForTimeout(200);
console.log('removed',await p.evaluate(()=>[document.querySelectorAll('mark.hl').length,cur.scenes[0].hl]));
console.log('errs',errs);await b.close()})();
