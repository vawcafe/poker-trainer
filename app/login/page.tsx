'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else router.push('/pushfold')
  }

  async function handleSignUp() {
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else router.push('/pushfold')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#1a1a1a] rounded-2xl p-6 border border-[#383838]">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🃏</div>
          <h1 className="text-xl font-bold">Poker Trainer</h1>
          <p className="text-xs text-[#505050] mt-1">SPR Poker Charts</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-[#242424] border border-[#383838] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7a22] transition-colors"
            required
          />
          <input
            type="password" placeholder="Пароль" value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-[#242424] border border-[#383838] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7a22] transition-colors"
            required
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" disabled={loading}
            className="bg-[#2D5016] text-white rounded-xl py-3 font-bold text-sm hover:bg-[#3a6a1e] disabled:opacity-50 transition-colors">
            {loading ? 'Загрузка...' : 'Войти'}
          </button>
          <button type="button" onClick={handleSignUp} disabled={loading}
            className="border border-[#383838] rounded-xl py-3 text-sm text-[#a0a0a0] hover:text-white hover:border-[#555] disabled:opacity-50 transition-colors">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  )
}
