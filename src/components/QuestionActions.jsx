import { Link, useNavigate } from 'react-router-dom'
import QuestionState from './QuestionState'
import useQuestionMutation from '../hooks/useQuestionMutation'
import { deleteQuestion } from '../lib/questionMutations'

function QuestionActions({ id }) {
    const navigate = useNavigate()
    const { mutate, pending, error } = useQuestionMutation(deleteQuestion)

    async function handleDelete() {
        if (pending || !window.confirm('이 질문을 삭제할까요?')) return
        const deleted = await mutate(id)
        if (deleted) navigate('/questions', { replace: true })
    }

    return (
        <>
            <div className="question-actions" aria-busy={pending}>
                {pending ? (
                    <button type="button" className="question-action" disabled>질문 수정</button>
                ) : (
                    <Link to={`/questions/${id}/edit`} className="question-action">질문 수정</Link>
                )}
                <button
                    type="button"
                    className="question-action question-action-delete"
                    disabled={pending}
                    onClick={handleDelete}
                >
                    {pending ? '삭제 중…' : '질문 삭제'}
                </button>
            </div>
            {pending && <p role="status">질문을 삭제하고 있어요. 잠시 기다려주세요.</p>}
            {error && (
                <QuestionState kind="error" title="삭제하지 못했어요.">{error}</QuestionState>
            )}
        </>
    )
}

export default QuestionActions
