const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
const r=await p.evaluate(()=>{const s={vocab:[{from:'vampiro',to:'tenebrio'},{from:'maldición',to:''}],scenes:[]};
return [vocabApply(s,'El vampiro vio a los vampiros. Una vampira. ¡VAMPIROS! Vampiro.'),vocabBanned(s,'La maldiciones y la Maldición'),vocabBanned(s,'nada'),vocabCtx(s).slice(0,120)]});
console.log(JSON.stringify(r));console.log('errs',errs);await b.close()})();
