const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.__saved=[];window.__prompts=[];
 window.claude={use:async k=>k==='sample'?async q=>{__prompts.push(q);
  if(q.includes('editor de continuidad exigente'))return{text:'{"avisos":["Marta repite la imagen del humo","Falta cerrar la promesa del mapa"]}'};
  const i=cur.scenes.length+1;
  return{text:JSON.stringify({escena:'Escena '+i+': Marta habló con Joaquín.\n\nOtra línea.',opciones:['a','b','c'],memoria:{personajes:[{nombre:'Marta',ubicacion:'plaza'},{nombre:'Joaquín',ubicacion:'plaza'}]},estado:{}})}}:
  k==='downloads'?{save:async o=>{__saved.push(o.filename+':'+o.data.length)}}:null}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
await p.evaluate(()=>{RD.type=false;const s={id:'77',title:'Larga',syn:'s',genre:'Misterio',genres:['Misterio'],premise:'p',lore:[{tipo:'protagonista',nombre:'Marta',desc:'detective'}],prot:[{name:'Marta'}],memory:'',last:'',turn:0,state:{},scenes:[],opts:[],fin:false,prev:null,review:false,at:Date.now(),critic:true,style:{sample:'Frases cortas. Secas.'}};LIB.push(s);openStory(s)});
await p.waitForTimeout(300);
for(let i=0;i<30;i++){try{await p.evaluate(async i=>{await turn('[ACCIÓN] sigo '+i,'x'+i)},i)}catch(e){console.log(i,e.message.slice(0,300));console.log(await p.evaluate(()=>JSON.stringify({m:!!cur.mem,keys:cur.mem&&Object.keys(cur.mem)})));break}}
const r=await p.evaluate(async()=>{
 const m=cur.mem;const out={};
 out.scenesInDom=document.querySelectorAll('#book .sc').length;
 out.warn=m.warn;
 const last=__prompts[__prompts.length-1];out.styleInPrompt=last.includes('ESTILO DEL AUTOR');out.warnInPrompt=last.includes('AVISOS DEL EDITOR');
 m.chars[Object.keys(m.chars)[0]].voice='habla seco';
 await turn('[ACCIÓN] z','z');out.voiceInPrompt=__prompts[__prompts.length-1].includes('VOZ DE LOS PERSONAJES');
 gotoScene(0);await new Promise(r=>setTimeout(r,300));out.afterGoto=document.querySelectorAll('#book .sc').length;
 try{await shareCard(3)}catch(e){out.shareErr=String(e)};out.emsg=document.getElementById('emsg').textContent;out.saved=__saved;
 for(const t of ['stats','rel']){ATL.tab=t;document.getElementById('atlbox').open=true;renderAtlas();out[t]=document.getElementById('atlbox').innerText.length;}
 out.relSvg=!!document.querySelector('#atlbox svg');out.chars=Object.keys(cur.mem.chars);out.relTxt=document.getElementById('atlbox').innerText.slice(-120);
 RD.hc=true;applyRead();out.hc=document.body.classList.contains('hc');
 return out});
console.log(JSON.stringify(r,null,1));console.log('errores',errs);await b.close()})();
