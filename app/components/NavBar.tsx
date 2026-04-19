'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/pushfold', label: 'Push/Fold' },
  { href: '/bbdef', label: 'BB Def' },
  { href: '/rfi', label: 'RFI' },
  { href: '/dashboard', label: 'Stats' },
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
                {item.label}
              </button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
