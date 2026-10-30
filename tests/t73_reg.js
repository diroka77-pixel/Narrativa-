const {chromium}=require('playwright');const fs=require('fs');
const SP='/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.__saved=[];window.claude={use:async(k)=>({save:async(o)=>{window.__saved.push({n:o.filename,d:Array.from(o.data)})}})};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{
const o={};
// sha: vectores y comparación con subtle
const enc=new TextEncoder();
o.shaEmpty=hvHex(sha256js(new Uint8Array(0)));o.shaAbc=hvHex(sha256js(enc.encode('abc')));
const big=new Uint8Array(100000);for(let i=0;i<big.length;i++)big[i]=(i*31+7)&255;
o.big=[hvHex(sha256js(big)),hvHex(new Uint8Array(await crypto.subtle.digest('SHA-256',big)))];
o.uuid=hvUuid();
LIB.length=0;const s={id:String(Date.now()-86400000),title:'Neón y Colmillos',syn:'x',genre:'Ciberpunk',genres:[],scenes:[{t:'Primera escena del tenebrio.',m:{},a:'Abro la puerta',d:Date.now()-5000},{t:'Segunda.',m:{},ed:[Date.now()]},{t:'Antigua sin fecha.',m:{}}],lore:[{tipo:'lugar',nombre:'X',desc:'y'}],turn:3,at:Date.now(),state:{},opts:[],premise:'p',prot:[],ce:[],wl:[{id:'a',h:'h',t:'t',rev:1}]};LIB.push(s);save();openStory(s);
authSet({aid:authGet().aid,name:'Seudónimo Prueba',showName:true,showId:true});
await exportAs('epub');await new Promise(r=>setTimeout(r,800));await exportAs('epub');await new Promise(r=>setTimeout(r,800));
o.saved=window.__saved.map(x=>x.n);o.reg=JSON.stringify(s.reg);
const st=document.createElement('p');await regDoPdf(s,st,1);o.pdfMsg=st.textContent;o.saved2=window.__saved.map(x=>x.n);
// verificar
const e=window.__saved[0];const f=new File([new Uint8Array(e.d)],'x.epub');const out=document.createElement('p');await regVerify(f,out);o.ver=out.textContent;
const f2=new File([new Uint8Array([1,2,3])],'y.epub');const out2=document.createElement('p');await regVerify(f2,out2);o.ver2=out2.textContent.slice(0,60);
libSheet();o.lib=document.getElementById('gsheet').textContent.slice(0,200);
return o});
fs.writeFileSync(SP+'saved.json',JSON.stringify(await p.evaluate(()=>window.__saved)));
console.log(JSON.stringify(r,null,1),errs);await b.close()})()
