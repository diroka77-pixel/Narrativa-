const {chromium}=require('playwright');
const URL='file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1');localStorage.setItem('hv:author',JSON.stringify({name:'DJ Rodríguez'}))});
await p.goto(URL);await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));
 const s={id:'p',title:'Neón',syn:'x',genre:'Ciencia ficción',genres:[],scenes:[{t:'Diroka cruza el umbral bajo la lluvia.',m:{}}],lore:[],turn:1,at:Date.now(),state:{},opts:[],premise:'p',prot:[{name:'Diroka',desc:'v'}],ce:[],memory:''};
 LIB.length=0;LIB.push(s);openStory(s);
 s.scenes[0].il='p';o.lay0=layOf(s,0).sz;s.scenes[0].il='o';o.lay1=layOf(s,0).sz;
 o.loc=/tercio inferior/.test(localPrompt(s,'scene',0))&&/sin texto ni letras/.test(localPrompt(s,'scene',0));
 layMut(s,0).opos='t';o.top=/tercio superior/.test(localPrompt(s,'scene',0));
 let q='';sample=async(x)=>{q=x;return {text:'Prompt visual.'}};await makePrompt('scene',0);await wait(50);o.ai=/página entera de libro con el texto/.test(q)&&/tercio superior/.test(q);$('pclose').click();
 delete s.scenes[0].il; render(true);refreshImages(true);
 return o});
console.log(JSON.stringify(r));
if(!(r.lay0==='f'&&r.lay1==='o'&&r.loc&&r.top&&r.ai)||errs.length){console.log('FALLA',errs);process.exit(1)}console.log('OK prompt página con texto');await b.close()})()
