import { ref } from 'vue';
import {
  LocationQueryRaw,
  RouteLocationRaw,
  Router,
  useRouter,
} from 'vue-router';

export function useSystemCheck() {
  const isSystemCheck = ref(false);
  return { isSystemCheck };
}

/**
 * 앱 Router 유틸. Singleton.
 */
let appRouter: Router | null = null;
export function useAppRouter() {
  if (!appRouter) {
    const router = useRouter();
    appRouter = router;
  }

  return { appRouter };
}

export function goTo(route: RouteLocationRaw) {
  appRouter?.push(route);
}

export function goToName(name: string, query?: LocationQueryRaw | undefined) {
  appRouter?.push({ name, query });
}

export function goBack() {
  appRouter?.back();
}
