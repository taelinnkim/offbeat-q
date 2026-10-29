import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

let supabase = null
let supabaseConfigError = ''

if (!url || !key) {
    supabaseConfigError = '프로젝트 최상위 .env.local에 VITE_SUPABASE_URL과 VITE_SUPABASE_PUBLISHABLE_KEY를 설정한 뒤 개발 서버를 다시 시작해주세요.'
} else {
    try {
        const parsedUrl = new URL(url)
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
            throw new Error('Invalid protocol')
        }
        supabase = createClient(url, key)
    } catch {
        supabaseConfigError = 'Supabase 연결 설정을 확인해주세요. .env.local의 URL과 공개 키를 확인한 뒤 개발 서버를 다시 시작해주세요.'
    }
}

export { supabase, supabaseConfigError }
