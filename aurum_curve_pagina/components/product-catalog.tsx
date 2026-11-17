'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Ruler, Tag } from 'lucide-react'
import { formatPrice, type CatalogProduct } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PriceDialog } from '@/components/price-dialog'
import { SizeGuideDialog } from '@/components/size-guide-dialog'
import { StockBadge } from '@/components/stock-badge'
import { useStore } from '@/components/store-provider'

const SECTIONS = [
  { value: 'all', label: 'Todos' },
  { value: 'featured', label: 'Destacados' },
  { value: 'new-season', label: 'Nueva temporada' },
  { value: 'accessories', label: 'Accesorios' },
]

export function ProductCatalog({ products }: { products: CatalogProduct[] }) {
  const { user, openAuth, query } = useStore()
  const [section, setSection] = useState('all')
  const [orderProduct, setOrderProduct] = useState<CatalogProduct | null>(null)
  const [sizeProduct, setSizeProduct] = useState<CatalogProduct | null>(null)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter(
      (p) =>
        (section === 'all' || p.section === section) &&
        (!q || [p.name, p.category, p.description].some((field) => field.toLowerCase().includes(q))),
    )
  }, [products, section, query])

  function order(product: CatalogProduct) {
    if (!user) {
      openAuth('sign-in')
      return
    }
    setOrderProduct(product)
  }

  return (
    <section id="catalog" aria-labelledby="catalog-title" className="flex scroll-mt-32 flex-col gap-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[0.3em] text-primary uppercase">Catálogo mayorista</p>
          <h2 id="catalog-title" className="font-serif text-4xl font-medium md:text-5xl">
            Surtí tu local
          </h2>
          <p className="max-w-xl text-pretty text-muted-foreground">
            {user
              ? 'Elegí talle, color y cantidades para reservar stock.'
              : 'Precios finales con IVA incluido. Iniciá sesión con la cuenta de tu negocio para reservar stock.'}
          </p>
        </div>
        <div role="group" aria-label="Filtrar por sección" className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setSection(s.value)}
              aria-pressed={section === s.value}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm transition-colors',
                section === s.value ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-muted',
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
          No hay modelos que coincidan con {query ? <>&ldquo;{query}&rdquo;</> : 'esta sección'}.
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <li key={product.id} className="group flex flex-col overflow-hidden rounded-3xl border bg-card">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <StockBadge stock={product.stock} className="absolute top-3 left-3" />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex flex-col gap-1">
                  <p className="text-xs tracking-widest text-primary uppercase">{product.category}</p>
                  <h3 className="font-serif text-2xl font-medium">{product.name}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                </div>
                <dl className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                  {product.colors.length > 0 && (
                    <div className="flex gap-2">
                      <dt className="font-medium text-foreground">Colores</dt>
                      <dd>{product.colors.join(' · ')}</dd>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <dt className="font-medium text-foreground">Talles</dt>
                    <dd>{product.sizes.join(' · ')}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium text-foreground">Mínimo</dt>
                    <dd>{product.minQuantity} unidades</dd>
                  </div>
                </dl>
                <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
                  <p className="font-serif text-2xl font-semibold text-primary">
                    {formatPrice(product.wholesalePrice)}
                    <span className="ml-1 block font-sans text-xs font-normal text-muted-foreground sm:inline">
                      / unidad · IVA incl.
                    </span>
                  </p>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setSizeProduct(product)}
                      aria-label={`Guía de talles de ${product.name}`}
                    >
                      <Ruler />
                    </Button>
                    <Button size="sm" onClick={() => order(product)}>
                      <Tag aria-hidden="true" />
                      {user ? 'Pedir' : 'Ingresar'}
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <PriceDialog
        product={orderProduct}
        open={!!orderProduct}
        onOpenChange={(open) => !open && setOrderProduct(null)}
      />
      <SizeGuideDialog
        product={sizeProduct}
        open={!!sizeProduct}
        onOpenChange={(open) => !open && setSizeProduct(null)}
      />
    </section>
  )
}
