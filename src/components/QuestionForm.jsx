import { useState } from 'react'
import QuestionState from './QuestionState'

function QuestionForm({ question, onSave, pending, error, submitLabel }) {
    const [title, setTitle] = useState(question?.title ?? '')
    const [category, setCategory] = useState(question?.category ?? '')
    const [errors, setErrors] = useState({})

    function handleSubmit(event) {
        event.preventDefault()
        if (pending) return

        const nextErrors = {}
        if (!title.trim()) nextErrors.title = '질문 제목을 입력해주세요.'
        if (!category.trim()) nextErrors.category = '분류를 입력해주세요.'
        setErrors(nextErrors)
        if (Object.keys(nextErrors).length > 0) return

        onSave({ title: title.trim(), category: category.trim() })
    }

    return (
        <form className="question-form" onSubmit={handleSubmit} noValidate aria-busy={pending}>
            <div>
                <label htmlFor="title">질문 제목 (필수)</label>
                <input
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    disabled={pending}
                    required
                    aria-invalid={Boolean(errors.title)}
                    aria-describedby={errors.title ? 'title-error' : undefined}
                />
                {errors.title && <p id="title-error" role="alert">{errors.title}</p>}
            </div>
            <div>
                <label htmlFor="category">분류 (필수)</label>
                <input
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    disabled={pending}
                    required
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={errors.category ? 'category-error' : undefined}
                />
                {errors.category && <p id="category-error" role="alert">{errors.category}</p>}
            </div>
            {error && (
                <QuestionState kind="error" title="저장하지 못했어요.">{error}</QuestionState>
            )}
            <button type="submit" disabled={pending}>
                {pending ? '저장 중…' : submitLabel}
            </button>
            {pending && <p role="status">질문을 저장하고 있어요. 잠시 기다려주세요.</p>}
        </form>
    )
}

export default QuestionForm
