import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function OrderTracker({ status, fulfillment }: { status: string; fulfillment: string }) {
  if (status === 'cancelled') {
    return <p className="text-sm font-medium text-destructive">Este pedido se canceló y el stock fue liberado.</p>
  }
  const steps =
    fulfillment === 'pickup'
      ? [
          { value: 'reserved', label: 'Reservado en stock' },
          { value: 'paid', label: 'Pago confirmado' },
          { value: 'ready', label: 'Listo para retirar' },
          { value: 'delivered', label: 'Retirado' },
        ]
      : [
          { value: 'reserved', label: 'Reservado en stock' },
          { value: 'paid', label: 'Pago confirmado' },
          { value: 'dispatched', label: 'Despachado' },
          { value: 'delivered', label: 'Entregado' },
        ]
  const order = ['reserved', 'paid', 'ready', 'dispatched', 'delivered']
  const currentRank = order.indexOf(status)

  return (
    <ol className="grid grid-cols-4 gap-2" aria-label="Progreso del pedido">
      {steps.map((step) => {
        const done = order.indexOf(step.value) <= currentRank
        return (
          <li key={step.value} className="flex flex-col gap-2">
            <span className={cn('h-1.5 rounded-full', done ? 'bg-primary' : 'bg-border')} aria-hidden="true" />
            <span className={cn('flex items-center gap-1 text-xs', done ? 'text-foreground' : 'text-muted-foreground')}>
              {done && <Check className="size-3 text-primary" aria-hidden="true" />}
              {step.label}
              <span className="sr-only">{done ? '(completado)' : '(pendiente)'}</span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}
