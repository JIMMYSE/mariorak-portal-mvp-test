import { RouteRecordRaw } from 'vue-router';
// layout
import DefaultLayout from 'layouts/DefaultLayout.vue';
import MainLayout from 'layouts/MainLayout.vue';
import SubLayout from 'layouts/SubLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'main' },
    children: [
      {
        path: '/home',
        name: 'main',
        meta: {
          requiresAuth: true,
        },
        component: MainLayout,
        children: [
          {
            path: '',
            name: 'home-main',
            component: () => import('pages/MainPage.vue'),
          },
        ],
      },
      {
        path: 'game-pack',
        meta: {
          requiresAuth: true,
        },
        component: MainLayout,
        children: [
          {
            path: '',
            name: 'game-pack-main',
            meta: {
              title: '게임팩',
              bgColor: 'white',
              faqCategory: '게임팩',
            },
            component: () => import('src/pages/game-pack/GPMainPage.vue'),
          },
          // 게임 목록/상세
          {
            path: 'game/list',
            name: 'game-list',
            meta: {
              title: '게임 목록',
              bgColor: 'white',
              faqCategory: '게임팩>게임',
            },
            component: () => import('pages/game-pack/game/GameList.vue'),
          },
          {
            path: 'game/:id',
            name: 'game-detail',
            meta: {
              title: '게임 상세',
              bgColor: 'white',
            },
            component: () => import('pages/game-pack/game/GameDetail.vue'),
          },
          {
            path: 'game/:id/board-edit',
            name: 'game-board-edit',
            meta: {
              title: '게시판 등록',
              bgColor: 'white',
            },
            component: () => import('pages/game-pack/GPBoardEdit.vue'),
          },
          {
            path: 'game/:id/:boardId',
            name: 'game-board-detail',
            meta: {
              title: '게시판 상세',
              bgColor: 'white',
            },
            component: () => import('pages/game-pack/GPBoardDetail.vue'),
          },
          // 프로젝트 목록/상세
          {
            path: 'project/list',
            name: 'project-list',
            meta: {
              title: '프로젝트 목록',
              bgColor: 'white',
              faqCategory: '게임팩>프로젝트',
            },
            component: () => import('pages/game-pack/project/ProjectList.vue'),
          },
          {
            path: 'project/:id',
            name: 'project-detail',
            meta: {
              title: '프로젝트 상세',
              bgColor: 'white',
            },
            component: () =>
              import('pages/game-pack/project/ProjectDetail.vue'),
          },
          {
            path: 'project/:id/board-edit',
            name: 'project-board-edit',
            meta: {
              title: '게시판 등록',
              bgColor: 'white',
            },
            component: () => import('pages/game-pack/GPBoardEdit.vue'),
          },
          {
            path: 'project/:id/:boardId',
            name: 'project-board-detail',
            meta: {
              title: '게시판 상세',
              bgColor: 'white',
            },
            component: () => import('pages/game-pack/GPBoardDetail.vue'),
          },
        ],
      },
      {
        path: 'notice',
        redirect: { name: 'notice-list' },
        meta: {
          requiresAuth: true,
        },
        component: SubLayout,
        children: [
          {
            path: 'list',
            name: 'notice-list',
            meta: {
              title: '공지사항',
              bgColor: 'white',
            },
            component: () => import('pages/notice/NoticeList.vue'),
          },
          {
            path: ':id',
            props: true,
            name: 'notice-detail',
            meta: {
              title: '공지사항',
              bgColor: 'white',
            },
            component: () => import('pages/notice/NoticeDetail.vue'),
          },
        ],
      },
      {
        path: 'profile',
        meta: {
          requiresAuth: true,
        },
        component: SubLayout,
        children: [
          {
            path: '',
            name: 'profile',
            meta: {
              title: '아바타',
            },
            component: () => import('pages/ProfilePage.vue'),
          },
        ],
      },
      // 입영안내
      {
        path: 'enrollment',
        meta: {
          requiresAuth: true,
        },
        component: SubLayout,
        children: [
          {
            path: 'IP',
            name: 'enrollment-ip',
            meta: {
              title: '모병 안내',
              enrollmentGuideCd: 'IP',
              bgColor: 'white',
            },
            component: () => import('pages/enrollment/EnrollmentGuide.vue'),
          },
          {
            path: 'EP',
            name: 'enrollment-ep',
            meta: {
              title: '입영 준비사항',
              enrollmentGuideCd: 'EP',
              bgColor: 'white',
            },
            component: () => import('pages/enrollment/EnrollmentGuide.vue'),
          },
          {
            path: 'EE',
            name: 'enrollment-ee',
            meta: {
              title: '입영행사 안내',
              enrollmentGuideCd: 'EE',
              bgColor: 'white',
            },
            component: () => import('pages/enrollment/EnrollmentGuide.vue'),
          },
          {
            path: 'CM',
            name: 'enrollment-cm',
            meta: {
              title: '임관식 안내',
              enrollmentGuideCd: 'CM',
              bgColor: 'white',
            },
            component: () => import('pages/enrollment/EnrollmentGuide.vue'),
          },
          {
            path: 'CP',
            name: 'enrollment-cp',
            meta: {
              title: '수료식 안내',
              enrollmentGuideCd: 'CP',
              bgColor: 'white',
            },
            component: () => import('pages/enrollment/EnrollmentGuide.vue'),
          },
          {
            path: 'TS',
            name: 'enrollment-ts',
            meta: {
              title: '찾아오는 법',
              enrollmentGuideCd: 'TS',
              bgColor: 'white',
            },
            component: () => import('pages/enrollment/EnrollmentGuide.vue'),
          },
          {
            path: 'faq',
            name: 'enrollment-faq',
            meta: {
              title: '자주 묻는 질문',
              bgColor: 'white',
            },
            component: () => import('pages/enrollment/EnrollmentFaq.vue'),
          },
        ],
      },
      // 훈련병
      {
        path: 'trainee',
        name: 'trainee',
        meta: {
          requiresAuth: true,
        },
        component: SubLayout,
        children: [
          {
            path: 'photo',
            name: 'photo',
            redirect: { name: 'trainee-photo-bookmark' },
            children: [
              {
                path: 'bookmark',
                name: 'trainee-photo-bookmark',
                meta: {
                  title: '사진보기',
                },
                component: () => import('pages/trainee/PhotoBookmarkList.vue'),
              },
              {
                path: 'list/:id',
                name: 'trainee-photo-list',
                props: true,
                meta: {
                  title: '사진보기',
                  bgColor: 'white',
                },
                component: () => import('pages/trainee/PhotoList.vue'),
              },
              {
                path: ':id',
                name: 'trainee-photo-detail',
                meta: {
                  title: '사진보기',
                  bgColor: 'white',
                },
                props: true,
                component: () => import('pages/trainee/PhotoDetail.vue'),
              },
            ],
          },
          // {
          //   name: 'letter',
          //   path: 'letter',
          //   redirect: { name: 'letter' },
          //   children: [
          //     {
          //       path: 'bookmark',
          //       name: 'trainee-letter-bookmark',
          //       meta: {
          //         title: '편지쓰기',
          //       },
          //       component: () => import('pages/trainee/LetterBookmarkList.vue'),
          //     },
          //     {
          //       path: 'list/:id',
          //       name: 'trainee-letter-list',
          //       props: true,
          //       meta: {
          //         title: '보낸 편지함',
          //         bgColor: 'white',
          //       },
          //       component: () => import('pages/trainee/LetterList.vue'),
          //     },
          //     {
          //       path: ':id',
          //       name: 'trainee-letter-detail',
          //       props: true,
          //       meta: {
          //         title: '보낸 편지함',
          //         bgColor: 'white',
          //       },
          //       component: () => import('pages/trainee/LetterDetail.vue'),
          //     },
          //     {
          //       path: 'new',
          //       name: 'trainee-letter-new',
          //       meta: {
          //         title: '편지쓰기',
          //         bgColor: 'white',
          //       },
          //       component: () => import('pages/trainee/LetterEdit.vue'),
          //     },
          //   ],
          // },
          {
            name: 'bookmark',
            path: 'bookmark',
            redirect: { name: 'trainee-bookmark-list' },
            children: [
              {
                path: 'list',
                name: 'trainee-bookmark-list',
                meta: {
                  title: '즐겨찾기',
                  bgColor: 'white',
                },
                component: () => import('pages/trainee/BookmarkList.vue'),
              },
              {
                path: 'new',
                name: 'trainee-bookmark-new',
                meta: {
                  title: '즐겨찾기 등록',
                  bgColor: 'white',
                },
                component: () => import('pages/trainee/BookmarkEdit.vue'),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/event',
    meta: {
      requiresAuth: true,
    },
    component: SubLayout,
    children: [
      {
        path: '',
        name: 'event',
        meta: {
          title: '이벤트',
        },
        component: () => import('pages/event/EventPage.vue'),
      },
      {
        path: 'counseling-room',
        name: 'event-counseling-room',
        meta: {
          title: '입영 상담실',
        },
        component: () => import('pages/event/CounselingRoomPage.vue'),
      },
    ],
  },
  {
    path: '/shortcut',
    name: 'shortcut',
    meta: {
      requiresAuth: true,
    },
    component: SubLayout,
    children: [
      {
        path: ':id',
        name: 'shortcut-detail', // 체험, 이벤트 상세 조회
        props: true,
        meta: {
          title: '', // 타이틀은 동적으로 변경
        },
        component: () => import('pages/shortcut/ShortcutDetail.vue'),
      },
    ],
  },
  {
    path: '/setting',
    meta: {
      requiresAuth: true,
    },
    component: SubLayout,
    children: [
      {
        path: '',
        name: 'setting',
        meta: {
          title: '설정',
          bgColor: 'white',
        },
        component: () => import('pages/setting/SettingPage.vue'),
      },
      {
        path: 'account',
        name: 'setting-account',
        meta: {
          title: '계정 설정',
        },
        component: () => import('pages/setting/SettingAccount.vue'),
      },
      {
        path: 'password',
        name: 'setting-password',
        meta: {
          title: '비밀번호 변경',
        },
        component: () => import('pages/auth/ChangePassword.vue'),
      },
      {
        path: 'service-terms/:id',
        props: true,
        name: 'service-terms',
        meta: {
          title: '서비스 이용약관',
          bgColor: 'white',
        },
        component: () => import('src/pages/setting/TermsDetail.vue'),
      },
      {
        path: 'privacy-terms/:id',
        props: true,
        name: 'privacy-terms',
        meta: {
          title: '개인정보처리방침',
          bgColor: 'white',
        },
        component: () => import('src/pages/setting/TermsDetail.vue'),
      },
      {
        path: 'cancel',
        name: 'cancel-membership',
        meta: {
          title: '회원탈퇴',
          bgColor: 'white',
        },
        component: () => import('pages/auth/UnregisterPage.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'login',
        meta: {
          title: '로그인',
          requiresNonAuth: true,
        },
        component: () => import('pages/auth/LoginPage.vue'),
      },
      {
        path: 'restriction/:code/:userId',
        props: true,
        name: 'restriction-guide',
        meta: {
          title: '이용제한',
          requiresNonAuth: true,
        },
        component: () => import('pages/auth/ServiceRestrictionGuide.vue'),
      },
    ],
  },
  {
    path: '/join',
    name: 'join',
    meta: {
      requiresNonAuth: true,
    },
    component: SubLayout,
    children: [
      {
        path: 'nickname',
        name: 'join-nickname',
        meta: {
          title: '닉네임 설정',
        },
        component: () => import('src/pages/auth/JoinNickname.vue'),
      },
      {
        path: 'terms',
        name: 'join-terms',
        meta: {
          title: '약관 동의',
        },
        component: () => import('pages/auth/JoinTerms.vue'),
      },
      {
        path: 'avatar',
        name: 'join-avatar',
        meta: {
          title: '아바타 설정',
        },
        component: () => import('src/pages/auth/JoinAvatar.vue'),
      },
      {
        path: 'completed',
        name: 'join-completed',
        meta: {
          title: '회원가입 완료',
          // requiresNonAuth: false,
          // requiresAuth: true,
        },
        component: () => import('pages/auth/JoinCompleted.vue'),
      },
    ],
  },
  {
    path: '/terms',
    component: SubLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'list',
        name: 'terms-list',
        meta: {
          title: '이용약관',
        },
        component: () => import('pages/terms/PolicyList.vue'),
      },
    ],
  },
  {
    path: '/error',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'error',
        component: () => import('pages/error/ErrorPage.vue'),
      },
      {
        path: 'not-found',
        name: 'error-not-found',
        component: () => import('pages/error/ErrorNotFound.vue'),
      },
      {
        path: 'service-unavailable',
        name: 'service-unavailable',
        component: () => import('pages/error/ErrorServiceUnavailable.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'error-not-found' },
  },
];

export default routes;
