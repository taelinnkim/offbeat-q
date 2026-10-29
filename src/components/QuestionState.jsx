import Button from './Button'
function QuestionState({ kind = 'empty', title, children, onRetry }) {
    return (
        <section
            className={`question-card question-state question-state-${kind}`}
            role={kind === 'error' ? 'alert' : 'status'}
            aria-busy={kind === 'loading'}
        >
            <h2>{title}</h2>
            {children && <p>{children}</p>}
            {onRetry && (
                <Button type="button" onClick={onRetry}>
                    다시 시도
                </Button>
            )}
        </section>
    )
}

export default QuestionState
