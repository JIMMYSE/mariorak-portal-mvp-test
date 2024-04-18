import { RouteRecordRaw } from 'vue-router';
// layout
import DefaultLayout from 'src/layouts/DefaultLayout.vue';
import MainLayout from 'src/layouts/MainLayout.vue';
import SubLayout from 'src/layouts/SubLayout.vue';
//home
import MainPage from 'src/pages/MainPage.vue';
import RecruitInfoPage from 'src/pages/home/enlist/RecruitInfoPage.vue';
//event
import EventPage from 'src/pages/event/EventPage.vue';
import PresentationPage from 'src/pages/event/PresentationPage.vue';
//setting
import SettingPage from 'src/pages/setting/SettingPage.vue';
// auth
import LoginPage from 'src/pages/auth/LoginPage.vue';

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
        children: [{ path: '', name: 'main', component: MainPage }],
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
            component: RecruitInfoPage,
          },
        ],
      },
    ],
  },
  {
    path: 'event',
    meta: {
      requiresAuth: true,
    },
    component: SubLayout,
    children: [
      { name: 'event', path: '', component: EventPage },
      {
        name: 'presentation',
        path: 'presentation',
        component: PresentationPage,
      },
    ],
  },
  {
    path: 'setting',
    meta: {
      requiresAuth: true,
    },
    component: SubLayout,
    children: [
      {
        name: 'setting',
        path: '',
        component: SettingPage,
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
        component: LoginPage,
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
          title: '이메일로 회원가입',
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
          title: '회원탈퇴 신청',
        },
        component: () => import('pages/auth/CancelMembership.vue'),
      },
    ],
  },
  {
    path: '/notice',
    redirect: '/notice/list',
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
        component: () => import('pages/notice/NoticeList.vue'),
      },
      // {
      //   path: ':id',
      //   props: true,
      //   name: 'notice-detail',
      //   meta: {
      //     title: '공지사항 상세',
      //   },
      //   component: () => import('pages/notice/NoticeDetail.vue'),
      // },
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
