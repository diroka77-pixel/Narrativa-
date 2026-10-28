const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(500);
const mk=()=>p.evaluate(()=>{LIB.push({id:'s1',title:'Mi novela',syn:'x',genre:'Ciberpunk',genres:['Ciberpunk'],scenes:Array.from({length:6},(_,i)=>({t:'Escena '+i,m:{}})),lore:[],turn:7,at:Date.now(),state:{},opts:[],premise:'p',prot:[],ce:[]});save();openStory(LIB[LIB.length-1]);return true});
await mk();
// 1 mirror
await p.evaluate(()=>mirrorNow());await p.waitForTimeout(300);
const m1=await p.evaluate(async()=>{const d=await idbOpen();const r=await idbReq(d.transaction('lib').objectStore('lib').get('main'));return r&&JSON.parse(r.js).length});
// 2 rotation
const rot=await p.evaluate(async()=>{const s=cur;for(let i=0;i<14;i++){s.scenes.push({t:'x'+i,m:{}});await verSnap(s,'t'+i,false)}const a=await verList(s.id);return [a.length,a[0].scenes,a[a.length-1].scenes]});
// 3 restore
const rest=await p.evaluate(async()=>{const s=cur;const a=await verList(s.id);const old=a[a.length-1];const o=JSON.parse(old.js);const before=(await verList(s.id)).length;
await verSnap(s,'Antes de restaurar',false);const idx=LIB.findIndex(x=>x.id===s.id);LIB[idx]=o;save();return [LIB[idx].scenes.length,old.scenes]});
// 4 delete + recover list
const del=await p.evaluate(async()=>{const s=LIB[0];await verSnap(s,'Antes de borrar',false);LIB=LIB.filter(x=>x.id!==s.id);save();recoverSheet();await new Promise(r=>setTimeout(r,500));return document.getElementById('gsheet').textContent.includes('Mi novela')});
// 5 quota failure: setItem throws, mirror still saved
const q=await p.evaluate(async()=>{LIB.push({id:'s2',title:'Otra',syn:'x',genre:'Ciberpunk',genres:[],scenes:[{t:'a',m:{}}],lore:[],turn:1,at:Date.now(),state:{},opts:[],premise:'p',prot:[],ce:[]});
const orig=Storage.prototype.setItem;Storage.prototype.setItem=function(k){if(k==='narrador:v1')throw new Error('quota');return orig.apply(this,arguments)};
const ok=save();Storage.prototype.setItem=orig;await mirrorNow();const d=await idbOpen();const r=await idbReq(d.transaction('lib').objectStore('lib').get('main'));return [ok,JSON.parse(r.js).some(x=>x.id==='s2'),!!localStorage.getItem('hv:saveerr')]});
console.log(JSON.stringify({m1,rot,rest,del,q}));
// 6 recovery after localStorage wiped
await p.evaluate(()=>{localStorage.removeItem('narrador:v1')});await p.reload();await p.waitForTimeout(2500);
const rec=await p.evaluate(()=>LIB.map(x=>x.id));
// 7 corrupt data
await p.evaluate(()=>{localStorage.setItem('narrador:v1','{rota')});await p.reload();await p.waitForTimeout(2500);
const rec2=await p.evaluate(()=>[LIB.map(x=>x.id),!!localStorage.getItem('narrador:v1:corrupt')]);
console.log(JSON.stringify({rec,rec2}));console.log('errs',errs);await b.close()})();
