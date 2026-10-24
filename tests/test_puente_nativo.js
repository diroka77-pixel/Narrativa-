const {chromium}=require('playwright');const fs=require('fs');
const A='/home/claude/apk/HistoriasVivas/app/src/main/assets/';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:900}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console:'+m.text())});
await p.route('https://appassets.androidplatform.net/**',r=>{const f=r.request().url().split('/').pop().split('?')[0]||'index.html';try{r.fulfill({body:fs.readFileSync(A+f),contentType:f.endsWith('.js')?'text/javascript':'text/html'})}catch(e){r.fulfill({status:404})}});
await p.addInitScript(()=>{const st={'narrador:v1':'[]'},sec={};window.__calls=[];
 window.Native=new Proxy({storeLoadAll:()=>JSON.stringify(st),storeSet:(k,v)=>{st[k]=v},storeRemove:k=>{delete st[k]},secretGet:k=>sec[k]||'',secretSet:(k,v)=>{sec[k]=v;return true},
  http:(...a)=>{__calls.push(a);return ''},toast:()=>{},copy:()=>{},paste:()=>'',openUrl:()=>{},speak:()=>{},stopSpeak:()=>{},dictate:()=>{},saveFile:()=>{},sendMail:()=>{}},{get:(t,k)=>k in t?t[k]:(()=>{__calls.push(['??',k]);return ''})})});
await p.goto('https://appassets.androidplatform.net/assets/index.html').catch(e=>errs.push('goto '+e.message));
await p.goto('https://appassets.androidplatform.net/index.html');
await p.waitForTimeout(800);
console.log('menú conectar:',await p.evaluate(()=>[...document.querySelectorAll('button')].some(x=>/Conectar mi IA/.test(x.textContent))),'| bienvenida',await p.evaluate(()=>!document.getElementById('gmodal').hidden));
console.log('localStorage→Native:',await p.evaluate(()=>{localStorage.setItem('hv:x','1');return localStorage.getItem('hv:x')}));
await p.evaluate(()=>{window.openAISettings();});await p.waitForTimeout(200);
console.log('ajustes IA:',await p.evaluate(()=>document.getElementById('hvai')?document.getElementById('hvai').innerText.replace(/\s+/g,' ').slice(0,300):'NO'));
console.log('llamadas desconocidas',await p.evaluate(()=>__calls.filter(c=>c[0]==='??')));
console.log(errs);await b.close()})();
