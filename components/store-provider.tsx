'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { StoreUser } from '@/lib/store'

export type CartLine = {
  variantId: number
  productId: number
  name: string
  image: string
  size: string
  color: string | null
  quantity: number
  unitPrice: number
  minQuantity: number
}

type AuthMode = 'sign-in' | 'sign-up'

type StoreContextValue = {
  user: StoreUser | null
  cart: CartLine[]
  addToCart: (line: CartLine) => void
  updateQuantity: (variantId: number, quantity: number) => void
  removeFromCart: (variantId: number) => void
  clearCart: () => void
  authOpen: boolean
  authMode: AuthMode
  openAuth: (mode?: AuthMode) => void
  setAuthOpen: (open: boolean) => void
  setAuthMode: (mode: AuthMode) => void
  query: string
  setQuery: (q: string) => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({
  user,
  children,
}: {
  user: StoreUser | null
  children: React.ReactNode
}) {
  const [cart, setCart] = useState<CartLine[]>([])
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>('sign-in')
  const [query, setQuery] = useState('')

  const addToCart = useCallback((line: CartLine) => {
    setCart((prev) => {
      const existing = prev.find((l) => l.variantId === line.variantId)
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, quantity: l.quantity + line.quantity } : l,
        )
      }
      return [...prev, line]
    })
  }, [])

  const updateQuantity = useCallback((variantId: number, quantity: number) => {
    setCart((prev) =>
      prev.map((l) =>
        l.variantId === variantId ? { ...l, quantity: Math.max(1, Math.floor(quantity) || 1) } : l,
      ),
    )
  }, [])

  const removeFromCart = useCallback((variantId: number) => {
    setCart((prev) => prev.filter((l) => l.variantId !== variantId))
  }, [])

  const openAuth = useCallback((mode: AuthMode = 'sign-in') => {
    setAuthMode(mode)
    setAuthOpen(true)
  }, [])

  const value = useMemo<StoreContextValue>(
    () => ({
      user,
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart: () => setCart([]),
      authOpen,
      authMode,
      openAuth,
      setAuthOpen,
      setAuthMode,
      query,
      setQuery,
    }),
    [user, cart, addToCart, updateQuantity, removeFromCart, authOpen, authMode, openAuth, query],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
