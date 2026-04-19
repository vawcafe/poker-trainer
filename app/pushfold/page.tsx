'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../lib/supabase'
import NavBar from '../components/NavBar'
import Grid13 from '../components/Grid13'
import QuizCard from '../components/QuizCard'
import { useQuiz } from '../hooks/useQuiz'
import { PUSH_FOLD, PF_POSITIONS, PF_LABEL, PF_COLOR, type PFPosition } from '../data/pushfold'

const STACKS = [
  { key: 'c14', bb: [14, 15] },
  { key: 'c12', bb: [12, 13] },
  { key: 'c10', bb: [10, 11] },
  { key: 'c8',  bb: [8,  9]  },
  { key: 'c6',  bb: [6,  7]  },
  { key: 'c4',  bb: [4,  5]  },
]

function buildQuizCharts() {
  const result: Record<string, Record<string, string>> = {}
  for (const pos of PF_POSITIONS) {
    const chart = PUSH_FOLD[pos] ?? {}
    for (const { bb } of STACKS) {
      const bbVal = bb[0]
      const chartKey = `${pos}_${bbVal}bb`
      const quizChart: Record<string, string> = {}
      for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 13; j++) {
          const ranks = ['A','K','Q','J','T','9','8','7','6','5','4','3','2']
          const r1 = ranks[i], r2 = ranks[j]
          const hk = i === j ? r1+r2 : i < j ? r1+r2+'s' : r2+r1+'o'
          const minStack = chart[hk]
          if (!minStack) {
            quizChart[hk] = 'fold'
          } else {
            const minBB = parseInt(minStack.replace('c','')) ?? 99
            quizChart[hk] = bbVal >= minBB ? 'push' : 'fold'
          }
        }
      }
      result[chartKey] = quizChart
    }
  }
  return result
}

const PF_QUIZ_CHARTS = buildQuizCharts()

const PF_OPTIONS = [
  { value: 'push', label: 'Пуш (All-in)' },
  { value: 'fold', label: 'Фолд' },
]

export default function PushFoldPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [tab, setTab] = useState<'chart' | 'quiz'>('chart')
  const [pos, setPos] = useState<PFPosition>('EP')
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
    charts: PF_QUIZ_CHARTS,
    interestingActions: ['push'],
    userId,
  })

  const chart = PUSH_FOLD[pos] ?? {}

  const quizTitle = (() => {
    if (!state.question) return 'Push/Fold'
    const parts = state.question.chartKey.split('_')
    return `${parts[0]} — стек ${parts[1]}`
  })()

  const correctLabel = state.question?.correct === 'push' ? 'Пуш (All-in)' : 'Фолд'

  return (
    <div className="min-h-screen pb-20">
      <main>
        <div className="mb-6">
          <h1>Push / Fold</h1>
          <p className="subtitle">Короткий стек, 4-15bb</p>
        </div>

        <div className="positions-grid mb-4">
          {PF_POSITIONS.map(p => (
            <button
              key={p}
              onClick={() => { setPos(p); setTab('chart') }}
              className={pos === p && tab === 'chart' ? 'active' : ''}
            >
              {p}
            </button>
          ))}
        </div>

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
              colorMap={PF_COLOR}
              onHover={(key, value) => setHovered(key ? { key, value } : null)}
            />
            {hovered?.key && (
              <div className="card-compact">
                <span className="font-bold">{hovered.key}</span>
                <span className="text-gray-500 mx-2">→</span>
                <span className="text-white">
                  {hovered.value
                    ? `Пуш от ${PF_LABEL[hovered.value as keyof typeof PF_LABEL]}`
                    : 'Фолд'}
                </span>
              </div>
            )}
            <div className="mt-6 space-y-2">
              <p className="text-sm font-semibold mb-3">Легенда:</p>
              {Object.entries(PF_LABEL).map(([k, label]) => (
                <div key={k} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg ${PF_COLOR[k as keyof typeof PF_COLOR]?.split(' ')[0]}`} />
                  <span className="text-sm text-gray-400">Пуш от {label}</span>
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
            options={PF_OPTIONS}
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
