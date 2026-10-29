import { supabase, supabaseConfigError } from './supabase'

const columns = 'id, title, category, created_at'

function getClient() {
    if (!supabase) throw new Error(supabaseConfigError)
    return supabase
}

// 0행 처리도 성공으로 보지 않도록 DB가 반환한 행을 확인합니다.
function requireRow(data, id) {
    if (!data?.id || (id && data.id !== id)) {
        throw new Error('질문이 이미 삭제되었거나 처리 권한이 없어 변경하지 못했어요. 질문을 다시 확인해주세요.')
    }
    return data
}

async function execute(query, id) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    const failureMessage = '요청 결과를 확인하지 못했어요. 연결 상태와 접근 권한을 확인해주세요. 다시 시도하기 전에 목록이나 상세에서 반영 여부를 확인해주세요.'
    let response
    try {
        response = await query.abortSignal(controller.signal)
    } catch {
        throw new Error(failureMessage)
    } finally {
        clearTimeout(timeout)
    }
    if (response.error) throw new Error(failureMessage)
    return requireRow(response.data, id)
}

export async function createQuestion(values) {
    // id와 created_at은 보내지 않고 DB 기본값을 사용합니다.
    const query = getClient().from('questions')
        .insert({ title: values.title.trim(), category: values.category.trim() })
        .select(columns).single()
    return execute(query)
}

export async function updateQuestion(id, values) {
    const query = getClient().from('questions')
        .update({ title: values.title.trim(), category: values.category.trim() })
        .eq('id', id).select(columns).maybeSingle()
    return execute(query, id)
}

export async function deleteQuestion(id) {
    const query = getClient().from('questions')
        .delete().eq('id', id).select('id').maybeSingle()
    return execute(query, id)
}
