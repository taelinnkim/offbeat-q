import { Link, NavLink } from 'react-router-dom'

function AppLayout({ children }) {
    return (
        <>
            <header className="site-header">
                <div className="site-header-inner">
                    <Link to="/questions" className="site-brand">딴질문</Link>
                    <nav aria-label="주요 메뉴" className="site-nav">
                        <NavLink to="/questions" end>질문 목록</NavLink>
                        <NavLink to="/questions/new">질문 등록</NavLink>
                        <NavLink to="/about">소개</NavLink>
                    </nav>
                </div>
            </header>
            <main className="app">{children}</main>
        </>
    )
}

export default AppLayout
