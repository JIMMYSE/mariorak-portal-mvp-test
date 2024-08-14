import { useThrottleFn } from '@vueuse/core';
import CDialog from 'components/common/dialog/CDialog.vue';
import { Dialog, Notify } from 'quasar';
import CDialogContent from 'src/components/common/dialog/CDialogContent.vue';
import CDialogFull from 'src/components/common/dialog/CDialogFull.vue';
import { MaybeRefOrGetter, watch } from 'vue';
import { t } from 'src/utils/message-util';
import { Message } from 'src/types/common/common-model';
import { CDialogProps } from 'src/components/common/dialog/CDialog';
import { CDialogFullProps } from 'src/components/common/dialog/CDialogFull';
import { CDialogContentProps } from 'src/components/common/dialog/CDialogContent';

// Dialog, Notify throttle delay
const throttleDelay = 2000;

/**
 * Alert Dialog
 */
export function useAlertDialog(option: CDialogProps) {
  option.type = 'alert';
  return useDialog(option);
}

/**
 * Alert Dialog with throttle
 */
let alertDialogOption: CDialogProps;
export async function useAlertDialogThrottle(option: CDialogProps) {
  alertDialogOption = option;
  const res = await throttleAlertDialog();
  return res;
}
const throttleAlertDialog = useThrottleFn(() => {
  return useAlertDialog(alertDialogOption);
}, throttleDelay);

/**
 * Confirm Dialog
 */
export function useMyConfirmDialog(option: CDialogProps) {
  option.type = 'confirm';
  return useDialog(option);
}

export function useDialog(option: CDialogProps) {
  return Dialog.create({
    component: CDialog,
    componentProps: option,
  });
}

/**
 * Alert 전체화면 Dialog
 */
export function useAlertFullDialog(option: CDialogFullProps) {
  option.type = 'alert';
  return useFullDialog(option);
}

/**
 * Confirm 전체화면 Dialog
 */
export function useConfirmFullDialog(option: CDialogFullProps) {
  option.type = 'confirm';
  return useFullDialog(option);
}

export function useFullDialog(option: CDialogFullProps) {
  return Dialog.create({
    component: CDialogFull,
    componentProps: option,
  });
}

/**
 * 콘텐츠 Dialog
 * @use 컴포넌트로 사용 권장
 * @example
    <s-dialog-content
      v-model="detailEnabled"
      :title="detail?.trms_ttl"
      :html="filterHtmlWithNewLine(detail?.trms_cn)"
    />
 */
export function useContentDialog(option: CDialogContentProps) {
  return Dialog.create({
    component: CDialogContent,
    componentProps: option,
  });
}

/**
 * 에러 발생 시 Alert
 */
export function useAlertErrorDialogWatcher(
  errors: MaybeRefOrGetter<any | unknown>
) {
  return watch(errors, (err) => {
    let text = '';

    if (typeof err === 'string') {
      text = err;
    } else if (typeof err === 'object') {
      const keys = Object.keys(err);
      if (!keys.length) return;
      text = err[keys[0]] as string;
    }

    if (text)
      useAlertDialog({
        text,
      });
  });
}

/**
 * Notify
 * @link https://quasar.dev/quasar-plugins/notify/
 */
export function useNotify(message: Message) {
  return Notify.create({
    color: 'negative',
    message: t(message),
  });
}

/**
 * Notify with throttle
 */
let notifyMessage: Message;
export function useNotifyThrottle(message: Message) {
  notifyMessage = message;
  throttleNotify();
}
const throttleNotify = useThrottleFn(() => {
  useNotify(notifyMessage);
}, throttleDelay);

/**
 * 에러 발생 시 Notify
 */
export function useNotifyError(errors: any) {
  watch(errors, (err) => {
    const keys = Object.keys(err);
    if (!keys.length) return;

    const value = err[keys[0]] as string;
    useNotify(value);
  });
}

/**
 * 완료 Notify
 */
export const useNotifyDone = (message: Message) => {
  return Notify.create({
    color: 'black',
    message: t(message),
    textColor: 'white',
    icon: 'done',
    iconColor: 'white',
    // timeout: 1000,
  });
};
