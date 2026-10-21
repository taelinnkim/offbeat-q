import { Link, useParams } from 'react-router-dom'

function QuestionDetailPage({ questions }) {
    const { id } = useParams()

    const question = questions.find(
        (question) => String(question.id) === id
    )

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
            </article>
        </main>
    )
}

export default QuestionDetailPage