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
  { value: 'rf', label: 'RFI\nдефолт' },
  { value: 'fs', label: 'Фолд\nсильный' },
  { value: 'ws', label: 'RFI\nслабый' },
  { value: 'fd', label: 'Фолд' },
]

export default function RFIPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [tab, setTab] = useState<'chart' | 'quiz'>('chart')
  const [pos, setPos] = useState<RFIPosition>('UTG')
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
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-[#383838] px-4 pt-4 pb-3">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="font-bold text-base">RFI</h1>
            <p className="text-[10px] text-[#505050]">Ранняя стадия, 40bb</p>
          </div>
          {tab === 'quiz' && state.state?.streak > 0 && (
            <span className="text-yellow-400 font-bold text-sm">{state.streak}⚡</span>
          )}
        </div>

        {/* Позиции */}
        <div className="flex gap-1.5 mb-3">
          {RFI_POSITIONS.map(p => (
            <button
              key={p}
              onClick={() => { setPos(p); setTab('chart') }}
              className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-colors
                ${pos === p && tab === 'chart'
                  ? 'bg-[#2D5016] text-white'
                  : 'bg-[#242424] text-[#a0a0a0] hover:text-white border border-[#383838]'}`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Вкладки */}
        <div className="flex gap-1.5">
          {(['chart','quiz'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); if (t === 'quiz' && !state.question) nextQuestion() }}
              className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-colors border
                ${tab === t
                  ? 'bg-[#2e2e2e] text-white border-[#555]'
                  : 'bg-transparent text-[#a0a0a0] border-[#383838] hover:text-white'}`}
            >
              {t === 'chart' ? 'Чарт' : 'Квиз'}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* CHART TAB */}
        {tab === 'chart' && (
          <>
            <Grid13
              data={chart}
              colorMap={RFI_COLOR}
              onHover={(key, value) => setHovered(key ? { key, value } : null)}
            />

            {/* Tooltip */}
            {hovered?.key && (
              <div className="mt-3 bg-[#242424] border border-[#383838] rounded-xl px-4 py-2.5 text-sm">
                <span className="font-bold">{hovered.key}</span>
                <span className="text-[#a0a0a0] mx-2">→</span>
                <span className={hovered.value
                  ? RFI_COLOR[hovered.value as keyof typeof RFI_COLOR]?.split(' ')[1] ?? 'text-white'
                  : 'text-white/20'}>
                  {hovered.value ? RFI_LABEL[hovered.value as keyof typeof RFI_LABEL] : 'Фолд'}
                </span>
              </div>
            )}

            {/* Легенда */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {Object.entries(RFI_LABEL).map(([k, label]) => (
                <div key={k} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded flex-shrink-0 ${RFI_COLOR[k as keyof typeof RFI_COLOR]?.split(' ').slice(0,1).join(' ')}`} />
                  <span className="text-[10px] text-[#a0a0a0]">{label}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* QUIZ TAB */}
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
      </div>

      <NavBar />
    </div>
  )
}
