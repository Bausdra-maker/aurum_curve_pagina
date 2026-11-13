'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { signIn, signUp } from '@/app/actions/auth'
import { DEMO_ACCOUNTS, DEMO_PASSWORD } from '@/lib/mock/data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isSignUp = mode === 'sign-up'

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '').trim()
    const password = String(form.get('password') ?? '')

    setPending(true)
    const result = isSignUp
      ? await signUp({
          email,
          password,
          name: String(form.get('name') ?? '').trim(),
          businessName: String(form.get('businessName') ?? '').trim() || undefined,
          phone: String(form.get('phone') ?? '').trim() || undefined,
        })
      : await signIn({ email, password })
    setPending(false)

    if (!result.ok) {
      setError(result.error)
      return
    }
    toast.success(isSignUp ? 'Bienvenido a Aurum Curve' : 'Sesión iniciada')
    router.push('/catalogo')
    router.refresh()
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-serif text-4xl font-medium">
          {isSignUp ? 'Abrí tu cuenta mayorista' : 'Hola de nuevo'}
        </h1>
        <p className="text-muted-foreground">
          {isSignUp
            ? 'Registrá tu negocio para reservar stock y seguir tus pedidos.'
            : 'Iniciá sesión para reservar stock y seguir tus pedidos.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-3xl border bg-card p-6 sm:p-8">
        {isSignUp && (
          <>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nombre y apellido</Label>
              <Input id="name" name="name" autoComplete="name" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="businessName">Nombre del negocio</Label>
              <Input id="businessName" name="businessName" autoComplete="organization" required />
            </div>
          </>
        )}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        {isSignUp && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+54 911 ..." required />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            minLength={8}
            required
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        {!isSignUp && process.env.NODE_ENV !== 'production' && (
          <p className="rounded-lg bg-secondary px-3 py-2 text-xs text-muted-foreground">
            Cuentas demo · {DEMO_ACCOUNTS.map((a) => `${a.label}: ${a.email}`).join(' · ')} · contraseña{' '}
            <code>{DEMO_PASSWORD}</code>
          </p>
        )}

        <Button type="submit" size="lg" disabled={pending}>
          {pending && <Loader2 className="animate-spin" aria-hidden="true" />}
          {isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {isSignUp ? (
          <>
            ¿Ya tenés cuenta?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Iniciá sesión
            </Link>
          </>
        ) : (
          <>
            ¿Primera vez?{' '}
            <Link href="/registro" className="font-medium text-primary hover:underline">
              Creá tu cuenta
            </Link>
          </>
        )}
      </p>
    </div>
  )
}
