const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(async()=>{
 const pv=(i)=>({len:i,memory:'m'+i,last:'u'+i,turn:i,state:{},now:'',opts:[],fin:false,ls:0});
 const s={id:'w',title:'T',syn:'x',genre:'Misterio',genres:[],scenes:[{t:'Escena uno larga y suficiente para existir en la historia de prueba.',m:{}},{t:'Escena dos que no me gusta nada.',m:{},a:'abro la puerta',pv:pv(1)},{t:'Escena tres posterior.',m:{},a:'entro',pv:pv(2)}],lore:[],turn:3,at:1,state:{},opts:[],premise:'p',prot:[],ce:[],memory:'mem',alt:{i:2,sc:{t:'x'}}};
 LIB.length=0;LIB.push(s);openStory(s);sample=async()=>({text:'{}'});
 const calls=[];window.ask=async(p,k,a)=>{calls.push({p:p});return {text:JSON.stringify({escena:'Escena dos completamente nueva escrita desde cero por El Cronista con otro enfoque distinto y varias frases diferentes para comprobar.',opciones:['a','b','c'],memoria:'mem2'})}};
 const o={};
 o.btn=[].slice.call(document.querySelectorAll('button')).filter(b=>b.textContent==='Borrar y reescribir').length;
 rewriteSheet(1);o.sheet=/Se borra esta escena y las 1 siguientes/.test(document.getElementById('gsheet').textContent);
 document.querySelector('#gsheet textarea').value='más tensión';
 [].slice.call(document.querySelectorAll('#gsheet button')).filter(b=>b.textContent==='Borrar y reescribir')[0].click();
 await new Promise(r=>setTimeout(r,900));
 o.n=s.scenes.length;o.t=s.scenes[1]&&s.scenes[1].t.slice(0,30);o.alt=!!s.alt;o.a=s.scenes[1]&&s.scenes[1].a;
 o.prompt=calls[0]&&/REESCRITURA COMPLETA/.test(calls[0].p)&&/más tensión/.test(calls[0].p)&&/abro la puerta/.test(calls[0].p);
 return o});
console.log(JSON.stringify(r));
if(r.btn<1)fail('boton');if(!r.sheet)fail('hoja');
if(r.n!==2||!/nueva escrita/.test(r.t)&&!/Escena dos completamente/.test(r.t))fail('escena '+r.n+r.t);
if(r.alt)fail('alt');if(r.a!=='abro la puerta')fail('accion');if(!r.prompt)fail('prompt');
if(errs.length)fail('err');console.log('OK reescribir');await b.close()})()
