'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/pushfold', label: 'Push/Fold', icon: '⚡' },
  { href: '/bbdef', label: 'BB Def', icon: '🛡' },
  { href: '/rfi', label: 'RFI', icon: '🃏' },
  { href: '/dashboard', label: 'Профиль', icon: '📊' },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="max-w-2xl mx-auto px-4 pb-6">
        <div className="glass-card rounded-[28px] p-2 shadow-2xl">
          <div className="grid grid-cols-4 gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex flex-col items-center justify-center gap-1.5
                    rounded-[20px] py-3 px-2
                    transition-all duration-300
                    ${
                      isActive
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 scale-105'
                        : 'hover:bg-white/5 active:scale-95'
                    }
                  `}
                >
                  <span className="text-2xl leading-none">{item.icon}</span>
                  <span className={`
                    text-xs font-semibold leading-none
                    ${isActive ? 'text-white' : 'text-gray-400'}
                  `}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
