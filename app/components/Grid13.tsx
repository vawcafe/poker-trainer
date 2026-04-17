'use client'

const RANKS = ['A','K','Q','J','T','9','8','7','6','5','4','3','2']

function hkey(i: number, j: number): string {
  const r1 = RANKS[i], r2 = RANKS[j]
  if (i === j) return r1 + r2
  if (i < j)   return r1 + r2 + 's'
  return r2 + r1 + 'o'
}

interface Props {
  data: Record<string, string>
  colorMap: Record<string, string>
  onHover?: (key: string, value: string | null) => void
  highlightKey?: string | null
}

export default function Grid13({ data, colorMap, onHover, highlightKey }: Props) {
  return (
    <div
      className="w-full"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(13, 1fr)', gap: '2.5px' }}
    >
      {Array.from({ length: 169 }, (_, idx) => {
        const i = Math.floor(idx / 13)
        const j = idx % 13
        const k = hkey(i, j)
        const v = data[k] ?? null
        const isHighlighted = highlightKey === k

        const baseClass = v
          ? colorMap[v] ?? 'bg-white/5 text-white/20'
          : 'bg-white/[0.04] text-white/[0.18]'

        return (
          <div
            key={k}
            className={`
              aspect-square rounded flex items-center justify-center
              text-[9px] font-black cursor-default select-none tracking-tight
              transition-all duration-100
              ${baseClass}
              ${isHighlighted ? 'ring-1 ring-white/60 scale-110 z-10' : ''}
            `}
            onMouseEnter={() => onHover?.(k, v)}
            onMouseLeave={() => onHover?.('', null)}
          >
            {k}
          </div>
        )
      })}
    </div>
  )
}
