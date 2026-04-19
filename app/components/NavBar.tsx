'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/pushfold', label: 'Push/Fold', icon: '⚡' },
  { href: '/bbdef', label: 'BB Def', icon: '🛡' },
  { href: '/rfi', label: 'RFI', icon: '🃏' },
  { href: '/dashboard', label: 'Stats', icon: '📊' },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav>
      <div className="nav-container">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <button className={isActive ? 'active' : ''}>
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
