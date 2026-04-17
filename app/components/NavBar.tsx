'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/pushfold', label: 'Push/Fold', icon: '⚡' },
  { href: '/bbdef',    label: 'BB Def',    icon: '🛡' },
  { href: '/rfi',      label: 'RFI',       icon: '🃏' },
  { href: '/dashboard', label: 'Профиль',  icon: '📊' },
]

export default function NavBar() {
  const path = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a] border-t border-[#383838] flex max-w-[430px] mx-auto">
      {TABS.map(t => {
        const active = path.startsWith(t.href)
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`
              flex-1 flex flex-col items-center justify-center py-2 gap-0.5
              text-[10px] font-semibold transition-colors
              ${active ? 'text-white bg-[#2D5016]' : 'text-[#a0a0a0] hover:text-white'}
            `}
          >
            <span className="text-base leading-none">{t.icon}</span>
            <span>{t.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
