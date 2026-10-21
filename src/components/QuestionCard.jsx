import { Link } from 'react-router-dom'

function QuestionCard({ id, title, category }) {
  return (
    <article className="question-card">
      <span>{category}</span>
      <h3>
        <Link to={`/questions/${id}`}>
          {title}
        </Link>
      </h3>
    </article>
  )
}

export default QuestionCard