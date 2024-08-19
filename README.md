# CCF-portal

CCF 포털 프로젝트입니다.

## Table of Contents

- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Build/Setup](#buildsetup)
- [Development Environment](#development-environment)
- [Contributing](#contributing)
- [License](#license)

## Folder Structure

```
├── App.vue
├── assets
├── boot
│   ├── axios.ts
│   └── ....
├── components
│   ├── common
│   │   ├── dialog
│   │   ├── form
│   │   ├── layout
│   │   └── text
│   ├── main
│   └── ...
├── composables
│   ├── domain
│   ├── form
│   ├── init
│   ├── temp
│   ├── useBridge.ts
│   ├── useDialog.ts
│   └── useSearchFilter.ts
├── css
├── i18n
├── layouts
├── pages
│   └── auth
├── quasar.d.ts
├── router
│   ├── index.ts
│   ├── router-util.ts
│   └── routes.ts
├── services
│   ├── api.ts
│   └── error-handler.ts
├── stores
├── types
└── utils
```

| Path                             | Description                                      |
| -------------------------------- | ------------------------------------------------ |
| `App.vue`                        | 최상위 컴포넌트                                  |
| `assets/`                        | 이미지, 폰트, CSS 등 정적 파일                   |
| `boot/`                          | Quasar 초기 실행 시 사용되는 파일                |
| `boot/axios.ts`                  | Axios 설정 파일                                  |
| `components/`                    | 재사용 가능한 UI 컴포넌트                        |
| `components/common/`             | 공통 컴포넌트                                    |
| `components/common/dialog/`      | 다이얼로그 컴포넌트                              |
| `components/common/form/`        | 폼 컴포넌트                                      |
| `components/common/layout/`      | 레이아웃 관련 컴포넌트                           |
| `components/common/text/`        | 텍스트 관련 컴포넌트                             |
| `components/main/`               | 각 페이지별 컴포넌트 (1depth 페이지별 폴더 생성) |
| `composables/`                   | Composable 함수들                                |
| `composables/domain/`            | 서버와 통신하는 Composable 함수 (API 도메인별)   |
| `composables/form/`              | useForm 관련 Composable 함수                     |
| `composables/init/`              | 초기화 Composable (삭제 예정)                    |
| `composables/temp/`              | 임시 파일 (삭제 예정)                            |
| `composables/useBridge.ts`       | 네이티브 연결 브릿지 함수                        |
| `composables/useDialog.ts`       | 다이얼로그 관련 함수                             |
| `composables/useSearchFilter.ts` | 검색 필터 관련 함수                              |
| `css/`                           | CSS 파일 모음                                    |
| `i18n/`                          | 다국어 지원 관련 파일                            |
| `layouts/`                       | 레이아웃 컴포넌트                                |
| `pages/`                         | 각 페이지 컴포넌트                               |
| `pages/auth/`                    | 인증 관련 페이지 컴포넌트                        |
| `quasar.d.ts`                    | Quasar 타입 정의 파일                            |
| `router/`                        | 라우팅 관련 함수 및 설정                         |
| `router/index.ts`                | 라우터 설정 파일                                 |
| `router/router-util.ts`          | 라우터 이동 함수                                 |
| `router/routes.ts`               | 라우트 정의 파일                                 |
| `services/`                      | 서비스 레이어 (API 통신 등)                      |
| `services/api.ts`                | Axios 인스턴스 생성 파일                         |
| `services/error-handler.ts`      | 에러 핸들러 함수                                 |
| `stores/`                        | Vuex 스토어 관련 파일                            |
| `types/`                         | 타입 정의 파일                                   |
| `utils/`                         | 유틸리티 함수 모음                               |

## Installation

### Prerequisites

- Node.js (version X.X.X 이상)
- npm 또는 yarn (npm version X.X.X 이상)

## Build/Setup

### 개발 환경에서 실행

프로젝트를 개발 환경에서 실행하려면 다음 명령어를 사용합니다:

```bash
yarn install

//실행
yarn dev // or yarn dev2 dto 업데이트가 없었을시

//빌드
yarn build //빌드된 파일은 /dist 폴더에 저장됩니다.
```

### Development Environment

프레임워크: Quasar
언어: TypeScript
상태 관리: pinia
라우터: Vue Router
HTTP 클라이언트: Axios
검증: Vee-validate
국제화: Vue I18n
주요 라이브러리 : vue-query
기타 개발 환경 관련 설정은 추후 기재 예정

### License
