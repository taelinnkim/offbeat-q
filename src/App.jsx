import './App.css'

import { useState } from 'react'
import QuestionCard from './components/QuestionCard'
import questions from './data/questions'

function App() {
  const [sharkOnly, setSharkOnly] = useState(false)
  const [search, setSearch] = useState("")

 const visibleQuestions = questions.filter((question) => {
  const matchesShark =
    !sharkOnly || question.title.includes("상어")

  const matchesSearch =
    question.title.includes(search.trim())

  return matchesShark && matchesSearch
})

  return (
    <main className="app">
      <h1>딴질문</h1>
      <h2>엉뚱한 질문, 뜻밖의 과학.</h2>
      <p>
        엉뚱한 질문을 따라 과학을 탐험하고,
        익숙한 세계를 새롭게 바라봅니다.
      </p>

      <section className="questions-section">
        <h2>질문 모아보기</h2>

        <label>
        질문 검색
       <input
        type="search"
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
     />
   </label>

        <button onClick={() => setSharkOnly((previous) => !previous)}>
          {sharkOnly ? "전체 질문 보기" : "상어 질문만 보기"}
        </button>

        <p className="question-count">질문 {visibleQuestions.length}개</p>

        {visibleQuestions.length === 0 ? (
          <p>조건에 맞는 질문이 없어요. 검색어나 필터를 바꿔보세요.</p>
        ) : (
          visibleQuestions.map((question) => (
           <QuestionCard
             key={question.id}
             title={question.title}
            category={question.category}
          />
        ))
       )}
      </section>
    </main>
  )
}

export default App