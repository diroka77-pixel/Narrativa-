const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
// hojas
await p.evaluate(()=>sheet('Prueba',sh=>{sh.appendChild(document.createTextNode('x'))}));
const an=await p.evaluate(()=>[getComputedStyle(document.getElementById('gsheet')).animationName,getComputedStyle(document.getElementById('gmodal')).animationName]);
if(an[0]!=='hvUp'||an[1]!=='hvFade')fail('hoja '+an);
await p.evaluate(()=>closeSheet());
// dado
await p.evaluate(()=>hvDie({d:17,dc:12,risk:'Arriesgado',tier:'pleno',crit:false,pifia:false}));
if(!await p.$('#hvdie.ok'))fail('dado no aparece');
await p.waitForTimeout(1300);
const t=await p.evaluate(()=>[document.querySelector('#hvdie .dd').textContent,document.querySelector('#hvdie').className,document.querySelector('#hvdie .tl').textContent]);
if(t[0]!=='17'||!/set/.test(t[1])||t[2]!=='Éxito')fail('dado final '+t);
await p.evaluate(()=>hvDie({d:1,dc:12,risk:'Arriesgado',tier:'fallo',crit:false,pifia:true}));
if(!await p.$('#hvdie.pif'))fail('pifia');
await p.waitForTimeout(3000);
if(await p.$('#hvdie'))fail('el dado no se retira');
// reducir movimiento
await p.evaluate(()=>{RD.calm=true;applyRead()});
await p.evaluate(()=>hvDie({d:5,dc:12,risk:'Seguro',tier:'fallo',crit:false,pifia:false}));
if(await p.$('#hvdie'))fail('dado con calma');
await p.evaluate(()=>sheet('P2',sh=>{}));
const an2=await p.evaluate(()=>getComputedStyle(document.getElementById('gsheet')).animationName);
if(an2!=='none')fail('calma no apaga animaciones '+an2);
if(errs.length)fail('errores');
console.log('OK anim');await b.close()})()
