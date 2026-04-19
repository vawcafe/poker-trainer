'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../lib/supabase'
import NavBar from '../components/NavBar'
import Grid13 from '../components/Grid13'
import QuizCard from '../components/QuizCard'
import { useQuiz } from '../hooks/useQuiz'
import { RFI_CHARTS, RFI_POSITIONS, RFI_LABEL, RFI_COLOR, type RFIPosition } from '../data/rfi'

const INTERESTING = ['r4','bl','fs','ws']

const OPTIONS = [
  { value: 'r4', label: '4-бет\nvs 3-бет' },
  { value: 'bl', label: 'Колл\nvs 3-бет' },
  { value: 'rf', label: 'Фолд\nvs 3-бет' },
  { value: 'fs', label: 'Колл vs 3-бет\nor 4-бет <25bb' },
  { value: 'lc', label: 'Лимп\nколл' },
  { value: 'lp', label: 'Лимп\nпуш' },
]

export default function RFIPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [tab, setTab] = useState<'chart' | 'quiz'>('chart')
  const [pos, setPos] = useState<RFIPosition>('EP')
  const [hovered, setHovered] = useState<{ key: string; value: string | null } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setUserId(data.user.id)
    })
  }, [router])

  const { state, nextQuestion, answer } = useQuiz({
    charts: RFI_CHARTS,
    interestingActions: INTERESTING,
    userId,
  })

  const chart = RFI_CHARTS[pos] ?? {}
  const quizTitle = state.question
    ? `${state.question.chartKey} RFI — 40bb`
    : 'RFI Квиз'
  const correctLabel = state.question
    ? (RFI_LABEL[state.question.correct as keyof typeof RFI_LABEL] ?? state.question.correct)
    : ''

  return (
    <div className="min-h-screen pb-20">
      <main>
        <div className="mb-6">
          <h1>RFI</h1>
          <p className="subtitle">Ранняя стадия, 40bb</p>
        </div>

        {/* Позиции */}
        <div className="positions-grid mb-4">
          {RFI_POSITIONS.map(p => (
            <button
              key={p}
              onClick={() => { setPos(p); setTab('chart') }}
              className={pos === p && tab === 'chart' ? 'active' : ''}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Табы */}
        <div className="tabs">
          {(['chart', 'quiz'] as const).map(t => (
            <button
              key={t}
              onClick={() => {
                setTab(t)
                if (t === 'quiz' && !state.question) nextQuestion()
              }}
              className={tab === t ? 'active' : ''}
            >
              {t === 'chart' ? 'Чарт' : 'Квиз'}
            </button>
          ))}
        </div>

        {tab === 'chart' && (
          <>
            <Grid13
              data={chart}
              colorMap={RFI_COLOR}
              onHover={(key, value) => setHovered(key ? { key, value } : null)}
            />

            {hovered?.key && (
              <div className="card-compact">
                <span className="font-bold">{hovered.key}</span>
                <span className="text-gray-500 mx-2">→</span>
                <span className="text-white">
                  {hovered.value ? RFI_LABEL[hovered.value as keyof typeof RFI_LABEL] : 'Фолд'}
                </span>
              </div>
            )}

            <div className="mt-6 space-y-2">
              <p className="text-sm font-semibold mb-3">Легенда:</p>
              {Object.entries(RFI_LABEL).filter(([k]) => k !== 'fd').map(([k, label]) => (
                <div key={k} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg ${RFI_COLOR[k as keyof typeof RFI_COLOR]?.split(' ')[0]}`} />
                  <span className="text-sm text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'quiz' && (
          <QuizCard
            question={state.question}
            answered={state.answered}
            chosen={state.chosen}
            options={OPTIONS}
            title={quizTitle}
            onAnswer={answer}
            onNext={nextQuestion}
            correctLabel={correctLabel}
            streak={state.streak}
          />
        )}
      </main>
      <NavBar />
    </div>
  )
}
