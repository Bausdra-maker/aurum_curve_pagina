'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { signIn } from '@/app/actions/auth'
import { DEMO_ACCOUNTS, DEMO_PASSWORD } from '@/lib/mock/data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AuthForm({ mode = 'sign-in' }: { mode?: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '').trim()
    const password = String(form.get('password') ?? '')

    setPending(true)
    const result = await signIn({ email, password })
    setPending(false)

    if (!result.ok) {
      setError(result.error)
      return
    }
    toast.success('Sesión iniciada')
    router.push('/catalogo')
    router.refresh()
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-serif text-4xl font-medium">Iniciar sesión</h1>
        <p className="text-muted-foreground">Ingresá con tu cuenta para reservar stock y seguir tus pedidos.</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-3xl border bg-card p-6 sm:p-8">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" name="password" type="password" autoComplete="current-password" required />
        </div>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <p className="rounded-lg bg-secondary px-3 py-2 text-xs text-muted-foreground">
          Cuentas · {DEMO_ACCOUNTS.map((a) => `${a.label}: ${a.email}`).join(' · ')} · contraseña <code>{DEMO_PASSWORD}</code>
        </p>
        <Button type="submit" size="lg" disabled={pending}>
          {pending && <Loader2 className="animate-spin" aria-hidden="true" />}
          Iniciar sesión
        </Button>
      </form>
    </div>
  )
}
