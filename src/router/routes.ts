import { RouteRecordRaw } from 'vue-router';
// layout
import DefaultLayout from 'layouts/DefaultLayout.vue';
import MainLayout from 'layouts/MainLayout.vue';
import SubLayout from 'layouts/SubLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        redirect: { name: 'home-main' },
      },
      // ===== 홈(메인) =====
      {
        path: '/home',
        meta: {
          requiresAuth: false,
          title: '마리오락 | 내 취향에 맞는 팝업스토어를 만나는 공간',
          description: '내 취향에 맞는 팝업스토어를 만나는 공간, 마리오락',
          ogImage: '/images/meta-img.jpg',
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
      // ===== 팝업 스토어 =====
      {
        path: 'popup-store',
        component: SubLayout,
        children: [
          {
            path: ':id',
            name: 'popup-store-detail',
            meta: {
              title: 'POP-UP STORE',
              hideTitle: true,
              headerBgColor: '#FF385C',
              headerTextColor: '#ffffff',
              bgColor: 'white',
              requiresAuth: false,
            },
            component: () => import('pages/popup-store/PopupStoreDetail.vue'),
          },
          {
            path: ':id/reserve',
            name: 'popup-store-reserve',
            meta: {
              title: '예약하기',
              bgColor: 'white',
              noFooter: true,
              requiresAuth: true,
            },
            component: () => import('pages/popup-store/PopupStoreReserve.vue'),
          },
        ],
      },
      // ===== 기획전시 =====
      {
        path: 'exhibition',
        component: SubLayout,
        children: [
          {
            path: ':id',
            name: 'exhibition-detail',
            meta: {
              title: 'EXHIBITIONS',
              hideTitle: true,
              headerBgColor: '#000000',
              headerTextColor: '#ffffff',
              bgColor: 'white',
              requiresAuth: false,
            },
            component: () => import('pages/exhibition/ExhibitionDetail.vue'),
          },
          {
            path: ':id/reserve',
            name: 'exhibition-reserve',
            meta: {
              title: '예약하기',
              bgColor: 'white',
              noFooter: true,
              requiresAuth: true,
            },
            component: () => import('pages/exhibition/ExhibitionReserve.vue'),
          },
        ],
      },
      // ===== 나의 활동(마이페이지) =====
      {
        path: 'my-page',
        meta: {
          requiresAuth: true,
        },
        component: MainLayout,
        children: [
          {
            path: '',
            name: 'my-page-main',
            meta: {
              title: 'MY PAGE',
            },
            component: () => import('pages/my-page/MPMainPage.vue'),
          },
        ],
      },
      {
        path: 'my-page',
        meta: {
          requiresAuth: true,
        },
        component: SubLayout,
        children: [
          {
            path: 'reservations',
            name: 'my-reservations',
            meta: {
              title: '나의 예약',
              noFooter: true,
            },
            component: () => import('pages/my-page/ReservationList.vue'),
          },
          {
            path: 'bookmarks',
            name: 'my-bookmarks',
            meta: {
              title: '나의 북마크',
              noFooter: true,
            },
            component: () => import('pages/my-page/BookmarkList.vue'),
          },
          {
            path: 'badges',
            name: 'my-badges',
            meta: {
              title: '나의 뱃지',
              noFooter: true,
            },
            component: () => import('pages/my-page/BadgeList.vue'),
          },
        ],
      },
      // ===== 설정 =====
      {
        path: 'settings',
        meta: {
          requiresAuth: false,
        },
        component: SubLayout,
        children: [
          {
            path: '',
            name: 'settings-main',
            meta: {
              title: '설정',
            },
            component: () => import('pages/settings/SettingsMain.vue'),
          },
          {
            path: 'account',
            name: 'settings-account',
            meta: {
              title: '계정관리',
            },
            component: () => import('pages/settings/AccountManage.vue'),
          },
          {
            path: 'notification',
            name: 'settings-notification',
            meta: {
              title: '알림관리',
            },
            component: () => import('pages/settings/NotificationManage.vue'),
          },
          {
            path: 'language',
            name: 'settings-language',
            meta: {
              title: '언어설정',
            },
            component: () => import('pages/settings/LanguageSetting.vue'),
          },
          {
            path: 'terms',
            name: 'settings-terms',
            meta: {
              title: '이용약관',
            },
            component: () => import('pages/settings/TermsManage.vue'),
          },
        ],
      },
      // ===== 알림 =====
      {
        path: 'notification',
        meta: {
          requiresAuth: false,
        },
        component: SubLayout,
        children: [
          {
            path: '',
            name: 'notification-list',
            meta: {
              title: '알림',
              noFooter: true,
            },
            component: () => import('pages/notification/NotificationList.vue'),
          },
          {
            path: ':id',
            name: 'notification-detail',
            meta: {
              title: '알림 상세',
              noFooter: true,
            },
            component: () => import('pages/notification/NotificationDetail.vue'),
          },
        ],
      },
    ],
  },
  // ===== 인증 =====
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
          noHeader: true,
          noFooter: true,
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
    path: '/withdrawal',
    name: 'withdrawal',
    meta: {
      requiresNonAuth: true,
      noFooter: true,
    },
    component: DefaultLayout,
    children: [
      {
        path: 'complete',
        name: 'withdrawal-complete',
        meta: {
          title: '회원탈퇴 완료',
          noFooter: true,
          requiresNonAuth: true,
        },
        component: () => import('pages/auth/WithdrawCompleted.vue'),
      },
    ],
  },
  {
    path: '/join',
    name: 'join',
    meta: {
      requiresNonAuth: true,
      noFooter: true,
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
          noHeader: true,
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
          noHeader: true,
        },
        component: () => import('pages/auth/JoinCompleted.vue'),
      },
    ],
  },
  {
    path: '/policy',
    component: SubLayout,
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: 'terms',
        name: 'terms',
        meta: {
          title: '이용약관',
        },
        component: () => import('pages/policy/TermsPage.vue'),
      },
      {
        path: 'privacy',
        name: 'privacy',
        meta: {
          title: '개인정보처리방침',
        },
        component: () => import('pages/policy/PrivacyPage.vue'),
      },
      {
        path: 'secession',
        name: 'secession',
        meta: {
          title: '회원탈퇴안내',
        },
        component: () => import('pages/policy/SecessionPage.vue'),
      },
    ],
  },
  {
    path: '/error',
    meta: {
      noFooter: true,
    },
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
  // Always leave this as last one
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home-main' },
  },
];

export default routes;
