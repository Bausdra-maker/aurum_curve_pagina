import { CreditCard, PackageCheck, Search, Store, Truck, Warehouse } from 'lucide-react'

const STEPS = [
  { icon: Search, title: 'Elegí tus prendas', text: 'Registrá tu negocio y desbloqueá los precios mayoristas por modelo y talle.' },
  { icon: PackageCheck, title: 'Reserva de stock', text: 'Al confirmar el carrito, las unidades quedan reservadas al instante y nadie más puede comprarlas.' },
  { icon: CreditCard, title: 'Pago', text: 'Pagá por transferencia, en efectivo o con link de pago con tarjeta. Lo confirmamos en tu cuenta.' },
  { icon: Truck, title: 'Retiro o envío', text: 'Retirás en nuestro local o te lo enviamos a todo el país con seguimiento.' },
]

export function WorkflowSection() {
  return (
    <section aria-labelledby="workflow-title" className="bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-20">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-xs tracking-[0.3em] text-sidebar-primary uppercase">Cómo funciona la compra mayorista</p>
            <h2 id="workflow-title" className="font-serif text-4xl font-medium md:text-5xl">
              De la reserva a tus estantes
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 px-3 py-1.5">
              <Warehouse className="size-3.5" aria-hidden="true" /> Almacenamiento · reponiendo
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 px-3 py-1.5">
              <Store className="size-3.5" aria-hidden="true" /> Retiro en el local
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 px-3 py-1.5">
              <Truck className="size-3.5" aria-hidden="true" /> Envío a domicilio
            </span>
          </div>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-4 rounded-2xl border border-ink-foreground/15 p-6">
              <div className="flex items-center justify-between">
                <step.icon className="size-6 text-sidebar-primary" aria-hidden="true" />
                <span className="font-serif text-3xl text-ink-foreground/40">0{i + 1}</span>
              </div>
              <h3 className="font-serif text-2xl">{step.title}</h3>
              <p className="text-sm text-ink-foreground/75">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
