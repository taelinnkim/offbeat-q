import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function QuestionEditPage({ questions, setQuestions }) {
    const { id } = useParams()
    const question = questions.find((question) => String(question.id) === id)

    if (!question) {
        return (
            <main className="app">
                <h1>질문을 찾을 수 없어요.</h1>
                <Link to="/questions">목록으로 돌아가기</Link>
            </main>
        )
    }

    return (
        <main className="app">
            <Link to={`/questions/${id}`}>← 상세로 돌아가기</Link>
            <h1>질문 수정</h1>
            <QuestionEditForm
                key={question.id}
                question={question}
                setQuestions={setQuestions}
            />
        </main>
    )
}

function QuestionEditForm({ question, setQuestions }) {
    const navigate = useNavigate()
    const [title, setTitle] = useState(question.title)
    const [category, setCategory] = useState(question.category)
    const [error, setError] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        if (!title.trim() || !category.trim()) {
            setError('제목과 분류를 모두 입력해주세요.')
            return
        }

        setError('')
        setQuestions((previous) =>
            previous.map((item) =>
                item.id === question.id
                    ? { ...item, title: title.trim(), category: category.trim() }
                    : item
            )
        )
        navigate(`/questions/${question.id}`)
    }

    return (
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

            <button type="submit">저장하기</button>
        </form>
    )
}

export default QuestionEditPage
