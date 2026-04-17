// RFI данные — считаны вручную со страниц PDF (SPR Poker, ранняя стадия 40bb)
// r4=4-бет vs 3-бет, bl=колл vs 3-бет, rf=RFI дефолт,
// fs=фолд сильный состав, ws=RFI слабый состав, fd=фолд дефолт

export type RFIAction = 'r4' | 'bl' | 'rf' | 'fs' | 'ws' | 'fd'

export const RFI_LABEL: Record<RFIAction, string> = {
  r4: '4-бет vs 3-бет',
  bl: 'Колл vs 3-бет',
  rf: 'RFI по дефолту',
  fs: 'Фолд / сильный состав',
  ws: 'RFI / слабый состав',
  fd: 'Фолд по дефолту',
}

export const RFI_COLOR: Record<RFIAction, string> = {
  r4: 'bg-red-500/20    text-red-400   border-red-500/25',
  bl: 'bg-blue-500/20   text-blue-400  border-blue-500/25',
  rf: 'bg-teal-500/20   text-teal-400  border-teal-500/25',
  fs: 'bg-green-500/20  text-green-400 border-green-500/25',
  ws: 'bg-orange-500/20 text-orange-400 border-orange-500/25',
  fd: 'bg-white/5       text-white/20  border-white/6',
}

export type RFIChart = Record<string, RFIAction>

export const RFI_CHARTS: Record<string, RFIChart> = {
  UTG: {
    AA:'r4',AKs:'r4',AQs:'r4',AJs:'r4',ATs:'r4',A9s:'rf',A8s:'rf',A7s:'rf',A6s:'rf',A5s:'rf',A4s:'rf',A3s:'rf',A2s:'rf',
    AKo:'r4',KK:'r4',KQs:'r4',KJs:'r4',KTs:'rf',K9s:'rf',K8s:'ws',K7s:'ws',K6s:'rf',K5s:'rf',K4s:'rf',K3s:'rf',K2s:'rf',
    AQo:'bl',KQo:'rf',QQ:'r4',QJs:'rf',QTs:'rf',Q9s:'rf',Q8s:'rf',Q7s:'rf',Q6s:'rf',Q5s:'rf',Q4s:'rf',Q3s:'rf',Q2s:'rf',
    AJo:'rf',KJo:'bl',QJo:'rf',JJ:'bl',JTs:'rf',J9s:'rf',J8s:'rf',J7s:'rf',J6s:'rf',J5s:'rf',J4s:'rf',J3s:'rf',J2s:'rf',
    ATo:'rf',KTo:'rf',QTo:'rf',JTo:'rf',TT:'rf',T9s:'rf',T8s:'rf',T7s:'rf',T6s:'rf',T5s:'rf',T4s:'rf',T3s:'rf',T2s:'rf',
    A9o:'fd',K9o:'fd',Q9o:'fd',J9o:'fd',T9o:'fd','99':'rf','98s':'rf','97s':'rf','96s':'rf','95s':'rf','94s':'rf','93s':'rf','92s':'rf',
    A8o:'fd',K8o:'fd',Q8o:'fd',J8o:'fd',T8o:'fd','98o':'fd','88':'rf','87s':'ws','86s':'rf','85s':'rf','84s':'rf','83s':'rf','82s':'rf',
    A7o:'fd',K7o:'fd',Q7o:'fd',J7o:'fd',T7o:'fd','97o':'fd','87o':'fd','77':'rf','76s':'ws','75s':'rf','74s':'rf','73s':'rf','72s':'rf',
    A6o:'fd',K6o:'fd',Q6o:'fd',J6o:'fd',T6o:'fd','96o':'fd','86o':'fd','76o':'fd','66':'rf','65s':'rf','64s':'rf','63s':'rf','62s':'rf',
    A5o:'fd',K5o:'fd',Q5o:'fd',J5o:'fd',T5o:'fd','95o':'fd','85o':'fd','75o':'fd','65o':'fd','55':'fs','54s':'rf','53s':'rf','52s':'rf',
    A4o:'fd',K4o:'fd',Q4o:'fd',J4o:'fd',T4o:'fd','94o':'fd','84o':'fd','74o':'fd','64o':'fd','54o':'fd','44':'ws','43s':'rf','42s':'rf',
    A3o:'fd',K3o:'fd',Q3o:'fd',J3o:'fd',T3o:'fd','93o':'fd','83o':'fd','73o':'fd','63o':'fd','53o':'fd','43o':'fd','33':'rf','32s':'rf',
    A2o:'fd',K2o:'fd',Q2o:'fd',J2o:'fd',T2o:'fd','92o':'fd','82o':'fd','72o':'fd','62o':'fd','52o':'fd','42o':'fd','32o':'fd','22':'rf',
  },
  MP: {
    AA:'r4',AKs:'r4',AQs:'r4',AJs:'r4',ATs:'r4',A9s:'rf',A8s:'rf',A7s:'rf',A6s:'rf',A5s:'rf',A4s:'rf',A3s:'rf',A2s:'rf',
    AKo:'r4',KK:'r4',KQs:'r4',KJs:'r4',KTs:'ws',K9s:'rf',K8s:'ws',K7s:'ws',K6s:'ws',K5s:'rf',K4s:'rf',K3s:'rf',K2s:'rf',
    AQo:'bl',KQo:'rf',QQ:'r4',QJs:'rf',QTs:'rf',Q9s:'rf',Q8s:'rf',Q7s:'rf',Q6s:'rf',Q5s:'rf',Q4s:'rf',Q3s:'rf',Q2s:'rf',
    AJo:'rf',KJo:'rf',QJo:'rf',JJ:'rf',JTs:'rf',J9s:'rf',J8s:'rf',J7s:'rf',J6s:'rf',J5s:'rf',J4s:'rf',J3s:'rf',J2s:'rf',
    ATo:'rf',KTo:'ws',QTo:'ws',JTo:'ws',TT:'rf',T9s:'rf',T8s:'rf',T7s:'ws',T6s:'rf',T5s:'rf',T4s:'rf',T3s:'rf',T2s:'rf',
    A9o:'fd',K9o:'fd',Q9o:'fd',J9o:'fd',T9o:'fd','99':'rf','98s':'rf','97s':'ws','96s':'ws','95s':'rf','94s':'rf','93s':'rf','92s':'rf',
    A8o:'fd',K8o:'fd',Q8o:'fd',J8o:'fd',T8o:'fd','98o':'fd','88':'rf','87s':'ws','86s':'ws','85s':'rf','84s':'rf','83s':'rf','82s':'rf',
    A7o:'fd',K7o:'fd',Q7o:'fd',J7o:'fd',T7o:'fd','97o':'fd','87o':'fd','77':'rf','76s':'ws','75s':'ws','74s':'rf','73s':'rf','72s':'rf',
    A6o:'fd',K6o:'fd',Q6o:'fd',J6o:'fd',T6o:'fd','96o':'fd','86o':'fd','76o':'fd','66':'rf','65s':'ws','64s':'rf','63s':'rf','62s':'rf',
    A5o:'fd',K5o:'fd',Q5o:'fd',J5o:'fd',T5o:'fd','95o':'fd','85o':'fd','75o':'fd','65o':'fd','55':'rf','54s':'ws','53s':'rf','52s':'rf',
    A4o:'fd',K4o:'fd',Q4o:'fd',J4o:'fd',T4o:'fd','94o':'fd','84o':'fd','74o':'fd','64o':'fd','54o':'fd','44':'ws','43s':'rf','42s':'rf',
    A3o:'fd',K3o:'fd',Q3o:'fd',J3o:'fd',T3o:'fd','93o':'fd','83o':'fd','73o':'fd','63o':'fd','53o':'fd','43o':'fd','33':'ws','32s':'rf',
    A2o:'fd',K2o:'fd',Q2o:'fd',J2o:'fd',T2o:'fd','92o':'fd','82o':'fd','72o':'fd','62o':'fd','52o':'fd','42o':'fd','32o':'fd','22':'ws',
  },
  HJ: {
    AA:'r4',AKs:'r4',AQs:'r4',AJs:'r4',ATs:'r4',A9s:'rf',A8s:'rf',A7s:'rf',A6s:'rf',A5s:'rf',A4s:'rf',A3s:'rf',A2s:'rf',
    AKo:'r4',KK:'r4',KQs:'r4',KJs:'r4',KTs:'rf',K9s:'ws',K8s:'ws',K7s:'ws',K6s:'ws',K5s:'fs',K4s:'ws',K3s:'ws',K2s:'rf',
    AQo:'bl',KQo:'rf',QQ:'r4',QJs:'rf',QTs:'rf',Q9s:'rf',Q8s:'rf',Q7s:'rf',Q6s:'rf',Q5s:'rf',Q4s:'rf',Q3s:'rf',Q2s:'rf',
    AJo:'rf',KJo:'rf',QJo:'rf',JJ:'rf',JTs:'rf',J9s:'rf',J8s:'rf',J7s:'ws',J6s:'rf',J5s:'rf',J4s:'rf',J3s:'rf',J2s:'rf',
    ATo:'rf',KTo:'ws',QTo:'ws',JTo:'ws',TT:'rf',T9s:'rf',T8s:'rf',T7s:'ws',T6s:'rf',T5s:'rf',T4s:'rf',T3s:'rf',T2s:'rf',
    A9o:'rf',K9o:'fd',Q9o:'fd',J9o:'fd',T9o:'fd','99':'ws','98s':'rf','97s':'ws','96s':'ws','95s':'rf','94s':'rf','93s':'rf','92s':'rf',
    A8o:'fs',K8o:'fd',Q8o:'fd',J8o:'fd',T8o:'fd','98o':'fd','88':'bl','87s':'rf','86s':'rf','85s':'ws','84s':'rf','83s':'rf','82s':'rf',
    A7o:'fd',K7o:'fd',Q7o:'fd',J7o:'fd',T7o:'fd','97o':'fd','87o':'fd','77':'rf','76s':'ws','75s':'ws','74s':'rf','73s':'rf','72s':'rf',
    A6o:'fd',K6o:'fd',Q6o:'fd',J6o:'fd',T6o:'fd','96o':'fd','86o':'fd','76o':'fd','66':'rf','65s':'ws','64s':'ws','63s':'rf','62s':'rf',
    A5o:'rf',K5o:'fd',Q5o:'fd',J5o:'fd',T5o:'fd','95o':'fd','85o':'fd','75o':'fd','65o':'fd','55':'rf','54s':'ws','53s':'rf','52s':'rf',
    A4o:'ws',K4o:'fd',Q4o:'fd',J4o:'fd',T4o:'fd','94o':'fd','84o':'fd','74o':'fd','64o':'fd','54o':'fd','44':'rf','43s':'rf','42s':'rf',
    A3o:'ws',K3o:'fd',Q3o:'fd',J3o:'fd',T3o:'fd','93o':'fd','83o':'fd','73o':'fd','63o':'fd','53o':'fd','43o':'fd','33':'ws','32s':'rf',
    A2o:'fd',K2o:'fd',Q2o:'fd',J2o:'fd',T2o:'fd','92o':'fd','82o':'fd','72o':'fd','62o':'fd','52o':'fd','42o':'fd','32o':'fd','22':'ws',
  },
  CO: {
    AA:'r4',AKs:'r4',AQs:'r4',AJs:'r4',ATs:'r4',A9s:'rf',A8s:'rf',A7s:'rf',A6s:'rf',A5s:'rf',A4s:'rf',A3s:'rf',A2s:'rf',
    AKo:'r4',KK:'r4',KQs:'r4',KJs:'r4',KTs:'rf',K9s:'rf',K8s:'ws',K7s:'ws',K6s:'rf',K5s:'rf',K4s:'rf',K3s:'ws',K2s:'ws',
    AQo:'bl',KQo:'rf',QQ:'r4',QJs:'rf',QTs:'rf',Q9s:'rf',Q8s:'rf',Q7s:'rf',Q6s:'ws',Q5s:'ws',Q4s:'rf',Q3s:'rf',Q2s:'rf',
    AJo:'rf',KJo:'rf',QJo:'rf',JJ:'rf',JTs:'rf',J9s:'rf',J8s:'rf',J7s:'rf',J6s:'rf',J5s:'rf',J4s:'rf',J3s:'rf',J2s:'rf',
    ATo:'rf',KTo:'rf',QTo:'rf',JTo:'rf',TT:'rf',T9s:'rf',T8s:'rf',T7s:'rf',T6s:'rf',T5s:'rf',T4s:'rf',T3s:'rf',T2s:'rf',
    A9o:'rf',K9o:'rf',Q9o:'rf',J9o:'fd',T9o:'fd','99':'rf','98s':'rf','97s':'rf','96s':'rf','95s':'rf','94s':'rf','93s':'rf','92s':'rf',
    A8o:'rf',K8o:'rf',Q8o:'fd',J8o:'fd',T8o:'fd','98o':'ws','88':'bl','87s':'rf','86s':'rf','85s':'rf','84s':'rf','83s':'rf','82s':'rf',
    A7o:'fs',K7o:'fd',Q7o:'fd',J7o:'fd',T7o:'fd','97o':'fd','87o':'fd','77':'bl','76s':'rf','75s':'rf','74s':'rf','73s':'rf','72s':'rf',
    A6o:'fs',K6o:'fd',Q6o:'fd',J6o:'fd',T6o:'fd','96o':'fd','86o':'fd','76o':'fd','66':'rf','65s':'rf','64s':'rf','63s':'rf','62s':'rf',
    A5o:'rf',K5o:'fd',Q5o:'fd',J5o:'fd',T5o:'fd','95o':'fd','85o':'fd','75o':'fd','65o':'fd','55':'rf','54s':'rf','53s':'rf','52s':'rf',
    A4o:'ws',K4o:'fd',Q4o:'fd',J4o:'fd',T4o:'fd','94o':'fd','84o':'fd','74o':'fd','64o':'fd','54o':'fd','44':'rf','43s':'rf','42s':'rf',
    A3o:'ws',K3o:'fd',Q3o:'fd',J3o:'fd',T3o:'fd','93o':'fd','83o':'fd','73o':'fd','63o':'fd','53o':'fd','43o':'fd','33':'rf','32s':'rf',
    A2o:'ws',K2o:'fd',Q2o:'fd',J2o:'fd',T2o:'fd','92o':'fd','82o':'fd','72o':'fd','62o':'fd','52o':'fd','42o':'fd','32o':'fd','22':'rf',
  },
  BTN: {
    AA:'r4',AKs:'r4',AQs:'r4',AJs:'r4',ATs:'r4',A9s:'r4',A8s:'rf',A7s:'rf',A6s:'rf',A5s:'rf',A4s:'rf',A3s:'rf',A2s:'rf',
    AKo:'r4',KK:'r4',KQs:'r4',KJs:'r4',KTs:'rf',K9s:'rf',K8s:'rf',K7s:'rf',K6s:'rf',K5s:'rf',K4s:'rf',K3s:'rf',K2s:'rf',
    AQo:'bl',KQo:'rf',QQ:'r4',QJs:'rf',QTs:'rf',Q9s:'rf',Q8s:'rf',Q7s:'rf',Q6s:'rf',Q5s:'rf',Q4s:'rf',Q3s:'rf',Q2s:'ws',
    AJo:'rf',KJo:'rf',QJo:'rf',JJ:'rf',JTs:'rf',J9s:'rf',J8s:'rf',J7s:'rf',J6s:'rf',J5s:'rf',J4s:'fs',J3s:'fs',J2s:'fs',
    ATo:'rf',KTo:'rf',QTo:'rf',JTo:'rf',TT:'rf',T9s:'rf',T8s:'rf',T7s:'rf',T6s:'rf',T5s:'rf',T4s:'rf',T3s:'rf',T2s:'rf',
    A9o:'rf',K9o:'rf',Q9o:'rf',J9o:'rf',T9o:'rf','99':'rf','98s':'rf','97s':'rf','96s':'rf','95s':'rf','94s':'rf','93s':'rf','92s':'rf',
    A8o:'rf',K8o:'rf',Q8o:'rf',J8o:'rf',T8o:'rf','98o':'rf','88':'bl','87s':'rf','86s':'rf','85s':'rf','84s':'rf','83s':'rf','82s':'rf',
    A7o:'rf',K7o:'rf',Q7o:'rf',J7o:'rf',T7o:'rf','97o':'rf','87o':'rf','77':'bl','76s':'rf','75s':'rf','74s':'rf','73s':'rf','72s':'rf',
    A6o:'rf',K6o:'rf',Q6o:'rf',J6o:'rf',T6o:'rf','96o':'rf','86o':'rf','76o':'ws','66':'bl','65s':'rf','64s':'rf','63s':'rf','62s':'rf',
    A5o:'rf',K5o:'rf',Q5o:'rf',J5o:'rf',T5o:'rf','95o':'rf','85o':'rf','75o':'rf','65o':'ws','55':'rf','54s':'rf','53s':'rf','52s':'ws',
    A4o:'rf',K4o:'rf',Q4o:'rf',J4o:'rf',T4o:'rf','94o':'rf','84o':'rf','74o':'rf','64o':'rf','54o':'ws','44':'rf','43s':'ws','42s':'ws',
    A3o:'rf',K3o:'rf',Q3o:'rf',J3o:'rf',T3o:'rf','93o':'rf','83o':'rf','73o':'rf','63o':'rf','53o':'rf','43o':'rf','33':'rf','32s':'rf',
    A2o:'rf',K2o:'rf',Q2o:'rf',J2o:'rf',T2o:'rf','92o':'rf','82o':'rf','72o':'rf','62o':'rf','52o':'rf','42o':'rf','32o':'rf','22':'rf',
  },
}

export const RFI_POSITIONS = ['UTG','MP','HJ','CO','BTN'] as const
export type RFIPosition = typeof RFI_POSITIONS[number]
