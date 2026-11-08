const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{try{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')}catch(e){}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const o=[];const w=ms=>new Promise(r=>setTimeout(r,ms));LIB.length=0;
const lorem='Quién ha hecho esto? —preguntó Marta, mirando por la ventana del faro—. Nunca construiremos nada así, murciélago. La biblioteca estaba extraordinariamente tranquila aquella mañana de otoño. ';
const sc=[];for(let i=0;i<8;i++)sc.push({t:Array.from({length:3},(_,k)=>lorem.repeat(3)).join('\n\n'),m:{},d:1});
const s={id:'l1',title:'El faro',syn:'x',genre:'Misterio',genres:['Misterio'],scenes:sc,lore:[{tipo:'personaje',nombre:'Marta',desc:'d',img:'data:image/jpeg;base64,/9j/AAAA'}],turn:8,at:1,state:{},opts:[],premise:'p',ce:[4],ctit:{1:'La llegada'}};
LIB.push(s);cur=s;view('play');render();
o.push('appendixOff',appxCards(s).length===0);
o.push('btns',!!$("layb"),!!$("layb2"),!!$("layb3"));
$("layb3").click();await w(1500);const t=document.body.innerText;
o.push('sheet',/Maquetación/.test(t),/Plantillas rápidas/.test(t),/Tipo de letra/.test(t),/Separador entre escenas/.test(t));
o.push('previewPages',document.querySelectorAll('.psheet span').length>20,'loading',/Preparando la vista previa/.test(document.querySelector('.psheet').innerText));
// template
[...document.querySelectorAll('button')].find(x=>x.textContent==='Bolsillo').click();await w(1200);
o.push('tpl',s.book.size,s.book.font,s.book.fs);
// help toggle
const hb=[...document.querySelectorAll('button')].find(x=>x.getAttribute('aria-label')==='Ayuda: qué hace cada opción');hb.click();await w(100);
o.push('helpShown',[...document.querySelectorAll('.hlpx')].filter(x=>x.style.display==='block').length>5);
// change alignment
const al=[...document.querySelectorAll('select')].find(x=>[...x.options].some(op=>/sílabas/.test(op.text)));al.value='l';al.onchange();await w(100);o.push('align',s.book.just,s.book.hyph);
const mg=[...document.querySelectorAll('input[type=range]')][2];mg.value=20;mg.onchange();await w(300);o.push('margins',s.book.mo,s.book.mi,s.book.mb);
// default for new novels
[...document.querySelectorAll('button')].find(x=>x.textContent==='Usar como predeterminada').click();await w(100);
const s2={id:'l2',title:'Otra',scenes:[{t:'x'}],lore:[]};o.push('userDef',JSON.stringify(bkOf(s2).size),bkOf(s2).font,bkOf(s2).just);localStorage.removeItem('hv:bookdef');
// min margins clamp
o.push('clamp',bkOf({book:{mo:2,mi:3,mt:1,mb:0}}).mo,bkOf({book:{mo:2,mi:3,mt:1,mb:0}}).mi);
// all sizes + options -> pdf
const res=[];for(const sz of ['bolsillo','a5','seis9','a4'])for(const tpl of Object.keys(BK_TPL)){s.book=Object.assign({},JSON.parse(JSON.stringify(BK_TPL[tpl][2])),{size:sz});try{const pdf=await pdfDoc(s);const d=await PDFLib.PDFDocument.load(pdf);res.push(sz+'/'+tpl+':'+d.getPageCount())}catch(e){res.push('ERR '+sz+'/'+tpl+' '+e.message)}}
o.push('pdfs',res.join(' '));
// chnew false inline + sep types + head modes + cov off
s.book={chnew:false,sep:'asm',head:'chapter',cov:false,capnum:false};const M=bookLayout(s,(await bookFonts(s)).f);o.push('inlineKinds',M.pages.map(p=>p.kind[0]).join(''));
for(const sp of ['ast','asm','linea','rombo','espacio']){s.book={sep:sp};await pdfDoc(s)};o.push('seps','ok');
// epub
s.book={font:'lora',sep:'asm',drop:true,capnum:true};await hvLoadFam('lora');const ef=buildEpubFiles(s,{uid:'u'});const keys=Object.keys(ef).filter(k=>/fonts\//.test(k));o.push('epubFonts',keys.length,/@font-face/.test(ef['OEBPS/style.css']),/class="sep"/.test(ef['OEBPS/c1.xhtml']),/class="f fd"/.test(ef['OEBPS/c1.xhtml']),/font-family:"HVBook"/.test(ef['OEBPS/style.css']),/fonts\/lora-r.ttf/.test(ef['OEBPS/content.opf']));
s.book={font:'times'};const ef2=buildEpubFiles(s,{uid:'u'});o.push('epubNoFont',Object.keys(ef2).filter(k=>/fonts\//.test(k)).length);
// licenses
closeSheet();licSheet();await w(300);o.push('lic',/Licencias de terceros/.test(document.body.innerText));
return o});
console.log(JSON.stringify(r),errs);await b.close()})()
