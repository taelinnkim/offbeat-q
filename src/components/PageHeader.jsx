import { Link } from 'react-router-dom'

function PageHeader({ title, subtitle, description, backTo, backLabel = '← 목록으로 돌아가기' }) {
    return (
        <header className="page-header">
            {backTo && <Link to={backTo} className="back-link">{backLabel}</Link>}
            <h1>{title}</h1>
            {subtitle && <h2>{subtitle}</h2>}
            {description && <p>{description}</p>}
        </header>
    )
}

export default PageHeader
