const {chromium}=require('playwright');
const URL='file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1');localStorage.setItem('hv:author',JSON.stringify({name:'DJ Rodríguez'}))});
await p.goto(URL);await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));const btn=t=>[].slice.call(document.querySelectorAll('#gsheet button')).filter(x=>x.textContent===t)[0];
 const cv=document.createElement('canvas');cv.width=300;cv.height=450;cv.getContext('2d').fillRect(0,0,300,450);const IMG=cv.toDataURL('image/jpeg');
 const s={id:'z',title:'T',syn:'x',genre:'Ciencia ficción',genres:[],cover:IMG,scenes:[{t:'a',m:{}}],lore:[],turn:1,at:Date.now(),state:{},opts:[],premise:'p',prot:[],ce:[],memory:''};
 LIB.length=0;LIB.push(s);openStory(s);
 await stampCover(s);o.def=covUrl(s)===s.cover;
 // subir portada: pregunta
 const blob=await (await fetch(IMG)).blob();takeImage(blob,'cover');await wait(800);o.ask=/ya lleva tu nombre/.test($('gsheet').textContent);
 btn('No, añádelo tú').click();await wait(100);o.no=s.covSigned===false;await stampCover(s);o.stamped=covUrl(s)!==s.cover;
 const ck=[].slice.call(document.querySelectorAll('#imgbody label.chk, #cimg label.chk')).filter(l=>/Añadir mi firma encima/.test(l.textContent))[0];o.ck=!!ck&&ck.querySelector('input').checked;
 ck.querySelector('input').click();await wait(50);o.off=s.covSigned===true&&covUrl(s)===s.cover;
 return o});
console.log(JSON.stringify(r));
if(!r.def||!r.ask||!r.no||!r.stamped||!r.ck||!r.off||errs.length){console.log('FALLA',errs);process.exit(1)}console.log('OK sin firma');await b.close()})()
