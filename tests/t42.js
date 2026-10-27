// Memoria: fusión de estado, sin pérdidas, desmentidos, alias, estado inmediato
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.claude={use:async k=>k==='sample'?async q=>({text:'{}'}):null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
const o=await p.evaluate(()=>{
 const st={id:'q1',title:'N',syn:'s',premise:'p',genre:'Aventura',genres:['Aventura'],scenes:[],lore:[],mem:null,ce:[],turn:1,state:{salud:100,objetos:['rifle'],deudas:['Dorgo'],relaciones:{Kaelen:3}},opts:[]};
 LIB.push(st);const r={};
 // 1 fusión
 st.state=mergeState(st.state,{salud:90}); r.merge=[st.state.salud,st.state.objetos,st.state.deudas,st.state.relaciones.Kaelen];
 st.state=mergeState(st.state,{objetos:[],relaciones:{Ines:2}}); r.merge2=[st.state.objetos,Object.keys(st.state.relaciones)];
 // 2 pendientes: 60 abiertos, ninguno se cierra solo
 for(let i=0;i<60;i++) applyMem(st,{pendientes:[{texto:'asunto numero '+i+' distinto '+('x'+i).repeat(2),accion:'abre'}]},i+1);
 r.open=ensureMem(st).pend.filter(x=>x.open).length;
 // mundo: 650 entradas, nada se ignora
 for(let i=0;i<650;i++) applyMem(st,{mundo:[{clave:'k'+i,valor:'v'+i}]},i+1);
 const m=ensureMem(st); r.world=[Object.keys(m.world).length,Object.keys(m.warch||{}).length];
 // 3 desmentido
 applyMem(st,{personajes:[{nombre:'Kaelen',sabe:[{dato:'Diroka es humano',tipo:'creencia'}]}]},70);
 applyMem(st,{personajes:[{nombre:'Kaelen',sabe:[{dato:'Diroka es un vampiro de 1200 años',tipo:'hecho',desmiente:'Diroka es humano'}]}]},71);
 const kc=m.chars['kaelen'].know; r.know=kc.map(x=>x.t.slice(0,18)+':'+(x.sup?'sup':'vig'));
 r.inPrompt=/Diroka es humano/.test(memCtx(st,'Kaelen',0))+'|'+/vampiro/.test(memCtx(st,'Kaelen',0));
 // 4 alias
 applyMem(st,{objetos:[{nombre:'núcleo magnético',dueno:'Kaelen'}]},72);
 applyMem(st,{objetos:[{nombre:'chip',dueno:'Diroka'}]},73);
 applyMem(st,{objetos:[{nombre:'núcleo magnético',tambien_llamado:['chip']}]},74);
 applyMem(st,{objetos:[{nombre:'chip',estado:'intacto'}]},75);
 r.items=Object.keys(m.items).filter(k=>/nucleo|chip/.test(k)).map(k=>k+':'+m.items[k].owner+':'+m.items[k].state);
 // 5 memOk
 r.memOk=[memOk({tiempo:'noche'}),memOk({mundo:[{clave:'a',valor:'b'}]}),memOk({}),memOk({recursos:['x']})];
 // 6 estado inmediato
 st.now=cleanNow({lugar:'Conducto',espacio:'medio metro de ancho',presentes:['Diroka','Kaelen'],sostiene:[{quien:'centinela',objeto:'rifle'}],salidas:'una compuerta',amenaza:'patrulla'});
 r.now=/medio metro/.test(build(st,'avanzo','',false))&&/centinela → rifle/.test(build(st,'avanzo','',false,true));
 return r;});
console.log(JSON.stringify(o,null,1),errs);await b.close()})();
