import PageHeader from '../components/PageHeader'

function NotFoundPage() {
    return (
        <PageHeader
            title="페이지를 찾을 수 없어요."
            description="주소를 확인하거나 질문 목록으로 돌아가주세요."
            backTo="/questions"
        />
    )
}

export default NotFoundPage
