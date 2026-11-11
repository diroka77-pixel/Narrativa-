const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,colorScheme:'dark'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
// imagen de prueba
const png=await p.evaluate(()=>{const c=document.createElement('canvas');c.width=300;c.height=400;const g=c.getContext('2d');g.fillStyle='#223';g.fillRect(0,0,300,400);g.fillStyle='#f0a';g.fillRect(60,60,180,240);return c.toDataURL('image/png').split(',')[1]});
const f='/tmp/canon_test.png';fs.writeFileSync(f,Buffer.from(png,'base64'));
await p.evaluate(()=>{window.__asked=null;
 const s={id:'c',title:'Neón',syn:'x',genre:'Misterio',genres:['Misterio'],scenes:[{t:'Sora entró. Vane la miró.',m:{}}],lore:[],turn:1,at:0,state:{},opts:[],premise:'p',prot:[{name:'Diroka',desc:'Vampiro'}],ce:[],memory:'m'};
 LIB.length=0;LIB.push(s);openStory(s);const m=ensureMem(s);const c=getChar(m,'Sora',0);c.desc='(ficha recuperada: completa sus datos a mano)';getChar(m,'Vane',0).desc='Soldado.';
 sample=async(q,o)=>{window.__asked={q:q,img:o&&o.image?String(o.image).slice(0,22):'',kind:o&&o.kind};return {text:'```json\n{"descripcion":"Netrunner mestiza de los niveles bajos.","fisico":"Delgada, 1,65 m, chaqueta táctica negra.","sexo":"mujer","edad":"24","pelo":"plateado, largo","ojos":"magenta","rasgos":"Visor rosa; implante en la sien.","caracter":"Sarcástica y leal.","canon":"Creció en el Distrito Colmillo. Hábil con redes; teme al clan Axis."}\n```'}};
 window.__c=c;window.__m=m;canonSheet(c,m)});
await p.setInputFiles('#gsheet input[type=file]',f);await p.waitForTimeout(900);
const r=await p.evaluate(async()=>{const o={};const c=window.__c,s=cur;const btn=t=>[].slice.call(document.querySelectorAll('#gsheet button')).filter(x=>x.textContent===t)[0];
 o.asked=window.__asked&&/canon/.test(window.__asked.q)&&/personaje Sora/.test(window.__asked.q)&&/no inventes/.test(window.__asked.q);o.img=window.__asked&&window.__asked.img;o.kind=window.__asked&&window.__asked.kind;
 const ins=document.querySelectorAll('#gsheet label input[type=text], #gsheet label textarea');o.fields=ins.length;o.v0=ins[0].value;
 ins[3].value='25';o.before=c.desc;
 document.querySelector('#gsheet label.chk input').checked=true;btn('Guardar como canon').click();await new Promise(r=>setTimeout(r,700));
 o.c=JSON.stringify({d:c.desc,b:c.body,f:c.fix,v:c.voice});o.face=(s.lore||[]).filter(x=>x.nombre==='Sora'&&/^data:image/.test(x.img||'')).length;
 o.fix=fixTxt(c);o.brief=fixTxt(c,1);const pr=build(s,'Sora habla','',null,false);o.inprompt=/canon del autor: Creció en el Distrito Colmillo/.test(pr);
 o.other=JSON.stringify(window.__m.chars[Object.keys(window.__m.chars).filter(k=>window.__m.chars[k].name==='Vane')[0]].desc);
 o.txt=/Canon del autor: Creció en el Distrito/.test(fichaTxt(s));
 ATL.tab='chars';try{atlasSheet()}catch(e){try{renderAtlas()}catch(e2){}}
 o.btn=[].slice.call(document.querySelectorAll('button')).filter(x=>x.textContent==='📷 Leer su canon desde una imagen').length;
 // error sin visión
 sample=async()=>{throw {code:'no_vision',message:'Para leer imágenes hace falta una clave de Gemini, OpenAI o Anthropic.'}};canonSheet(c,window.__m);return o});
await p.setInputFiles('#gsheet input[type=file]',f);await p.waitForTimeout(700);
r.err=await p.evaluate(()=>document.querySelector('#gsheet p[role=status]').textContent);
console.log(JSON.stringify(r,null,1));
if(!r.asked||r.img!=='data:image/jpeg;base64'||r.kind!=='quality')fail('ask');
if(r.fields!==9||r.v0!=='Netrunner mestiza de los niveles bajos.')fail('form');
const c=JSON.parse(r.c);if(c.d!=='Netrunner mestiza de los niveles bajos.'||c.b!=='Delgada, 1,65 m, chaqueta táctica negra.'||c.f.sex!=='mujer'||c.f.age!=='25'||c.f.hair!=='plateado, largo'||c.f.eyes!=='magenta'||!/Visor rosa/.test(c.f.note)||!/Creció en el Distrito/.test(c.f.canon)||c.v!=='Sarcástica y leal.')fail('guardado '+r.c);
if(r.face!==1||!/canon del autor/.test(r.fix)||/canon del autor/.test(r.brief)||!r.inprompt||r.other!=='"Soldado."'||!r.txt)fail('uso '+r.face+' '+r.inprompt+' '+r.txt);
if(r.btn<2)fail('boton '+r.btn);if(!/hace falta una clave de Gemini/.test(r.err))fail('error '+r.err);
// shim: formato de la petición con imagen
const sh=fs.readFileSync('/home/claude/v091/assets/shim.js','utf8');
if(!/inline_data: \{ mime_type: img\.mime/.test(sh)||!/type: "image_url"/.test(sh)||!/type: "image", source: \{ type: "base64"/.test(sh)||!/no_vision/.test(sh))fail('shim');
if(process.env.SHOT){await p.evaluate(()=>{closeSheet();sample=async()=>({text:'{"descripcion":"Netrunner mestiza de los niveles bajos.","fisico":"Delgada, chaqueta táctica negra.","sexo":"mujer","edad":"24","pelo":"plateado, largo","ojos":"magenta","rasgos":"Visor rosa; implante en la sien.","caracter":"Sarcástica y leal.","canon":"Creció en el Distrito Colmillo."}'});canonSheet(window.__c,window.__m)});await p.setInputFiles('#gsheet input[type=file]',f);await p.waitForTimeout(900);await p.screenshot({path:process.env.SHOT})}
if(errs.length)fail('err');console.log('OK canon desde imagen');await b.close()})()
