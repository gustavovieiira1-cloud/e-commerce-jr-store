export type Product = { id: string; slug: string; name: string; category: string; price?: number; description: string; image: string; gallery?: string[]; badge?: string; sizes: string[]; colors: string[]; available: boolean }
export const categories = ['Vestidos','Blusas','Conjuntos','Saias','Calças','Acessórios']
/** Catálogo neutro para a proposta, sem produtos ou fotos de outra loja. */
export const products: Product[] = [
 {id:'1',slug:'preview-vestidos',name:'Vestidos',category:'Vestidos',description:'Espaço demonstrativo para fotografias e descrições reais da JR Store.',image:'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85',sizes:[],colors:[],available:false},
 {id:'2',slug:'preview-conjuntos',name:'Conjuntos',category:'Conjuntos',description:'Peças reais serão cadastradas após autorização da loja.',image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85',sizes:[],colors:[],available:false},
 {id:'3',slug:'preview-blusas',name:'Blusas',category:'Blusas',description:'Vitrine ilustrativa sem estoque confirmado.',image:'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85',sizes:[],colors:[],available:false},
 {id:'4',slug:'preview-saias',name:'Saias',category:'Saias',description:'Conteúdo demonstrativo para apresentação comercial.',image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85',sizes:[],colors:[],available:false}
]
export const formatPrice = (value?:number) => value == null ? 'Consulte o valor' : value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})
