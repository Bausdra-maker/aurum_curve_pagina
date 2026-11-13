import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const STATS = [
  { value: '6', label: 'unidades mínimas por modelo' },
  { value: '48h', label: 'de reserva de stock' },
  { value: '24', label: 'provincias con envío' },
]

export function Hero() {
  return (
    <section id="home" className="scroll-mt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 lg:grid-cols-2 lg:py-20">
        <div className="flex flex-col gap-8">
          <p className="text-xs tracking-[0.35em] text-primary uppercase">Indumentaria mayorista premium</p>
          <h1 className="font-serif text-5xl leading-[1.05] font-medium md:text-7xl">
            Colecciones curadas, pensadas para <em className="text-primary">tu local.</em>
          </h1>
          <p className="max-w-lg text-pretty text-lg text-muted-foreground">
            Aurum Curve abastece a boutiques y revendedores con básicos de calidad — denim, abrigos, deportivo y
            accesorios — con precios mayoristas claros y reserva de stock en tiempo real.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/catalogo" className={cn(buttonVariants({ size: 'lg' }), 'h-12 px-6')}>
              Ver catálogo
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/#contact" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'h-12 px-6')}>
              Hablar con ventas
            </Link>
          </div>
          <dl className="grid max-w-md grid-cols-3 gap-6 border-t pt-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-3xl font-semibold text-primary">{s.value}</dd>
                <dd className="text-xs text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-secondary lg:aspect-[4/4.5]">
          <Image
            src="/images/hero.png"
            alt="Prendas de Aurum Curve exhibidas en un showroom con luz cálida dorada"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute right-4 bottom-4 left-4 rounded-2xl bg-card/90 p-4 backdrop-blur sm:right-auto sm:max-w-xs">
            <p className="text-xs tracking-widest text-primary uppercase">Nueva temporada</p>
            <p className="font-serif text-xl">Colección Otoño · Invierno ya en stock</p>
          </div>
        </div>
      </div>
    </section>
  )
}
