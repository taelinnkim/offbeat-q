import { useEffect, useRef, useState } from 'react'

function useQuestionMutation(action) {
    const [pending, setPending] = useState(false)
    const [error, setError] = useState('')
    const locked = useRef(false)
    const mounted = useRef(false)

    useEffect(() => {
        mounted.current = true
        return () => { mounted.current = false }
    }, [])

    async function mutate(...args) {
        // 다시 렌더링되기 전의 연속 호출도 막습니다.
        if (locked.current) return null
        locked.current = true
        setPending(true)
        setError('')
        try {
            const row = await action(...args)
            return mounted.current ? row : null
        } catch (error) {
            if (mounted.current) {
                setError(error instanceof Error ? error.message : '처리에 실패했어요. 다시 확인해주세요.')
            }
            return null
        } finally {
            locked.current = false
            if (mounted.current) setPending(false)
        }
    }

    return { mutate, pending, error }
}

export default useQuestionMutation
