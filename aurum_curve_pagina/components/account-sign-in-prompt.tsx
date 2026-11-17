'use client'

import { UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/components/store-provider'

export function AccountSignInPrompt({ message }: { message?: string }) {
  const { openAuth } = useStore()
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-5 px-4 py-24 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-accent/50">
        <UserRound className="size-6 text-primary" aria-hidden="true" />
      </span>
      <h1 className="font-serif text-4xl font-medium">Tu cuenta mayorista</h1>
      <p className="text-muted-foreground">
        {message ?? 'Iniciá sesión para ver precios mayoristas, reservar stock y seguir el pago y el envío de tus pedidos.'}
      </p>
      <div className="flex gap-3">
        <Button size="lg" onClick={() => openAuth('sign-in')}>Iniciar sesión</Button>
        <Button size="lg" variant="outline" onClick={() => openAuth('sign-up')}>Crear cuenta</Button>
      </div>
    </div>
  )
}
