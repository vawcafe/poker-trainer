'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../lib/supabase'
import NavBar from '../components/NavBar'

interface Progress {
  chart_key: string
  total: number
  correct: number
  streak: number
  best_streak: number
}

export default function DashboardPage() {
  const [email, setEmail] = useState('')
  const [progress, setProgress] = useState<Progress[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setEmail(data.user.email ?? '')

      const { data: rows } = await supabase
        .from('quiz_progress')
        .select('chart_key, total, correct, streak, best_streak')
        .order('total', { ascending: false })

      setProgress(rows ?? [])
      setLoading(false)
    })
  }, [])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  // Сводная статистика
  const totalQ   = progress.reduce((s, r) => s + r.total, 0)
  const totalOk  = progress.reduce((s, r) => s + r.correct, 0)
  const accuracy = totalQ > 0 ? Math.round(totalOk / totalQ * 100) : null
  const bestStreak = progress.reduce((m, r) => Math.max(m, r.best_streak), 0)

  return (
    <div className="min-h-screen pb-20 p-4">
      <div className="max-w-sm mx-auto">

        {/* Заголовок */}
        <div className="flex justify-between items-center mt-4 mb-5">
          <div>
            <h1 className="font-bold text-lg">Профиль</h1>
            <p className="text-xs text-[#a0a0a0] mt-0.5">{email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-[#a0a0a0] border border-[#383838] px-3 py-2 rounded-lg hover:text-white transition-colors"
          >
            Выйти
          </button>
        </div>

        {/* Сводка */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Вопросов',   value: totalQ || '—' },
            { label: 'Точность',   value: accuracy != null ? `${accuracy}%` : '—' },
            { label: 'Рекорд ⚡',  value: bestStreak || '—' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#1a1a1a] border border-[#383838] rounded-xl p-3 text-center">
              <div className="text-lg font-bold">{value}</div>
              <div className="text-[10px] text-[#505050] mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Прогресс по чартам */}
        <div className="bg-[#1a1a1a] border border-[#383838] rounded-2xl p-4">
          <h2 className="font-semibold text-sm mb-4">По чартам</h2>

          {loading ? (
            <div className="text-xs text-[#505050]">Загрузка...</div>
          ) : progress.length === 0 ? (
            <div className="text-xs text-[#505050]">
              Пройдите квиз чтобы увидеть статистику
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {progress.map(row => {
                const pct = row.total > 0 ? Math.round(row.correct / row.total * 100) : 0
                const color = pct >= 75 ? '#27ae60' : pct >= 50 ? '#e67e22' : '#e74c3c'
                return (
                  <div key={row.chart_key}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] text-[#a0a0a0]">{row.chart_key}</span>
                      <div className="flex items-center gap-2">
                        {row.best_streak > 0 && (
                          <span className="text-[10px] text-yellow-400">{row.best_streak}⚡</span>
                        )}
                        <span className="text-[11px] font-semibold" style={{ color: row.total ? color : '#505050' }}>
                          {row.total ? `${pct}%` : '—'}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-[#2e2e2e] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${row.total ? pct : 0}%`, background: color }}
                      />
                    </div>
                    <div className="text-[9px] text-[#505050] mt-0.5">
                      {row.correct}/{row.total} правильных
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <NavBar />
    </div>
  )
}
