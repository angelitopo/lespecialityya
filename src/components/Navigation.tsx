import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"

interface NavigationProps {
  isAdmin?: boolean
}

export default function Navigation({ isAdmin = false }: NavigationProps) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-primary p-4 rounded-lg flex flex-wrap justify-center mb-8 shadow-md">
      <Link 
        href="/" 
        className={cn(
          "text-primary-foreground no-underline px-4 py-2 mx-2 rounded transition-colors",
          isActive('/') && "bg-background/30"
        )}
      >
        Home
      </Link>
      
      {!isAdmin ? (
        <>
          <Link 
            href="/topup" 
            className={cn(
              "text-primary-foreground no-underline px-4 py-2 mx-2 rounded transition-colors",
              isActive('/topup') && "bg-background/30"
            )}
          >
            Top Up
          </Link>
          <Link 
            href="/loyalty" 
            className={cn(
              "text-primary-foreground no-underline px-4 py-2 mx-2 rounded transition-colors",
              isActive('/loyalty') && "bg-background/30"
            )}
          >
            Loyalty Card
          </Link>
          <Link 
            href="/order" 
            className={cn(
              "text-primary-foreground no-underline px-4 py-2 mx-2 rounded transition-colors",
              isActive('/order') && "bg-background/30"
            )}
          >
            Order
          </Link>
          <Link 
            href="/settings" 
            className={cn(
              "text-primary-foreground no-underline px-4 py-2 mx-2 rounded transition-colors",
              isActive('/settings') && "bg-background/30"
            )}
          >
            Settings
          </Link>
        </>
      ) : (
        <>
          <Link 
            href="/admin/scanner" 
            className={cn(
              "text-primary-foreground no-underline px-4 py-2 mx-2 rounded transition-colors",
              isActive('/admin/scanner') && "bg-background/30"
            )}
          >
            Scanner
          </Link>
          <Link 
            href="/admin/orders" 
            className={cn(
              "text-primary-foreground no-underline px-4 py-2 mx-2 rounded transition-colors",
              isActive('/admin/orders') && "bg-background/30"
            )}
          >
            Orders
          </Link>
          <Link 
            href="/admin/menu" 
            className={cn(
              "text-primary-foreground no-underline px-4 py-2 mx-2 rounded transition-colors",
              isActive('/admin/menu') && "bg-background/30"
            )}
          >
            Menu
          </Link>
          <Link 
            href="/admin/settings" 
            className={cn(
              "text-primary-foreground no-underline px-4 py-2 mx-2 rounded transition-colors",
              isActive('/admin/settings') && "bg-background/30"
            )}
          >
            Admin Settings
          </Link>
        </>
      )}
    </nav>
  )
} 