'use client'

import type { CatalogProduct } from '@/lib/store'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const TOPS: Record<string, string> = { XS: '84–88', S: '88–94', M: '94–100', L: '100–106', XL: '106–112', XXL: '112–118' }
const WAIST: Record<string, string> = { '36': '72', '38': '76', '40': '80', '42': '84', '44': '88', '46': '92' }

function measurement(product: CatalogProduct, size: string) {
  if (product.category === 'Pantalones') return WAIST[size] ? `${WAIST[size]} cm de cintura` : '—'
  if (product.slug === 'cinturones') return `${size} cm de largo`
  if (product.slug === 'medias') return `Calzado ${size}`
  if (TOPS[size]) return `${TOPS[size]} cm de pecho`
  return 'Talle único'
}

export function SizeGuideDialog({
  product,
  open,
  onOpenChange,
}: {
  product: CatalogProduct | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {product && (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">Guía de talles · {product.name}</DialogTitle>
              <DialogDescription>
                Talles disponibles para compra mayorista. Combiná talles libremente hasta llegar al mínimo de {product.minQuantity} unidades.
              </DialogDescription>
            </DialogHeader>
            <table className="w-full text-sm">
              <caption className="sr-only">Talles y medidas disponibles</caption>
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th scope="col" className="py-2 font-medium">Talle</th>
                  <th scope="col" className="py-2 font-medium">Medida</th>
                </tr>
              </thead>
              <tbody>
                {product.sizes.map((size) => (
                  <tr key={size} className="border-b last:border-0">
                    <td className="py-2.5 font-medium">{size}</td>
                    <td className="py-2.5 text-muted-foreground">{measurement(product, size)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
