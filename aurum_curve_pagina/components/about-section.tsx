import { Gem, Handshake, Leaf } from 'lucide-react'

const VALUES = [
  { icon: Gem, title: 'Terminaciones premium', text: 'Telas de buen gramaje, costuras reforzadas y avíos dorados en cada tanda.' },
  { icon: Handshake, title: 'Pensado para revendedores', text: 'Mínimos bajos, talles combinables y márgenes reales para que tu local sea rentable.' },
  { icon: Leaf, title: 'Producción en tandas chicas', text: 'Producimos en series limitadas para reducir desperdicio y que cada lanzamiento sea exclusivo.' },
]

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-32 bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <p className="text-xs tracking-[0.3em] text-primary uppercase">Sobre Aurum Curve</p>
          <h2 id="about-title" className="font-serif text-4xl font-medium md:text-5xl">
            Una casa mayorista con alma de boutique
          </h2>
          <p className="text-pretty text-muted-foreground">
            Nacida en Buenos Aires, Aurum Curve diseña y fabrica indumentaria de uso diario de alta calidad, exclusivamente
            para locales, showrooms y revendedores independientes de toda la Argentina.
          </p>
        </div>
        <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
          {VALUES.map((v) => (
            <li key={v.title} className="flex gap-4 rounded-2xl bg-card p-6">
              <v.icon className="size-6 shrink-0 text-primary" aria-hidden="true" />
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-xl font-medium">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
