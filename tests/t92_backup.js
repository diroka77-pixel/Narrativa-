const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{try{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')}catch(e){}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const o=[];LIB.length=0;
function mk(w,h,seed){const cv=document.createElement('canvas');cv.width=w;cv.height=h;const g=cv.getContext('2d');for(let i=0;i<150;i++){g.fillStyle='hsl('+((i*seed)%360)+',55%,50%)';g.fillRect((i*31)%w,(i*47)%h,w/6,h/6)}return cv.toDataURL('image/jpeg',0.9)}
const A=mk(900,600,7),B=mk(900,600,11);
const s={id:'b1',title:'B',syn:'x',genre:'M',genres:['M'],scenes:[{t:'a',img:A},{t:'b',img:A},{t:'c',img:B},{t:'d',img:A}],lore:[{tipo:'personaje',nombre:'M',desc:'d',img:A}],turn:4,at:5,state:{},opts:[],premise:'p',ce:[]};
LIB.push(s);cur=s;save();
const full=localStorage.getItem('narrador:v1').length;const bk=backupData();const sz=JSON.stringify(bk).length;
o.push('fullKB',Math.round(full/1024),'backupKB',Math.round(sz/1024),'v',bk.v,'imgs',Object.keys(bk.imgs||{}).length);
// restore into an empty library
const payload=JSON.stringify(bk);LIB.length=0;const m={textContent:''};const ok=mergeBackup(JSON.parse(payload),m);
o.push('restored',ok,LIB.length,LIB[0]&&LIB[0].scenes[0].img===A,LIB[0]&&LIB[0].scenes[2].img===B,LIB[0]&&LIB[0].lore[0].img===A,m.textContent.slice(0,30));
// old v2 backup still works
LIB.length=0;const old={app:'historias-vivas',v:2,data:{'narrador:v1':JSON.stringify([s])}};o.push('v2',mergeBackup(old,m),LIB.length);
// broken backup (missing image)
LIB.length=0;const bad=JSON.parse(payload);bad.imgs={};o.push('incomplete',mergeBackup(bad,m),LIB.length,m.textContent.slice(0,32));
// identical-looking different images are not merged: same length different content
const u1='data:image/jpeg;base64,'+'A'.repeat(5000),u2='data:image/jpeg;base64,'+'A'.repeat(2500)+'B'+'A'.repeat(2499);
const pk=imgPack(JSON.stringify([u1,u2]));o.push('collisionSafe',JSON.stringify(Object.values(pk.map).length)==='2'||pk.js.indexOf('data:image')>0);
return o});
console.log(JSON.stringify(r),errs);await b.close()})()
