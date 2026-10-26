const {chromium}=require('playwright');
const S='/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/';
(async()=>{const b=await chromium.launch();
for(const [w,h,n] of [[1024,768,'tab'],[844,390,'land']]){
const p=await b.newPage({viewport:{width:w,height:h}});
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.claude={use:async k=>k==='sample'?async q=>({text:'{}'}):null}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(500);
await p.evaluate(()=>{const sc=[];for(let i=0;i<4;i++)sc.push({t:('Escena '+i+'. Ella cruzó la plaza vacía mientras la lluvia caía. ').repeat(8),m:{},o:[],st:{}});const st={id:'q1',title:'Novela larga de prueba',syn:'sinopsis',premise:'p',genre:'Aventura',genres:['Aventura'],scenes:sc,lore:[],mem:null,ce:[],turn:4,state:{},opts:['uno','dos','tres']};LIB.push(st);renderLib();});
await p.waitForTimeout(300);
const ov=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
await p.screenshot({path:S+n+'_home.png'});
await p.evaluate(()=>{openStory(LIB[0]);if(!$('gmodal').hidden)closeSheet()});await p.waitForTimeout(400);
await p.screenshot({path:S+n+'_play.png'});
await p.evaluate(()=>$('immp').click());await p.waitForTimeout(400);await p.screenshot({path:S+n+'_pg.png'});
console.log(n,'overflowX',ov,await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));await p.close();}
await b.close()})();
