# Poker Trainer PWA

SPR Poker Charts Trainer — Push/Fold, BB Defense, RFI

## Стек
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Supabase (Auth + PostgreSQL + RLS)
- Vercel (хостинг)

## Быстрый старт

### 1. Создать проект Next.js и скопировать файлы
```bash
npx create-next-app@latest poker-trainer --typescript --tailwind --app --no-src-dir
cd poker-trainer
npm install @supabase/ssr @supabase/supabase-js
```

### 2. Скопировать все файлы из этой папки в проект

### 3. Supabase
1. Создать проект на supabase.com
2. Выполнить `supabase_migration.sql` в Dashboard → SQL Editor
3. Скопировать URL и anon key

### 4. Env
```bash
cp .env.local.example .env.local
# Вставить реальные ключи из Supabase
```

### 5. Запуск
```bash
npm run dev
```

### 6. Деплой на Vercel
```bash
# Создать репо на GitHub и запушить
git init && git add . && git commit -m "init"
gh repo create poker-trainer --public --push

# Деплой
npx vercel deploy

# Добавить env в Vercel Dashboard → Settings → Environment Variables:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Структура
```
app/
  lib/supabase.ts       ← Supabase client
  data/
    pushfold.ts         ← Push/Fold данные (из xlsx)
    bbdef.ts            ← BB Defense данные (из PDF)
    rfi.ts              ← RFI данные (из PDF)
  components/
    Grid13.tsx          ← 13×13 сетка
    QuizCard.tsx        ← карточка квиза
    NavBar.tsx          ← нижняя навигация
  hooks/
    useQuiz.ts          ← логика квиза + сохранение в Supabase
  login/page.tsx
  pushfold/page.tsx
  bbdef/page.tsx
  rfi/page.tsx
  dashboard/page.tsx
  layout.tsx
  page.tsx              ← редирект → /login
  globals.css
public/
  manifest.json         ← PWA манифест
supabase_migration.sql  ← SQL для Supabase
```

## PWA
После деплоя на Vercel приложение автоматически устанавливается как PWA.
Добавьте иконки `icon-192.png` и `icon-512.png` в папку `public/`.
