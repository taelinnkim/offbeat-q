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
                <button type="button" className="question-action" onClick={onRetry}>
                    다시 시도
                </button>
            )}
        </section>
    )
}

export default QuestionState
