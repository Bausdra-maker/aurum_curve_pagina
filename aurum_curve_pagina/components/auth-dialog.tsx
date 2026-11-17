'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { signIn } from '@/app/actions/auth'
import { DEMO_ACCOUNTS, DEMO_PASSWORD } from '@/lib/mock/data'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useStore } from '@/components/store-provider'

export function AuthDialog() {
  const { authOpen, setAuthOpen } = useStore()
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
    setAuthOpen(false)
    toast.success('Sesión iniciada')
    router.refresh()
  }

  return (
    <Dialog open={authOpen} onOpenChange={setAuthOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Iniciar sesión</DialogTitle>
          <DialogDescription>Ingresá con tu cuenta para ver precios mayoristas y hacer pedidos.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="dialog-email">Email</Label>
            <Input id="dialog-email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="dialog-password">Contraseña</Label>
            <Input id="dialog-password" name="password" type="password" autoComplete="current-password" required />
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
      </DialogContent>
    </Dialog>
  )
}
