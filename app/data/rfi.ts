// RFI данные — расшифровано из PDF
// Цвета обозначают действия против 3-бета

export type RFIAction = 'r4' | 'bl' | 'rf' | 'fs' | 'ws' | 'lc' | 'lp' | 'fd'

export const RFI_LABEL: Record<RFIAction, string> = {
  r4: '4-BET Push',
  bl: 'CALL vs 3-BET',
  rf: 'FOLD vs 3-BET',
  fs: 'CALL vs 3-BET or 4-BET PUSH <25bb',
  ws: 'RFI дефолт',
  lc: 'Limp Call',
  lp: 'Limp Push',
  fd: 'Фолд',
}

export const RFI_COLOR: Record<RFIAction, string> = {
  r4: 'bg-red-500/20 text-red-400 border-red-500/25',
  bl: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/25',
  rf: 'bg-amber-700/20 text-amber-600 border-amber-700/25',
  fs: 'bg-lime-500/20 text-lime-400 border-lime-500/25',
  ws: 'bg-white/[0.04] text-white/40 border-white/10',
  lc: 'bg-sky-500/20 text-sky-400 border-sky-500/25',
  lp: 'bg-purple-500/20 text-purple-400 border-purple-500/25',
  fd: 'bg-white/[0.04] text-white/[0.18] border-white/5',
}

export type RFIChart = Record<string, RFIAction>

export const RFI_CHARTS: Record<string, RFIChart> = {
  'EP': {
    "AA":"r4","AKs":"r4","AQs":"bl","AJs":"bl","ATs":"rf","A9s":"rf","A8s":"rf","A5s":"rf",
    "AKo":"r4","KK":"r4","KQs":"bl","KJs":"rf","KTs":"rf","K9s":"rf","K8s":"rf",
    "AQo":"bl","KQo":"rf","QQ":"r4","QJs":"fs","QTs":"rf","Q9s":"rf","Q8s":"rf",
    "AJo":"rf","KJo":"rf","JJ":"fs","JTs":"rf","J9s":"rf","J8s":"rf",
    "TT":"fs","T9s":"rf",
    "99":"bl","98s":"rf",
    "88":"rf",
    "77":"rf",
  },

  'MP': {
    "AA":"r4","AKs":"r4","AQs":"bl","AJs":"bl","ATs":"bl","A9s":"rf","A8s":"rf","A7s":"rf","A6s":"rf","A5s":"rf","A4s":"rf","A3s":"rf","A2s":"rf",
    "AKo":"r4","KK":"r4","KQs":"bl","KJs":"bl","KTs":"rf","K9s":"rf","K8s":"rf","K7s":"rf","K6s":"rf",
    "AQo":"bl","KQo":"rf","QQ":"r4","QJs":"rf","QTs":"rf","Q9s":"rf","Q8s":"rf","Q7s":"rf","Q6s":"rf",
    "JJ":"r4",
    "TT":"fs",
    "99":"fs",
    "88":"rf",
    "77":"rf",
    "66":"rf",
  },

  'HJ': {
    "AA":"r4","AKs":"r4","AQs":"fs","AJs":"bl","ATs":"bl","A9s":"rf","A8s":"rf","A7s":"rf","A6s":"rf","A5s":"rf","A4s":"rf","A3s":"rf","A2s":"rf",
    "AKo":"r4","KK":"r4","KQs":"bl","KJs":"bl","KTs":"rf","K9s":"rf","K8s":"rf","K7s":"rf","K6s":"rf",
    "JJ":"r4",
    "TT":"r4",
    "99":"r4",
    "88":"bl",
    "77":"bl",
    "66":"rf",
    "55":"rf",
  },

  'CO': {
    "AA":"r4","AKs":"r4","AQs":"fs","AJs":"bl","ATs":"bl","A9s":"bl","A8s":"bl","A7s":"rf","A6s":"rf","A5s":"rf","A4s":"rf","A3s":"rf","A2s":"rf",
    "AKo":"r4","KK":"r4","KQs":"bl","KJs":"bl","KTs":"rf","K9s":"rf","K8s":"rf","K7s":"rf","K6s":"rf",
    "JJ":"r4",
    "TT":"r4",
    "99":"fs",
    "88":"fs",
    "77":"fs",
    "66":"rf",
    "55":"rf",
    "44":"rf",
    "33":"rf",
    "22":"rf",
  },

  'BTN': {
    "AA":"r4","AKs":"r4","AQs":"r4","AJs":"bl","ATs":"bl","A9s":"bl","A8s":"bl","A7s":"rf","A6s":"rf","A5s":"r4","A4s":"r4","A3s":"r4","A2s":"r4",
    "AKo":"r4","KK":"r4","KQs":"bl","KJs":"bl","KTs":"bl","K9s":"rf","K8s":"rf","K7s":"rf","K6s":"rf","K5s":"rf","K4s":"rf","K3s":"rf","K2s":"rf",
    "TT":"r4",
    "99":"r4",
    "88":"fs",
    "77":"fs",
    "66":"fs",
    "55":"r4",
    "44":"r4",
    "33":"r4",
    "22":"r4",
  },

  'SB': {
    "AA":"r4","AKs":"r4","AQs":"r4","AJs":"bl","ATs":"bl","A9s":"bl","A8s":"bl","A7s":"lc","A6s":"lc","A5s":"lc","A4s":"lc","A3s":"lc","A2s":"lc",
    "AKo":"r4","KK":"r4","KQs":"bl","KJs":"bl","KTs":"lc","K9s":"lc","K8s":"lc","K7s":"lc","K6s":"lc","K5s":"rf","K4s":"rf","K3s":"rf","K2s":"rf",
    "77":"lp",
    "66":"lp",
    "55":"lp",
    "44":"lp",
    "33":"lp",
    "22":"lp",
  },
}

export const RFI_POSITIONS = ['EP', 'MP', 'HJ', 'CO', 'BTN', 'SB'] as const
export type RFIPosition = typeof RFI_POSITIONS[number]
