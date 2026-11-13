import { stockState } from '@/lib/store'
import { cn } from '@/lib/utils'

export function StockBadge({ stock, className }: { stock: number; className?: string }) {
  const state = stockState(stock)
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur',
        state.tone === 'in' && 'bg-card/90 text-success',
        state.tone === 'low' && 'bg-card/90 text-warning',
        state.tone === 'out' && 'bg-ink/85 text-ink-foreground',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'size-1.5 rounded-full',
          state.tone === 'in' && 'bg-success',
          state.tone === 'low' && 'bg-warning',
          state.tone === 'out' && 'bg-ink-foreground',
        )}
      />
      {state.label}
    </span>
  )
}
