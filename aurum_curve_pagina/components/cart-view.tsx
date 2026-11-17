'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Loader2, Minus, Plus, ShoppingBag, Store, Trash2, Truck } from 'lucide-react'
import { toast } from 'sonner'
import { createOrder } from '@/app/actions/orders'
import { formatPrice, PAYMENT_METHODS } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useStore } from '@/components/store-provider'

export function CartView() {
  const { cart, updateQuantity, removeFromCart, clearCart, user } = useStore()
  const router = useRouter()
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup')
  const [paymentMethod, setPaymentMethod] = useState<string>('transfer')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const totalUnits = cart.reduce((s, l) => s + l.quantity, 0)
  const total = cart.reduce((s, l) => s + l.quantity * l.unitPrice, 0)

  function checkout() {
    setError(null)
    if (!user) {
      router.push('/login')
      return
    }
    startTransition(async () => {
      const result = await createOrder({
        lines: cart.map((l) => ({
          productId: l.productId,
          variantId: l.variantId,
          size: l.size,
          color: l.color,
          quantity: l.quantity,
        })),
        fulfillment,
        paymentMethod,
        address,
        notes,
      })
      if (!result.ok) {
        setError(result.error)
        return
      }
      clearCart()
      setAddress('')
      setNotes('')
      toast.success(`Pedido #${result.orderId} reservado en stock`, {
        description: 'Seguí el pago y el envío desde Mis pedidos.',
      })
      router.push('/mis-pedidos')
      router.refresh()
    })
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <ShoppingBag className="size-10 text-primary" aria-hidden="true" />
        <h1 className="font-serif text-4xl font-medium">Tu carrito está vacío</h1>
        <p className="text-muted-foreground">Elegí talle, color y cantidades desde el catálogo.</p>
        <Link href="/catalogo" className={cn(buttonVariants({ size: 'lg' }))}>
          Ver catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-4xl font-medium md:text-5xl">Carrito mayorista</h1>
      <p className="mt-2 text-muted-foreground">
        {totalUnits} unidades · Las prendas quedan reservadas cuando confirmás.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <ul className="flex flex-col gap-4">
          {cart.map((line) => (
            <li key={line.variantId} className="flex gap-4 rounded-2xl border bg-card p-4">
              <Image
                src={line.image || '/placeholder.svg'}
                alt=""
                width={96}
                height={96}
                className="size-24 rounded-lg bg-muted object-cover"
              />
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{line.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {line.color ? `${line.color} · ` : ''}Talle {line.size} · {formatPrice(line.unitPrice)} / unidad
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeFromCart(line.variantId)}
                    aria-label={`Quitar ${line.name} ${line.color ?? ''} talle ${line.size}`}
                  >
                    <Trash2 />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => updateQuantity(line.variantId, line.quantity - 1)}
                    aria-label="Restar una unidad"
                  >
                    <Minus />
                  </Button>
                  <Input
                    type="number"
                    min={1}
                    value={line.quantity}
                    onChange={(e) => updateQuantity(line.variantId, Number(e.target.value))}
                    className="h-8 w-16 text-center"
                    aria-label={`Cantidad de ${line.name} ${line.color ?? ''} talle ${line.size}`}
                  />
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => updateQuantity(line.variantId, line.quantity + 1)}
                    aria-label="Sumar una unidad"
                  >
                    <Plus />
                  </Button>
                  <span className="ml-auto text-sm font-medium">{formatPrice(line.quantity * line.unitPrice)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="flex h-fit flex-col gap-6 rounded-2xl border bg-card p-6">
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-2 text-sm font-medium">Entrega</legend>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { value: 'pickup', label: 'Retiro en el local', icon: Store },
                  { value: 'delivery', label: 'Envío a domicilio', icon: Truck },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.value}
                  className={cn(
                    'flex cursor-pointer flex-col items-start gap-2 rounded-lg border p-3 text-sm transition-colors',
                    fulfillment === opt.value ? 'border-primary bg-accent/40' : 'hover:bg-muted',
                  )}
                >
                  <input
                    type="radio"
                    name="fulfillment"
                    value={opt.value}
                    checked={fulfillment === opt.value}
                    onChange={() => setFulfillment(opt.value)}
                    className="sr-only"
                  />
                  <opt.icon className="size-4 text-primary" aria-hidden="true" />
                  {opt.label}
                </label>
              ))}
            </div>
            {fulfillment === 'delivery' && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="address">Dirección de envío</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Calle, número, ciudad"
                  autoComplete="street-address"
                />
              </div>
            )}
          </fieldset>

          <div className="flex flex-col gap-2">
            <Label htmlFor="payment">Medio de pago</Label>
            <select
              id="payment"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="h-9 rounded-lg border border-input bg-card px-3 text-sm"
            >
              {PAYMENT_METHODS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="notes">Notas para el vendedor</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Horario de retiro, datos de facturación…"
              rows={2}
            />
          </div>

          <div className="flex flex-col gap-3 border-t pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total estimado (IVA incl.)</span>
              <span className="font-serif text-2xl font-semibold">{formatPrice(total)}</span>
            </div>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <Button size="lg" onClick={checkout} disabled={pending}>
              {pending && <Loader2 className="animate-spin" aria-hidden="true" />}
              {user ? 'Reservar stock y confirmar pedido' : 'Iniciá sesión para pedir'}
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
