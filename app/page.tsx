'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Instagram, Sparkles, ShoppingBag } from 'lucide-react'
import { Header, Footer } from '@/components/store'

const looks = [
  { title:'Vestidos', image:'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=850&q=85',tag:'Elegância em cada detalhe' },
  { title:'Conjuntos', image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=850&q=85',tag:'Para todos os momentos' },
  { title:'Blusas', image:'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=850&q=85',tag:'Um estilo só seu' },
  { title:'Looks', image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=850&q=85',tag:'Inspire-se' }
]
const socials = 'https://www.instagram.com/jrstorefeminina/'
export default function HomePage() {
  const [banner,setBanner]=useState({title:'Mania de vestir bem.',subtitle:'Elegância para mulheres reais.',image:''})
  useEffect(()=>{try {const raw=localStorage.getItem('jrstore-demo-banner');if(raw){const b=JSON.parse(raw);setBanner({title:b.title||'Mania de vestir bem.',subtitle:b.subtitle||'Elegância para mulheres reais.',image:b.image||''})}}catch{}},[])
  return <><Header/><main className="bg-white">
    <section className="relative overflow-hidden bg-[#f6eded]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch lg:min-h-[610px] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-20 md:px-12 lg:py-24">
          <span className="mb-6 w-fit border-b border-[#b97986] pb-2 text-[11px] font-semibold uppercase tracking-[.32em] text-[#8d5d69]">JR Store · Moda feminina</span>
          <h1 className="max-w-xl font-serif text-6xl leading-[1.02] tracking-[-.065em] text-[#20191b] sm:text-7xl">{banner.title}</h1>
          <p className="mt-7 max-w-sm text-base leading-7 text-[#64595c]">{banner.subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/produtos" className="inline-flex items-center gap-3 bg-[#20191b] px-6 py-4 text-[11px] font-semibold uppercase tracking-[.13em] text-white transition hover:bg-[#b97d8b]">Explorar coleção <ArrowRight size={16}/></Link>
            <a href={socials} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[#b97986] px-6 py-4 text-[11px] font-semibold uppercase tracking-[.13em] text-[#20191b]">Nosso Instagram <Instagram size={15}/></a>
          </div>
          <p className="mt-12 text-xs uppercase tracking-[.13em] text-[#9e848b]">Prévia de loja · Fotos ilustrativas</p>
        </div>
        <div className="relative min-h-[390px] bg-[#e9d7d8] lg:min-h-[610px]">
          <Image src={banner.image||'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90'} alt="Editorial ilustrativo de moda feminina" fill priority sizes="(max-width:1024px) 100vw,50vw" className="object-cover object-center"/>
          <div className="absolute bottom-5 right-5 bg-white/90 px-4 py-2 text-[10px] uppercase tracking-widest text-black/60">Editorial ilustrativo</div>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#b97986]">A sua próxima inspiração</p><h2 className="mt-3 font-serif text-4xl tracking-[-.035em] text-[#20191b] md:text-5xl">Explore seu estilo.</h2></div><Link href="/produtos" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">Ver catálogo <ArrowRight size={16}/></Link></div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">{looks.map(look=><Link href={`/produtos?categoria=${look.title==='Looks'?'Todos':look.title}`} key={look.title} className="group"><div className="relative aspect-[3/4] overflow-hidden bg-[#fae7e9]"><Image src={look.image} alt={`Inspiração de moda feminina: ${look.title}`} fill sizes="(max-width:768px) 50vw,25vw" className="object-cover transition-transform duration-500 group-hover:scale-105"/></div><p className="mt-4 font-serif text-2xl text-[#20191b]">{look.title}</p><p className="mt-1 text-xs text-[#81777b]">{look.tag}</p></Link>)}</div>
      <p className="mt-6 text-xs text-[#89777e]">Imagens de referência visual. O catálogo oficial será configurado com os produtos da JR Store.</p>
    </section>
    <section className="bg-[#f8f1f2] px-5 py-20 lg:px-8"><div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
      <div className="relative aspect-[4/4] overflow-hidden bg-[#ecd8dd]"><Image src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85" alt="Roupas em composição editorial ilustrativa" fill sizes="(max-width:768px) 100vw,50vw" className="object-cover"/></div>
      <div><p className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#b97986]">Mania de vestir bem</p><h2 className="mt-5 max-w-lg font-serif text-5xl leading-[1.06] tracking-[-.05em] text-[#20191b]">Uma vitrine para valorizar cada escolha.</h2><p className="mt-6 max-w-md leading-7 text-[#665d60]">Uma experiência online pensada para apresentar coleções, explorar peças e facilitar o contato com a loja.</p><Link href="/produtos" className="mt-8 inline-flex items-center gap-2 border-b border-[#20191b] pb-2 text-xs font-semibold uppercase tracking-wider">Conheça a prévia <ArrowRight size={16}/></Link></div>
    </div></section>
    <section className="bg-[#f5b5bd] px-5 py-16 text-center"><Sparkles className="mx-auto text-[#20191b]" size={24}/><h2 className="mt-4 font-serif text-4xl text-[#20191b]">Seu próximo look começa aqui.</h2><p className="mx-auto mt-3 max-w-md text-sm text-[#514549]">Acompanhe as novidades da JR Store.</p><a href={socials} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 bg-[#20191b] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white"><Instagram size={16}/> Visitar Instagram</a></section>
  </main><Footer/></>
}
