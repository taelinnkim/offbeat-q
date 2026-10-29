import PageHeader from '../components/PageHeader'
import { useNavigate, useParams } from 'react-router-dom'
import QuestionForm from '../components/QuestionForm'
import QuestionState from '../components/QuestionState'
import { useQuestion } from '../hooks/useQuestions'
import useQuestionMutation from '../hooks/useQuestionMutation'
import { updateQuestion } from '../lib/questionMutations'

function QuestionEditPage() {
    const { id } = useParams()
    const { question, loading, error, retry } = useQuestion(id)

    return (
        <>
            <PageHeader title="질문 수정" backTo={`/questions/${id}`} backLabel="← 상세로 돌아가기" />
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
                <QuestionEditor key={question.id} question={question} />
            )}
        </>
    )
}

function QuestionEditor({ question }) {
    const navigate = useNavigate()
    const { mutate, pending, error } = useQuestionMutation(updateQuestion)

    async function handleSave(values) {
        const updated = await mutate(question.id, values)
        if (updated) navigate(`/questions/${updated.id}`)
    }

    return (
        <QuestionForm
            question={question}
            onSave={handleSave}
            pending={pending}
            error={error}
            submitLabel="저장하기"
        />
    )
}

export default QuestionEditPage
