# 딴질문 (offbeat-q)

**엉뚱한 질문, 뜻밖의 과학.**

과학 질문을 모아 검색하고 등록·수정·삭제하는 React 학습 프로젝트입니다.
라우팅, 컴포넌트, 상태, 이벤트, 비동기 요청이 화면 변화로 이어지는 과정을 구현합니다.
데이터는 로컬 배열 대신 Supabase의 `public.questions`에 저장합니다.

이 프로젝트는 **로그인 없이 누구나 모든 질문을 조회·등록·수정·삭제할 수 있는 과제용 데모**입니다.
다른 사람이 작성한 질문도 수정·삭제할 수 있으므로 개인정보나 비공개 데이터를 입력하지 마세요.

## 주요 기능과 페이지

| 경로 | 기능 |
| --- | --- |
| `/questions` | 원격 질문 목록, 검색, 분류별 필터(전체 포함) |
| `/questions/new` | 질문 등록, 필수값 검증 |
| `/questions/:id` | id로 질문 조회, 삭제 전 확인 |
| `/questions/:id/edit` | 원격 조회 후 기존 값 표시, 질문 수정 |
| `/about` | 프로젝트 소개 |

`/`는 `/questions`로 리다이렉트합니다. 그 외 주소는 Not Found 페이지를 표시합니다.
모든 페이지에 질문 목록·질문 등록·소개로 이동하는 공통 헤더가 적용됩니다.

- 로딩·에러·빈 상태와 조회 재시도를 공통 UI로 제공합니다.
- 저장·삭제 중 중복 요청을 막고 진행 상태를 표시합니다.
- 실패하면 입력값을 유지하고 에러를 표시합니다.
- DB가 반환한 행을 확인한 뒤 상세 또는 목록으로 이동합니다.
- 등록 시 `id`와 `created_at`은 DB가 생성합니다.

## 기술 스택

- JavaScript, React 19, React DOM
- React Router 7 (`BrowserRouter` 기반 SPA)
- Supabase JavaScript SDK 2, PostgreSQL, Row Level Security (RLS)
- Vite 8, 순수 CSS, ESLint
- Node.js 내장 테스트 러너 (`node:test`)

## 로컬 설치 및 실행

Node.js 22.12 이상(22 계열) 또는 24 계열과 npm을 준비합니다.
저장소를 내려받은 뒤 `package.json`이 있는 폴더에서 실행합니다.

```bash
npm ci
```

아래 Supabase 및 환경변수 설정을 완료한 뒤 개발 서버를 실행합니다.
터미널에 표시된 로컬 URL로 접속하세요.

```bash
npm run dev
```

프로덕션 빌드와 린트:

```bash
npm run build
npm run lint
```

빌드 결과는 `dist/`에 생성됩니다. 로컬 빌드 미리보기:

```bash
npm run preview
```

원격 DB를 변경하지 않는 CRUD 응답 테스트:

```bash
node --test tests/questionMutations.test.js
```

## Supabase 설정

1. 과제용 Supabase 프로젝트를 준비합니다.
2. SQL Editor에서 [supabase/schema.sql](supabase/schema.sql)의 내용을 실행합니다.
3. 프로젝트의 API 설정에서 Project URL과 publishable key를 확인해 아래 환경변수에 저장합니다.

SQL 파일은 다음 테이블, `anon` 역할의 CRUD 권한, 명령별 RLS 정책을 생성합니다.
로그인 기능은 구현하지 않으며 공개 키를 사용하는 비로그인 요청이 `anon` 정책을 적용받습니다.

| 열 | 타입 | 기본값 / 제약 |
| --- | --- | --- |
| `id` | `uuid` | 기본 키, `gen_random_uuid()` |
| `title` | `text` | 필수, 공백만 입력 불가 |
| `category` | `text` | 필수, 공백만 입력 불가 |
| `created_at` | `timestamptz` | `now()` |

SQL은 기존 행을 삭제하지 않습니다. 동일 이름의 데모 정책은 다시 생성합니다.
기존 테이블의 구조와 다른 이름의 정책은 자동으로 변경하지 않으므로,
처음 재현할 때는 새로운 과제용 프로젝트를 사용하는 것이 명확합니다.
현재 프로젝트에 이미 동일 구조와 정책이 있다면 설정을 확인하고 사용하면 됩니다.

정책 작성 참고: [Supabase 공식 RLS 문서](https://supabase.com/docs/guides/database/postgres/row-level-security).

## 환경변수

프로젝트 최상위(`package.json`과 같은 위치)에 `.env.local`을 만들고 아래 두 항목에
본인 프로젝트의 값을 입력합니다. 아래 예시는 변수 이름만 표시하며 실제 키를 포함하지 않습니다.

```dotenv
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

- 설정을 변경했다면 개발 서버를 다시 시작합니다.
- `.env`, `.env.*`는 `.gitignore`에 등록되어 있습니다. 실제 값이 있는 파일을 커밋하지 않습니다.
- 브라우저용 publishable key만 사용합니다. `service_role` 키나 secret key는 사용하지 않습니다.
- `VITE_` 환경변수는 클라이언트 빌드에 포함되며, 데이터 접근 범위는 DB 권한과 RLS 정책이 결정합니다.
- 환경변수가 없거나 잘못되면 흰 화면 대신 설정 안내를 표시합니다.

## 코드 구조와 상태 흐름

```text
src/
  pages/       # 목록·상세·등록·수정·소개·Not Found
  components/  # 공통 레이아웃, 버튼, 입력 필드, 폼, 카드, 상태 UI
  hooks/       # useQuestions, useQuestion, useQuestionMutation
  lib/         # Supabase 클라이언트와 원격 변경 요청
supabase/
  schema.sql   # 테이블, 권한, 과제용 공개 CRUD 정책
```

- 검색·필터 상태는 목록 페이지, 입력·검증 상태는 `QuestionForm`에 둡니다.
- 조회 결과와 로딩·에러 상태는 조회 훅, 저장·삭제 상태는 변경 훅에 둡니다.
- 페이지는 조회한 데이터와 콜백을 props로 UI 컴포넌트에 전달합니다.
- 조회 훅의 `useEffect`는 질문 id 또는 재시도 번호가 바뀔 때 요청하고, 정리 함수에서 이전 요청을 취소합니다.
- 조회한 질문의 `category`에서 중복을 제거해 분류 선택지를 만들고 검색 조건과 함께 적용합니다.
- 검색 입력 → `search` 변경 → 카드와 개수 변경, 분류 선택 → `selectedCategory` 변경 → 목록 변경,
  제출 → 검증 오류 또는 `pending` 변경 → 오류 안내 또는 버튼 비활성화로 이어집니다.

재사용 UI는 `QuestionCard`, `QuestionForm`, `QuestionState`, `QuestionActions`,
`Button`, `FormField`, `PageHeader`, `AppLayout`의 8개입니다.

## 배포 시 확인할 사항

배포 주소: [딴질문 서비스](https://offbeat-q.vercel.app)

호스팅 설정에서 빌드 명령은 `npm run build`, 출력 폴더는 `dist`를 사용합니다.
두 환경변수는 로컬 파일 업로드 대신 호스팅 대시보드에 별도로 등록하고 다시 빌드합니다.

`BrowserRouter`를 사용하므로 실제 정적 파일 요청을 제외한 앱 경로가 `index.html`을 반환하도록
호스팅의 SPA fallback/rewrite를 설정해야 합니다.
배포 후 `/about`, 질문 상세·수정 주소의 직접 접속과 새로고침, 원격 CRUD를 확인합니다.
환경변수 누락 안내가 표시되는 상태는 정상 배포 완료로 보지 않습니다.

소스 코드: [GitHub 저장소](https://github.com/taelinnkim/offbeat-q)
