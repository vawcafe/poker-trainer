'use client'
import { useState, useCallback } from 'react'
import { createClient } from '../lib/supabase'

const RANKS = ['A','K','Q','J','T','9','8','7','6','5','4','3','2']
const SUITS = ['s','h','d','c'] as const
const RED_SUITS = ['h','d']

function hkey(i: number, j: number): string {
  const r1 = RANKS[i], r2 = RANKS[j]
  if (i === j) return r1 + r2
  if (i < j)   return r1 + r2 + 's'
  return r2 + r1 + 'o'
}

function rnd<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export interface CardInfo {
  rank: string
  suit: string
  red: boolean
}

export interface QuizQuestion {
  chartKey: string
  handKey: string
  correct: string
  cards: [CardInfo, CardInfo]
}

export interface QuizState {
  question: QuizQuestion | null
  answered: boolean
  chosen: string | null
  streak: number
}

interface UseQuizOptions {
  /** Все возможные чарты: { chartKey: Record<hand, action> } */
  charts: Record<string, Record<string, string>>
  /** Действия которые считаются "нетривиальными" (для 60% выборки) */
  interestingActions?: string[]
  /** ID пользователя для сохранения в Supabase (null = не сохранять) */
  userId: string | null
}

function makeCards(handKey: string): [CardInfo, CardInfo] {
  const isPair   = handKey.length === 2
  const isSuited = handKey.endsWith('s')
  const r1 = handKey[0]
  const r2 = isPair ? handKey[0] : handKey[1]

  const s1 = rnd([...SUITS])
  let s2: string
  if (isPair) {
    const remaining = SUITS.filter(s => s !== s1)
    s2 = rnd(remaining)
  } else if (isSuited) {
    s2 = s1
  } else {
    const remaining = SUITS.filter(s => s !== s1)
    s2 = rnd(remaining)
  }

  return [
    { rank: r1, suit: s1, red: RED_SUITS.includes(s1) },
    { rank: r2, suit: s2, red: RED_SUITS.includes(s2) },
  ]
}

export function useQuiz({ charts, interestingActions = [], userId }: UseQuizOptions) {
  const [state, setState] = useState<QuizState>({
    question: null,
    answered: false,
    chosen: null,
    streak: 0,
  })

  const allKeys: string[] = []
  for (let i = 0; i < 13; i++)
    for (let j = 0; j < 13; j++)
      allKeys.push(hkey(i, j))

  const nextQuestion = useCallback(() => {
    const chartKeys = Object.keys(charts)
    if (chartKeys.length === 0) return

    const chartKey = rnd(chartKeys)
    const chart = charts[chartKey]

    // 60% — пограничные руки, 40% — любые
    const interesting = allKeys.filter(k =>
      chart[k] && interestingActions.includes(chart[k])
    )
    const handKey = Math.random() < 0.6 && interesting.length > 0
      ? rnd(interesting)
      : rnd(allKeys)

    const correct = chart[handKey] ?? 'fd'
    const cards   = makeCards(handKey)

    setState(prev => ({
      question: { chartKey, handKey, correct, cards },
      answered: false,
      chosen: null,
      streak: prev.streak,
    }))
  }, [charts])

  const answer = useCallback(async (chosen: string) => {
    setState(prev => {
      if (prev.answered || !prev.question) return prev
      const ok = chosen === prev.question.correct
      const newStreak = ok ? prev.streak + 1 : 0
      return { ...prev, answered: true, chosen, streak: newStreak }
    })

    // Сохраняем в Supabase
    setState(prev => {
      if (!prev.question || !userId) return prev
      const ok = chosen === prev.question.correct
      const supabase = createClient()

      supabase.rpc('upsert_quiz_progress', {
        p_user_id:   userId,
        p_chart_key: prev.question.chartKey,
        p_correct:   ok,
      }).then(({ error }) => {
        if (error) console.error('quiz_progress save error:', error)
      })

      return prev
    })
  }, [userId])

  return { state, nextQuestion, answer }
}
