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
        path: '/home',
        meta: {
          requiresAuth: true,
          title: 'CCF ㅣ 팬과 함께 만들어가는 게임 개발 커뮤니티 ',
          description:
            '성공적인 게임 제작을 위해 팬과 크리에이터가 만나 아이디어를 내며 소통을 하는 글로벌 커뮤니티 공간 CCF_Content Created with Fans',
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
      {
        path: 'game-pack',
        meta: {
          requiresAuth: true,
          title: '게임팩 ㅣ CCF가 함께하고 지원하는 게임 모음집',
          description:
            '성공적인 게임 제작을 위해 팬과 크리에이터가 만나 아이디어를 내며 소통을 하는 글로벌 커뮤니티 공간 CCF_Content Created with Fans',
          ogImage: '/images/meta-img.jpg',
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
              faqCategory: '게임팩', // TODO 오픈떄 수정
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
              faqCategory: '게임팩', // TODO 오픈떄 수정
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
        path: 'recruit',
        meta: {
          requiresAuth: true,
          title: '인력사무실 ㅣ 보다 나은 게임 개발을 위한 만남의 공간',
          description:
            '성공적인 게임 제작을 위해 팬과 크리에이터가 만나 아이디어를 내며 소통을 하는 글로벌 커뮤니티 공간 CCF_Content Created with Fans',
          ogImage: '/images/meta-img.jpg',
        },
        component: MainLayout,
        children: [
          {
            path: '',
            name: 'recruit-main',
            meta: {
              title: '인력사무소',
              faqCategory: '인력사무소',
            },
            component: () => import('src/pages/recruit/RecruitMainPage.vue'),
          },
          {
            path: 'detail',
            name: 'recruit-detail',
            meta: {
              title: '인력사무소 상세',
              faqCategory: '인력사무소',
            },
            component: () => import('src/pages/recruit/RecruitDetail.vue'),
          },
          {
            path: 'recruit-profile',
            name: 'recruit-profile',
            meta: {
              title: '개발자 프로필 관리',
            },
            component: () => import('pages/recruit/RecruitMakerProfile.vue'),
          },
          {
            path: 'project/:id',
            name: 'recruit-project-detail',
            meta: {
              title: '프로젝트 상세',
              bgColor: 'white',
            },
            // 프로젝트 상세에 SubLayout 사용
            component: SubLayout,
            children: [
              {
                path: '',
                component: () =>
                  import('pages/recruit/RecruitProjectDetail.vue'),
              },
            ],
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
            path: '',
            name: 'my-page',
            meta: {
              title: '마이페이지',
            },
            component: () => import('pages/my-page/MPMainPage.vue'),
          },
          {
            path: 'account-manage',
            name: 'account-manage',
            meta: {
              title: '계정 정보 관리',
            },
            component: () => import('pages/my-page/AccountManage.vue'),
          },
          {
            path: 'maker-profile-manage',
            name: 'maker-profile-manage',
            meta: {
              title: '개발자 프로필 관리',
            },
            component: () => import('pages/my-page/MakerProfileManage.vue'),
          },
          {
            path: 'maker-profile-new',
            name: 'maker-profile-new',
            meta: {
              title: '참여 개발자 등록',
            },
            component: () => import('pages/my-page/MakerProfileEdit.vue'),
          },
          //본인 프로필 수정
          {
            path: 'maker-profile-edit',
            name: 'maker-profile-edit',
            props: true,
            meta: {
              title: '개발자 프로필 수정',
            },
            component: () => import('pages/my-page/MakerProfileEdit.vue'),
          },
          // 개발자 프로필 미등록
          {
            path: 'not-register-profile',
            name: 'not-register-profile',
            meta: {
              title: '개발자 프로필 관리',
            },
            component: () => import('pages/my-page/NotRegisterProfile.vue'),
          },
        ],
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
          noHeader: true,
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
          // requiresNonAuth: false,
          // requiresAuth: true,
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
    // redirect: { name: 'error-not-found' },
    redirect: { name: 'home-main' },
  },
];

export default routes;
