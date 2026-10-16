function QuestionCard({ title, category }) {
  return (
    <article className="question-card">
      <span>{category}</span>
      <h3>{title}</h3>
    </article>
  )
}

export default QuestionCard