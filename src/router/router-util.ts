import { josa } from 'josa';
import { t } from 'src/utils/message-util';
import { LocationQueryRaw, RouteLocationRaw, Router } from 'vue-router';

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
export function replaceTo(route: RouteLocationRaw) {
  appRouter?.replace(route);
}

export function goToName(name: string, query?: LocationQueryRaw | undefined) {
  appRouter?.push({ name, query });
}

export function replaceToName(name: string, query?: LocationQueryRaw | undefined) {
  appRouter?.replace({ name, query });
}

export function goBack() {
  appRouter?.back();
}

export const enterMetaverse = ({
  id,
  name,
  space_status_cd,
  onOk,
}: {
  id: number;
  name: string;
  space_status_cd?: string | null | undefined;
  onOk: (id?: number) => void;
}) => {
  if (space_status_cd && space_status_cd !== '50') return;

  useMyConfirmDialog({
    text: josa(name + t('metaverse.enter.confirm.text')),
    okLabel: 'label.yes',
    cancelLabel: 'label.no',
  }).onOk(() => {
    onOk(id);
  });
};
