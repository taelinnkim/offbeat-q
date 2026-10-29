import './App.css'

import { useState } from 'react'
import initialQuestions from './data/questions'

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import QuestionListPage from './pages/QuestionListPage'
import QuestionDetailPage from './pages/QuestionDetailPage'
import QuestionNewPage from './pages/QuestionNewPage'
import QuestionEditPage from './pages/QuestionEditPage'

function App() {
  const [questions, setQuestions] = useState(initialQuestions)
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/questions" replace />}
        />

        <Route
          path="/questions"
          element={<QuestionListPage questions={questions} />}
        />

        <Route
          path="/questions/new"
          element={<QuestionNewPage setQuestions={setQuestions} />}
        />

        <Route
          path="/questions/:id/edit"
          element={
            <QuestionEditPage
              questions={questions}
              setQuestions={setQuestions}
            />
          }
        />

        <Route
          path="/questions/:id"
          element={
            <QuestionDetailPage
              questions={questions}
              setQuestions={setQuestions}
            />
          }
        />

        <Route
          path="*"
          element={<p>페이지를 찾을 수 없어요.</p>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
