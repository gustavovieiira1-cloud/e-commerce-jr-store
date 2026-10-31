'use client'
import { storeConfig } from '@/lib/store-config'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { products, categories, Product } from '@/lib/products'

type Banner = { title: string; subtitle: string; image: string; button: string }
type Settings = { name: string; whatsapp: string; instagram: string; freight: string }
const defaultBanner: Banner = { title: 'Seu estilo, seu momento.', subtitle: 'Descubra peças femininas que combinam com sua personalidade.', image: '', button: 'Explorar coleção' }
const defaultSettings: Settings = { name: storeConfig.name, whatsapp: storeConfig.whatsapp, instagram: storeConfig.instagram, freight: 'A consultar' }
const links = [['produtos','Produtos'], ['categorias','Categorias'], ['pedidos','Pedidos'], ['clientes','Clientes'], ['banners','Banners'], ['configuracoes','Configurações']]
const input = 'w-full rounded border border-black/15 bg-white px-3 py-2 text-sm'
const btn = 'rounded bg-[#ffb1b8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ed96a6]'
const safeRead = <T,>(key: string, fallback: T): T => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback } catch { return fallback } }
const seedProducts = products.map(p => ({ ...p, available: false }))
export default function AdminSection() {
  const { section } = useParams<{section:string}>()
  const [ready,setReady] = useState(false)
  const [items,setItems] = useState<Product[]>(seedProducts)
  const [cats,setCats] = useState<string[]>(categories)
  const [banner,setBanner] = useState<Banner>(defaultBanner)
  const [settings,setSettings] = useState<Settings>(defaultSettings)
  const [edit,setEdit] = useState<string | null>(null)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('Vestidos')
  const [price,setPrice] = useState('')
  const [sizes,setSizes] = useState('')
  const [colors,setColors] = useState('')
  const [gallery,setGallery] = useState<string[]>([])
  const [description,setDescription] = useState('')
  const [catName,setCatName] = useState('')
  useEffect(() => { setItems(safeRead('jrstore-demo-products',seedProducts));setCats(safeRead('jrstore-demo-categories',categories));setBanner(safeRead('jrstore-demo-banner',defaultBanner));setSettings(safeRead('jrstore-demo-settings',defaultSettings));setReady(true) },[])
  const persist = <T,>(key:string,value:T) => {localStorage.setItem(key,JSON.stringify(value));window.dispatchEvent(new Event('jrstore-demo-change'))}
  const processPhoto = (file: File): Promise<string> => new Promise((resolve,reject) => {
    if(!file.type.startsWith('image/')) return reject(new Error('Selecione uma imagem.'))
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Falha ao ler a imagem.'))
    reader.onload = () => {
      const image = new Image()
      image.onerror = () => reject(new Error('Imagem inválida.'))
      image.onload = () => {
        const factor = Math.min(1,800/Math.max(image.width,image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1,Math.round(image.width*factor))
        canvas.height = Math.max(1,Math.round(image.height*factor))
        const context = canvas.getContext('2d')
        if(!context) return reject(new Error('Canvas indisponível.'))
        context.drawImage(image,0,0,canvas.width,canvas.height)
        resolve(canvas.toDataURL('image/jpeg',0.68))
      }
      image.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
  const addPhotos = async (files: FileList | null, target: 'product' | 'banner') => {
    if(!files?.length)return
    try {
      const photos = await Promise.all(Array.from(files).slice(0,target==='product'?5:1).map(processPhoto))
      if(target==='product') setGallery(current=>[...current,...photos].slice(0,5))
      else setBanner(current=>({...current,image:photos[0]}))
    } catch(e) {alert(e instanceof Error?e.message:'Não foi possível importar a imagem.')}
  }
  const saveProduct = () => {
    if(!name.trim()) return alert('Informe o nome do produto.')
    const slug = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
    const existing=items.find(p=>p.id===edit)
    const p:Product={id:edit||String(Date.now()),slug:existing?.slug||slug,name:name.trim(),category,price:price.trim()?Number(price.replace(',','.')):undefined,image:gallery[0]||'/placeholder.svg',gallery,description,sizes:sizes.split(',').map(x=>x.trim()).filter(Boolean),colors:colors.split(',').map(x=>x.trim()).filter(Boolean),available:existing?.available||false}
    const next=edit?items.map(x=>x.id===edit?p:x):[...items,p]
    try {persist('jrstore-demo-products',next)} catch {return alert('Limite de armazenamento do navegador. Remova algumas fotos e tente novamente.')} setItems(next);setEdit(null);setName('');setPrice('');setSizes('');setColors('');setGallery([]);setDescription('')
  }
  const startEdit=(p:Product)=>{setEdit(p.id);setName(p.name);setCategory(p.category);setPrice(p.price?.toString()||'');setSizes(p.sizes.join(', '));setColors(p.colors.join(', '));setGallery(p.gallery?.length?p.gallery:[p.image]);setDescription(p.description);window.scrollTo({top:0,behavior:'smooth'})}
  const currentTitle = links.find(([slug])=>slug===section)?.[1] || 'Painel administrativo'
  return <div className="min-h-screen bg-[#f7f7f5] text-[#171717]">
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-black/10 bg-white p-6 lg:block">
      <Link href="/admin" className="font-serif text-2xl tracking-tight">JR STORE</Link>
      <div className="mt-2 inline-flex bg-[#fff0df] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#ffb1b8]">MODO DEMONSTRAÇÃO</div>
      <nav className="mt-12 flex flex-col gap-2">
        <Link href="/admin" className="rounded px-3 py-3 text-sm text-black/60 hover:bg-black/5">Visão geral</Link>
        {links.map(([slug,label])=><Link key={slug} href={`/admin/${slug}`} className={`rounded px-3 py-3 text-sm ${section===slug?'bg-[#ffb1b8] font-semibold text-white':'text-black/60 hover:bg-black/5'}`}>{label}</Link>)}
      </nav>
      <Link href="/" className="absolute bottom-8 text-sm text-black/50">Voltar à loja</Link>
    </aside>
    <main className="lg:ml-64">
      <header className="flex items-center justify-between border-b border-black/10 bg-white px-5 py-5 lg:px-10"><div><p className="text-xs uppercase tracking-widest text-black/45">Painel administrativo</p><h1 className="mt-1 font-serif text-3xl">{currentTitle}</h1></div><Link href="/" className="text-xs uppercase tracking-wider text-black/55">Ver loja ↗</Link></header>
      <div className="p-5 lg:p-10">
      <div className="mb-6 rounded border border-amber-300 bg-amber-50 p-4 text-sm"><strong>DEMONSTRAÇÃO:</strong> alterações salvas apenas neste navegador. Sem banco de dados ou autenticação. Não cadastre informações pessoais.</div>
      <nav className="mb-7 flex flex-wrap gap-2 lg:hidden"><Link href="/admin" className="rounded bg-white px-4 py-2 text-sm">Visão geral</Link>{links.map(([slug,label])=><Link className={`rounded px-4 py-2 text-sm ${slug===section?'bg-[#ffb1b8] text-white':'bg-white'}`} key={slug} href={`/admin/${slug}`}>{label}</Link>)}</nav>
      {!ready?<p>Carregando demonstração...</p>:<>
      {section==='produtos'&&<div className="grid gap-6 lg:grid-cols-[340px_1fr]"><form onSubmit={e=>{e.preventDefault();saveProduct()}} className="space-y-3 rounded bg-white p-5">
        <h2 className="font-serif text-2xl">{edit?'Editar produto':'Cadastrar produto'}</h2>
        <label className="block text-sm">Nome<input className={input} value={name} onChange={e=>setName(e.target.value)} required /></label>
        <label className="block text-sm">Categoria<select className={input} value={category} onChange={e=>setCategory(e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select></label>
        <label className="block text-sm">Preço (opcional)<input className={input} inputMode="decimal" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Consulte o valor" /></label>
        <label className="block text-sm">Tamanhos disponíveis<input className={input} value={sizes} onChange={e=>setSizes(e.target.value)} placeholder="P, M, G, GG ou 36, 38, 40" /><span className="text-xs text-black/50">Separe os tamanhos por vírgula.</span></label><label className="block text-sm">Cores disponíveis<input className={input} value={colors} onChange={e=>setColors(e.target.value)} placeholder="Preto, Branco, Rosa" /><span className="text-xs text-black/50">Separe as cores por vírgula.</span></label><div className="text-sm"><p className="mb-2">Galeria de fotos (até 5 imagens)</p><label className="flex cursor-pointer items-center justify-center rounded border border-dashed border-[#ffb1b8] bg-orange-50 p-4 text-center text-sm text-[#b45e00]">Selecionar fotos do dispositivo<input className="hidden" type="file" accept="image/*" multiple onChange={e=>{void addPhotos(e.target.files,'product');e.target.value=''}} /></label><div className="mt-3 grid grid-cols-3 gap-2">{gallery.map((src,i)=><div key={i} className="relative"><img src={src} alt={`Foto ${i+1}`} className="aspect-square w-full rounded object-cover"/><button type="button" aria-label="Remover foto" className="absolute right-1 top-1 rounded bg-white px-2 text-red-700" onClick={()=>setGallery(old=>old.filter((_,n)=>n!==i))}>×</button>{i===0&&<small className="absolute bottom-1 left-1 bg-white/90 px-1">Capa</small>}</div>)}</div><p className="mt-2 text-xs text-black/50">As fotos são reduzidas para demonstração e armazenadas neste navegador.</p></div>
        <label className="block text-sm">Descrição<textarea className={input} value={description} onChange={e=>setDescription(e.target.value)} rows={3}/></label>
        <button className={btn} type="submit">{edit?'Salvar alterações':'Adicionar produto'}</button>{edit&&<button type="button" className="ml-3 text-sm underline" onClick={()=>{setEdit(null);setName('');setPrice('');setImage('');setDescription('')}}>Cancelar</button>}
      </form><section className="rounded bg-white p-5"><h2 className="mb-4 font-serif text-2xl">Produtos ({items.length})</h2><div className="space-y-3">{items.map(p=><div key={p.id} className="flex flex-wrap items-center gap-3 border-b pb-3"><div className="flex min-w-0 flex-1 items-center gap-3"><img src={p.image || "/placeholder.svg"} alt={`Foto de ${p.name}`} className="size-12 shrink-0 rounded-md border border-black/10 bg-[#f5f2ee] object-cover" onError={e => { e.currentTarget.src="/placeholder.svg" }} /><div className="min-w-0"><p className="font-semibold">{p.name}</p><p className="text-xs text-black/50">{p.category} · {p.price==null?'Valor a consultar':`R$ ${p.price.toFixed(2)}`}</p></div></div><button className="text-sm underline" onClick={()=>startEdit(p)}>Editar</button><button className="text-sm underline" onClick={()=>{const next=items.map(x=>x.id===p.id?{...x,available:!x.available}:x);setItems(next);persist('jrstore-demo-products',next)}}>{p.available?'Disponível':'Indisponível'}</button><button className="text-sm text-red-700 underline" onClick={()=>{if(confirm('Excluir este produto da demo?')){const next=items.filter(x=>x.id!==p.id);setItems(next);persist('jrstore-demo-products',next)}}}>Excluir</button></div>)}</div></section></div>}
      {section==='categorias'&&<section className="max-w-2xl rounded bg-white p-5"><h2 className="font-serif text-2xl">Categorias</h2><form className="my-5 flex gap-2" onSubmit={e=>{e.preventDefault();if(!catName.trim()||cats.includes(catName.trim()))return;const next=[...cats,catName.trim()];setCats(next);persist('jrstore-demo-categories',next);setCatName('')}}><input className={input} value={catName} onChange={e=>setCatName(e.target.value)} placeholder="Nova categoria" /><button className={btn}>Adicionar</button></form>{cats.map(c=><div key={c} className="flex justify-between border-b py-3 text-sm"><span>{c}</span><div className="flex gap-4"><button className="underline" onClick={()=>{const updated=prompt('Novo nome',c)?.trim();if(!updated||updated===c)return;const next=cats.map(x=>x===c?updated:x);setCats(next);persist('jrstore-demo-categories',next)}}>Renomear</button><button className="text-red-700 underline" onClick={()=>{if(items.some(p=>p.category===c))return alert('Esta categoria possui produtos.');const next=cats.filter(x=>x!==c);setCats(next);persist('jrstore-demo-categories',next)}}>Excluir</button></div></div>)}</section>}
      {section==='banners'&&<form className="max-w-2xl space-y-4 rounded bg-white p-5" onSubmit={e=>{e.preventDefault();try{persist('jrstore-demo-banner',banner);alert('Banner salvo neste navegador')}catch{alert('Armazenamento cheio. Selecione uma imagem menor.')}}}><h2 className="font-serif text-2xl">Banner principal</h2>{(['title','subtitle','button'] as const).map(key=><label key={key} className="block text-sm">{({title:'Título',subtitle:'Subtítulo',button:'Texto do botão'})[key]}<input className={input} value={banner[key]} onChange={e=>setBanner({...banner,[key]:e.target.value})}/></label>)}<div><p className="mb-2 text-sm">Imagem do banner</p><label className="flex cursor-pointer items-center justify-center rounded border border-dashed border-[#ffb1b8] bg-orange-50 p-4 text-sm text-[#b45e00]">Escolher imagem<input type="file" accept="image/*" className="hidden" onChange={e=>{void addPhotos(e.target.files,'banner');e.target.value=''}} /></label>{banner.image&&<div className="mt-3"><img src={banner.image} alt="Prévia do banner" className="max-h-52 w-full rounded object-cover"/><button type="button" className="mt-2 text-sm text-red-700 underline" onClick={()=>setBanner({...banner,image:''})}>Remover imagem</button></div>}</div><button className={btn}>Salvar banner demo</button></form>}
      {section==='configuracoes'&&<form className="max-w-2xl space-y-4 rounded bg-white p-5" onSubmit={e=>{e.preventDefault();persist('jrstore-demo-settings',settings);alert('Configurações salvas neste navegador')}}><h2 className="font-serif text-2xl">Configurações</h2>{(['name','whatsapp','instagram','freight'] as const).map(key=><label key={key} className="block text-sm">{({name:'Nome da loja',whatsapp:'WhatsApp (com DDI)',instagram:'Instagram',freight:'Frete anunciado (R$)'})[key]}<input className={input} value={settings[key]} onChange={e=>setSettings({...settings,[key]:e.target.value})}/></label>)}<button className={btn}>Salvar configurações demo</button></form>}
      {section==='clientes'&&<section className="rounded bg-white p-8"><h2 className="font-serif text-2xl">Clientes</h2><p className="mt-3 text-sm text-black/60">Nenhum cliente cadastrado na demonstração. Dados reais exigem autenticação e banco de dados.</p></section>}
      {section==='pedidos'&&<section className="rounded bg-white p-8"><h2 className="font-serif text-2xl">Pedidos</h2><p className="mt-3 text-sm text-black/60">Nenhum pedido registrado. Os pedidos por WhatsApp não são sincronizados automaticamente. Uma integração com banco de dados será necessária.</p></section>}
      {!links.some(([slug])=>slug===section)&&<p>Seção não encontrada.</p>}
      </>}
      </div>
    </main>
  </div>
}
