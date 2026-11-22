const {chromium}=require('playwright');
const URL='file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));const btn=(root,t)=>[].slice.call(document.querySelectorAll(root+' button')).filter(x=>x.textContent===t)[0];
 const sc=[];for(let i=0;i<6;i++)sc.push({t:'Escena '+i+' texto.',m:{},pv:i?{memory:'m',turn:i,state:{},opts:[]}:undefined});
 const s={id:'r',title:'T',syn:'x',genre:'Ciencia ficción',genres:[],scenes:sc,lore:[],turn:6,at:Date.now(),state:{},opts:[],premise:'p',prot:[],ce:[2,4],memory:'',lay:{1:{sz:'s'},3:{sz:'w'},5:{sz:'f'}}};
 LIB.length=0;LIB.push(s);openStory(s);const m=ensureMem(s);m.ctit={1:'Uno',2:'Dos',3:'Tres'};
 // quitar escena 2 (índice 1), en medio
 removeSceneSheet(1);await wait(50);o.sheet=/SOLO esta escena/.test($('gsheet').textContent);btn('#gsheet','Quitar escena').click();await wait(80);
 o.a=s.scenes.map(x=>x.t.match(/\d/)[0]).join('')+'|'+s.ce.join(',')+'|'+JSON.stringify(s.lay)+'|'+$('own').value;
 // quitar índices 1 y ... vaciar capítulo 2: escenas ahora 0,2,3,4,5 ce [1,3]; capítulo 2 = índices 1,2 → quitar ambos
 removeScene(s,1);removeScene(s,1);o.b=s.scenes.map(x=>x.t.match(/\d/)[0]).join('')+'|'+s.ce.join(',')+'|'+JSON.stringify(m.ctit);
 // quitar la última
 removeScene(s,s.scenes.length-1);o.c=s.scenes.map(x=>x.t.match(/\d/)[0]).join('')+'|'+(s.ce||[]).join(',');
 o.vers=(s.vers||[]).length;
 // botón en ⋯
 render(true);const d=document.createElement('div');document.body.appendChild(d);try{d.appendChild(sceneImg(s.scenes[1],1))}catch(e){o.err=String(e)}o.menu=!![].slice.call(document.querySelectorAll('button')).filter(x=>x.textContent==='Quitar esta escena').length;
 return o});
console.log(JSON.stringify(r));
if(!(r.sheet&&r.a==='02345|1,3|{"2":{"sz":"w"},"4":{"sz":"f"}}|'&&r.b==='045|1|{"1":"Uno","2":"Tres"}'&&r.c==='04|1'&&r.menu)||errs.length){console.log('FALLA',errs);process.exit(1)}console.log('OK quitar escena');await b.close()})()
