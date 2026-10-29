function Button({ type = 'button', className = '', children, ...props }) {
    return (
        <button type={type} className={`question-action ${className}`.trim()} {...props}>
            {children}
        </button>
    )
}

export default Button
