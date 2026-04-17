'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../lib/supabase'
import NavBar from '../components/NavBar'
import Grid13 from '../components/Grid13'
import QuizCard from '../components/QuizCard'
import { useQuiz } from '../hooks/useQuiz'
import { BB_DEF, BB_POSITIONS, BB_CONFIGS, BB_CONFIG_LABEL, BB_LABEL, BB_COLOR, type BBPosition } from '../data/bbdef'

const INTERESTING = ['pu','fs','ws']

const OPTIONS = [
  { value: 'r4', label: '3-бет' },
  { value: 'pu', label: 'Пуш' },
  { value: 'rf', label: 'Колл\nдефолт' },
  { value: 'fs', label: 'Фолд\nvs рег' },
  { value: 'ws', label: 'Колл\nvs любитель' },
  { value: 'fd', label: 'Фолд' },
]

export default function BBDefPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [tab, setTab] = useState<'chart' | 'quiz'>('chart')
  const [pos, setPos] = useState<BBPosition>('UTG')
  const [cfgKey, setCfgKey] = useState<string>('UTG_40_2')
  const [hovered, setHovered] = useState<{ key: string; value: string | null } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setUserId(data.user.id)
    })
  }, [])

  // При смене позиции — берём первый конфиг
  function handlePosChange(p: BBPosition) {
    setPos(p)
    setTab('chart')
    const configs = BB_CONFIGS[p] ?? []
    if (configs.length > 0) setCfgKey(configs[0])
  }

  const { state, nextQuestion, answer } = useQuiz({
    charts: BB_DEF,
    interestingActions: INTERESTING,
    userId,
  })

  const chart = BB_DEF[cfgKey] ?? {}
  const configs = BB_CONFIGS[pos] ?? []

  const quizTitle = state.question
    ? BB_CONFIG_LABEL[state.question.chartKey] ?? state.question.chartKey
    : 'BB Defense Квиз'
  const correctLabel = state.question
    ? (BB_LABEL[state.question.correct as keyof typeof BB_LABEL] ?? state.question.correct)
    : ''

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-[#1a1a1a] border-b border-[#383838] px-4 pt-4 pb-3">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="font-bold text-base">BB Defense</h1>
            <p className="text-[10px] text-[#505050]">SPR Poker v2.0</p>
          </div>
          {tab === 'quiz' && state.streak > 0 && (
            <span className="text-yellow-400 font-bold text-sm">{state.streak}⚡</span>
          )}
        </div>

        {/* Позиции */}
        <div className="flex gap-1.5 mb-2">
          {BB_POSITIONS.map(p => (
            <button key={p} onClick={() => handlePosChange(p)}
              className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-colors
                ${pos === p && tab === 'chart'
                  ? 'bg-[#2D5016] text-white'
                  : 'bg-[#242424] text-[#a0a0a0] hover:text-white border border-[#383838]'}`}>
              {p}
            </button>
          ))}
        </div>

        {/* Конфиги (стек/размер) */}
        {tab === 'chart' && configs.length > 1 && (
          <div className="flex gap-1.5 mb-2 flex-wrap">
            {configs.map(ck => (
              <button key={ck} onClick={() => setCfgKey(ck)}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors border
                  ${cfgKey === ck
                    ? 'bg-[#2e2e2e] text-white border-[#555]'
                    : 'bg-transparent text-[#a0a0a0] border-[#383838] hover:text-white'}`}>
                {BB_CONFIG_LABEL[ck]?.replace(`${pos} `,'')}
              </button>
            ))}
          </div>
        )}

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
            <p className="text-xs text-[#a0a0a0] mb-3">{BB_CONFIG_LABEL[cfgKey]}</p>
            <Grid13
              data={chart}
              colorMap={BB_COLOR}
              onHover={(key, value) => setHovered(key ? { key, value } : null)}
            />

            {hovered?.key && (
              <div className="mt-3 bg-[#242424] border border-[#383838] rounded-xl px-4 py-2.5 text-sm">
                <span className="font-bold">{hovered.key}</span>
                <span className="text-[#a0a0a0] mx-2">→</span>
                <span className={hovered.value
                  ? BB_COLOR[hovered.value as keyof typeof BB_COLOR]?.split(' ')[1] ?? 'text-white'
                  : 'text-white/20'}>
                  {hovered.value ? BB_LABEL[hovered.value as keyof typeof BB_LABEL] : 'Фолд'}
                </span>
              </div>
            )}

            <div className="mt-4 grid grid-cols-2 gap-2">
              {Object.entries(BB_LABEL).map(([k, label]) => (
                <div key={k} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded flex-shrink-0 ${BB_COLOR[k as keyof typeof BB_COLOR]?.split(' ')[0]}`} />
                  <span className="text-[10px] text-[#a0a0a0]">{label}</span>
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
      </div>
      <NavBar />
    </div>
  )
}
