const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{try{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')}catch(e){}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{
const o=[];const wait=ms=>new Promise(r=>setTimeout(r,ms));LIB.length=0;
const scenes=[];for(let i=0;i<40;i++)scenes.push({t:'Escena número '+i+'. La lluvia caía. '+(i==3?'Marta encontró el ANILLO del abuelo en el faro.':'')+(i==30?' Eliot vendió el anillo en el mercado de Málaga.':''),m:{},d:1,a:i==12?'Busco el Cráneo dorado':'',bm:i==20});
const s={id:'u1',title:'T',syn:'x',genre:'M',genres:['M'],scenes,lore:[],turn:40,at:1,state:{},opts:[],premise:'p',ce:[10,20,30]};
LIB.push(s);cur=s;sample=true;view('story');render();
o.push('tail',[...document.querySelectorAll('.tail')][0].querySelectorAll('button').length,'menuHidden',document.getElementById('moremenu').hidden);
document.getElementById('more').click();o.push('menuOpen',!document.getElementById('moremenu').hidden,document.getElementById('more').textContent);
document.getElementById('idxb').click();await wait(150);o.push('menuClosed',document.getElementById('moremenu').hidden,'sheet',document.body.innerText.includes('Capítulos (4)'),'marked',document.body.innerText.includes('Escenas marcadas (1)'));
const q=document.querySelector('input[type=search]');q.value='anillo';q.dispatchEvent(new Event('input'));await wait(400);
const btns=[...document.querySelectorAll('mark')];o.push('hits',btns.length,btns.map(m=>m.textContent).join('|'));
q.value='craneo';q.dispatchEvent(new Event('input'));await wait(400);o.push('accentAction',document.body.innerText.includes('en tu acción'));
q.value='anillo';q.dispatchEvent(new Event('input'));await wait(400);
const last=[...document.querySelectorAll('mark')].map(m=>m.parentElement.parentElement).pop();o.push('visibleBefore',!!document.getElementById('sc-3'));
[...document.querySelectorAll('button')].find(x=>/escena 4/.test(x.textContent)&&/ANILLO/i.test(x.textContent)).click();await wait(300);
o.push('jumped',!!document.getElementById('sc-3'),'sheetClosed',!document.body.innerText.includes('Índice y buscador'));
return o});
console.log(JSON.stringify(r),errs);await b.close()})()
