const {chromium}=require('playwright');const fs=require('fs');const A='/home/claude/v08/assets/';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('https://appassets.androidplatform.net/**',r=>{const u=r.request().url().replace('https://appassets.androidplatform.net/','').replace(/^assets\//,'').split('?')[0]||'index.html';try{const ext=u.split('.').pop();r.fulfill({body:fs.readFileSync(A+u),contentType:{js:'text/javascript',html:'text/html',webp:'image/webp'}[ext]||'application/octet-stream'})}catch(e){r.fulfill({status:404})}});
await p.addInitScript(()=>{const st={},sec={};window.__opened=[];window.__clip='';window.__mode='ok';
 window.Native={storeLoadAll:()=>JSON.stringify(st),storeSet:(k,v)=>{st[k]=v},storeRemove:k=>{delete st[k]},secretGet:k=>sec[k]||'',secretSet:(k,v)=>{sec[k]=v;return true},toast:()=>{},copy:()=>{},paste:()=>window.__clip,openUrl:u=>{__opened.push(u)},speak(){},stopSpeak(){},dictate(){},saveFile(){return true},sendMail(){},
  http:(id,url,h,b)=>{setTimeout(()=>{const m=window.__mode;if(m==='ok')window.__httpDone(id,200,JSON.stringify({candidates:[{content:{parts:[{text:'listo'}]}}]}));else if(m==='bad')window.__httpDone(id,400,JSON.stringify({error:{message:'API key not valid'}}));else window.__httpDone(id,429,'{}')},30)}};});
await p.goto('https://appassets.androidplatform.net/index.html');await p.waitForTimeout(700);
// bienvenida -> Conectar mi IA
await p.evaluate(()=>{[...document.querySelectorAll('#gsheet button')].find(x=>x.textContent==='Conectar mi IA')?.click()});await p.waitForTimeout(300);
console.log('1 choose:',await p.evaluate(()=>document.querySelector('#hvai h2')?.textContent));await p.screenshot({path:'w1.png'});
const click=async t=>{await p.evaluate(t=>{const b=[...document.querySelectorAll('#hvai button')].find(x=>x.textContent.includes(t));if(!b)throw new Error('no '+t);b.click()},t);await p.waitForTimeout(150)};
await click('Gemini gratis');console.log('2',await p.evaluate(()=>document.querySelector('#hvai h2').textContent));
await click('Empezar');console.log('3',await p.evaluate(()=>document.querySelector('#hvai h2').textContent));await p.screenshot({path:'w2.png'});
await click('Abrir Google AI Studio');console.log('opened',await p.evaluate(()=>__opened));
await click('Hecho');console.log('4',await p.evaluate(()=>document.querySelector('#hvai h2').textContent));
await click('Hecho');console.log('5',await p.evaluate(()=>document.querySelector('#hvai h2').textContent));
await p.evaluate(()=>{window.__clip='AIzaSyA1234567890abcdefghijklmnopqrstuv'});
await click('Ya la tengo');console.log('6',await p.evaluate(()=>document.querySelector('#hvai h2').textContent),await p.evaluate(()=>[...document.querySelectorAll('#hvai button')].map(x=>x.textContent)));await p.screenshot({path:'w3.png'});
await click('Usar la clave que tienes copiada');
await p.evaluate(()=>{window.__mode='bad'});await click('Conectar y probar');await p.waitForTimeout(300);
console.log('fallo:',await p.evaluate(()=>document.querySelector('#hvai [role=status]').textContent.slice(0,120)));
await p.evaluate(()=>{window.__mode='ok'});await click('Conectar y probar');await p.waitForTimeout(400);
console.log('7',await p.evaluate(()=>document.querySelector('#hvai h2').textContent),await p.evaluate(()=>document.querySelector('#hvai .wz-ok').textContent));await p.screenshot({path:'w4.png'});
await click('Empezar a escribir');
console.log('estado',await p.evaluate(()=>document.getElementById('hvstat').textContent),'| cfg',await p.evaluate(()=>localStorage.getItem('hv:ai:v1')),'| wiz',await p.evaluate(()=>JSON.stringify(window.hvWizStats())));
// comparar
await p.evaluate(()=>{window.openAIWizard('compare')});await p.waitForTimeout(300);await p.evaluate(()=>{document.querySelector('#hvai .hv-sheet').scrollTop=0});await p.screenshot({path:'w5.png'});
console.log('compare cards',await p.evaluate(()=>document.querySelectorAll('#hvai .wz-model').length),await p.evaluate(()=>document.querySelector('#hvai .wz-model p b').textContent));
await p.evaluate(()=>document.getElementById('hvai').remove());
// sample sin conectar abre asistente
await p.evaluate(()=>{localStorage.removeItem('hv:ai:v1');window.Native.secretSet('key_gemini','')});
console.log(errs);await b.close()})();
