import FormField from '../components/FormField'
import PageHeader from '../components/PageHeader'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard'
import { useQuestions } from '../hooks/useQuestions'
import QuestionState from '../components/QuestionState'

function QuestionListPage() {
    const { questions, loading, error, retry } = useQuestions()
    const [selectedCategory, setSelectedCategory] = useState('')
    const [search, setSearch] = useState("")

    const categories = [...new Set(
        questions.map((question) => question.category)
            .filter((category) => typeof category === 'string' && category.trim() !== '')
    )]

    const visibleQuestions = questions.filter((question) => {
        const matchesCategory =
            selectedCategory === '' || question.category === selectedCategory

        const matchesSearch =
            (question.title ?? '').includes(search.trim())

        return matchesCategory && matchesSearch
    })

    return (
        <>
            <PageHeader
                title="딴질문"
                subtitle="엉뚱한 질문, 뜻밖의 과학."
                description="엉뚱한 질문을 따라 과학을 탐험하고, 익숙한 세계를 새롭게 바라봅니다."
            />

            <section className="questions-section">
                <h2>질문 모아보기</h2>

                <Link to="/questions/new" className="new-question-button">
                    + 질문 등록
                </Link>

                {!loading && !error && (
                    <>
                        <FormField
                            id="question-search"
                            label="질문 검색"
                            type="search"
                            placeholder="검색어를 입력하세요"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />

                        <div className="category-filter">
                            <label htmlFor="question-category">분류별 보기</label>
                            <select
                                id="question-category"
                                value={selectedCategory}
                                onChange={(event) => setSelectedCategory(event.target.value)}
                            >
                                <option value="">전체</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <p className="question-count">질문 {visibleQuestions.length}개</p>

                        {visibleQuestions.length === 0 ? (
                            <QuestionState title={questions.length === 0 ? "등록된 질문이 없어요." : "조건에 맞는 질문이 없어요."}>
                                {questions.length === 0 ? "아직 조회할 질문이 없습니다." : "검색어나 필터를 바꿔보세요."}
                            </QuestionState>
                        ) : (
                            visibleQuestions.map((question) => (
                                <QuestionCard
                                    key={question.id}
                                    id={question.id}
                                    title={question.title}
                                    category={question.category}
                                />
                            ))
                        )}
                    </>
                )}
                {loading && <QuestionState kind="loading" title="질문 목록을 불러오는 중이에요." />}
                {error && (
                    <QuestionState kind="error" title="질문 목록을 불러올 수 없어요." onRetry={retry}>
                        {error}
                    </QuestionState>
                )}
            </section>
        </>
    )
}

export default QuestionListPage
