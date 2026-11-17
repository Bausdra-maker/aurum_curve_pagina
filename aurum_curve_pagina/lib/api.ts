import type { CatalogProduct } from '@/lib/store'

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080'

type ApiProduct = Omit<CatalogProduct, 'wholesalePrice'> & {
  wholesalePrice: number | string
  vatIncluded: boolean
}

/** Catálogo desde Spring Boot (GET /api/products). Sin fallback: si falla, devuelve el error. */
export async function fetchProducts(): Promise<{ products: CatalogProduct[]; error: string | null }> {
  try {
    const res = await fetch(`${API_URL}/api/products`, { cache: 'no-store' })
    if (!res.ok) {
      return { products: [], error: `El backend respondió ${res.status} en /api/products.` }
    }
    const data = (await res.json()) as ApiProduct[]
    return {
      products: data.map(({ vatIncluded: _vat, ...p }) => ({ ...p, wholesalePrice: Number(p.wholesalePrice) })),
      error: null,
    }
  } catch {
    return { products: [], error: `No se pudo conectar con el backend en ${API_URL}.` }
  }
}
