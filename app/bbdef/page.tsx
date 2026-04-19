'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../lib/supabase'
import NavBar from '../components/NavBar'
import Grid13 from '../components/Grid13'
import QuizCard from '../components/QuizCard'
import { useQuiz } from '../hooks/useQuiz'
import { BB_DEFENSE, BB_POSITIONS, BB_LABEL, BB_COLOR, type BBPosition } from '../data/bbdef'

const INTERESTING = ['3bet', '3bet_call']

export default function BBDefPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [tab, setTab] = useState<'chart' | 'quiz'>('chart')
  const [pos, setPos] = useState<BBPosition>('BB vs EP')
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
    charts: BB_DEFENSE,
    interestingActions: INTERESTING,
    userId,
  })

  const chart = BB_DEFENSE[pos] ?? {}

  const quizTitle = state.question?.chartKey ?? 'BB Defense Квиз'
  const correctLabel = state.question
    ? (BB_LABEL[state.question.correct as keyof typeof BB_LABEL] ?? state.question.correct)
    : ''

  return (
    <div className="min-h-screen pb-20">
      <main>
        <div className="mb-6">
          <h1>BB Defense</h1>
          <p className="subtitle">Защита большого блайнда</p>
        </div>

        {/* Позиции */}
        <div className="positions-grid mb-4">
          {BB_POSITIONS.map(p => (
            <button
              key={p}
              onClick={() => { setPos(p); setTab('chart') }}
              className={pos === p && tab === 'chart' ? 'active' : ''}
            >
              {p.replace('BB vs ', '')}
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
            <p className="subtitle mb-4">{pos}</p>
            
            <Grid13
              data={chart}
              colorMap={BB_COLOR}
              onHover={(key, value) => setHovered(key ? { key, value } : null)}
            />

            {hovered?.key && (
              <div className="card-compact">
                <span className="font-bold">{hovered.key}</span>
                <span className="text-gray-500 mx-2">→</span>
                <span className={hovered.value ? 'text-white' : 'text-gray-600'}>
                  {hovered.value ? BB_LABEL[hovered.value as keyof typeof BB_LABEL] : 'Фолд'}
                </span>
              </div>
            )}

            <div className="mt-6 space-y-2">
              <p className="text-sm font-semibold mb-3">Легенда:</p>
              {Object.entries(BB_LABEL).map(([k, label]) => (
                <div key={k} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg ${BB_COLOR[k as keyof typeof BB_COLOR]?.split(' ')[0]}`} />
                  <span className="text-sm text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'quiz' && state.question && (
          <div className="quiz-card">
            {state.streak > 0 && (
              <div className="text-center mb-6">
                <div className="text-yellow-400 text-2xl font-bold">
                  ⚡ Серия: {state.streak}
                </div>
              </div>
            )}

            <div className="text-center mb-8">
              <p className="text-sm text-gray-500 mb-2">{quizTitle}</p>
              <p className="text-3xl font-bold mb-4">{state.question.handKey}</p>
              <p className="text-lg text-gray-400">Ваше действие?</p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {Object.entries(BB_LABEL).map(([action, label]) => (
                <button
                  key={action}
                  onClick={() => answer(action)}
                  disabled={state.answered}
                  className={`
                    py-4 px-4 text-sm font-semibold rounded-xl
                    ${state.answered && action === state.question?.correct
                      ? 'bg-green-600 text-white'
                      : state.answered && action === state.chosen && action !== state.question?.correct
                      ? 'bg-red-600 text-white'
                      : state.answered
                      ? 'opacity-40'
                      : 'hover:bg-white/10'}
                  `}
                >
                  {label}
                </button>
              ))}
            </div>

            {state.answered && (
              <div className="text-center mt-8">
                <button
                  onClick={nextQuestion}
                  className="primary py-3 px-8"
                >
                  Следующий вопрос
                </button>
              </div>
            )}
          </div>
        )}
      </main>
      <NavBar />
    </div>
  )
}
