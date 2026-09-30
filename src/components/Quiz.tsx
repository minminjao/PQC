import { useState } from 'react'

export type QuizItem = { q: string; opts: string[]; a: number; exp?: string }

export default function Quiz({ items }: { items: QuizItem[] }) {
  return (
    <div className="quiz">
      <h2>확인해 보기</h2>
      {items.map((it, i) => (
        <Q key={i} item={it} n={i + 1} />
      ))}
    </div>
  )
}

function Q({ item, n }: { item: QuizItem; n: number }) {
  const [sel, setSel] = useState<number | null>(null)
  return (
    <div className="quiz-q">
      <div className="q">
        {n}. {item.q}
      </div>
      <div className="opts">
        {item.opts.map((o, i) => {
          let cls = ''
          if (sel !== null) {
            if (i === item.a) cls = 'correct'
            else if (i === sel) cls = 'wrong'
          }
          return (
            <button key={i} className={cls} onClick={() => setSel(i)}>
              {o}
            </button>
          )
        })}
      </div>
      {sel !== null && (
        <div className="exp">
          {sel === item.a ? '✅ 정답입니다. ' : '❌ 아쉽네요. '}
          {item.exp}
        </div>
      )}
    </div>
  )
}
