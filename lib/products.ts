export type Product = { id: string; slug: string; name: string; category: string; price?: number; description: string; image: string; gallery?: string[]; badge?: string; sizes: string[]; colors: string[]; available: boolean }
export const categories = ['Vestidos','Blusas','Conjuntos','Saias','Calças','Acessórios']
/** Catálogo neutro para a proposta, sem produtos ou fotos de outra loja. */
export const products: Product[] = [
 {id:'1',slug:'preview-vestidos',name:'Vestidos — prévia',category:'Vestidos',description:'Espaço demonstrativo para fotografias e descrições reais da JR Store.',image:'/jr-placeholder.svg',sizes:[],colors:[],available:false},
 {id:'2',slug:'preview-conjuntos',name:'Conjuntos — prévia',category:'Conjuntos',description:'Peças reais serão cadastradas após autorização da loja.',image:'/jr-placeholder.svg',sizes:[],colors:[],available:false},
 {id:'3',slug:'preview-blusas',name:'Blusas — prévia',category:'Blusas',description:'Vitrine ilustrativa sem estoque confirmado.',image:'/jr-placeholder.svg',sizes:[],colors:[],available:false},
 {id:'4',slug:'preview-saias',name:'Saias — prévia',category:'Saias',description:'Conteúdo demonstrativo para apresentação comercial.',image:'/jr-placeholder.svg',sizes:[],colors:[],available:false}
]
export const formatPrice = (value?:number) => value == null ? 'Consulte o valor' : value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})
