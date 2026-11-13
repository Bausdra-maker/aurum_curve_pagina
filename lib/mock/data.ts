export type UserRole = 'buyer' | 'seller' | 'admin'

export type MockUser = {
  id: string
  name: string
  email: string
  // Mock only: plain-text demo passwords. Never do this with real accounts.
  password: string
  businessName: string | null
  phone: string | null
  role: UserRole
}

export type Product = {
  id: number
  slug: string
  name: string
  category: string
  section: string
  description: string
  wholesalePrice: number
  minQuantity: number
  sizes: string[]
  stock: number
  image: string
}

export type OrderItem = {
  productId: number
  name: string
  size: string
  quantity: number
  unitPrice: number
}

export type Order = {
  id: number
  userId: string
  items: OrderItem[]
  totalUnits: number
  total: number
  fulfillment: string
  paymentMethod: string
  address: string | null
  notes: string | null
  status: string
  createdAt: Date
}

export type Inquiry = {
  id: number
  name: string
  businessName: string | null
  email: string
  phone: string | null
  message: string
  createdAt: Date
}

export const DEMO_PASSWORD = 'demo1234'

export const DEMO_ACCOUNTS = [
  { email: 'comprador@aurumcurve.test', label: 'Comprador' },
  { email: 'vendedor@aurumcurve.test', label: 'Vendedor' },
] as const

const TOPS = ['S', 'M', 'L', 'XL', 'XXL']

export const SEED_USERS: MockUser[] = [
  {
    id: 'u_buyer',
    name: 'Lucía Fernández',
    email: 'comprador@aurumcurve.test',
    password: DEMO_PASSWORD,
    businessName: 'Tienda Ámbar',
    phone: '+54 911 5555-0101',
    role: 'buyer',
  },
  {
    id: 'u_seller',
    name: 'Bautista Romero',
    email: 'vendedor@aurumcurve.test',
    password: DEMO_PASSWORD,
    businessName: 'Aurum Curve',
    phone: '+54 911 5555-0001',
    role: 'seller',
  },
  {
    id: 'u_lumiere',
    name: 'Camila Duarte',
    email: 'camila@lumiere.test',
    password: DEMO_PASSWORD,
    businessName: 'Boutique Lumière',
    phone: null,
    role: 'buyer',
  },
  {
    id: 'u_modasur',
    name: 'Martín Ríos',
    email: 'martin@modasur.test',
    password: DEMO_PASSWORD,
    businessName: 'Moda Sur',
    phone: null,
    role: 'buyer',
  },
]

export const SEED_PRODUCTS: Product[] = [
  {
    id: 1,
    slug: 'pantalon-jean',
    name: 'Pantalón Jean',
    category: 'Pantalones',
    section: 'featured',
    description: 'Denim rígido de 14 oz, corte recto, remaches reforzados y avíos dorados.',
    wholesalePrice: 18500,
    minQuantity: 6,
    sizes: ['36', '38', '40', '42', '44', '46'],
    stock: 240,
    image: '/images/products/pantalon-jean.png',
  },
  {
    id: 2,
    slug: 'buzo-rompeviento',
    name: 'Buzo Rompeviento',
    category: 'Abrigos',
    section: 'new-season',
    description: 'Rompeviento hidrorrepelente con forro de polar frisado, de la colección Otoño · Invierno.',
    wholesalePrice: 24900,
    minQuantity: 6,
    sizes: TOPS,
    stock: 96,
    image: '/images/products/buzo-rompeviento.png',
  },
  {
    id: 3,
    slug: 'remera-deportiva',
    name: 'Remera Deportiva',
    category: 'Deportivo',
    section: 'featured',
    description: 'Remera dry-fit respirable con costuras planas, ideal para gimnasios y locales deportivos.',
    wholesalePrice: 8900,
    minQuantity: 6,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 320,
    image: '/images/products/remera-deportiva.png',
  },
  {
    id: 4,
    slug: 'prendas-unisex',
    name: 'Prendas Unisex',
    category: 'Básicos',
    section: 'featured',
    description: 'Básicos oversize de algodón pesado, pensados para todos los cuerpos. Combiná colores por tanda.',
    wholesalePrice: 11500,
    minQuantity: 6,
    sizes: TOPS,
    stock: 18,
    image: '/images/products/prendas-unisex.png',
  },
  {
    id: 5,
    slug: 'variedad-disenos',
    name: 'Variedad De Diseños',
    category: 'Básicos',
    section: 'new-season',
    description: 'Pack surtido de prendas estampadas. Cada tanda llega con diseños distintos.',
    wholesalePrice: 13900,
    minQuantity: 6,
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 0,
    image: '/images/products/variedad-disenos.png',
  },
  {
    id: 6,
    slug: 'gorras',
    name: 'Gorras',
    category: 'Accesorios',
    section: 'accessories',
    description: 'Gorras de gabardina de seis paneles con frente bordado y hebilla metálica regulable.',
    wholesalePrice: 6500,
    minQuantity: 12,
    sizes: ['Única'],
    stock: 150,
    image: '/images/products/gorras.png',
  },
  {
    id: 7,
    slug: 'cinturones',
    name: 'Cinturones',
    category: 'Accesorios',
    section: 'accessories',
    description: 'Cinturones de cuero genuino con hebilla dorada satinada. Se venden en largos surtidos.',
    wholesalePrice: 7200,
    minQuantity: 6,
    sizes: ['90', '100', '110'],
    stock: 42,
    image: '/images/products/cinturones.png',
  },
  {
    id: 8,
    slug: 'medias',
    name: 'Medias',
    category: 'Accesorios',
    section: 'accessories',
    description: 'Medias de algodón peinado con talón y puntera reforzados, por docena.',
    wholesalePrice: 2900,
    minQuantity: 12,
    sizes: ['35-38', '39-42', '43-46'],
    stock: 600,
    image: '/images/products/medias.png',
  },
  {
    id: 9,
    slug: 'rinoneras',
    name: 'Riñoneras',
    category: 'Accesorios',
    section: 'new-season',
    description: 'Riñoneras de nylon con tres bolsillos con cierre y correa regulable.',
    wholesalePrice: 9800,
    minQuantity: 6,
    sizes: ['Única'],
    stock: 75,
    image: '/images/products/rinoneras.png',
  },
]

function daysAgo(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000)
}

function order(data: Omit<Order, 'totalUnits' | 'total'>): Order {
  return {
    ...data,
    totalUnits: data.items.reduce((sum, i) => sum + i.quantity, 0),
    total: data.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0),
  }
}

export const SEED_ORDERS: Order[] = [
  order({
    id: 1042,
    userId: 'u_lumiere',
    items: [
      { productId: 1, name: 'Pantalón Jean', size: '38', quantity: 12, unitPrice: 18500 },
      { productId: 1, name: 'Pantalón Jean', size: '40', quantity: 12, unitPrice: 18500 },
      { productId: 3, name: 'Remera Deportiva', size: 'M', quantity: 24, unitPrice: 8900 },
    ],
    fulfillment: 'pickup',
    paymentMethod: 'transfer',
    address: null,
    notes: 'Retiro el jueves por la tarde.',
    status: 'reserved',
    createdAt: daysAgo(0),
  }),
  order({
    id: 1041,
    userId: 'u_modasur',
    items: [
      { productId: 2, name: 'Buzo Rompeviento', size: 'L', quantity: 60, unitPrice: 24900 },
      { productId: 2, name: 'Buzo Rompeviento', size: 'XL', quantity: 60, unitPrice: 24900 },
    ],
    fulfillment: 'delivery',
    paymentMethod: 'card',
    address: 'Bv. Oroño 1450, Rosario, Santa Fe',
    notes: 'Factura A.',
    status: 'paid',
    createdAt: daysAgo(1),
  }),
  order({
    id: 1040,
    userId: 'u_buyer',
    items: [
      { productId: 4, name: 'Prendas Unisex', size: 'M', quantity: 6, unitPrice: 11500 },
      { productId: 4, name: 'Prendas Unisex', size: 'L', quantity: 6, unitPrice: 11500 },
      { productId: 6, name: 'Gorras', size: 'Única', quantity: 12, unitPrice: 6500 },
    ],
    fulfillment: 'delivery',
    paymentMethod: 'transfer',
    address: 'Av. Colón 820, Córdoba',
    notes: null,
    status: 'dispatched',
    createdAt: daysAgo(3),
  }),
  order({
    id: 1039,
    userId: 'u_buyer',
    items: [
      { productId: 8, name: 'Medias', size: '39-42', quantity: 24, unitPrice: 2900 },
      { productId: 7, name: 'Cinturones', size: '100', quantity: 12, unitPrice: 7200 },
    ],
    fulfillment: 'pickup',
    paymentMethod: 'cash',
    address: null,
    notes: 'Paso con camioneta.',
    status: 'ready',
    createdAt: daysAgo(6),
  }),
  order({
    id: 1036,
    userId: 'u_lumiere',
    items: [{ productId: 9, name: 'Riñoneras', size: 'Única', quantity: 18, unitPrice: 9800 }],
    fulfillment: 'delivery',
    paymentMethod: 'transfer',
    address: 'San Martín 230, Mendoza',
    notes: null,
    status: 'delivered',
    createdAt: daysAgo(14),
  }),
]

export const SEED_INQUIRIES: Inquiry[] = [
  {
    id: 3,
    name: 'Sofía Gómez',
    businessName: 'Bazar 9',
    email: 'sofia@bazar9.test',
    phone: '+54 911 5555-0303',
    message: '¿Tienen reposición de Variedad De Diseños para fin de mes? Me interesan 36 unidades.',
    createdAt: daysAgo(0),
  },
  {
    id: 2,
    name: 'Martín Ríos',
    businessName: 'Grupo Norte',
    email: 'martin@gruponorte.test',
    phone: null,
    message: 'Necesito la lista de precios actualizada y condiciones de envío a Salta.',
    createdAt: daysAgo(2),
  },
  {
    id: 1,
    name: 'Lucía Fernández',
    businessName: 'Tienda Ámbar',
    email: 'comprador@aurumcurve.test',
    phone: '+54 911 5555-0101',
    message: 'Hola! ¿Van a tener talles XL en Prendas Unisex la semana que viene?',
    createdAt: daysAgo(5),
  },
]
