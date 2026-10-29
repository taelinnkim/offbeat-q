import { useEffect, useState } from 'react'
import { supabase, supabaseConfigError } from '../lib/supabase'

const columns = 'id, title, category, created_at'
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// id가 null이면 목록, 문자열이면 해당 질문 한 건을 조회합니다.
function useQuestionQuery(id) {
    const [attempt, setAttempt] = useState(0)
    const [result, setResult] = useState(null)
    const requestKey = `${id ?? 'list'}:${attempt}`

    useEffect(() => {
        if (!supabase) return

        const controller = new AbortController()
        let active = true
        const timeout = setTimeout(() => controller.abort(), 15000)

        async function load() {
            try {
                if (id !== null && !uuidPattern.test(id)) {
                    if (active) setResult({ requestKey, data: null, error: '' })
                    return
                }

                const query = supabase.from('questions').select(columns)
                const { data, error } = await (id === null
                    ? query.order('created_at', { ascending: false })
                    : query.eq('id', id).maybeSingle()
                ).abortSignal(controller.signal)

                if (error) throw error
                if (active) setResult({ requestKey, data, error: '' })
            } catch {
                if (active) {
                    setResult({
                        requestKey,
                        data: null,
                        error: '질문을 불러오지 못했어요. 네트워크 연결과 Supabase 조회 권한을 확인한 뒤 다시 시도해주세요.',
                    })
                }
            } finally {
                clearTimeout(timeout)
            }
        }

        load()
        return () => {
            active = false
            controller.abort()
            clearTimeout(timeout)
        }
    }, [id, requestKey])

    // 다른 id로 이동하거나 재시도할 때 이전 요청의 결과를 표시하지 않습니다.
    const current = result?.requestKey === requestKey ? result : null
    return {
        data: current?.data ?? null,
        loading: !supabaseConfigError && !current,
        error: supabaseConfigError || current?.error || '',
        retry: () => setAttempt((previous) => previous + 1),
    }
}

export function useQuestions() {
    const { data, ...state } = useQuestionQuery(null)
    return { questions: data ?? [], ...state }
}

export function useQuestion(id) {
    const { data, ...state } = useQuestionQuery(id)
    return { question: data, ...state }
}
