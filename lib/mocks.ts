import type { Product, ProductDetail, BlogPost, BlogPostFull } from '@/types'

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1, name: 'Eucerin Hyaluron-Filler Sérum', slug: 'eucerin-hyaluron-filler',
    brand: 'Eucerin', price: '34.90', regular_price: '39.90',
    images: [], featured: true, badge: 'discount', discount_percent: 13,
    categories: [{ id: 1, name: 'Dermofarmacia', slug: 'dermofarmacia' }],
  } as unknown as Product,
  {
    id: 2, name: 'La Roche-Posay Anthelios SPF 50+', slug: 'anthelios-spf50',
    brand: 'La Roche-Posay', price: '22.50', regular_price: '22.50',
    images: [], featured: true, badge: 'new',
  },
  {
    id: 3, name: 'Avène Cleanance Gel Limpiador', slug: 'avene-cleanance-gel',
    brand: 'Avène', price: '12.90', regular_price: '12.90',
    images: [], featured: false,
  },
  {
    id: 4, name: 'Isdin Fusion Water SPF 50', slug: 'isdin-fusion-water',
    brand: 'Isdin', price: '28.75', regular_price: '32.00',
    images: [], featured: false, badge: 'discount', discount_percent: 10,
  },
  {
    id: 5, name: 'Bioderma Sensibio H2O 500ml', slug: 'bioderma-sensibio',
    brand: 'Bioderma', price: '16.40', regular_price: '16.40',
    images: [], featured: false,
  },
  {
    id: 6, name: 'Vichy Liftactiv B3 Sérum', slug: 'vichy-liftactiv-b3',
    brand: 'Vichy', price: '41.00', regular_price: '41.00',
    images: [], featured: false, badge: 'new',
  },
  {
    id: 7, name: 'Cetaphil Crema Hidratante 250g', slug: 'cetaphil-crema-hidratante',
    brand: 'Cetaphil', price: '14.95', regular_price: '14.95',
    images: [], featured: false,
  },
  {
    id: 8, name: 'Neutrogena Hydro Boost Water Gel', slug: 'neutrogena-hydro-boost',
    brand: 'Neutrogena', price: '19.99', regular_price: '24.99',
    images: [], featured: false, badge: 'discount', discount_percent: 20,
  },
]

export const MOCK_PRODUCT_DETAIL: ProductDetail = {
  id: 1,
  name: 'Eucerin Hyaluron-Filler Sérum',
  slug: 'eucerin-hyaluron-filler',
  brand: 'Eucerin',
  price: '34.90',
  regular_price: '39.90',
  images: [],
  featured: true,
  badge: 'discount',
  discount_percent: 13,
  description: `<p>El sérum <strong>Eucerin Hyaluron-Filler</strong> penetra en las capas profundas de la piel para rellenar las arrugas desde el interior. Su innovadora fórmula con ácido hialurónico de alta y baja concentración proporciona una hidratación intensa y duradera.</p>
<h2>Beneficios</h2>
<ul>
  <li>Rellena las arrugas desde el interior</li>
  <li>Hidratación intensa durante 24 horas</li>
  <li>Piel visiblemente más lisa y tersa</li>
  <li>Textura no grasa, absorción rápida</li>
  <li>Testado dermatológicamente</li>
</ul>
<h2>Modo de empleo</h2>
<p>Aplicar mañana y noche sobre el rostro limpio antes de la crema hidratante. Dar pequeños golpecitos hasta su completa absorción.</p>`,
  short_description: '<p>Sérum antiedad con ácido hialurónico de alta y baja concentración. Rellena arrugas y proporciona hidratación intensa durante 24 horas.</p>',
  categories: [{ id: 1, name: 'Dermofarmacia', slug: 'dermofarmacia' }],
  stock_status: 'instock',
}

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 1, slug: 'como-elegir-fotoprotector', tag: 'Dermofarmacia', image_color: '#fef9c3',
    title: 'Cómo elegir el fotoprotector según tu tipo de piel',
  },
  {
    id: 2, slug: 'vitamina-d-suplementacion', tag: 'Salud', image_color: '#dbeafe',
    title: 'Vitamina D: cuándo y cómo suplementar correctamente',
  },
  {
    id: 3, slug: 'probioticos-salud-intestinal', tag: 'Nutrición', image_color: '#f0f7f4',
    title: 'Los mejores probióticos para la salud intestinal',
  },
  {
    id: 4, slug: 'rutina-cuidado-facial', tag: 'Dermofarmacia', image_color: '#fef9c3',
    title: 'Rutina de cuidado facial: paso a paso para cada tipo de piel',
  },
  {
    id: 5, slug: 'omega3-beneficios', tag: 'Nutrición', image_color: '#f0f7f4',
    title: 'Omega-3: beneficios y cuándo tomar suplementos',
  },
  {
    id: 6, slug: 'hidratacion-piel-seca', tag: 'Dermofarmacia', image_color: '#fef9c3',
    title: 'Guía completa para hidratar la piel seca en invierno',
  },
]

export const MOCK_BLOG_POST_FULL: BlogPostFull = {
  id: 1,
  slug: 'como-elegir-fotoprotector',
  tag: 'Dermofarmacia',
  image_color: '#fef9c3',
  title: 'Cómo elegir el fotoprotector según tu tipo de piel',
  date: '2026-03-01T09:00:00',
  excerpt: '<p>La protección solar es el paso más importante de cualquier rutina de cuidado de la piel. Te explicamos cómo elegir el fotoprotector adecuado según tu tipo de piel.</p>',
  content: `<p>La protección solar es el paso más importante de cualquier rutina de cuidado de la piel, tanto en verano como en invierno. Sin embargo, elegir el fotoprotector adecuado puede ser confuso ante tanta variedad de productos.</p>

<h2>¿Qué es el SPF?</h2>
<p>El Factor de Protección Solar (SPF) indica cuánto tiempo más podrás estar expuesto al sol sin quemarte en comparación con no llevar protección. Los dermatólogos recomiendan usar un mínimo de <strong>SPF 30</strong> en el día a día, y SPF 50 o superior en exposición solar directa.</p>

<h2>Según tu tipo de piel</h2>
<ul>
  <li><strong>Piel seca:</strong> busca fotoprotectores con textura crema o emulsión enriquecida, con ingredientes como ácido hialurónico o glicerina.</li>
  <li><strong>Piel grasa o mixta:</strong> opta por texturas gel-fluido, water gel o "invisible". Busca la indicación "no comedogénico".</li>
  <li><strong>Piel sensible:</strong> elige filtros físicos o minerales (dióxido de titanio, óxido de zinc), que son menos irritantes que los químicos.</li>
  <li><strong>Piel con tendencia acneica:</strong> Isdin Fusion Water o La Roche-Posay Anthelios son opciones muy bien toleradas.</li>
</ul>

<h2>Filtros físicos vs químicos</h2>
<p>Los <strong>filtros físicos</strong> reflejan la radiación UV y son ideales para pieles sensibles. Los <strong>filtros químicos</strong> la absorben y transforman en calor — son más ligeros en textura pero pueden causar irritación en pieles reactivas.</p>

<h2>Nuestra recomendación</h2>
<p>En Farmacia Granda siempre recomendamos consultar con nuestro equipo farmacéutico antes de elegir. Cada piel es diferente, y el fotoprotector que mejor funciona para una persona puede no ser el ideal para otra.</p>`,
}
