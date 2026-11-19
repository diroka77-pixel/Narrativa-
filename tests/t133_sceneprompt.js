const {chromium}=require('playwright');
const URL='file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1');localStorage.setItem('hv:author',JSON.stringify({name:'DJ',skipAsk:true}))});
await p.goto(URL);await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));
 const long='Diroka cruzó el umbral del refugio en Los Subniveles de Cromo. Vane se giró levantando el arma. '+'La lluvia ácida golpeaba los cristales. '.repeat(30)+'FINAL_DE_ESCENA.';
 const s={id:'q',title:'Neón',syn:'x',genre:'Ciencia ficción',genres:[],scenes:[{t:'Antes, Sora reparaba el módulo.',m:{}},{t:long,m:{}}],lore:[{tipo:'lugar',nombre:'Los Subniveles de Cromo',desc:'Túneles industriales con neón rojo.'},{tipo:'personaje',nombre:'Sora',desc:'No sale.'}],turn:2,at:Date.now(),state:{},opts:[],premise:'p',prot:[{name:'Diroka',desc:'Tenebrio de pelo largo negro y ojos verdes'}],ce:[],memory:''};
 LIB.length=0;LIB.push(s);openStory(s);
 const m=ensureMem(s);const v=getChar(m,'Vane',1);v.desc='Mujer de pelo corto plateado, chaqueta táctica';v.fix={hair:'plateado corto',canon:'cicatriz en la ceja'};
 const X=sceneCtx(s,1);o.cast=X.cast.join(' || ');o.places=X.places.join('|');o.prev=X.prev;
 const lp=localPrompt(s,'scene',1);o.lp=/Vane: Mujer de pelo corto plateado/.test(lp)&&/Los Subniveles de Cromo/.test(lp)&&!/Sora/.test(lp)&&/adultos/.test(lp);
 let q='';sample=async(x)=>{q=x;return {text:'Plano medio de Diroka.'}};await makePrompt('scene',1);await wait(50);
 o.q=/director de arte/.test(q)&&/FINAL_DE_ESCENA/.test(q)&&/cicatriz en la ceja/.test(q)&&/JUSTO ANTES/.test(q)&&/180 a 260 palabras/.test(q);
 o.out=$('ptxt').value;$('pclose').click();
 q='';await makePrompt('cover');await wait(50);o.cov=/Máximo 140 palabras/.test(q);$('pclose').click();
 return o});
console.log(JSON.stringify(r));
if(!(/Vane/.test(r.cast)&&/Diroka: Tenebrio de pelo largo/.test(r.cast)&&!/Sora/.test(r.cast)&&/Cromo/.test(r.places)&&/Sora/.test(r.prev)&&r.lp&&r.q&&r.out==='Plano medio de Diroka. Todos los personajes son adultos.'&&r.cov)||errs.length){console.log('FALLA',errs);process.exit(1)}console.log('OK prompts de escena');await b.close()})()
