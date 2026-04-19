// BB Defense данные — расшифровано из PDF
// Цвета обозначают действия при разных размерах открытия

export type BBAction = 'c3bb' | 'c25bb' | 'c2bb' | '3bet' | '3bet_call'

export const BB_LABEL: Record<BBAction, string> = {
  c3bb: 'Call 3BB',
  c25bb: 'Call 2.5BB',
  c2bb: 'Call 2BB',
  '3bet': '3-Bet',
  '3bet_call': '3-Bet/Call',
}

export const BB_COLOR: Record<BBAction, string> = {
  c3bb: 'bg-sky-500/20 text-sky-400 border-sky-500/25',
  c25bb: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/25',
  c2bb: 'bg-lime-500/20 text-lime-400 border-lime-500/25',
  '3bet': 'bg-purple-500/20 text-purple-400 border-purple-500/25',
  '3bet_call': 'bg-red-500/20 text-red-400 border-red-500/25',
}

export type BBChart = Record<string, BBAction>

export const BB_DEFENSE: Record<string, BBChart> = {
  'BB vs EP': {
    "AA":"3bet","AKs":"3bet","AQs":"c3bb","AJs":"c3bb","ATs":"c3bb","A9s":"c3bb","A8s":"c3bb","A7s":"c3bb","A6s":"c3bb","A5s":"c3bb","A4s":"c3bb","A3s":"c3bb","A2s":"c3bb",
    "AKo":"3bet","KK":"3bet","KQs":"c3bb","KJs":"c3bb","KTs":"c3bb","K9s":"c25bb","K8s":"c25bb","K7s":"c25bb","K6s":"c25bb","K5s":"c25bb","K4s":"c25bb","K3s":"c25bb","K2s":"c25bb",
    "AQo":"c3bb","KQo":"c3bb","QQ":"3bet","QJs":"c3bb","QTs":"c3bb","Q9s":"c25bb","Q8s":"c25bb","Q7s":"c25bb","Q6s":"c2bb","Q5s":"c2bb","Q4s":"c2bb","Q3s":"c2bb","Q2s":"c2bb",
    "AJo":"c3bb","KJo":"c25bb","QJo":"c25bb","JJ":"c3bb","JTs":"c3bb","J9s":"c25bb","J8s":"c25bb","J7s":"c25bb","J6s":"c2bb","J5s":"c2bb","J4s":"c2bb","J3s":"c2bb","J2s":"c2bb",
    "ATo":"c25bb","KTo":"c25bb","QTo":"c25bb","JTo":"c25bb","TT":"c3bb","T9s":"c3bb","T8s":"c25bb","T7s":"c25bb","T6s":"c2bb","T5s":"c2bb",
    "A9o":"c2bb","K9o":"c2bb","Q9o":"c2bb","J9o":"c2bb","T9o":"c25bb","99":"c3bb","98s":"c25bb","97s":"c25bb","96s":"c2bb","95s":"c2bb",
    "A8o":"c2bb","K8o":"c2bb","Q8o":"c2bb","J8o":"c2bb","T8o":"c2bb","98o":"c2bb","88":"c3bb","87s":"c25bb","86s":"c25bb","85s":"c2bb","84s":"c2bb",
    "A7o":"c2bb","K7o":"c2bb","87o":"c2bb","77":"c3bb","76s":"c25bb","75s":"c25bb","74s":"c2bb",
    "66":"c3bb","65s":"c25bb","64s":"c25bb","63s":"c2bb",
    "55":"c3bb","54s":"c25bb","53s":"c2bb","52s":"c2bb",
    "44":"c3bb","43s":"c2bb","42s":"c2bb",
    "33":"c3bb","32s":"c2bb",
    "22":"c3bb",
  },
  
  'BB vs MP': {
    "AA":"3bet","AKs":"3bet","AQs":"c3bb","AJs":"c3bb","ATs":"c3bb","A9s":"c3bb","A8s":"c3bb","A7s":"c3bb","A6s":"c3bb","A5s":"c3bb","A4s":"c3bb","A3s":"c3bb","A2s":"c3bb",
    "AKo":"3bet","KK":"3bet","KQs":"c3bb","KJs":"c3bb","KTs":"c3bb","K9s":"c3bb","K8s":"c25bb","K7s":"c25bb","K6s":"c25bb","K5s":"c25bb","K4s":"c25bb","K3s":"c25bb","K2s":"c25bb",
    "AQo":"c3bb","KQo":"c3bb","QQ":"3bet","QJs":"c3bb","QTs":"c3bb","Q9s":"c3bb","Q8s":"c25bb","Q7s":"c25bb","Q6s":"c25bb","Q5s":"c25bb","Q4s":"c25bb","Q3s":"c25bb","Q2s":"c25bb",
    "AJo":"c3bb","KJo":"c3bb","QJo":"c25bb","JJ":"3bet","JTs":"c3bb","J9s":"c3bb","J8s":"c25bb","J7s":"c25bb","J6s":"c25bb","J5s":"c2bb","J4s":"c2bb","J3s":"c2bb","J2s":"c2bb",
    "ATo":"c25bb","KTo":"c25bb","QTo":"c25bb","JTo":"c25bb","TT":"c3bb","T9s":"c3bb","T8s":"c25bb","T7s":"c25bb","T6s":"c25bb","T5s":"c2bb","T4s":"c2bb","T3s":"c2bb","T2s":"c2bb",
    "A9o":"c25bb","K9o":"c2bb","Q9o":"c2bb","J9o":"c2bb","T9o":"c2bb","99":"c3bb","98s":"c3bb","97s":"c25bb","96s":"c25bb","95s":"c2bb","94s":"c2bb","93s":"c2bb","92s":"c2bb",
    "A8o":"c25bb","K8o":"c2bb","Q8o":"c2bb","J8o":"c2bb","T8o":"c2bb","98o":"c2bb","88":"c3bb","87s":"c3bb","86s":"c25bb","85s":"c25bb","84s":"c2bb","83s":"c2bb","82s":"c2bb",
    "A7o":"c2bb","K7o":"c2bb","97o":"c2bb","87o":"c2bb","77":"c3bb","76s":"c3bb","75s":"c25bb","74s":"c25bb","73s":"c2bb","72s":"c2bb",
    "A6o":"c2bb","K6o":"c2bb","76o":"c2bb","66":"c3bb","65s":"c25bb","64s":"c25bb","63s":"c25bb","62s":"c2bb",
    "A5o":"3bet_call","55":"c3bb","54s":"c25bb","53s":"c25bb","52s":"c2bb",
    "A4o":"c2bb","44":"c3bb","43s":"c25bb","42s":"c25bb",
    "A3o":"c2bb","33":"c3bb","32s":"c25bb",
    "A2o":"c2bb","22":"c3bb",
  },
  
  'BB vs HJ-CO': {
    "AA":"3bet","AKs":"3bet","AQs":"3bet","AJs":"3bet","ATs":"c3bb","A9s":"c3bb","A8s":"c3bb","A7s":"c3bb","A6s":"c3bb","A5s":"c3bb","A4s":"c3bb","A3s":"c3bb","A2s":"c3bb",
    "AKo":"3bet","KK":"3bet","KQs":"3bet","KJs":"3bet","KTs":"c3bb","K9s":"c3bb","K8s":"c3bb","K7s":"c3bb","K6s":"c3bb","K5s":"c25bb","K4s":"c25bb","K3s":"c25bb","K2s":"c25bb",
    "AQo":"3bet","KQo":"c3bb","QQ":"3bet","QJs":"c3bb","QTs":"c3bb","Q9s":"c3bb","Q8s":"c3bb","Q7s":"c25bb","Q6s":"c25bb","Q5s":"c25bb","Q4s":"c25bb","Q3s":"c25bb","Q2s":"c25bb",
    "AJo":"c3bb","KJo":"c3bb","QJo":"c3bb","JJ":"3bet","JTs":"c3bb","J9s":"c3bb","J8s":"c3bb","J7s":"c25bb","J6s":"c25bb","J5s":"c25bb","J4s":"c25bb","J3s":"c25bb","J2s":"c25bb",
    "ATo":"c3bb","KTo":"c3bb","QTo":"c3bb","JTo":"c3bb","TT":"3bet","T9s":"c3bb","T8s":"c3bb","T7s":"c25bb","T6s":"c25bb","T5s":"c25bb","T4s":"c2bb","T3s":"c2bb","T2s":"c2bb",
    "A9o":"c3bb","K9o":"c25bb","Q9o":"c25bb","J9o":"c25bb","T9o":"c25bb","99":"c3bb","98s":"c3bb","97s":"c3bb","96s":"c25bb","95s":"c2bb","94s":"c2bb","93s":"c2bb","92s":"c2bb",
    "A8o":"c3bb","K8o":"c2bb","Q8o":"c2bb","J8o":"c2bb","T8o":"c2bb","98o":"c2bb","88":"c3bb","87s":"c3bb","86s":"c3bb","85s":"c25bb","84s":"c2bb","83s":"c2bb","82s":"c2bb",
    "A7o":"c25bb","K7o":"c2bb","Q7o":"c2bb","J7o":"c2bb","T7o":"c2bb","97o":"c2bb","87o":"c2bb","77":"c3bb","76s":"c3bb","75s":"c3bb","74s":"c25bb","73s":"c2bb","72s":"c2bb",
    "A6o":"c25bb","K6o":"c2bb","76o":"c2bb","66":"c3bb","65s":"c3bb","64s":"c25bb","63s":"c25bb","62s":"c2bb",
    "A5o":"3bet_call","65o":"c2bb","55":"c3bb","54s":"c3bb","53s":"c25bb","52s":"c2bb",
    "A4o":"3bet_call","54o":"c2bb","44":"c3bb","43s":"c25bb","42s":"c25bb",
    "A3o":"3bet_call","33":"c3bb","32s":"c25bb",
    "A2o":"3bet_call","22":"c3bb",
  },
  
  'BB vs BU-SB': {
    "AA":"3bet","AKs":"3bet","AQs":"3bet","AJs":"3bet","ATs":"c3bb","A9s":"c3bb","A8s":"c3bb","A7s":"c3bb","A6s":"c3bb","A5s":"c3bb","A4s":"c3bb","A3s":"c3bb","A2s":"c3bb",
    "AKo":"3bet","KK":"3bet","KQs":"3bet","KJs":"c3bb","KTs":"c3bb","K9s":"c3bb","K8s":"c3bb","K7s":"c3bb","K6s":"c3bb","K5s":"c3bb","K4s":"c25bb","K3s":"c25bb","K2s":"c25bb",
    "AQo":"3bet","KQo":"c3bb","QQ":"3bet","QJs":"c3bb","QTs":"c3bb","Q9s":"c3bb","Q8s":"c3bb","Q7s":"c3bb","Q6s":"c25bb","Q5s":"c25bb","Q4s":"c25bb","Q3s":"c25bb","Q2s":"c25bb",
    "AJo":"c3bb","KJo":"c3bb","QJo":"c3bb","JJ":"3bet","JTs":"c3bb","J9s":"c3bb","J8s":"c3bb","J7s":"c25bb","J6s":"c25bb","J5s":"c25bb","J4s":"c25bb","J3s":"c25bb","J2s":"c25bb",
    "ATo":"c3bb","KTo":"c3bb","QTo":"c3bb","JTo":"c3bb","TT":"3bet","T9s":"c3bb","T8s":"c3bb","T7s":"c25bb","T6s":"c25bb","T5s":"c25bb","T4s":"c25bb","T3s":"c25bb","T2s":"c25bb",
    "A9o":"c25bb","K9o":"c25bb","Q9o":"c25bb","J9o":"c25bb","T9o":"c25bb","99":"3bet","98s":"c3bb","97s":"c3bb","96s":"c25bb","95s":"c25bb","94s":"c25bb","93s":"c25bb","92s":"c25bb",
    "A8o":"c25bb","K8o":"c25bb","Q8o":"c25bb","J8o":"c25bb","T8o":"c25bb","98o":"c25bb","88":"c3bb","87s":"c3bb","86s":"c3bb","85s":"c3bb","84s":"c25bb","83s":"c25bb","82s":"c25bb",
    "A7o":"c25bb","K7o":"c25bb","Q7o":"c25bb","J7o":"c25bb","T7o":"c25bb","97o":"c25bb","87o":"c25bb","77":"c3bb","76s":"c3bb","75s":"c3bb","74s":"c3bb","73s":"c25bb","72s":"c25bb",
    "A6o":"3bet_call","K6o":"3bet_call","Q6o":"3bet_call","J6o":"c2bb","T6o":"c2bb","96o":"c2bb","86o":"c2bb","76o":"c25bb","66":"c3bb","65s":"c3bb","64s":"c3bb","63s":"c25bb","62s":"c25bb",
    "A5o":"3bet_call","K5o":"3bet_call","Q5o":"3bet_call","J5o":"c2bb","85o":"c2bb","75o":"c2bb","65o":"c25bb","55":"c3bb","54s":"c3bb","53s":"c25bb","52s":"c25bb",
    "A4o":"3bet_call","K4o":"3bet_call","Q4o":"3bet_call","J4o":"c2bb","74o":"c2bb","64o":"c2bb","54o":"c25bb","44":"c3bb","43s":"c25bb","42s":"c25bb",
    "A3o":"3bet_call","K3o":"3bet_call","Q3o":"3bet_call","53o":"c2bb","43o":"c2bb","33":"c3bb","32s":"c25bb",
    "A2o":"3bet_call","K2o":"3bet_call","Q2o":"3bet_call","22":"c3bb",
  },
}

export const BB_POSITIONS = ['BB vs EP', 'BB vs MP', 'BB vs HJ-CO', 'BB vs BU-SB'] as const
export type BBPosition = typeof BB_POSITIONS[number]
