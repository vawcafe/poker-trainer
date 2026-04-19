'use client'

type Suit = '♠' | '♥' | '♦' | '♣'

const SUITS: Record<string, Suit> = {
  s: '♠',
  h: '♥',
  d: '♦',
  c: '♣',
}

const SUIT_CLASS: Record<Suit, string> = {
  '♠': 'suit-spades',
  '♥': 'suit-hearts',
  '♦': 'suit-diamonds',
  '♣': 'suit-clubs',
}

// Новый интерфейс (Push/Fold, BB Def с мастями)
interface NewQuizCardProps {
  hand: string
  onAnswer: (correct: boolean) => void
  correctAction: string
  stats?: { total: number; correct: number; streak: number }
}

// Старый интерфейс (RFI и другие страницы)
interface OldQuizCardProps {
  question: any
  answered: boolean
  chosen: string | null
  options: Array<{ value: string; label: string }>
  title: string
  onAnswer: (action: string) => void
  onNext: () => void
  correctLabel: string
  streak: number
}

type QuizCardProps = NewQuizCardProps | OldQuizCardProps

// Type guard
function isNewInterface(props: QuizCardProps): props is NewQuizCardProps {
  return 'hand' in props
}

export default function QuizCard(props: QuizCardProps) {
  // Новый интерфейс — с мастями карт
  if (isNewInterface(props)) {
    const { hand, onAnswer, correctAction, stats } = props
    const cards = parseHand(hand)

    return (
      <div className="quiz-card">
        {stats && stats.streak > 0 && (
          <div className="text-center mb-4">
            <div className="text-yellow-400 text-2xl font-bold">
              ⚡ Серия: {stats.streak}
            </div>
          </div>
        )}

        <div className="quiz-hand">
          {cards.map((card, i) => (
            <div key={i} className="card-display">
              <span className="card-rank">{card.rank}</span>
              <span className={`card-suit ${SUIT_CLASS[card.suit]}`}>
                {card.suit}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <p className="text-lg text-gray-400">
            {correctAction === 'push' ? 'Пушить или фолдить?' : 'Ваше действие?'}
          </p>
        </div>

        <div className="flex gap-3 justify-center w-full max-w-md">
          <button
            onClick={() => onAnswer(true)}
            className="flex-1 py-4 text-lg font-semibold"
          >
            {correctAction === 'push' ? 'Пуш (All-in)' : 'Call'}
          </button>
          <button
            onClick={() => onAnswer(false)}
            className="flex-1 py-4 text-lg font-semibold"
          >
            Фолд
          </button>
        </div>

        {stats && (
          <div className="mt-8 text-center text-sm text-gray-500">
            Правильно: {stats.correct} из {stats.total}
            {stats.total > 0 && (
              <> ({Math.round((stats.correct / stats.total) * 100)}%)</>
            )}
          </div>
        )}
      </div>
    )
  }

  // Старый интерфейс — для RFI и остальных
  const { question, answered, chosen, options, title, onAnswer, onNext, correctLabel, streak } = props

  if (!question) {
    return (
      <div className="text-center py-12">
        <button onClick={onNext} className="primary py-3 px-8">
          Начать квиз
        </button>
      </div>
    )
  }

  return (
    <div className="bg-[#242424] border border-[#383838] rounded-2xl p-6">
      {streak > 0 && (
        <div className="text-center mb-4">
          <span className="text-yellow-400 font-bold text-lg">
            ⚡ Серия: {streak}
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <p className="text-xs text-[#a0a0a0] mb-2">{title}</p>
        <p className="text-4xl font-bold mb-4">
          {(question as any).handKey || (question as any).hand || (question as any).key || 'AA'}
        </p>
        <p className="text-sm text-[#a0a0a0]">Ваше действие?</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        {options.map((opt) => {
          const isCorrect = answered && opt.value === question.correct
          const isChosen = answered && opt.value === chosen
          const isWrong = isChosen && !isCorrect

          return (
            <button
              key={opt.value}
              onClick={() => !answered && onAnswer(opt.value)}
              disabled={answered}
              className={`
                py-3 px-3 rounded-xl text-xs font-semibold whitespace-pre-line
                transition-all border
                ${isCorrect
                  ? 'bg-green-600/20 text-green-400 border-green-600/40'
                  : isWrong
                  ? 'bg-red-600/20 text-red-400 border-red-600/40'
                  : answered
                  ? 'bg-[#1a1a1a] text-[#505050] border-[#383838] opacity-40'
                  : 'bg-[#2e2e2e] text-white border-[#555] hover:bg-[#383838] active:scale-95'}
              `}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className="text-center">
          <p className="text-sm text-[#a0a0a0] mb-4">
            Правильно: <span className="text-green-400 font-semibold">{correctLabel}</span>
          </p>
          <button
            onClick={onNext}
            className="bg-white text-black py-2.5 px-6 rounded-xl font-semibold text-sm hover:bg-gray-200 active:scale-95 transition-all"
          >
            Следующий вопрос
          </button>
        </div>
      )}
    </div>
  )
}

function parseHand(hand: string): Array<{ rank: string; suit: Suit }> {
  const suits = ['s', 'h', 'd', 'c']
  const cards: Array<{ rank: string; suit: Suit }> = []

  if (hand.length === 2) {
    // Пара (например "AA")
    const suit1 = suits[Math.floor(Math.random() * 4)]
    let suit2 = suits[Math.floor(Math.random() * 4)]
    while (suit2 === suit1) suit2 = suits[Math.floor(Math.random() * 4)]

    cards.push({ rank: hand[0], suit: SUITS[suit1] })
    cards.push({ rank: hand[1], suit: SUITS[suit2] })
  } else if (hand.endsWith('s')) {
    // Suited (например "AKs")
    const suit = suits[Math.floor(Math.random() * 4)]
    cards.push({ rank: hand[0], suit: SUITS[suit] })
    cards.push({ rank: hand[1], suit: SUITS[suit] })
  } else if (hand.endsWith('o')) {
    // Offsuit (например "AKo")
    const suit1 = suits[Math.floor(Math.random() * 4)]
    let suit2 = suits[Math.floor(Math.random() * 4)]
    while (suit2 === suit1) suit2 = suits[Math.floor(Math.random() * 4)]

    cards.push({ rank: hand[0], suit: SUITS[suit1] })
    cards.push({ rank: hand[1], suit: SUITS[suit2] })
  }

  return cards
}
