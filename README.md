# MARIORAK Portal

마리오락 - 내 취향에 맞는 팝업스토어를 만나는 공간

전시/팝업스토어 예약 서비스 앱입니다.

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Build/Setup](#buildsetup)
- [Development Environment](#development-environment)
- [License](#license)

## Features

- **메인 홈**: POP-UP STORE / Exhibitions 목록 조회, 북마크 기능
- **팝업 스토어 상세**: 이미지/정보/굿즈 탭, 북마크, 예약 바로가기
- **기획전시 상세**: 이미지/정보/전시물 탭, 북마크, 예약 바로가기
- **예약하기**: 캘린더 기반 날짜 선택 + 타임피커
- **나의 활동**: 프로필, 나의 예약/나의 북마크 바로가기, 뱃지 그리드
- **나의 예약**: QR코드 티켓 카드 리스트, 소팅 기능
- **나의 북마크**: POP-UP STORE / Exhibitions 북마크 리스트
- **설정**: 계정관리, 알림관리, 언어설정, 이용약관
- **알림**: 알림 목록/상세
- **인증**: SNS 소셜 로그인 (Google, Naver, Kakao, Apple)

## Folder Structure

```
src/
├── App.vue                          # 최상위 컴포넌트 (하단 2탭 네비게이션 포함)
├── assets/                          # 이미지, 폰트, CSS 등 정적 파일
├── boot/                            # Quasar 초기 실행 시 사용되는 파일
│   ├── axios.ts                     # Axios 설정
│   ├── boot-common.ts               # 공통 초기화
│   ├── i18n.ts                      # 다국어 초기화
│   ├── html-filter.ts               # HTML 필터
│   └── yup.ts                       # 유효성 검증 설정
├── components/
│   ├── common/                      # 공통 UI 컴포넌트
│   │   ├── dialog/                  # 다이얼로그
│   │   ├── form/                    # 폼 (버튼, 인풋, 셀렉트 등)
│   │   ├── layout/                  # 레이아웃 (캐러셀, 페이지네이션 등)
│   │   ├── text/                    # 텍스트 (타이틀, 아이콘 등)
│   │   └── card/                    # 카드 컴포넌트
│   ├── popup-store/                 # 팝업스토어 관련 컴포넌트
│   ├── exhibition/                  # 기획전시 관련 컴포넌트
│   ├── reservation/                 # 예약 관련 컴포넌트
│   ├── bookmark/                    # 북마크 관련 컴포넌트
│   ├── badge/                       # 뱃지 관련 컴포넌트
│   └── notification/                # 알림 관련 컴포넌트
├── composables/
│   ├── domain/                      # 도메인별 API 통신 Composable
│   │   ├── popup-store.ts           # 팝업스토어 API
│   │   ├── exhibition.ts            # 기획전시 API
│   │   ├── reservation.ts           # 예약 API
│   │   ├── bookmark.ts              # 북마크 API
│   │   ├── badge.ts                 # 뱃지 API
│   │   ├── auth.ts                  # 인증 API
│   │   ├── user.ts                  # 사용자 API
│   │   ├── notification.ts          # 알림 API
│   │   ├── common.ts                # 공통코드 API
│   │   ├── faq.ts                   # FAQ API
│   │   ├── notice.ts                # 공지사항 API
│   │   └── terms.ts                 # 이용약관 API
│   ├── form/                        # useForm 관련 Composable
│   ├── init/                        # 초기화 Composable
│   ├── useBridge.ts                 # 네이티브 브릿지 함수
│   ├── useDialog.ts                 # 다이얼로그 관련 함수
│   └── useSearchFilter.ts           # 검색 필터 함수
├── css/                             # 글로벌 CSS
├── i18n/                            # 다국어 지원 (ko, en, ja, zh)
├── layouts/
│   ├── MainLayout.vue               # 메인 레이아웃
│   ├── SubLayout.vue                # 서브 레이아웃 (뒤로가기 + 타이틀)
│   ├── DefaultLayout.vue            # 기본 레이아웃
│   ├── MainHeader.vue               # 메인 헤더 (MARIORAK 로고 + 알림 + 설정)
│   └── SubHeader.vue                # 서브 헤더 (뒤로가기 + 타이틀)
├── pages/
│   ├── MainPage.vue                 # 메인 홈 (POP-UP STORE + Exhibitions)
│   ├── popup-store/
│   │   ├── PopupStoreDetail.vue     # 팝업스토어 상세
│   │   └── PopupStoreReserve.vue    # 팝업스토어 예약
│   ├── exhibition/
│   │   ├── ExhibitionDetail.vue     # 기획전시 상세
│   │   └── ExhibitionReserve.vue    # 기획전시 예약
│   ├── my-page/
│   │   ├── MPMainPage.vue           # 나의 활동 메인
│   │   ├── ReservationList.vue      # 나의 예약
│   │   ├── BookmarkList.vue         # 나의 북마크
│   │   └── BadgeList.vue            # 나의 뱃지
│   ├── settings/
│   │   ├── SettingsMain.vue         # 설정 메인
│   │   ├── AccountManage.vue        # 계정관리
│   │   ├── NotificationManage.vue   # 알림관리
│   │   ├── LanguageSetting.vue      # 언어설정
│   │   └── TermsManage.vue          # 이용약관
│   ├── notification/
│   │   ├── NotificationList.vue     # 알림 목록
│   │   └── NotificationDetail.vue   # 알림 상세
│   ├── auth/                        # 인증 (로그인, 회원가입 등)
│   ├── policy/                      # 정책 (약관, 개인정보 등)
│   └── error/                       # 에러 페이지
├── router/
│   ├── index.ts                     # 라우터 설정
│   ├── router-util.ts               # 라우터 유틸 함수
│   └── routes.ts                    # 라우트 정의
├── services/
│   ├── api.ts                       # API 서비스 (Axios + TanStack Query)
│   └── error-handler.ts             # 에러 핸들러
├── stores/                          # Pinia 스토어
├── types/
│   ├── popup-store/                 # 팝업스토어 타입
│   ├── exhibition/                  # 기획전시 타입
│   ├── reservation/                 # 예약 타입
│   ├── bookmark/                    # 북마크 타입
│   ├── badge/                       # 뱃지 타입
│   ├── auth/                        # 인증 타입
│   ├── common/                      # 공통 타입
│   └── util/                        # 유틸 타입
└── utils/                           # 유틸리티 함수
```

## Installation

### Prerequisites

- Node.js (v18 이상)
- yarn

## Build/Setup

### 개발 환경에서 실행

```bash
# 패키지 설치
yarn install

# 로컬 개발 서버 실행
yarn dev

# 빌드
yarn build:dev   # 개발 환경
yarn build:stg   # 스테이징 환경
yarn build:prd   # 운영 환경
```

빌드된 파일은 `/dist/spa` 폴더에 저장됩니다.

## Development Environment

| 항목 | 기술 |
| --- | --- |
| 프레임워크 | Quasar v2 + Vue 3 |
| 언어 | TypeScript |
| 빌드 도구 | Vite |
| 상태 관리 | Pinia + pinia-plugin-persistedstate |
| 서버 상태 관리 | TanStack Query (vue-query) |
| 라우터 | Vue Router |
| HTTP 클라이언트 | Axios |
| 폼 검증 | Vee-validate + Yup |
| 스타일링 | Tailwind CSS + SCSS |
| 다국어 | Vue I18n |
| UI 컴포넌트 | Quasar Components, Radix Vue |

## License

Private
