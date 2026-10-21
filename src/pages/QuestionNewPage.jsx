import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function QuestionNewPage({ setQuestions }) {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [error, setError] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        if (!title.trim() || !category.trim()) {
            setError('제목과 분류를 모두 입력해주세요.')
            return
        }

        setError('')

        const newQuestion = {
            id: crypto.randomUUID(),
            title: title.trim(),
            category: category.trim(),
        }

        setQuestions((previous) => [...previous, newQuestion])

        navigate('/questions')
    }

    return (
        <main className="app">
            <Link to="/questions">← 목록으로 돌아가기</Link>

            <h1>질문 등록</h1>

            <form className="question-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">질문 제목</label>
                    <input
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="category">분류</label>
                    <input
                        id="category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                    />
                </div>

                {error && <p role="alert">{error}</p>}

                <button type="submit">등록하기</button>
            </form>
        </main>
    )
}

export default QuestionNewPage