// Router de IAs: respaldo, clasificación, tamaño de prompt compacto
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{
  const sec={key_gemini:'G',key_mistral:'M',key_groq:'gsk_x'}, calls=[]; window.__calls=calls; window.__beh={};
  const base={storeLoadAll:()=>JSON.stringify({'hv:ai:v1':JSON.stringify({mode:'gemini',models:{}})}),storeSet(){},storeRemove(){},secretGet:k=>sec[k]||'',secretSet(k,v){sec[k]=v},online:()=>true,toast(m){(window.__toasts=window.__toasts||[]).push(m)},
   http(id,url,h,body){const host=new URL(url).host;calls.push(host+' '+(JSON.parse(body).model||''));const bh=window.__beh[host]||'ok';
     setTimeout(()=>window.__httpDone(id,bh==='429'?429:200,bh==='429'?'{"error":{"message":"quota"}}':(host.includes('google')?JSON.stringify({candidates:[{content:{parts:[{text:'{"ok":1}'}]}}]}):JSON.stringify({choices:[{message:{content:'{"ok":"'+host+'"}'}}]}))),5)}};
  window.Native=new Proxy(base,{get:(t,k)=>k in t?t[k]:(()=>'' )});
});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(800);
const o=await p.evaluate(async()=>{
  const S=await window.claude.use('sample'); const out={};
  window.__calls.length=0; let r=await S('hola',{kind:'quality'}); out.q_ok=[r.via.prov,window.__calls.join('|')];
  window.__calls.length=0; window.__beh['generativelanguage.googleapis.com']='429'; r=await S('hola',{kind:'quality'}); out.q_fb=[r.via.prov,r.via.fb,window.__calls.join('|')];
  window.__calls.length=0; r=await S('hola',{kind:'quality'}); out.q_cool=[r.via.prov,window.__calls.join('|')]; // gemini en pausa
  window.__beh['generativelanguage.googleapis.com']='ok'; window.__beh['api.mistral.ai']='429';
  window.__calls.length=0; r=await S('hola',{kind:'light'}); out.light=[r.via.prov,r.via.model,window.__calls.join('|')];
  // todo falla
  window.__beh['api.groq.com']='429'; window.__beh['generativelanguage.googleapis.com']='429';
  let e=null; try{await S('x',{kind:'quality'})}catch(x){e=x} out.allfail=[e&&e.code,(e&&e.message||'').slice(-70)];
  return out;});
console.log(JSON.stringify(o,null,1));
// tamaño del prompt
const o2=await p.evaluate(()=>{
 const sc=[];for(let i=0;i<30;i++)sc.push({t:'Escena '+i+'. '+'Texto de la escena con detalles y diálogo. '.repeat(25),m:{},o:[],st:{},a:'hago algo'});
 const lore=[];for(let i=0;i<20;i++)lore.push({tipo:'personaje',nombre:'P'+i,desc:'Descripción del personaje '.repeat(8)});
 const st={id:'q1',title:'N',syn:'s',premise:'premisa',genre:'Aventura',genres:['Aventura','Misterio'],scenes:sc,lore,mem:null,ce:[],turn:30,state:{},opts:[],author:'Sobrio',memory:'resumen '.repeat(60)};
 LIB.push(st);openStory(st);
 const a=build(st,'abro la puerta','',false).length,c=build(st,'abro la puerta','',false,true).length;return {full:a,compact:c};});
console.log(JSON.stringify(o2),errs);await b.close()})();
