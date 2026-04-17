'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../lib/supabase'
import NavBar from '../components/NavBar'
import Grid13 from '../components/Grid13'
import QuizCard from '../components/QuizCard'
import { useQuiz } from '../hooks/useQuiz'
import { PUSH_FOLD, PF_POSITIONS, PF_LABEL, PF_COLOR, type PFPosition } from '../data/pushfold'

// Для квиза Push/Fold спрашиваем: "Push or Fold при стеке Xbb?"
// Перестраиваем данные: для каждой позиции делаем пары (стек, рука)

const STACKS = [
  { key: 'c14', bb: [14,15] },
  { key: 'c12', bb: [12,13] },
  { key: 'c10', bb: [10,11] },
  { key: 'c8',  bb: [8,9] },
  { key: 'c6',  bb: [6,7] },
  { key: 'c4',  bb: [4,5] },
]

// Строим чарты для квиза: ключ = "EP_14bb" → {рука: push/fold}
function buildQuizCharts() {
  const result: Record<string, Record<string, string>> = {}
  for (const pos of PF_POSITIONS) {
    const chart = PUSH_FOLD[pos] ?? {}
    for (const { key, bb } of STACKS) {
      const bbVal = bb[0]
      const chartKey = `${pos}_${bbVal}bb`
      const quizChart: Record<string, string> = {}
      // Для каждой руки: можем пушить при этом стеке?
      for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 13; j++) {
          const ranks = ['A','K','Q','J','T','9','8','7','6','5','4','3','2']
          const r1 = ranks[i], r2 = ranks[j]
          const hk = i === j ? r1+r2 : i < j ? r1+r2+'s' : r2+r1+'o'
          const minStack = chart[hk]
          if (!minStack) {
            quizChart[hk] = 'fold'
          } else {
            // минимальный стек для пуша
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

const PF_QUIZ_COLORS: Record<string, string> = {
  push: 'bg-green-500/20 text-green-400',
  fold: 'bg-white/[0.04] text-white/[0.18]',
}

const PF_QUIZ_OPTIONS = [
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
  }, [])

  const { state, nextQuestion, answer } = useQuiz({
    charts: PF_QUIZ_CHARTS,
    interestingActions: ['push'],
    userId,
  })

  const chart = PUSH_FOLD[pos] ?? {}

  const quizTitle = (() => {
    if (!state.question) return 'Push/Fold Квиз'
    const parts = state.question.chartKey.split('_')
    return `${parts[0]} — стек ${parts[1]}`
  })()

  const correctLabel = state.question?.correct === 'push' ? 'Пуш (All-in)' : 'Фолд'

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-[#1a1a1a] border-b border-[#383838] px-4 pt-4 pb-3">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="font-bold text-base">Push / Fold</h1>
            <p className="text-[10px] text-[#505050]">Короткий стек, 4-15bb</p>
          </div>
          {tab === 'quiz' && state.streak > 0 && (
            <span className="text-yellow-400 font-bold text-sm">{state.streak}⚡</span>
          )}
        </div>

        <div className="flex gap-1.5 mb-3">
          {PF_POSITIONS.map(p => (
            <button key={p} onClick={() => { setPos(p); setTab('chart') }}
              className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-colors
                ${pos === p && tab === 'chart'
                  ? 'bg-[#2D5016] text-white'
                  : 'bg-[#242424] text-[#a0a0a0] hover:text-white border border-[#383838]'}`}>
              {p}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5">
          {(['chart','quiz'] as const).map(t => (
            <button key={t}
              onClick={() => { setTab(t); if (t === 'quiz' && !state.question) nextQuestion() }}
              className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-colors border
                ${tab === t ? 'bg-[#2e2e2e] text-white border-[#555]' : 'bg-transparent text-[#a0a0a0] border-[#383838] hover:text-white'}`}>
              {t === 'chart' ? 'Чарт' : 'Квиз'}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {tab === 'chart' && (
          <>
            <Grid13
              data={chart}
              colorMap={PF_COLOR}
              onHover={(key, value) => setHovered(key ? { key, value } : null)}
            />

            {hovered?.key && (
              <div className="mt-3 bg-[#242424] border border-[#383838] rounded-xl px-4 py-2.5 text-sm">
                <span className="font-bold">{hovered.key}</span>
                <span className="text-[#a0a0a0] mx-2">→</span>
                <span className="text-white">
                  {hovered.value
                    ? `Пуш от ${PF_LABEL[hovered.value as keyof typeof PF_LABEL]}`
                    : 'Фолд'}
                </span>
              </div>
            )}

            <div className="mt-4 grid grid-cols-2 gap-2">
              {Object.entries(PF_LABEL).map(([k, label]) => (
                <div key={k} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded flex-shrink-0 ${PF_COLOR[k as keyof typeof PF_COLOR]?.split(' ')[0]}`} />
                  <span className="text-[10px] text-[#a0a0a0]">Пуш от {label}</span>
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
            options={PF_QUIZ_OPTIONS}
            title={quizTitle}
            onAnswer={answer}
            onNext={nextQuestion}
            correctLabel={correctLabel}
            streak={state.streak}
          />
        )}
      </div>
      <NavBar />
    </div>
  )
}
