const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(()=>{
 const s={id:'q',title:'Faro',syn:'x',genre:'Misterio',genres:[],scenes:[{t:'Llegas al faro del puerto.',m:{}}],lore:[],turn:1,at:1,state:{},opts:[],premise:'p',prot:[],ce:[],wl:[]};
 LIB.length=0;LIB.push(s);openStory(s);
 const big=('Los antiguos reyes del mar construyeron el faro del puerto para guiar a los muertos. '.repeat(40)); // un bloque largo sin saltos
 const parts=wlSplit(big);
 s.wl.push({id:'a',h:'El faro',t:'El faro del puerto fue levantado por los reyes del mar para guiar a los muertos.',rev:1,pin:false,on:true});
 s.wl.push({id:'b',h:'Abierto',t:'La ciudad de Brumal tiene tres puertas de bronce en el puerto.',rev:1,pin:false,open:true,on:true});
 const c=wlCtx(s,'miro el faro del puerto y las puertas',false);
 renderWl();
 return {n:parts.length,max:Math.max(...parts.map(x=>x.t.length)),disc:/El faro · DISCRETO/.test(c),lib:/Abierto · LIBRE/.test(c),rule:/DISCRECIÓN DEL LORE/.test(c),ui:/Permitir contarlo con claridad/.test(document.getElementById('wlbody').textContent)&&!!document.querySelector('#wlbody input[type=file]')}});
console.log(JSON.stringify(r));
if(r.n<3||r.max>1600)fail('split largo');
if(!r.disc||!r.rule)fail('ctx');
if(!r.ui)fail('ui');
// archivo de texto
fs.writeFileSync('/tmp/lore_test.txt','Historia antigua\n\nLos reyes del mar cayeron en la guerra de la marea.\n\nLas razas\n\nLos tritones viven bajo el faro.\n');
await p.evaluate(()=>{LIB[0].wl.length=0;renderWl()});
await p.setInputFiles('#wlbody input[type=file]','/tmp/lore_test.txt');await p.waitForTimeout(800);
const n=await p.evaluate(()=>LIB[0].wl.length);if(n<2)fail('archivo '+n);
if(errs.length)fail('errores');console.log('OK lore2',n);await b.close()})()
