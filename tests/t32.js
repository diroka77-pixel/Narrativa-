const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.__prompts=[];
 window.claude={use:async k=>k==='sample'?async q=>{__prompts.push(q);const i=cur.scenes.length+1;
  if(/Explica en español sencillo/.test(q)) return {text:'Significa algo raro.'};
  return{text:JSON.stringify({escena:'Escena '+i+'. La compuerta cedió con un chirrido y el aire frío entró.'+' palabra'.repeat(60),opciones:['a','b','c'],mem:{eventos:[{que:'e'+i}]},estado:{}})}}:null};
 window.hvCurModel=()=> 'gemini-test';
 window.hvDefine=async w=>JSON.stringify({query:{pages:{1:{extract:'compuerta\nSustantivo: Puerta pequeña.'}}}});
});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(500);
const o={};
o.r=await p.evaluate(async()=>{
 const st={id:'f1',title:'Hist',syn:'s',genre:'Aventura',genres:['Aventura'],scenes:[],lore:[],mem:null,ce:[],turn:0,state:{},opts:[]};
 LIB.push(st);openStory(st);await new Promise(r=>setTimeout(r,1200));
 return {scenes:cur.scenes.length};});
await p.waitForTimeout(1500);
o.pill=await p.evaluate(()=>({t:$('qpill').textContent,hid:$('qpill').hidden,t2:$('qpill2').textContent}));
o.use=await p.evaluate(()=>JSON.stringify(useGet().m));
await p.evaluate(()=>quotaSheet());
o.sheet=await p.evaluate(()=>$('gsheet').innerText.slice(0,260));
// limite
await p.evaluate(()=>{closeSheet();const u=useGet();u.lims={'gemini-test':10};useSave(u);usePill()});
o.pillLim=await p.evaluate(()=>$('qpill').textContent);
// rama
const fk=await p.evaluate(async()=>{ if(cur.scenes.length<2){return 'pocas'} cur.endIn=3; const f=forkStory(cur,2); return {endIn:f.endIn,fork:f.fork,title:f.title}});
o.fork=fk;
await p.evaluate(()=>{ if(cur.scenes.length>=2){const f=forkStory(cur,2);LIB.push(f);} renderLib && 0;});
// diccionario
o.word=await p.evaluate(()=>{const w=wordAt; return typeof w});
await p.evaluate(()=>dictSheet('compuerta','la compuerta cedió'));
await p.waitForTimeout(300);
o.dict=await p.evaluate(()=>$('gsheet').innerText.slice(0,200));
await p.evaluate(()=>{[...document.querySelectorAll('#gsheet button')].find(b=>/IA/.test(b.textContent)).click()});
await p.waitForTimeout(500);
o.dictAI=await p.evaluate(()=>$('gsheet').innerText.slice(0,200));
o.use2=await p.evaluate(()=>JSON.stringify(useGet().m));
console.log(JSON.stringify(o,null,1));console.log('errores',errs);
await b.close()})();
