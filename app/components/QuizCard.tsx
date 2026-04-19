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

interface Props {
  hand: string
  onAnswer: (correct: boolean) => void
  correctAction: string
  stats?: { total: number; correct: number; streak: number }
}

export default function QuizCard({ hand, onAnswer, correctAction, stats }: Props) {
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
          onClick={() => onAnswer(correctAction === 'push')}
          className="flex-1 py-4 text-lg font-semibold"
        >
          {correctAction === 'push' ? 'Пуш (All-in)' : 'Call'}
        </button>
        <button
          onClick={() => onAnswer(correctAction === 'fold')}
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

function parseHand(hand: string): Array<{ rank: string; suit: Suit }> {
  // Генерируем случайные масти для каждой карты
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
