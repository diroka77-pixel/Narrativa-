const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
const r=await p.evaluate(()=>{LIB.push({id:'v1',title:'T',syn:'x',genre:'Ciberpunk',genres:['Ciberpunk'],scenes:[{t:'a',m:{}}],lore:[],turn:1,at:1,state:{},opts:[],premise:'p',prot:[],ce:[]});const s=LIB[LIB.length-1];openStory(s);const m=ensureMem(s);
const sora=getChar(m,'Sora',1),vane=getChar(m,'Vane',1);sora.desc='Hacker';vane.desc='Mercenario';sora.rel[canon('Vane')]={name:'Vane',conf:3,note:'',sc:1};vane.rel[canon('Sora')]={name:'Sora',conf:2,note:'',sc:1};
const kS=canon('Sora'),kV=canon('Vane');
const third=getChar(m,'Dorgo',1);third.rel[kS]={name:'Sora',conf:-5,note:'',sc:1};
mergeChars(m,kS,kV);const afterMerge=[Object.keys(m.chars),m.chars[kV].alias.slice(),!!m.chars[canon('Dorgo')].rel[kV]];
mergeUndo(m);const afterUndo=[Object.keys(m.chars).sort(),m.chars[kS].desc,m.chars[kV].alias,!!m.chars[canon('Dorgo')].rel[kS],!!m.chars[canon('Dorgo')].rel[kV],m.chars[kS].rel[kV].conf,m.undoM];
vane.fix={sex:'hombre',age:'45'};ensureMem(s);ATL.tab='chars';renderAtlas();
const html=document.getElementById('atlbody').textContent;
const ui=/Ficha fija/.test(html);
// rename via UI input
const lab=[...document.querySelectorAll('#atlbody label')].find(l=>/^Nombre/.test(l.textContent));const inp=lab.querySelector('input');inp.value='Vane Ruiz';inp.onchange();
return {afterMerge,afterUndo,ui,renamed:Object.keys(m.chars),fx:fixTxt(vane)}});
console.log(JSON.stringify(r));console.log('errs',errs);await b.close()})();
