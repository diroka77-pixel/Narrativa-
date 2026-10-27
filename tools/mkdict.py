import re,base64,sys,json,math
SRC=sys.argv[1]; OUT=sys.argv[2]
words=set()
for l in open(SRC,encoding='utf-8'):
    w=l.strip().lower()
    if re.fullmatch(r"[a-záéíóúüñ]+",w): words.add(w)
words=sorted(words); n=len(words)
BPW=14; m=n*BPW; m=(m+7)//8*8; K=9
def fnv(b,seed):
    h=seed
    for x in b:
        h^=x; h=(h*16777619)&0xffffffff
    h^=h>>15; h=(h*0x85ebca6b)&0xffffffff; h^=h>>13; h=(h*0xc2b2ae35)&0xffffffff; h^=h>>16
    return h
bits=bytearray(m//8)
for w in words:
    b=w.encode('utf-8'); h1=fnv(b,0x811c9dc5); h2=fnv(b,0x9747b28c)|1
    for i in range(K):
        idx=(h1+i*h2)%m; bits[idx>>3]|=1<<(idx&7)
js="window.HV_DICT={n:%d,m:%d,k:%d,b:\"%s\"};"%(n,m,K,base64.b64encode(bytes(bits)).decode())
open(OUT,'w').write(js)
print(n,m//8,len(js))
