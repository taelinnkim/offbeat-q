import assert from 'node:assert/strict'
import { Buffer } from 'node:buffer'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const toModuleUrl = (source) => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`
// 실제 SDK에 응답만 주입합니다. 환경변수와 원격 DB에는 접근하지 않습니다.
const clientUrl = toModuleUrl(`
    import { createClient } from ${JSON.stringify(import.meta.resolve('@supabase/supabase-js'))}
    export const requests = []
    export const responses = []
    export const supabaseConfigError = ''
    export const supabase = createClient('https://example.supabase.co', 'test-placeholder', {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { fetch: async (url, options) => {
            requests.push({ url: String(url), ...options })
            const next = responses.shift()
            if (!next) throw new Error('Unexpected request')
            if (next.networkError) throw new Error('Simulated connection failure')
            return new Response(JSON.stringify(next.body), {
                status: next.status ?? 200,
                headers: { 'Content-Type': 'application/json' },
            })
        } },
    })
`)
const { requests, responses } = await import(clientUrl)
const source = (await readFile(new URL('../src/lib/questionMutations.js', import.meta.url), 'utf8'))
    .replace("'./supabase'", JSON.stringify(clientUrl))
const { createQuestion, updateQuestion, deleteQuestion } = await import(toModuleUrl(source))
const id = '11111111-1111-4111-8111-111111111111'
const row = { id, title: '새 제목', category: '과학', created_at: '2026-01-01T00:00:00Z' }

function respond(body, status) {
    requests.length = 0
    responses.push({ body, status })
}

await test('등록: DB의 id를 반환하고 자동 생성 필드는 전송하지 않는다', async () => {
    respond(row, 201)
    const result = await createQuestion({ title: ' 새 제목 ', category: ' 과학 ', id: 'ignored' })
    assert.equal(result.id, id)
    assert.equal(requests.length, 1)
    assert.equal(requests[0].method, 'POST')
    assert.deepEqual(JSON.parse(requests[0].body), { title: '새 제목', category: '과학' })
    assert.match(new Headers(requests[0].headers).get('Prefer'), /return=representation/)
})

await test('수정: 해당 id로만 요청하고 반환된 행을 확인한다', async () => {
    respond([row])
    assert.equal((await updateQuestion(id, row)).id, id)
    assert.equal(requests.length, 1)
    assert.equal(requests[0].method, 'PATCH')
    assert.equal(new URL(requests[0].url).searchParams.get('id'), `eq.${id}`)
    assert.deepEqual(JSON.parse(requests[0].body), { title: row.title, category: row.category })
})

await test('삭제: 해당 id로만 요청하고 삭제한 행을 확인한다', async () => {
    respond([{ id }])
    assert.equal((await deleteQuestion(id)).id, id)
    assert.equal(requests.length, 1)
    assert.equal(requests[0].method, 'DELETE')
    assert.equal(new URL(requests[0].url).searchParams.get('id'), `eq.${id}`)
    assert.equal(new URL(requests[0].url).searchParams.get('select'), 'id')
})

for (const [name, action] of [
    ['수정', () => updateQuestion(id, row)],
    ['삭제', () => deleteQuestion(id)],
]) {
    await test(`${name}: 0행 처리 시 성공하지 않는다`, async () => {
        respond([])
        await assert.rejects(action, /이미 삭제되었거나 처리 권한/)
    })
    await test(`${name}: 다른 id가 반환되면 성공하지 않는다`, async () => {
        respond([{ ...row, id: 'different-id' }])
        await assert.rejects(action, /변경하지 못했어요/)
    })
}

await test('권한 오류 시 성공하지 않는다', async () => {
    respond({ code: '42501', message: 'permission denied' }, 403)
    await assert.rejects(() => createQuestion(row), /요청 결과를 확인하지 못했어요/)
})

await test('네트워크 실패 시 성공하지 않는다', async () => {
    requests.length = 0
    responses.push({ networkError: true })
    await assert.rejects(() => createQuestion(row), /요청 결과를 확인하지 못했어요/)
    assert.equal(requests.length, 1)
})
