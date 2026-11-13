'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PackageCheck } from 'lucide-react'
import { toast } from 'sonner'
import { formatPrice, type CatalogProduct } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { StockBadge } from '@/components/stock-badge'
import { useStore } from '@/components/store-provider'

function PriceForm({ product, onDone }: { product: CatalogProduct; onDone: () => void }) {
  const { addToCart, cart } = useStore()
  const router = useRouter()

  const initial = product.variants.find((v) => v.stock > 0) ?? product.variants[0]
  const [color, setColor] = useState<string | null>(initial?.color ?? null)
  const [size, setSize] = useState(initial?.size ?? '')
  const [quantity, setQuantity] = useState(product.minQuantity)

  const colorVariants = product.variants.filter((v) => v.color === color)
  const variant = colorVariants.find((v) => v.size === size) ?? colorVariants[0]
  const inCart = variant ? cart.filter((l) => l.variantId === variant.id).reduce((s, l) => s + l.quantity, 0) : 0
  const remaining = variant ? Math.max(0, variant.stock - inCart) : 0
  const soldOut = product.stock <= 0
  const invalid = !variant || quantity < 1 || quantity > remaining
  const price = product.wholesalePrice

  function pickColor(next: string | null) {
    const options = product.variants.filter((v) => v.color === next)
    const keep = options.find((v) => v.size === size && v.stock > 0) ?? options.find((v) => v.stock > 0) ?? options[0]
    setColor(next)
    setSize(keep?.size ?? '')
  }

  function add() {
    if (invalid || !variant) return
    addToCart({
      variantId: variant.id,
      productId: product.id,
      name: product.name,
      image: product.image,
      size: variant.size,
      color: variant.color,
      quantity,
      unitPrice: price,
      minQuantity: product.minQuantity,
    })
    toast.success(`${quantity} × ${product.name} (${variant.color ? `${variant.color}, ` : ''}${variant.size}) agregado`)
    onDone()
    router.push('/carrito')
  }

  return (
    <>
      <div className="flex items-end justify-between gap-4 rounded-xl bg-secondary p-4">
        <div>
          <p className="text-xs tracking-widest text-muted-foreground uppercase">Precio por unidad · IVA incluido</p>
          <p className="font-serif text-4xl font-semibold text-primary">{formatPrice(price)}</p>
          <p className="text-xs text-muted-foreground">mín. {product.minQuantity} unidades por modelo</p>
        </div>
        <StockBadge stock={product.stock} />
      </div>

      {soldOut ? (
        <p className="text-sm text-muted-foreground">
          Este modelo está en <strong>Almacenamiento</strong> (reponiendo). Escribinos para prerreservar la próxima tanda.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {product.colors.length > 0 && (
            <fieldset>
              <legend className="mb-2 text-sm font-medium">Color</legend>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => {
                  const hasStock = product.variants.some((v) => v.color === c && v.stock > 0)
                  return (
                    <button
                      key={c}
                      type="button"
                      disabled={!hasStock}
                      onClick={() => pickColor(c)}
                      aria-pressed={color === c}
                      className={cn(
                        'rounded-lg border px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40',
                        color === c ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-muted',
                      )}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Talle</legend>
            <div className="flex flex-wrap gap-2">
              {colorVariants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  disabled={v.stock <= 0}
                  onClick={() => setSize(v.size)}
                  aria-pressed={variant?.id === v.id}
                  className={cn(
                    'min-w-11 rounded-lg border px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40',
                    variant?.id === v.id ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-muted',
                  )}
                >
                  {v.size}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`qty-${product.id}`}>Unidades de esta variante</Label>
            <Input
              id={`qty-${product.id}`}
              type="number"
              min={1}
              max={remaining}
              value={quantity}
              onChange={(e) => setQuantity(Math.floor(Number(e.target.value)) || 0)}
            />
            <p className="text-xs text-muted-foreground">
              {remaining} unidades disponibles de esta variante. El mínimo de {product.minQuantity} unidades se cuenta
              sumando todas las variantes del modelo.
            </p>
          </div>
        </div>
      )}

      <DialogFooter>
        <Button size="lg" onClick={add} disabled={soldOut || invalid} className="w-full sm:w-auto">
          <PackageCheck aria-hidden="true" />
          Agregar al carrito · {formatPrice(price * Math.max(quantity, 0))}
        </Button>
      </DialogFooter>
    </>
  )
}

export function PriceDialog({
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
      <DialogContent className="sm:max-w-lg">
        {product && (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">{product.name}</DialogTitle>
              <DialogDescription>{product.description}</DialogDescription>
            </DialogHeader>
            <PriceForm key={product.id} product={product} onDone={() => onOpenChange(false)} />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
