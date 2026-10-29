import { Link, useNavigate } from 'react-router-dom'
import QuestionForm from '../components/QuestionForm'
import QuestionState from '../components/QuestionState'
import useQuestionMutation from '../hooks/useQuestionMutation'
import { createQuestion } from '../lib/questionMutations'
import { supabaseConfigError } from '../lib/supabase'

function QuestionNewPage() {
    const navigate = useNavigate()
    const { mutate, pending, error } = useQuestionMutation(createQuestion)

    async function handleSave(values) {
        const question = await mutate(values)
        if (question) navigate(`/questions/${question.id}`)
    }

    return (
        <main className="app">
            <Link to="/questions">← 목록으로 돌아가기</Link>
            <h1>질문 등록</h1>
            {supabaseConfigError ? (
                <QuestionState kind="error" title="Supabase 설정을 확인해주세요.">
                    {supabaseConfigError}
                </QuestionState>
            ) : (
                <QuestionForm onSave={handleSave} pending={pending} error={error} submitLabel="등록하기" />
            )}
        </main>
    )
}

export default QuestionNewPage
