import { Link, useNavigate, useParams } from 'react-router-dom'

function QuestionDetailPage({ questions, setQuestions }) {
    const { id } = useParams()
    const navigate = useNavigate()

    const question = questions.find(
        (question) => String(question.id) === id
    )

    function handleDelete() {
        const confirmed = window.confirm('이 질문을 삭제할까요?')

        if (!confirmed) {
            return
        }

        setQuestions((previous) =>
            previous.filter((question) => String(question.id) !== id)
        )

        navigate('/questions')
    }

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
            <Link to="/questions">← 목록으로 돌아가기</Link>

            <article className="question-card">
                <span>{question.category}</span>
                <h1>{question.title}</h1>
                <p>영상과 참고 자료가 들어갈 상세 페이지입니다.</p>

                <div className="question-actions">
                    <Link to={`/questions/${id}/edit`} className="question-action">
                        질문 수정
                    </Link>
                    <button
                        type="button"
                        className="question-action question-action-delete"
                        onClick={handleDelete}
                    >
                        질문 삭제
                    </button>
                </div>
            </article>
        </main>
    )
}

export default QuestionDetailPage
