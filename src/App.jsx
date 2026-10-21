import './App.css'

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import QuestionListPage from './pages/QuestionListPage'
import QuestionDetailPage from './pages/QuestionDetailPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/questions" replace />}
        />

        <Route
          path="/questions"
          element={<QuestionListPage />}
        />

        <Route
          path="/questions/:id"
          element={<QuestionDetailPage />}
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