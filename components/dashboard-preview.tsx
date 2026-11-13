'use client'

import Link from 'next/link'
import { ArrowRight, Boxes, Megaphone, MessageSquare, ShoppingCart, Truck } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const TABS = [
  {
    value: 'orders',
    label: 'Pedidos',
    icon: ShoppingCart,
    rows: [
      ['#1042 · Boutique Lumière', '48 unidades', 'Reservado en stock'],
      ['#1041 · Moda Sur', '120 unidades', 'Pago confirmado'],
      ['#1039 · Urban Hub', '36 unidades', 'Listo para retirar'],
    ],
  },
  {
    value: 'stock',
    label: 'Reservas de stock',
    icon: Boxes,
    rows: [
      ['Pantalón Jean', '240 disponibles', '36 reservadas'],
      ['Prendas Unisex', '18 disponibles', 'Últimas unidades'],
      ['Variedad De Diseños', '0 disponibles', 'Almacenamiento'],
    ],
  },
  {
    value: 'delivery',
    label: 'Seguimiento de envíos',
    icon: Truck,
    rows: [
      ['#1038 · Córdoba', 'Andreani', 'Despachado'],
      ['#1036 · Rosario', 'Flota propia', 'Entregado'],
      ['#1039 · Retiro', 'Mostrador del local', 'Esperando al comprador'],
    ],
  },
  {
    value: 'messages',
    label: 'Mensajes',
    icon: MessageSquare,
    rows: [
      ['Lucía · Tienda Ámbar', 'WhatsApp', 'Pidió reposición de XL'],
      ['Martín · Grupo Norte', 'Email', 'Pidió lista de precios'],
      ['Sofía · Bazar 9', 'Formulario de contacto', 'Respondido'],
    ],
  },
  {
    value: 'social',
    label: 'Redes sociales',
    icon: Megaphone,
    rows: [
      ['Instagram · Nuevo lanzamiento denim', 'Lun 10:00', 'Programado'],
      ['Facebook · Aviso de reposición', 'Mié 18:00', 'Borrador'],
      ['TikTok · Detrás de las costuras', 'Vie 12:00', 'Publicado'],
    ],
  },
]

export function DashboardPreview() {
  return (
    <section aria-labelledby="dashboard-title" className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[0.3em] text-primary uppercase">Para vendedores y administradores</p>
          <h2 id="dashboard-title" className="font-serif text-4xl font-medium md:text-5xl">
            Un solo panel para toda la operación
          </h2>
        </div>
        <Link href="/dashboard" className={cn(buttonVariants({ variant: 'outline' }))}>
          Abrir panel de vendedor
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
        <Tabs defaultValue="orders" className="gap-0">
          <div className="overflow-x-auto border-b bg-secondary/60 p-2">
            <TabsList className="bg-transparent">
              {TABS.map((t) => (
                <TabsTrigger key={t.value} value={t.value} className="gap-2 px-3">
                  <t.icon className="size-4" aria-hidden="true" />
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {TABS.map((t) => (
            <TabsContent key={t.value} value={t.value} className="p-2 sm:p-4">
              <ul className="divide-y">
                {t.rows.map(([a, b, c]) => (
                  <li key={a} className="grid grid-cols-2 items-center gap-2 px-2 py-4 text-sm sm:grid-cols-3">
                    <span className="font-medium">{a}</span>
                    <span className="hidden text-muted-foreground sm:block">{b}</span>
                    <span className="justify-self-end rounded-full bg-accent/50 px-3 py-1 text-xs text-accent-foreground">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
        <p className="border-t bg-muted/40 px-6 py-3 text-xs text-muted-foreground">
          Vista previa con datos de ejemplo. El panel muestra pedidos, consultas y stock a las cuentas de vendedor.
        </p>
      </div>
    </section>
  )
}
