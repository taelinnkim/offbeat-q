import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

function AboutPage() {
    return (
        <>
            <PageHeader title="딴질문 소개" subtitle="엉뚱한 질문, 뜻밖의 과학." />
            <section className="question-card about-content">
                <h2>질문에서 시작하는 과학 탐험</h2>
                <p>
                    딴질문은 엉뚱한 과학 질문을 모아 검색하고 등록·수정·삭제하는
                    React 학습 프로젝트입니다.
                </p>
                <p>
                    컴포넌트와 라우팅, 상태 관리, 비동기 요청을 연결하며
                    사용자 이벤트가 화면의 변화로 이어지는 과정을 배웁니다.
                    질문은 Supabase 데이터베이스에 저장됩니다.
                </p>
                <p>
                    로그인 없이 누구나 질문을 조회하고 등록·수정·삭제할 수 있는 과제용 데모입니다.
                </p>
                <Link to="/questions" className="question-action">질문 둘러보기</Link>
            </section>
        </>
    )
}

export default AboutPage
