import type { StoreUser } from '@/lib/store'
import { AuthDialog } from '@/components/auth-dialog'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { StoreProvider } from '@/components/store-provider'

export function StoreShell({
  user,
  showSearch,
  children,
}: {
  user: StoreUser | null
  showSearch?: boolean
  children: React.ReactNode
}) {
  return (
    <StoreProvider user={user}>
      <SiteHeader showSearch={showSearch} />
      <main>{children}</main>
      <SiteFooter />
      <AuthDialog />
    </StoreProvider>
  )
}

export function toStoreUser(
  user: { name: string; email: string; businessName?: string | null; role?: string | null } | undefined,
): StoreUser | null {
  if (!user) return null
  return {
    name: user.name,
    email: user.email,
    businessName: user.businessName ?? null,
    role: user.role ?? 'buyer',
  }
}
