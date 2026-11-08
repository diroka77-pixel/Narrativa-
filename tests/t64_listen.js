const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1');window.__sp=[];Object.defineProperty(window,'speechSynthesis',{value:{speak:u=>{window.__sp.push(u.text);setTimeout(()=>u.onend&&u.onend(),5)},cancel(){},getVoices(){return[]}},configurable:true});window.SpeechSynthesisUtterance=function(t){this.text=t}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
const r=await p.evaluate(async()=>{
const sc=[];for(let i=0;i<30;i++)sc.push({t:'Escena número '+(i+1)+' frase uno. Frase dos.',m:{}});
LIB.push({id:'l1',title:'T',syn:'x',genre:'Ciberpunk',genres:[],scenes:sc,lore:[],turn:30,at:1,state:{},opts:[],premise:'p',prot:[],ce:[]});save();openStory(LIB[0]);
const o=[];const wait=ms=>new Promise(r=>setTimeout(r,ms));
document.getElementById('listenpick').click();await wait(100);
o.push([...document.querySelectorAll('button')].filter(b=>/principio|Solo la última|Desde esta/.test(b.textContent)).length);
[...document.querySelectorAll('button')].find(b=>/Desde el principio/.test(b.textContent)).click();await wait(800);
o.push(window.__sp.length,window.__sp[0],window.__sp[window.__sp.length-1]);
window.__sp=[];stopTalk();startTalk(28,false);await wait(300);o.push(window.__sp.join('|'));
window.__sp=[];stopTalk();startTalk(28,true);await wait(300);o.push(window.__sp.join('|'));return o});
console.log(JSON.stringify(r),errs);await b.close()})()
