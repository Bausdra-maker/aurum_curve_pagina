'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, LogOut, Menu, Search, ShoppingBag, UserRound } from 'lucide-react'
import { useState } from 'react'
import { signOut as signOutAction } from '@/app/actions/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useStore } from '@/components/store-provider'
import { isInternalRole } from '@/lib/store'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/mis-pedidos', label: 'Mis pedidos' },
  { href: '/#about', label: 'Nosotros' },
  { href: '/#contact', label: 'Contacto' },
]

export function SiteHeader({ showSearch = true }: { showSearch?: boolean }) {
  const { user, cart, query, setQuery } = useStore()
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const count = cart.reduce((sum, l) => sum + l.quantity, 0)
  const staff = isInternalRole(user?.role)

  async function signOut() {
    await signOutAction()
    setMenuOpen(false)
    router.push('/')
    router.refresh()
  }

  const searchField = showSearch && (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        router.push('/catalogo')
        setMenuOpen(false)
      }}
      className="relative"
    >
      <label htmlFor="site-search" className="sr-only">
        Buscar productos
      </label>
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <Input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar en el catálogo"
        className="h-9 w-full bg-card pl-9 lg:w-48"
      />
    </form>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="bg-ink text-ink-foreground">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center text-xs tracking-[0.2em] uppercase">
          Solo mayorista · Mínimo 6 unidades por modelo · Retiro en local o envíos a todo el país
        </p>
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:gap-6">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu />
        </Button>

        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-2xl font-semibold tracking-wide text-foreground lg:text-3xl">
            Aurum Curve
          </span>
          <span className="text-[10px] tracking-[0.35em] text-primary uppercase">Atelier mayorista</span>
        </Link>

        <nav aria-label="Principal" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-5 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={cn(
                    'text-foreground/80 transition-colors hover:text-primary',
                    pathname === item.href && 'font-medium text-primary',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden lg:block">{searchField}</div>

          {user ? (
            <div className="hidden items-center gap-1 sm:flex">
              {staff && (
                <Link href="/panel" className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm hover:bg-muted">
                  <LayoutDashboard className="size-4" aria-hidden="true" />
                  Panel
                </Link>
              )}
              <Link href="/mis-pedidos" className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm hover:bg-muted">
                <UserRound className="size-4" aria-hidden="true" />
                <span className="max-w-28 truncate">{user.name.split(' ')[0]}</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={signOut} aria-label="Cerrar sesión">
                <LogOut />
              </Button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" className={cn(buttonVariants({ variant: 'ghost' }))}>
                Ingresar
              </Link>
            </div>
          )}

          <Link
            href="/carrito"
            className={cn(buttonVariants(), 'relative')}
            aria-label={`Ir al carrito, ${count} unidades`}
          >
            <ShoppingBag aria-hidden="true" />
            <span className="hidden sm:inline">Carrito</span>
            {count > 0 && (
              <span className="ml-1 rounded-full bg-primary-foreground px-1.5 text-xs font-semibold text-primary">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="font-serif text-2xl">Aurum Curve</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6 px-4">
            {searchField}
            <nav aria-label="Menú móvil">
              <ul className="flex flex-col gap-1">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 hover:bg-muted"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {staff && (
                  <li>
                    <Link href="/panel" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-muted">
                      Panel interno
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
            {user ? (
              <Button variant="outline" onClick={signOut}>
                <LogOut aria-hidden="true" />
                Cerrar sesión
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" onClick={() => setMenuOpen(false)} className={cn(buttonVariants())}>
                  Ingresar
                </Link>
                <Link
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
