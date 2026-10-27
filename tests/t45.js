// Corrector ortográfico
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.__q=[];window.claude={use:async k=>k==='sample'?async q=>{window.__q.push(q);const ws=[...q.matchAll(/«([^»]+)» en:/g)].map(x=>x[1]);return {text:JSON.stringify({c:ws.map(w=>w==='nuve'?{w,ok:false,fix:'nube'}:{w,ok:true,fix:''})})}}:null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
const clean=fs.readFileSync('/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/plan.txt','utf8').replace(/\s+/g,' ').slice(0,6000);
const o=await p.evaluate(async(clean)=>{
 const st={id:'q1',title:'N',syn:'s',premise:'p',genre:'Aventura',genres:['Aventura'],scenes:[{t:'Diroka vio una nuve de gas y dijo que despues tambien pasaría. Kaelen y Dorgo corrían por las naves derrumbadas; los chatarreros sabían moverse sin ser vistos.',m:{},o:[],st:{}}],lore:[{tipo:'personaje',nombre:'Kaelen',desc:'x'}],mem:null,ce:[],turn:1,state:{},opts:[],prot:[{name:'Diroka'}]};
 LIB.push(st);openStory(st);const r={};
 r.load=await spellLoad();
 r.ok=['casa','pasillos','canciones','cancion','resúmenes','derrumbadas','rápidamente','dándole','chatarreros','hablarle','vampiro'].map(w=>spOK(w));
 r.bad=['nuve','despues','tambien','pasilos'].map(w=>spOK(w));
 const t=await spellText(st,st.scenes[0].t,true);r.text=t.text;r.n=t.n;r.aiCalls=window.__q.length;
 const known=spKnown(st);r.cleanFlags=spFlags(st,clean,known).map(f=>f.w);
 return r;},clean);
console.log(JSON.stringify(o,null,1),errs);await b.close()})();
