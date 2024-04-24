import { RouteRecordRaw } from 'vue-router';
// layout
import DefaultLayout from 'layouts/DefaultLayout.vue';
import MainLayout from 'layouts/MainLayout.vue';
import SubLayout from 'layouts/SubLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          requiresAuth: true,
        },
        component: MainLayout,
        children: [
          {
            path: '',
            name: 'main',
            component: () => import('pages/MainPage.vue'),
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
            },
            component: () => import('pages/home/notice/NoticeListPage.vue'),
          },
          {
            path: ':id',
            props: true,
            name: 'notice-detail',
            meta: {
              title: '공지사항',
            },
            component: () => import('pages/home/notice/NoticeDetailPage.vue'),
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
            component: () => import('pages/home/profile/ProfilePage.vue'),
          },
        ],
      },
      {
        path: 'enlist',
        name: 'enlist',
        meta: {
          requiresAuth: true,
        },
        component: SubLayout,
        children: [
          {
            name: 'recruit-info',
            path: 'recruit-info',
            meta: {
              title: '모병안내',
              bgColor: 'white',
            },
            component: () => import('pages/home/enlist/RecruitInfoPage.vue'),
          },
          {
            name: 'ready-enlist',
            path: 'ready-enlist',
            meta: {
              title: '입영준비 사항',
              bgColor: 'white',
            },
            component: () => import('pages/home/enlist/ReadyEnlistPage.vue'),
          },
          {
            name: 'enlist-event',
            path: 'enlist-event',
            meta: {
              title: '입영행사',
            },
            component: () => import('pages/home/enlist/EnlistEventPage.vue'),
          },
          {
            name: 'commission-event',
            path: 'commission-event',
            meta: {
              title: '임관식안내',
            },
            component: () =>
              import('pages/home/enlist/CommissionEventPage.vue'),
          },
          {
            name: 'graduation-event',
            path: 'graduation-event',
            meta: {
              title: '수료식 안내',
            },
            component: () =>
              import('pages/home/enlist/GraduationEventPage.vue'),
          },
          {
            name: 'way-to-come',
            path: 'way-to-come',
            meta: {
              title: '찾아오는 방법',
              bgColor: 'white',
            },
            component: () => import('pages/home/enlist/WayToComePage.vue'),
          },
          {
            name: 'faq',
            path: 'faq',
            meta: {
              title: '자주 묻는 질문',
              bgColor: 'white',
            },
            component: () => import('pages/home/enlist/FAQPage.vue'),
          },
        ],
      },
      {
        path: 'trainee',
        name: 'trainee',
        meta: {
          requiresAuth: true,
        },
        component: SubLayout,
        children: [
          {
            name: 'photo-album',
            path: 'photo-album',
            redirect: { name: 'photo-album-favorite' },
            children: [
              {
                name: 'photo-album-favorite',
                path: 'favorite',
                meta: {
                  title: '사진보기',
                },
                component: () =>
                  import('src/pages/home/enlist/PhotoAlbumPage.vue'),
              },
              {
                name: 'photo-album-list',
                path: 'list',
                meta: {
                  title: '사진보기',
                  bgColor: 'white',
                },
                component: () =>
                  import('src/pages/home/enlist/PhotoAlbumListPage.vue'),
              },
              {
                name: 'photo-album-detail',
                path: ':id',
                meta: {
                  title: '사진보기',
                  bgColor: 'white',
                },
                props: true,
                component: () =>
                  import('pages/home/enlist/PhotoAlbumDetailPage.vue'),
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
        name: 'event',
        path: '',
        meta: {
          title: '이벤트',
        },
        component: () => import('pages/event/EventPage.vue'),
      },
      {
        name: 'presentation',
        path: 'presentation',
        meta: {
          title: '입영 상담실',
        },
        component: () => import('pages/event/PresentationPage.vue'),
      },
      {
        name: 'counseling-room',
        path: 'counseling-room',
        meta: {
          title: '입영 상담실',
        },
        component: () => import('src/pages/event/CounselingRoomPage.vue'),
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
        name: 'setting',
        path: '',
        component: () => import('pages/setting/SettingPage.vue'),
      },
      {
        path: 'airforce-splash',
        name: 'airforce-splash',
        component: () => import('pages/AirForceSplash.vue'),
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
        },
        component: () => import('pages/auth/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: SubLayout,
    children: [
      {
        path: 'find-user',
        name: 'find-user',
        meta: {
          title: '계정찾기',
        },
        component: () => import('pages/auth/FindUser.vue'),
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        meta: {
          title: '비밀번호 재설정',
        },
        props: (route) => ({ id: route.query.id, token: route.query.token }),
        component: () => import('pages/auth/ResetPassword.vue'),
      },
      {
        path: 'reset-password-02',
        name: 'reset-password-02',
        meta: {
          title: '비밀번호 재설정',
        },
        props: (route) => ({ id: route.query.id, token: route.query.token }),
        component: () => import('pages/auth/ResetPassword02.vue'),
      },
      {
        path: 'change-password',
        name: 'change-password',
        meta: {
          title: '비밀번호 변경',
        },
        props: (route) => ({ id: route.query.id, token: route.query.token }),
        component: () => import('pages/auth/ChangePassword.vue'),
      },
      {
        path: 'find-password',
        name: 'find-password',
        meta: {
          title: '비밀번호 찾기',
        },
        props: (route) => ({ id: route.query.id, token: route.query.token }),
        component: () => import('pages/auth/FindPassword.vue'),
      },
    ],
  },
  {
    path: '/join',
    component: SubLayout,
    children: [
      {
        path: '',
        name: 'join',
        meta: {
          title: '회원가입',
        },
        component: () => import('pages/auth/JoinPage.vue'),
      },

      {
        path: 'email',
        name: 'join-email',
        meta: {
          title: '회원가입',
        },
        component: () => import('pages/auth/JoinEmail.vue'),
      },
      {
        path: 'mobile',
        name: 'join-mobile',
        meta: {
          title: '휴대폰 인증',
        },
        component: () => import('pages/auth/JoinMobile.vue'),
      },
      {
        path: 'policy',
        name: 'join-policy',
        meta: {
          title: '서비스 약관 동의',
        },
        component: () => import('pages/auth/JoinTerms.vue'),
      },
      {
        path: 'nickname',
        name: 'join-nickname',
        meta: {
          title: '닉네임 설정',
        },
        component: () => import('pages/auth/JoinNickname.vue'),
      },
      {
        path: 'completed',
        name: 'join-completed',
        meta: {
          title: '회원가입완료',
        },
        component: () => import('pages/auth/JoinCompleted.vue'),
      },

      {
        path: 'cancel',
        name: 'cancel-membership',
        meta: {
          title: '회원탈퇴',
        },
        component: () => import('pages/auth/CancelMembership.vue'),
      },
    ],
  },

  {
    path: '/policy',
    component: SubLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'list',
        name: 'policy-list',
        meta: {
          title: '이용약관',
        },
        component: () => import('pages/policy/PolicyList.vue'),
      },
      {
        path: 'use-restriction',
        name: 'use-restriction',
        meta: {
          title: '이용제한',
        },
        component: () => import('pages/policy/UseRestriction.vue'),
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
