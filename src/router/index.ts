import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

/**
 * 최상단 스크롤 이동을 위한 임시 hash
 */
// const HASH_FOR_SCROLL_TO_TOP = '#scroll-to-top';
// const HASH_FOR_VSCROLL_TO_TOP = '#vscroll-to-top';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    // Vue Router - Scroll Behavior: https://router.vuejs.org/guide/advanced/scroll-behavior.html

    scrollBehavior(to, from, savedPosition) {
      console.log('scrollBehavior', to, from, savedPosition);
      if (savedPosition) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(savedPosition);
          }, 0);
        });

        // return savedPosition;
      } else if (to.hash) {
        return {
          el: to.hash,
          // 20px above the element
          top: 20,
          behavior: 'smooth',
        };
      }
      return { top: 0 };
    },
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to: any, from: any) => {
    const { isLoggedIn } = useUserInfo();
    const { joinData } = storeToRefs(useJoinStore());
    if (!isLoggedIn.value) {
      // 비로그인 상태에서 로그인이 필요한 페이지로 이동하려고 하면 로그인 페이지로 이동
      if (to.matched.some((record: any) => record.meta.requiresAuth)) {
        return { name: 'login', query: { next: to.fullPath } };
      }
    } else if (to.name?.toString().includes('login')) return { name: 'main' };

    if (to.name?.toString().includes('join')) {
      console.log('>>>to.nameHasJoin');
      if (!joinData.value) return { name: from.name };
    }

    // 메타태그 설정
    if (to.meta.title) {
      document.title = to.meta.title;
    }

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (to.meta.description) {
      if (descriptionTag) {
        descriptionTag.setAttribute('content', to.meta.description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = to.meta.description;
        document.head.appendChild(meta);
      }
    }

    const ogImageTag = document.querySelector('meta[property="og:image"]');
    if (to.meta.ogImage) {
      if (ogImageTag) {
        ogImageTag.setAttribute('content', to.meta.ogImage);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:image');
        meta.content = to.meta.ogImage;
        document.head.appendChild(meta);
      }
    }
  });
  // ...
  return Router;
});
