'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Camera, Sparkles, ShoppingBag } from 'lucide-react'
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
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-[#31292b] md:min-h-[690px]">
      <Image src={banner.image || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=90'} alt="Moda feminina — editorial" fill priority sizes="100vw" className="object-cover object-center"/>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/5"/>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12">
        <div className="max-w-xl text-white">
          <p className="mb-6 text-xs font-medium uppercase tracking-[.29em] text-[#ffdce0]">JR Store · Moda feminina</p>
          <h1 className="font-serif text-6xl leading-[.98] tracking-[-.055em] sm:text-7xl md:text-8xl">{banner.title}</h1>
          <p className="mt-7 text-lg leading-8 text-white/90">{banner.subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/produtos" className="inline-flex items-center gap-3 bg-[#FFB1B8] px-7 py-4 text-xs font-semibold uppercase tracking-wider text-[#171717] hover:bg-white">Explorar coleção <ArrowRight size={17}/></Link>
            <a href="/produtos?novidades=true" className="inline-flex items-center gap-2 border border-white/70 px-7 py-4 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-black">Ver novidades <ArrowRight size={16}/></a>
          </div>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#b97986]">A sua próxima inspiração</p><h2 className="mt-3 font-serif text-4xl tracking-[-.035em] text-[#20191b] md:text-5xl">Explore seu estilo.</h2></div><Link href="/produtos" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">Ver catálogo <ArrowRight size={16}/></Link></div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">{looks.map(look=><Link href={`/produtos?categoria=${look.title==='Looks'?'Todos':look.title}`} key={look.title} className="group"><div className="relative aspect-[3/4] overflow-hidden bg-[#fae7e9]"><Image src={look.image} alt={`Inspiração de moda feminina: ${look.title}`} fill sizes="(max-width:768px) 50vw,25vw" className="object-cover transition-transform duration-500 group-hover:scale-105"/></div><p className="mt-4 font-serif text-2xl text-[#20191b]">{look.title}</p><p className="mt-1 text-xs text-[#81777b]">{look.tag}</p></Link>)}</div>
      <p className="mt-6 text-xs text-[#89777e]"></p>
    </section>
    <section className="bg-[#f8f1f2] px-5 py-20 lg:px-8"><div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
      <div className="relative aspect-[4/4] overflow-hidden bg-[#ecd8dd]"><Image src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85" alt="Roupas em composição editorial ilustrativa" fill sizes="(max-width:768px) 100vw,50vw" className="object-cover"/></div>
      <div><p className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#b97986]">Mania de vestir bem</p><h2 className="mt-5 max-w-lg font-serif text-5xl leading-[1.06] tracking-[-.05em] text-[#20191b]">Uma vitrine para valorizar cada escolha.</h2><p className="mt-6 max-w-md leading-7 text-[#665d60]">Uma experiência online pensada para apresentar coleções, explorar peças e facilitar o contato com a loja.</p><Link href="/produtos" className="mt-8 inline-flex items-center gap-2 border-b border-[#20191b] pb-2 text-xs font-semibold uppercase tracking-wider">Conheça a coleção <ArrowRight size={16}/></Link></div>
    </div></section>
    <section className="bg-[#f5b5bd] px-5 py-16 text-center"><Sparkles className="mx-auto text-[#20191b]" size={24}/><h2 className="mt-4 font-serif text-4xl text-[#20191b]">Ficou com dúvida?</h2><p className="mx-auto mt-3 max-w-md text-sm text-[#514549]">Nossa equipe está pronta para ajudar você a encontrar o look perfeito.</p><a href="https://wa.me/5545998580037" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 bg-[#20191b] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white">Falar no WhatsApp</a></section>
  </main><Footer/></>
}
