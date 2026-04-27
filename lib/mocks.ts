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

const DETAIL_EXTRA: Record<string, { short_description: string; description: string }> = {
  'eucerin-hyaluron-filler': {
    short_description: '<p>Sérum antiedad con ácido hialurónico de alta y baja concentración. Rellena arrugas y proporciona hidratación intensa durante 24 horas.</p>',
    description: `<p>El sérum <strong>Eucerin Hyaluron-Filler</strong> penetra en las capas profundas de la piel para rellenar las arrugas desde el interior.</p><h2>Beneficios</h2><ul><li>Rellena las arrugas desde el interior</li><li>Hidratación intensa durante 24 horas</li><li>Piel visiblemente más lisa y tersa</li><li>Textura no grasa, absorción rápida</li><li>Testado dermatológicamente</li></ul><h2>Modo de empleo</h2><p>Aplicar mañana y noche sobre el rostro limpio antes de la crema hidratante.</p>`,
  },
  'anthelios-spf50': {
    short_description: '<p>Protector solar SPF 50+ de La Roche-Posay. Textura ultra-ligera, resistente al agua. Recomendado por dermatólogos.</p>',
    description: `<p><strong>Anthelios SPF 50+</strong> ofrece protección de amplio espectro frente a UVA/UVB con una textura fluida que no deja residuo blanco.</p><h2>Beneficios</h2><ul><li>Protección UVA/UVB muy alta</li><li>Textura fluida e invisible</li><li>Resistente al agua y al sudor</li><li>No comedogénico</li></ul><h2>Modo de empleo</h2><p>Aplicar generosamente 15 minutos antes de la exposición solar. Reaplicar cada 2 horas.</p>`,
  },
  'avene-cleanance-gel': {
    short_description: '<p>Gel limpiador purificante para pieles grasas y con tendencia acneica. Elimina impurezas sin resecar.</p>',
    description: `<p><strong>Avène Cleanance Gel</strong> limpia en profundidad regulando la producción de sebo gracias al Agua Termal de Avène y el extracto de regaliz.</p><h2>Beneficios</h2><ul><li>Purifica y regula el sebo</li><li>Piel limpia sin efecto tirante</li><li>Apto para pieles sensibles y reactivas</li><li>Sin jabón, sin perfume</li></ul><h2>Modo de empleo</h2><p>Aplicar en el rostro húmedo, masajear suavemente y aclarar con abundante agua.</p>`,
  },
  'isdin-fusion-water': {
    short_description: '<p>Fotoprotector SPF 50 de textura ultraligera tipo agua. Fusión perfecta entre hidratación y protección.</p>',
    description: `<p><strong>Isdin Fusion Water</strong> es un fotoprotector de textura ultra-fluida que se funde con la piel sin dejar residuo. Ideal para uso diario.</p><h2>Beneficios</h2><ul><li>Textura tipo agua de absorción inmediata</li><li>SPF 50 de amplio espectro</li><li>No grasa, no comedogénico</li><li>Compatible con maquillaje</li></ul><h2>Modo de empleo</h2><p>Aplicar sobre el rostro limpio cada mañana como último paso de la rutina.</p>`,
  },
  'bioderma-sensibio': {
    short_description: '<p>Agua micelar dermatológica para pieles sensibles. Limpia, desmaquilla y calma en un solo gesto sin aclarado.</p>',
    description: `<p><strong>Bioderma Sensibio H2O</strong> es la referencia mundial en aguas micelares. Su fórmula biológicamente compatible con la piel respeta la microbiota cutánea.</p><h2>Beneficios</h2><ul><li>Limpia y desmaquilla eficazmente</li><li>No irrita ni reseca</li><li>Sin aclarado necesario</li><li>Testado oftalmológicamente</li></ul><h2>Modo de empleo</h2><p>Impregnar un disco de algodón y limpiar el rostro y contorno de ojos con suaves movimientos.</p>`,
  },
  'vichy-liftactiv-b3': {
    short_description: '<p>Sérum concentrado con Niacinamida 3,5% y ácido salicílico. Unifica el tono y reduce manchas visiblemente.</p>',
    description: `<p><strong>Vichy Liftactiv B3 Sérum</strong> actúa sobre las manchas oscuras y la textura irregular con una fórmula de eficacia probada clínicamente.</p><h2>Beneficios</h2><ul><li>Reduce manchas en 2 semanas</li><li>Unifica y luminiza el tono</li><li>Mejora la textura de la piel</li><li>Apto para pieles sensibles</li></ul><h2>Modo de empleo</h2><p>Aplicar 4-5 gotas sobre el rostro limpio por la mañana y/o noche antes de la crema.</p>`,
  },
  'cetaphil-crema-hidratante': {
    short_description: '<p>Crema hidratante de larga duración para pieles secas y sensibles. Sin perfume, sin parabenos.</p>',
    description: `<p><strong>Cetaphil Crema Hidratante</strong> proporciona hidratación intensa de 48 horas con una fórmula clínicamente probada para pieles muy secas y sensibles.</p><h2>Beneficios</h2><ul><li>Hidratación durante 48 horas</li><li>Restaura la barrera cutánea</li><li>Sin perfume ni colorantes</li><li>No obstruye los poros</li></ul><h2>Modo de empleo</h2><p>Aplicar sobre piel limpia en cara y cuerpo cuantas veces sea necesario.</p>`,
  },
  'neutrogena-hydro-boost': {
    short_description: '<p>Gel-crema ultraligero con ácido hialurónico. Hidratación intensiva que se funde con la piel y no deja residuo graso.</p>',
    description: `<p><strong>Neutrogena Hydro Boost Water Gel</strong> libera ácido hialurónico de forma continua para mantener la piel hidratada durante todo el día.</p><h2>Beneficios</h2><ul><li>Ácido hialurónico de liberación continua</li><li>Textura gel ultra-ligera</li><li>Absorción inmediata sin brillo</li><li>Sin aceites, no comedogénico</li></ul><h2>Modo de empleo</h2><p>Aplicar mañana y/o noche sobre el rostro limpio. Puede usarse bajo el maquillaje.</p>`,
  },
}

export function getMockProductDetail(slug: string): ProductDetail | null {
  const base = MOCK_PRODUCTS.find((p) => p.slug === slug)
  if (!base) return null
  const extra = DETAIL_EXTRA[slug] ?? {
    short_description: `<p>${base.name} de ${base.brand}.</p>`,
    description: `<p>${base.name} — producto seleccionado por nuestros farmacéuticos.</p>`,
  }
  return {
    ...(base as unknown as Product),
    ...extra,
    categories: [{ id: 1, name: 'Dermofarmacia', slug: 'dermofarmacia' }],
    stock_status: 'instock',
  } as ProductDetail
}

export const MOCK_PRODUCT_DETAIL: ProductDetail = getMockProductDetail('eucerin-hyaluron-filler')!

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

const MOCK_BLOG_POSTS_FULL: BlogPostFull[] = [
  {
    id: 1, slug: 'como-elegir-fotoprotector', tag: 'Dermofarmacia', image_color: '#fef9c3',
    title: 'Cómo elegir el fotoprotector según tu tipo de piel',
    date: '2026-03-01T09:00:00',
    excerpt: '<p>La protección solar es el paso más importante de cualquier rutina de cuidado de la piel. Te explicamos cómo elegir el fotoprotector adecuado según tu tipo de piel.</p>',
    content: `<p>La protección solar es el paso más importante de cualquier rutina de cuidado de la piel, tanto en verano como en invierno. Sin embargo, elegir el fotoprotector adecuado puede ser confuso ante tanta variedad de productos.</p><h2>¿Qué es el SPF?</h2><p>El Factor de Protección Solar (SPF) indica cuánto tiempo más podrás estar expuesto al sol sin quemarte en comparación con no llevar protección. Los dermatólogos recomiendan usar un mínimo de <strong>SPF 30</strong> en el día a día, y SPF 50 o superior en exposición solar directa.</p><h2>Según tu tipo de piel</h2><ul><li><strong>Piel seca:</strong> busca fotoprotectores con textura crema o emulsión enriquecida, con ingredientes como ácido hialurónico o glicerina.</li><li><strong>Piel grasa o mixta:</strong> opta por texturas gel-fluido, water gel o "invisible". Busca la indicación "no comedogénico".</li><li><strong>Piel sensible:</strong> elige filtros físicos o minerales (dióxido de titanio, óxido de zinc), que son menos irritantes que los químicos.</li><li><strong>Piel con tendencia acneica:</strong> Isdin Fusion Water o La Roche-Posay Anthelios son opciones muy bien toleradas.</li></ul><h2>Filtros físicos vs químicos</h2><p>Los <strong>filtros físicos</strong> reflejan la radiación UV y son ideales para pieles sensibles. Los <strong>filtros químicos</strong> la absorben y transforman en calor — son más ligeros en textura pero pueden causar irritación en pieles reactivas.</p><h2>Nuestra recomendación</h2><p>En Farmacia Granda siempre recomendamos consultar con nuestro equipo farmacéutico antes de elegir. Cada piel es diferente, y el fotoprotector que mejor funciona para una persona puede no ser el ideal para otra.</p>`,
  },
  {
    id: 2, slug: 'vitamina-d-suplementacion', tag: 'Salud', image_color: '#dbeafe',
    title: 'Vitamina D: cuándo y cómo suplementar correctamente',
    date: '2026-03-08T09:00:00',
    excerpt: '<p>La deficiencia de vitamina D es muy frecuente. Te explicamos cuándo suplementar, qué dosis tomar y qué factores influyen en su absorción.</p>',
    content: `<p>La vitamina D es fundamental para la salud ósea, el sistema inmune y el estado de ánimo. Sin embargo, la mayoría de la población no obtiene suficiente a través de la exposición solar o la dieta.</p><h2>¿Por qué nos falta vitamina D?</h2><p>En latitudes como la española, entre octubre y marzo el ángulo solar es demasiado bajo para sintetizar vitamina D en la piel. Pasar muchas horas en interiores, el uso de protección solar y la piel más oscura también reducen la síntesis.</p><h2>Síntomas de deficiencia</h2><ul><li>Fatiga persistente sin causa aparente</li><li>Dolor óseo y muscular</li><li>Mayor frecuencia de infecciones</li><li>Bajadas de ánimo, especialmente en invierno</li></ul><h2>¿Cuánto tomar?</h2><p>La dosis habitual de mantenimiento oscila entre <strong>1.000 y 2.000 UI diarias</strong> para adultos. En deficiencias comprobadas, el médico puede prescribir dosis de carga más altas. Siempre es recomendable analizar los niveles en sangre (25-OH vitamina D) antes de suplementar.</p><h2>Vitamina D3 vs D2</h2><p>La vitamina D3 (colecalciferol) es la forma que produce el cuerpo y la más efectiva para elevar los niveles séricos. Prefiere siempre D3 sobre D2 en los suplementos.</p><h2>Nuestra recomendación</h2><p>Consulta con tu farmacéutico antes de empezar un suplemento de vitamina D. En Farmacia Granda disponemos de análisis rápidos y asesoramiento personalizado.</p>`,
  },
  {
    id: 3, slug: 'probioticos-salud-intestinal', tag: 'Nutrición', image_color: '#f0f7f4',
    title: 'Los mejores probióticos para la salud intestinal',
    date: '2026-03-15T09:00:00',
    excerpt: '<p>El intestino es nuestro segundo cerebro. Descubre qué cepas probióticas funcionan mejor y cuándo tiene sentido tomarlas.</p>',
    content: `<p>Los probióticos son microorganismos vivos que, consumidos en cantidades adecuadas, aportan un beneficio para la salud del huésped. No todos los probióticos son iguales: la cepa y la dosis importan.</p><h2>¿Para qué sirven?</h2><ul><li>Restablecer la flora tras un tratamiento antibiótico</li><li>Reducir la duración de la diarrea infecciosa</li><li>Aliviar síntomas del síndrome de intestino irritable</li><li>Reforzar la barrera intestinal y el sistema inmune</li></ul><h2>Cepas más estudiadas</h2><p><strong>Lactobacillus rhamnosus GG</strong> — la cepa probiótica más investigada del mundo. Eficaz para diarrea asociada a antibióticos y gastroenteritis.</p><p><strong>Saccharomyces boulardii</strong> — levadura que sobrevive al entorno ácido del estómago. Muy útil durante viajes y tras antibióticos.</p><p><strong>Bifidobacterium longum</strong> — mejora la consistencia de las heces y reduce el estreñimiento.</p><h2>¿Cuándo tomarlos?</h2><p>Lo ideal es tomarlos con el estómago semivacío, 30 minutos antes de comer, o junto con alimentos que no superen los 37 °C para no dañar los microorganismos.</p><h2>Nuestra recomendación</h2><p>En Farmacia Granda te ayudamos a elegir el probiótico adecuado según tu situación. Una selección correcta de cepa y dosis marca la diferencia entre un complemento eficaz y uno que no sirve de nada.</p>`,
  },
  {
    id: 4, slug: 'rutina-cuidado-facial', tag: 'Dermofarmacia', image_color: '#fef9c3',
    title: 'Rutina de cuidado facial: paso a paso para cada tipo de piel',
    date: '2026-03-22T09:00:00',
    excerpt: '<p>Una buena rutina facial no necesita ser complicada. Te explicamos los pasos esenciales y cómo adaptarlos a tu tipo de piel.</p>',
    content: `<p>Una rutina de cuidado facial efectiva no tiene que ser larga ni cara. Lo importante es la constancia y usar los productos adecuados para tu tipo de piel.</p><h2>Los 4 pasos esenciales</h2><p><strong>1. Limpieza</strong> — Elimina impurezas, exceso de sebo y restos de maquillaje. Por la mañana basta con agua micelar o un gel suave. Por la noche, una limpieza más profunda.</p><p><strong>2. Tratamiento (sérum)</strong> — El sérum es el paso donde se concentra la acción. Ácido hialurónico para hidratación, vitamina C para luminosidad, retinol para antiaging.</p><p><strong>3. Hidratación</strong> — Incluso las pieles grasas necesitan hidratación. La clave es elegir la textura correcta: gel para pieles grasas, emulsión para mixtas, crema para secas.</p><p><strong>4. Protección solar</strong> — Solo por la mañana, pero imprescindible. El fotoprotector es el antiaging más eficaz que existe.</p><h2>Por tipo de piel</h2><ul><li><strong>Piel seca:</strong> prioriza ingredientes como ceramidas, escualano y ácido hialurónico.</li><li><strong>Piel grasa:</strong> opta por texturas oil-free y no comedogénicas. El ácido salicílico ayuda a regular el sebo.</li><li><strong>Piel sensible:</strong> menos pasos, ingredientes mínimos. Avène, La Roche-Posay y Cetaphil son referencias seguras.</li><li><strong>Piel madura:</strong> retinol, péptidos y antioxidantes son tus aliados.</li></ul><h2>Nuestra recomendación</h2><p>Si no sabes por dónde empezar, pásate por Farmacia Granda. Nuestros farmacéuticos pueden analizar tu piel y diseñar una rutina personalizada.</p>`,
  },
  {
    id: 5, slug: 'omega3-beneficios', tag: 'Nutrición', image_color: '#f0f7f4',
    title: 'Omega-3: beneficios y cuándo tomar suplementos',
    date: '2026-03-29T09:00:00',
    excerpt: '<p>Los ácidos grasos omega-3 son esenciales para el corazón, el cerebro y la inflamación. ¿Cuándo conviene suplementar y qué producto elegir?</p>',
    content: `<p>Los ácidos grasos omega-3 (EPA y DHA) son grasas poliinsaturadas esenciales que el cuerpo no puede fabricar por sí solo. Deben obtenerse de la dieta o de suplementos.</p><h2>Beneficios demostrados</h2><ul><li>Reducción de los triglicéridos en sangre</li><li>Efecto antiinflamatorio sistémico</li><li>Apoyo a la función cognitiva y al estado de ánimo</li><li>Desarrollo cerebral y visual en embarazo y lactancia</li></ul><h2>¿Puedo obtenerlos solo de la dieta?</h2><p>Con 2-3 raciones semanales de pescado azul (salmón, sardinas, caballa, boquerón) se puede cubrir la necesidad. Si el consumo de pescado es bajo, el suplemento está justificado.</p><h2>Qué buscar en un suplemento</h2><p>Fíjate en el contenido real de <strong>EPA + DHA</strong>, no en el total de aceite de pescado. Una dosis eficaz suele ser de 1.000-2.000 mg de EPA+DHA al día. Elige productos con certificación de pureza (sin metales pesados).</p><h2>Omega-3 vegano</h2><p>Las personas veganas pueden optar por aceite de algas, que aporta DHA directamente sin necesidad de conversión desde ALA (como ocurre con el lino o la chía).</p><h2>Nuestra recomendación</h2><p>Consulta a tu farmacéutico si tienes triglicéridos elevados o antecedentes cardiovasculares. En esos casos, las dosis pueden ser más altas y conviene hacerlo con seguimiento médico.</p>`,
  },
  {
    id: 6, slug: 'hidratacion-piel-seca', tag: 'Dermofarmacia', image_color: '#fef9c3',
    title: 'Guía completa para hidratar la piel seca en invierno',
    date: '2026-04-05T09:00:00',
    excerpt: '<p>El frío y la calefacción resecan la piel. Descubre los mejores activos e ingredientes para recuperar la barrera cutánea en los meses fríos.</p>',
    content: `<p>En invierno, la combinación de frío exterior y calefacción interior reduce drásticamente la humedad ambiental, lo que se traduce directamente en piel más seca, tirante y sensible.</p><h2>Por qué se reseca más en invierno</h2><p>Las bajas temperaturas reducen la actividad de las glándulas sebáceas. Al mismo tiempo, el aire seco de la calefacción evapora el agua de la capa superficial de la piel (transpiración insensible), debilitando la barrera cutánea.</p><h2>Ingredientes clave</h2><ul><li><strong>Ceramidas</strong> — restauran la barrera lipídica. Cerave y La Roche-Posay Lipikar las incluyen en altas concentraciones.</li><li><strong>Ácido hialurónico</strong> — capta y retiene agua en la piel. Más eficaz cuando se aplica sobre piel húmeda.</li><li><strong>Urea</strong> — en concentraciones del 5-10%, hidrata y suaviza. Especialmente útil para talones y codos muy secos.</li><li><strong>Escualano</strong> — aceite ligero y no comedogénico que imita el sebo natural y sella la hidratación.</li></ul><h2>Hábitos que marcan la diferencia</h2><ul><li>Ducharse con agua tibia, no caliente</li><li>Aplicar la crema corporal justo al salir de la ducha, con la piel aún húmeda</li><li>Usar un humidificador en el dormitorio si tienes calefacción</li><li>Beber agua con regularidad a lo largo del día</li></ul><h2>Nuestra recomendación</h2><p>Si tu piel está muy seca o aparecen grietas, puede ser señal de dermatitis o eccema. En Farmacia Granda podemos orientarte y, si es necesario, derivarte al dermatólogo.</p>`,
  },
]

export function getMockBlogPost(slug: string): BlogPostFull | null {
  return MOCK_BLOG_POSTS_FULL.find((p) => p.slug === slug) ?? null
}

export const MOCK_BLOG_POST_FULL = MOCK_BLOG_POSTS_FULL[0]

export const MOCK_USER = {
  name: 'Usuario Demo',
  email: 'demo@farmaciaganda.com',
  memberSince: '2023-04-12',
  loyaltyPoints: 340,
}

export const MOCK_RECENT_SEARCHES = [
  'protector solar', 'vitamina c sérum', 'crema hidratante', 'omega 3', 'probióticos',
]

export const MOCK_RECENT_ORDERS = [
  {
    id: 'FG-2024-0091',
    date: '2026-04-15',
    status: 'Entregado',
    items: [
      { name: 'Eucerin Hyaluron-Filler Sérum', price: '34.90', slug: 'eucerin-hyaluron-filler' },
      { name: 'Bioderma Sensibio H2O 500ml', price: '16.40', slug: 'bioderma-sensibio' },
    ],
    total: '51.30',
  },
  {
    id: 'FG-2024-0078',
    date: '2026-03-28',
    status: 'Entregado',
    items: [{ name: 'Isdin Fusion Water SPF 50', price: '28.75', slug: 'isdin-fusion-water' }],
    total: '28.75',
  },
  {
    id: 'FG-2024-0065',
    date: '2026-03-10',
    status: 'Entregado',
    items: [
      { name: 'Vichy Liftactiv B3 Sérum', price: '41.00', slug: 'vichy-liftactiv-b3' },
      { name: 'Avène Cleanance Gel Limpiador', price: '12.90', slug: 'avene-cleanance-gel' },
    ],
    total: '53.90',
  },
]
