function FormField({ id, label, error, 'aria-describedby': describedBy, ...inputProps }) {
    const errorId = `${id}-error`
    const descriptionIds = [describedBy, error ? errorId : null].filter(Boolean).join(' ')

    return (
        <div className="form-field">
            <label htmlFor={id}>{label}</label>
            <input
                {...inputProps}
                id={id}
                aria-invalid={error ? true : undefined}
                aria-describedby={descriptionIds || undefined}
            />
            {error && <p id={errorId} role="alert">{error}</p>}
        </div>
    )
}

export default FormField
