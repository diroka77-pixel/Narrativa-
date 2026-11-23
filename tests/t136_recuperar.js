const {chromium}=require('playwright');
const URL='file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));const btn=(root,t)=>[].slice.call(document.querySelectorAll(root+' button')).filter(x=>x.textContent===t)[0];
 const sc=[];for(let i=0;i<15;i++)sc.push({t:'Escena '+(i+1)+' única.',m:{},pv:i?{memory:'m',turn:i,state:{},opts:[]}:undefined});
 const s={id:'rec1',title:'T',syn:'x',genre:'Ciencia ficción',genres:[],scenes:sc,lore:[],turn:15,at:Date.now(),state:{},opts:[],premise:'p',prot:[],memory:'',ce:[14]};
 LIB.length=0;LIB.push(s);openStory(s);await wait(200);
 // menú: en una escena del medio no aparecen las opciones que borran las siguientes
 const d=document.createElement('div');d.id='tmpd';document.body.appendChild(d);d.appendChild(sceneImg(s.scenes[5],5));o.mid=!btn('#tmpd','Borrar desde aquí y escribir otra cosa')&&!!btn('#tmpd','Quitar esta escena');d.remove();
 const d2=document.createElement('div');document.body.appendChild(d2);d2.appendChild(sceneImg(s.scenes[14],14));o.last=!!btn('body','Borrar desde aquí y escribir otra cosa');d2.remove();
 // borrado antiguo (rewind) desde la 13
 rewindTo(11);await wait(600);o.after=s.scenes.length;
 s.scenes.push({t:'Escena nueva escrita después.',m:{}});save();
 $('more').click();$('recsc').click();await wait(1500);o.found=/2 escenas|3 escenas/.test($('gsheet').textContent);
 btn('#gsheet','Recuperar estas escenas').click();await wait(300);
 o.list=s.scenes.map(x=>x.t.replace(/Escena | única\.|scrita después\./g,'')).join(',');
 return o});
console.log(JSON.stringify(r));
if(!(r.mid&&r.last&&r.after===12&&r.found&&r.list==='1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,nueva e')||errs.length){console.log('FALLA',errs);process.exit(1)}console.log('OK recuperar escenas');await b.close()})()
