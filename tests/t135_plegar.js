const {chromium}=require('playwright');
const URL='file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));
 const sc=[];for(let i=0;i<15;i++)sc.push({t:'Escena '+(i+1)+'. '+'Texto de la escena. '.repeat(40),a:'acción',m:{},pv:i?{memory:'m',turn:i,state:{},opts:[]}:undefined});
 const s={id:'r',title:'T',syn:'x',genre:'Ciencia ficción',genres:[],scenes:sc,lore:[],turn:15,at:Date.now(),state:{},opts:['Ir'],premise:'p',prot:[],memory:''};
 LIB.length=0;LIB.push(s);openStory(s);await wait(300);
 $('more').click();$('exp').click();o.expOpen=!$('exprow').hidden&&$('exp').textContent.indexOf('Plegar')>=0;
 removeSceneSheet(12);await wait(50);[].slice.call(document.querySelectorAll('#gsheet button')).filter(x=>x.textContent==='Quitar escena')[0].click();await wait(900);
 const e=$('sc-12');const rc=e.getBoundingClientRect();o.rc=Math.round(rc.top)+'|'+window.scrollY;o.at=e.textContent.indexOf('Escena 14')>=0&&rc.top<400&&rc.bottom>0;o.menus=$('moremenu').hidden&&$('exprow').hidden;
 $('more').click();$('exp').click();$('expfold').click();o.fold1=$('exprow').hidden;
 $('ctrlfold').click();o.fold2=$('ctrl').classList.contains('fold')&&getComputedStyle($('own')).display==='none'&&localStorage.getItem('hv:ctrlfold')==='1'&&!$('ctrlq').hidden;
 $('ctrlfold').click();o.fold3=!$('ctrl').classList.contains('fold')&&getComputedStyle($('own')).display!=='none';
 return o});
console.log(JSON.stringify(r));
if(!(r.expOpen&&r.at&&r.menus&&r.fold1&&r.fold2&&r.fold3)||errs.length){console.log('FALLA',errs);process.exit(1)}console.log('OK plegar y quitar');await b.close()})()
