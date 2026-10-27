# Expande un diccionario Hunspell (es_ES, licencia GPL3+/LGPL3+/MPL1.1+) a una lista de formas.
import re,sys
aff,dic,out=sys.argv[1:4]
sfx={};pfx={}
for l in open(aff,encoding='utf-8'):
    p=l.split()
    if len(p)>=5 and p[0] in('SFX','PFX'):
        kind,flag,strip,add,cond=p[0],p[1],p[2],p[3],p[4]
        cont=''
        if '/' in add: add,cont=add.split('/',1)
        if add=='0': add=''
        if strip=='0': strip=''
        try: rx=re.compile((cond+'$') if kind=='SFX' else ('^'+cond))
        except re.error: continue
        (sfx if kind=='SFX' else pfx).setdefault(flag,[]).append((strip,add,cont,rx))
    elif len(p)==4 and p[0] in('SFX','PFX'):
        pass
cross={}
for l in open(aff,encoding='utf-8'):
    p=l.split()
    if len(p)==4 and p[0] in('SFX','PFX') and p[2] in('Y','N'): cross[(p[0],p[1])]=p[2]=='Y'
def apply_sfx(w,flags):
    r=[]
    for f in flags:
        for strip,add,cont,rx in sfx.get(f,()):
            if rx.search(w) and (not strip or w.endswith(strip)):
                n=(w[:len(w)-len(strip)] if strip else w)+add
                r.append(n)
                if cont: r+=apply_sfx(n,cont)
    return r
def apply_pfx(w,flags):
    r=[]
    for f in flags:
        for strip,add,cont,rx in pfx.get(f,()):
            if rx.search(w) and (not strip or w.startswith(strip)):
                r.append(add+(w[len(strip):] if strip else w))
    return r
forms=set(); lines=open(dic,encoding='utf-8').read().split('\n')[1:]
for l in lines:
    l=l.strip()
    if not l: continue
    w,_,fl=l.partition('/'); w=w.strip()
    base=[w]+apply_sfx(w,fl)
    for b in list(base):
        for pf in fl:
            if cross.get(('PFX',pf),False): base+=apply_pfx(b,pf)
    base+=apply_pfx(w,fl)
    for b in base: forms.add(b.lower())
ok=[w for w in forms if re.fullmatch(r"[a-záéíóúüñ]+",w)]
open(out,'w',encoding='utf-8').write('\n'.join(sorted(ok)))
print(len(lines),len(ok))
