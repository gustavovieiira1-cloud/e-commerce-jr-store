export type Product = {
  id: string
  slug: string
  name: string
  category: string
  price?: number
  description: string
  image: string
  gallery?: string[]
  badge?: string
  sizes: string[]
  colors: string[]
  available: boolean
}

export const categories = ['Vestidos', 'Blusas', 'Conjuntos', 'Saias', 'Calças', 'Acessórios']

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`

export const products: Product[] = [
  { id: '1', slug: 'vestido-midi-linho', name: 'Vestido Midi Linho', category: 'Vestidos', description: 'Silhueta leve e elegante para acompanhar todos os seus momentos.', image: photo('photo-1595777457583-95e059d581b8'), badge: 'Novo', sizes: ['P', 'M', 'G'], colors: ['Terracota', 'Off-white'], available: false },
  { id: '2', slug: 'conjunto-luna', name: 'Conjunto Luna', category: 'Conjuntos', description: 'Conjunto versátil com caimento impecável e toque contemporâneo.', image: photo('photo-1610030469983-98e550d6193c'), badge: 'Mais vendido', sizes: ['P', 'M', 'G'], colors: ['Preto', 'Areia'], available: false },
  { id: '3', slug: 'blusa-alcinha-seda', name: 'Blusa Alcinha Seda', category: 'Blusas', description: 'Delicadeza e movimento em uma peça essencial do guarda-roupa.', image: photo('photo-1595777457583-95e059d581b8'), sizes: ['P', 'M', 'G'], colors: ['Champagne', 'Preto'], available: false },
  { id: '4', slug: 'saia-alfaiataria', name: 'Saia Alfaiataria', category: 'Saias', description: 'Corte preciso e cintura alta para produções sofisticadas.', image: photo('photo-1610030469983-98e550d6193c'), sizes: ['P', 'M', 'G'], colors: ['Preto'], available: false },
  { id: '5', slug: 'vestido-curto-amora', name: 'Vestido Curto Amora', category: 'Vestidos', description: 'Um clássico feminino com toque moderno e acabamento especial.', image: photo('photo-1566174053879-31528523f8ae'), sizes: ['P', 'M'], colors: ['Vinho'], available: false },
  { id: '6', slug: 'calca-wide-leg', name: 'Calça Wide Leg', category: 'Calças', description: 'Modelagem ampla e confortável para compor looks autorais.', image: photo('photo-1595777457583-95e059d581b8'), sizes: ['36', '38', '40'], colors: ['Jeans claro'], available: false },
  { id: '7', slug: 'regata-canelada', name: 'Regata Canelada', category: 'Blusas', description: 'Básico elevado para usar muito, em qualquer ocasião.', image: photo('photo-1551488831-00ddcb6c6bd3'), sizes: ['P', 'M', 'G'], colors: ['Branco', 'Preto'], available: false },
  { id: '8', slug: 'bolsa-mini-couro', name: 'Bolsa Mini Couro', category: 'Acessórios', description: 'O detalhe final para deixar seu look ainda mais especial.', image: photo('photo-1584917865442-de89df76afd3'), sizes: [], colors: ['Caramelo'], available: false },
]

// Os produtos são exemplos visuais, sem preços ou estoque verificados.
export const formatPrice = (value?: number) => value ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Consulte o valor'
