'use client'
import type { QuizQuestion } from '../hooks/useQuiz'

const SUIT_SYMBOLS: Record<string, string> = {
  s: '♠', h: '♥', d: '♦', c: '♣',
}

interface Option {
  value: string
  label: string
}

interface Props {
  question: QuizQuestion | null
  answered: boolean
  chosen: string | null
  options: Option[]
  title: string           // напр. "UTG RFI — 40bb"
  onAnswer: (v: string) => void
  onNext: () => void
  correctLabel: string    // текст правильного ответа
  streak: number
}

export default function QuizCard({
  question, answered, chosen, options, title,
  onAnswer, onNext, correctLabel, streak,
}: Props) {
  if (!question) {
    return (
      <div className="bg-[#1a1a1a] rounded-2xl border border-[#383838] p-6 text-center">
        <button
          onClick={onNext}
          className="bg-[#2D5016] text-white rounded-xl px-6 py-3 font-bold text-sm"
        >
          Начать квиз →
        </button>
      </div>
    )
  }

  const ok = answered && chosen === question.correct
  const [c1, c2] = question.cards

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-[#383838] p-4">
      {/* Заголовок + серия */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-[#a0a0a0] font-medium">{title}</span>
        {streak > 0 && (
          <span className="text-xs font-bold text-yellow-400">{streak}⚡</span>
        )}
      </div>

      {/* Карты */}
      <div className="flex justify-center gap-3 mb-4">
        {[c1, c2].map((c, i) => (
          <div
            key={i}
            className="w-[56px] h-[76px] bg-[#242424] rounded-xl flex flex-col items-center justify-center shadow-lg"
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}
          >
            <span className={`text-2xl font-bold ${c.red ? 'text-red-400' : 'text-white'}`}>
              {c.rank}
            </span>
            <span className={`text-base mt-0.5 ${c.red ? 'text-red-400' : 'text-white'}`}>
              {SUIT_SYMBOLS[c.suit]}
            </span>
          </div>
        ))}
      </div>

      {/* Вопрос */}
      <p className="text-sm font-semibold text-center mb-4">
        Ваше действие с <strong>{question.handKey}</strong>?
      </p>

      {/* Кнопки ответов */}
      <div className="grid grid-cols-3 gap-2">
        {options.map(opt => {
          let cls = 'border border-[#383838] bg-[#242424] text-white hover:bg-[#2e2e2e]'
          if (answered) {
            if (opt.value === question.correct)   cls = 'border border-[#2d5016] bg-[#0a2a0a] text-green-400'
            else if (opt.value === chosen && !ok) cls = 'border border-[#6a1a1a] bg-[#2a0a0a] text-red-400'
            else                                  cls = 'border border-[#383838] bg-[#242424] text-[#505050]'
          }
          return (
            <button
              key={opt.value}
              disabled={answered}
              onClick={() => onAnswer(opt.value)}
              className={`
                rounded-xl py-3 px-1 text-[10px] font-bold text-center leading-tight
                transition-all duration-150
                ${cls}
              `}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* Фидбек */}
      {answered && (
        <div className={`
          mt-3 rounded-xl p-3 text-xs leading-relaxed
          ${ok
            ? 'bg-[#0a2a0a] border border-[#2d5016] text-green-400'
            : 'bg-[#2a0a0a] border border-[#5a1a1a] text-red-400'}
        `}>
          {ok ? '✓ Верно! ' : '✗ Неверно. '}
          <strong>{question.handKey}</strong> — <strong>{correctLabel}</strong>
        </div>
      )}

      {/* Следующая */}
      {answered && (
        <button
          onClick={onNext}
          className="mt-3 w-full bg-[#2D5016] hover:bg-[#3a6a1e] text-white rounded-xl py-3 font-bold text-sm transition-colors"
        >
          Следующая →
        </button>
      )}
    </div>
  )
}
