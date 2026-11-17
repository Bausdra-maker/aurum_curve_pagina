import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-serif text-3xl font-semibold">Aurum Curve</p>
          <p className="max-w-sm text-sm text-ink-foreground/70">
            Indumentaria mayorista premium para boutiques y revendedores. Buenos Aires, Argentina.
          </p>
        </div>
        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-6 text-sm text-ink-foreground/80">
            <li><Link href="/catalogo" className="hover:text-sidebar-primary">Catálogo</Link></li>
            <li><Link href="/#about" className="hover:text-sidebar-primary">Nosotros</Link></li>
            <li><Link href="/#contact" className="hover:text-sidebar-primary">Contacto</Link></li>
            <li><Link href="/mis-pedidos" className="hover:text-sidebar-primary">Mis pedidos</Link></li>
          </ul>
        </nav>
      </div>
      <p className="border-t border-ink-foreground/10 py-4 text-center text-xs text-ink-foreground/60">
        © {new Date().getFullYear()} Aurum Curve. Venta exclusivamente mayorista.
      </p>
    </footer>
  )
}
