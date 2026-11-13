'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { signIn, signUp } from '@/app/actions/auth'
import { DEMO_ACCOUNTS, DEMO_PASSWORD } from '@/lib/mock/data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useStore } from '@/components/store-provider'

export function AuthDialog() {
  const { authOpen, setAuthOpen, authMode, setAuthMode } = useStore()
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isSignUp = authMode === 'sign-up'

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
    setAuthOpen(false)
    toast.success(isSignUp ? 'Bienvenido a Aurum Curve' : 'Sesión iniciada')
    router.refresh()
  }

  return (
    <Dialog open={authOpen} onOpenChange={setAuthOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {isSignUp ? 'Abrí tu cuenta mayorista' : 'Hola de nuevo'}
          </DialogTitle>
          <DialogDescription>
            {isSignUp
              ? 'Registrá tu negocio para ver precios mayoristas y reservar stock.'
              : 'Iniciá sesión para ver precios mayoristas y seguir tus pedidos.'}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={authMode}
          onValueChange={(value) => {
            setError(null)
            setAuthMode(value as 'sign-in' | 'sign-up')
          }}
        >
          <TabsList className="w-full">
            <TabsTrigger value="sign-in">Iniciar sesión</TabsTrigger>
            <TabsTrigger value="sign-up">Crear cuenta</TabsTrigger>
          </TabsList>
        </Tabs>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" key={authMode}>
          {isSignUp && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nombre y apellido</Label>
                <Input id="name" name="name" autoComplete="name" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="businessName">Nombre del negocio</Label>
                <Input id="businessName" name="businessName" autoComplete="organization" required />
              </div>
            </div>
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

          {!isSignUp && (
            <p className="rounded-lg bg-secondary px-3 py-2 text-xs text-muted-foreground">
              Cuentas demo ·{' '}
              {DEMO_ACCOUNTS.map((a) => `${a.label}: ${a.email}`).join(' · ')} · contraseña{' '}
              <code>{DEMO_PASSWORD}</code>
            </p>
          )}

          <Button type="submit" size="lg" disabled={pending}>
            {pending && <Loader2 className="animate-spin" aria-hidden="true" />}
            {isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
