export type ProductVariant = {
  id: number
  size: string
  color: string | null
  stock: number
}

export type CatalogProduct = {
  id: number
  slug: string
  name: string
  category: string
  section: string
  description: string
  minQuantity: number
  sizes: string[]
  colors: string[]
  variants: ProductVariant[]
  stock: number
  image: string
  /** Precio unitario final en ARS, IVA incluido. */
  wholesalePrice: number
}

export type StoreUser = {
  name: string
  email: string
  businessName: string | null
  role: string
}

/** Cualquier rol distinto de cliente accede al panel interno (/panel). */
export function isInternalRole(role?: string | null) {
  return !!role && role !== 'buyer'
}

export const ORDER_STATUSES = [
  { value: 'reserved', label: 'Reservado en stock' },
  { value: 'paid', label: 'Pago confirmado' },
  { value: 'ready', label: 'Listo para retirar' },
  { value: 'dispatched', label: 'Despachado' },
  { value: 'delivered', label: 'Entregado' },
  { value: 'cancelled', label: 'Cancelado' },
] as const

export type OrderStatus = (typeof ORDER_STATUSES)[number]['value']

export const PAYMENT_METHODS = [
  { value: 'transfer', label: 'Transferencia bancaria' },
  { value: 'cash', label: 'Efectivo al retirar o recibir' },
  { value: 'card', label: 'Link de pago con tarjeta' },
] as const

export const FULFILLMENT_OPTIONS = [
  { value: 'pickup', label: 'Retiro en el local' },
  { value: 'delivery', label: 'Envío a domicilio' },
] as const

export function statusLabel(status: string) {
  return ORDER_STATUSES.find((s) => s.value === status)?.label ?? status
}

const currency = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

export function formatPrice(value: number) {
  return currency.format(value)
}

export function stockState(stock: number) {
  if (stock <= 0) return { tone: 'out', label: 'Almacenamiento · Reponiendo' } as const
  if (stock <= 50) return { tone: 'low', label: `Últimas unidades · ${stock}` } as const
  return { tone: 'in', label: 'Disponible en stock' } as const
}
