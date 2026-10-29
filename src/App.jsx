import './App.css'

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
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import AppLayout from './components/AppLayout'

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
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
            path="/questions/new"
            element={<QuestionNewPage />}
          />

          <Route
            path="/questions/:id/edit"
            element={<QuestionEditPage />}
          />

          <Route
            path="/questions/:id"
            element={<QuestionDetailPage />}
          />

          <Route path="/about" element={<AboutPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
