const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('console',m=>console.log('PG:',m.text().slice(0,120)));p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{try{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')}catch(e){}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(700);
const r=await p.evaluate(async()=>{
const o={push:(...a)=>console.log('O',a.join(' ')),};const wait=ms=>new Promise(r=>setTimeout(r,ms));LIB.length=0;
function noisy(w,h,seed){const cv=document.createElement('canvas');cv.width=w;cv.height=h;const g=cv.getContext('2d');const id=g.createImageData(w,h);let x=seed;for(let i=0;i<id.data.length;i+=4){x=(x*1103515245+12345)&0x7fffffff;id.data[i]=x>>8&255;id.data[i+1]=x>>16&255;id.data[i+2]=(x>>4)&255;id.data[i+3]=255}g.putImageData(id,0,0);return cv.toDataURL('image/jpeg',0.9)}
const A=noisy(1800,1300,7),B=noisy(900,700,9);
const mk=(id,imgs)=>({id,title:'Hist '+id,syn:'x',genre:'M',genres:['M'],scenes:imgs.map((u,i)=>({t:'Escena '+i,m:{},img:u})),lore:[{tipo:'personaje',nombre:'Marta',desc:'d',img:B,sheet:A}],turn:3,at:1,state:{},opts:[],premise:'p',ce:[]});
const s1=mk('s1',[A,B,A]),s2=mk('s2',[B,B]);LIB.push(s1,s2);cur=s1;
const full=JSON.stringify(LIB).length;o.push('fullMB',(full/1048576).toFixed(2));
console.log('before mirror');save();await mirrorNow();console.log('after mirror');
const d=await idbOpen();const main=await idbReq(d.transaction('lib').objectStore('lib').get('main'));
o.push('mirror px',main.px,'stored MB',(main.js.length/1048576).toFixed(3));
const imgs=await idbReq(d.transaction('img').objectStore('img').getAll());o.push('imgsStored',imgs.length);
console.log('vers');for(let i=0;i<4;i++){await verSnap(s1,'t'+i,false);await wait(5)}
const vs=await verList('s1');o.push('versions',vs.length,'px',vs.every(v=>v.px),'isz KB',Math.round(vs[0].isz/1024),'size MB',(vs[0].size/1048576).toFixed(2));
const js=await recJs(vs[0]);const back=JSON.parse(js);o.push('roundtrip',JSON.stringify(back)===JSON.stringify(s1));
const js2=await recJs(main);o.push('mirrorRound',JSON.stringify(JSON.parse(js2))===JSON.stringify(LIB));
// legacy record (no px)
await idbTx('ver','readwrite',x=>{x.put({k:'old:1',sid:'old',ts:1,scenes:1,ch:1,size:10,appv:'0.9',reason:'x',auto:false,title:'Old',js:JSON.stringify(mk('old',[A]))})});
const dbx=await idbOpen();const lrec=await new Promise(r=>{const q=dbx.transaction('ver').objectStore('ver').get('old:1');q.onsuccess=()=>r(q.result);q.onerror=()=>r(null)});const legacy=await recJs(lrec);o.push('legacyOK',JSON.parse(legacy).id==='old');
// recoverCheck restores into empty lib
const saveLib=LIB.slice();LIB.length=0;localStorage.removeItem(KEY);await recoverCheck();await wait(300);
o.push('recovered',LIB.length,LIB[0]&&LIB[0].scenes[0].img===A);
// storage sheet
storSheet();await wait(700);o.push('sheet',document.body.innerText.includes('Espacio y almacenamiento'),document.body.innerText.includes('imágenes'),/versiones:/.test(document.body.innerText));
// reduce
const s=LIB[0];const x=await reduceImages(s,()=>{});o.push('reduce',Math.round(x.before/1024)+'KB->'+Math.round(x.after/1024)+'KB',x.changed,'/',x.total);
// prune & gc
const pr=await verPrune(1);const gc=await imgGC();o.push('pruned',pr,'gc',gc);
const v2=await verList('s1');o.push('left',v2.length);
return 1});
console.log(JSON.stringify(r),errs);
await p.screenshot({path:'/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/stor.png'});await b.close()})()
