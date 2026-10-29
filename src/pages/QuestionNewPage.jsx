import PageHeader from '../components/PageHeader'
import { useNavigate } from 'react-router-dom'
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
        <>
            <PageHeader title="질문 등록" backTo="/questions" />
            {supabaseConfigError ? (
                <QuestionState kind="error" title="Supabase 설정을 확인해주세요.">
                    {supabaseConfigError}
                </QuestionState>
            ) : (
                <QuestionForm onSave={handleSave} pending={pending} error={error} submitLabel="등록하기" />
            )}
        </>
    )
}

export default QuestionNewPage
