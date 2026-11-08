const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{try{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')}catch(e){}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{
const norm=t=>String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const G=norm(JSON.stringify(GUIDE)+JSON.stringify(TUT));
const skip=new Set(['back1','back2','cdback','impback','nookback','home','menu','hq','more1','tInicio','tHist','tPers','tMundo','tAjus','dhome','dchars','dbackup','dvers','dstor','dtut','dhelp','dtheme','dhcov','dlib','dczoom','stoplisten','imx','pgprev','pgnext','pgtog','listenpick','immb','bgb','cm-s','cm-a','impstudy','esave','cplay','cedbtn','cback','csave','cnew','hldef','hlsub','hlfic','hlcopy','spellb','polish','fichat','nookgo','fmt-n','fmt-r','make','new','quick','paddnew','paddpick','impgo','dict','twist','pcopy','pclose']);
const missing=[];document.querySelectorAll('button').forEach(b=>{const t=norm(b.textContent);if(!t||t.length<3)return;if(b.id&&skip.has(b.id))return;if(b.closest('#ideasrow')||b.closest('#ideas'))return;if(!G.includes(t)&&!G.includes(t.split(' ').slice(0,3).join(' ')))missing.push((b.id||'-')+':'+b.textContent.trim().slice(0,40))});
return {missing}});
console.log(JSON.stringify(r),errs);process.exit(r.missing.length?1:0)})()
