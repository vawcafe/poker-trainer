'use client'

type Suit = '♠' | '♥' | '♦' | '♣'

const SUITS: Record<string, Suit> = {
  s: '♠',
  h: '♥',
  d: '♦',
  c: '♣',
}

const SUIT_COLORS: Record<Suit, string> = {
  '♠': '#ffffff',
  '♥': '#ef4444',
  '♦': '#3b82f6',
  '♣': '#10b981',
}

interface NewQuizCardProps {
  hand: string
  onAnswer: (correct: boolean) => void
  correctAction: string
  stats?: { total: number; correct: number; streak: number }
}

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

function isNewInterface(props: QuizCardProps): props is NewQuizCardProps {
  return 'hand' in props
}

function CardDisplay({ card, glow }: { card: { rank: string; suit: Suit }, glow?: 'green' | 'red' | null }) {
  const suitColor = SUIT_COLORS[card.suit]
  const glowStyle = glow === 'green'
    ? { boxShadow: '0 0 40px 12px rgba(34,197,94,0.55)', borderColor: '#22c55e' }
    : glow === 'red'
    ? { boxShadow: '0 0 40px 12px rgba(239,68,68,0.55)', borderColor: '#ef4444' }
    : { borderColor: '#333333' }

  return (
    <div style={{
      background: '#1a1a1a',
      border: '2px solid',
      borderRadius: 20,
      width: 115,
      minHeight: 160,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      transition: 'box-shadow 0.3s, border-color 0.3s',
      ...glowStyle,
    }}>
      <span style={{ fontSize: 56, fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
        {card.rank}
      </span>
      <span style={{ fontSize: 42, color: suitColor, lineHeight: 1 }}>
        {card.suit}
      </span>
    </div>
  )
}

export default function QuizCard(props: QuizCardProps) {

  // ── НОВЫЙ интерфейс ───────────────────────────────────────────
  if (isNewInterface(props)) {
    const { hand, onAnswer, correctAction, stats } = props
    const cards = parseHand(hand)

    return (
      <div style={{ paddingBottom: 24 }}>
        {stats && stats.streak > 0 && (
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <span style={{ color: '#facc15', fontSize: 22, fontWeight: 700 }}>
              ⚡ Серия: {stats.streak}
            </span>
          </div>
        )}

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 32 }}>
          {cards.map((card, i) => (
            <CardDisplay key={i} card={card} />
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#999', fontSize: 15, marginBottom: 24 }}>
          {correctAction === 'push' ? 'Пушить или фолдить?' : 'Ваше действие?'}
        </p>

        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => onAnswer(true)}
            style={{ flex: 1, padding: '13px', fontSize: 14, fontWeight: 600, borderRadius: 18 }}>
            {correctAction === 'push' ? 'Пуш (All-in)' : 'Call'}
          </button>
          <button onClick={() => onAnswer(false)}
            style={{ flex: 1, padding: '13px', fontSize: 14, fontWeight: 600, borderRadius: 18 }}>
            Фолд
          </button>
        </div>
      </div>
    )
  }

  // ── СТАРЫЙ интерфейс (RFI, BB Def) ───────────────────────────
  const { question, answered, chosen, options, title, onAnswer, onNext, correctLabel, streak } = props

  if (!question) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <button onClick={onNext} className="primary" style={{ padding: '12px 32px' }}>
          Начать квиз
        </button>
      </div>
    )
  }

  const handKey = question.handKey || question.hand || question.key || 'AA'
  const cards = parseHand(handKey)
  const isCorrectAnswer = answered && chosen === question.correct
  const glow = answered ? (isCorrectAnswer ? 'green' : 'red') as 'green' | 'red' : null

  return (
    <div style={{ paddingBottom: 24 }}>

      {streak > 0 && (
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ color: '#facc15', fontSize: 20, fontWeight: 700 }}>
            ⚡ Серия: {streak}
          </span>
        </div>
      )}

      <p style={{ textAlign: 'center', color: '#555', fontSize: 12, marginBottom: 20 }}>
        {title}
      </p>

      {/* Карты */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 28 }}>
        {cards.map((card, i) => (
          <CardDisplay key={i} card={card} glow={glow} />
        ))}
      </div>

      <p style={{ textAlign: 'center', color: '#888', fontSize: 14, marginBottom: 18 }}>
        Ваше действие?
      </p>

      {/* Кнопки */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {options.map((opt) => {
          const isCorrect = answered && opt.value === question.correct
          const isChosen = answered && opt.value === chosen
          const isWrong = isChosen && !isCorrect

          let bg = '#2a2a2a'
          let color = '#ffffff'
          let border = '2px solid #333'

          if (isCorrect) {
            bg = 'rgba(34,197,94,0.15)'
            color = '#22c55e'
            border = '2px solid rgba(34,197,94,0.4)'
          } else if (isWrong) {
            bg = 'rgba(239,68,68,0.15)'
            color = '#ef4444'
            border = '2px solid rgba(239,68,68,0.4)'
          } else if (answered) {
            bg = '#1a1a1a'
            color = '#444'
            border = '2px solid #222'
          }

          return (
            <button
              key={opt.value}
              onClick={() => !answered && onAnswer(opt.value)}
              disabled={answered}
              style={{
                background: bg,
                color,
                border,
                borderRadius: 16,
                padding: '12px 10px',
                fontSize: 12,
                fontWeight: 600,
                whiteSpace: 'pre-line',
                cursor: answered ? 'default' : 'pointer',
                transition: 'all 0.2s',
                opacity: answered && !isCorrect && !isChosen ? 0.35 : 1,
                lineHeight: 1.4,
              }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* Результат */}
      {answered && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: '#888', marginBottom: 20, lineHeight: 1.6 }}>
            {isCorrectAnswer
              ? <span style={{ color: '#22c55e', fontWeight: 700 }}>✅ Верно!</span>
              : <><span style={{ color: '#ef4444', fontWeight: 700 }}>❌ Ошибка!</span> Правильно: <span style={{ color: '#22c55e', fontWeight: 700 }}>{correctLabel}</span></>
            }
          </p>
          <button
            onClick={onNext}
            style={{
              background: '#ffffff',
              color: '#000000',
              border: 'none',
              borderRadius: 18,
              padding: '13px 36px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
            }}
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
    const suit1 = suits[Math.floor(Math.random() * 4)]
    let suit2 = suits[Math.floor(Math.random() * 4)]
    while (suit2 === suit1) suit2 = suits[Math.floor(Math.random() * 4)]
    cards.push({ rank: hand[0], suit: SUITS[suit1] })
    cards.push({ rank: hand[1], suit: SUITS[suit2] })
  } else if (hand.endsWith('s')) {
    const suit = suits[Math.floor(Math.random() * 4)]
    cards.push({ rank: hand[0], suit: SUITS[suit] })
    cards.push({ rank: hand[1], suit: SUITS[suit] })
  } else if (hand.endsWith('o')) {
    const suit1 = suits[Math.floor(Math.random() * 4)]
    let suit2 = suits[Math.floor(Math.random() * 4)]
    while (suit2 === suit1) suit2 = suits[Math.floor(Math.random() * 4)]
    cards.push({ rank: hand[0], suit: SUITS[suit1] })
    cards.push({ rank: hand[1], suit: SUITS[suit2] })
  }

  return cards
}
