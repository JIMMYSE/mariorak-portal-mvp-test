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
              bgColor: 'white',
            },
            component: () => import('pages/home/notice/NoticeList.vue'),
          },
          {
            path: ':id',
            props: true,
            name: 'notice-detail',
            meta: {
              title: '공지사항',
              bgColor: 'white',
            },
            component: () => import('pages/home/notice/NoticeDetail.vue'),
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
        name: 'event',
        path: '',
        meta: {
          title: '이벤트',
        },
        component: () => import('pages/event/EventPage.vue'),
      },
      // {
      //   name: 'presentation',
      //   path: 'presentation',
      //   meta: {
      //     title: '입영 상담실',
      //   },
      //   component: () => import('pages/event/PresentationPage.vue'),
      // },
      {
        name: 'counseling-room',
        path: 'counseling-room',
        meta: {
          title: '입영 상담실',
        },
        component: () => import('pages/event/CounselingRoomPage.vue'),
      },
      // {
      //   name: 'call-roll',
      //   path: 'call-roll',
      //   meta: {
      //     title: '점호 체험',
      //   },
      //   component: () => import('pages/event/CallRollPage.vue'),
      // },
      {
        name: 'metaverse-detail',
        path: 'metaverse/:id',
        props: true,
        meta: {
          bgColor: 'white',
        },
        component: () => import('pages/event/MetaverseDetailPage.vue'),
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
        component: () => import('pages/setting/SettingPassword.vue'),
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
          title: '회원 탈퇴',
          bgColor: 'white',
        },
        component: () => import('pages/setting/SettingUnregister.vue'),
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
        name: 'join-email',
        meta: {
          title: '회원가입',
        },
        component: () => import('pages/auth/JoinEmail.vue'),
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
