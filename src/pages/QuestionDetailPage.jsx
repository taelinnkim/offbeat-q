import PageHeader from '../components/PageHeader'
import { useParams } from 'react-router-dom'
import { useQuestion } from '../hooks/useQuestions'
import QuestionState from '../components/QuestionState'
import QuestionActions from '../components/QuestionActions'

function QuestionDetailPage() {
    const { id } = useParams()
    const { question, loading, error, retry } = useQuestion(id)

    return (
        <>
            <PageHeader title="질문 상세" backTo="/questions" />

            {loading ? (
                <QuestionState kind="loading" title="질문을 불러오는 중이에요." />
            ) : error ? (
                <QuestionState kind="error" title="질문을 불러올 수 없어요." onRetry={retry}>
                    {error}
                </QuestionState>
            ) : !question ? (
                <QuestionState title="질문을 찾을 수 없어요.">
                    질문이 삭제되었거나 주소가 올바르지 않을 수 있어요.
                </QuestionState>
            ) : (
                <article className="question-card">
                    <span>{question.category}</span>
                    <h2 className="question-title">{question.title}</h2>
                    <p>영상과 참고 자료가 들어갈 상세 페이지입니다.</p>

                    <QuestionActions key={question.id} id={question.id} />
                </article>
            )}
        </>
    )
}

export default QuestionDetailPage
