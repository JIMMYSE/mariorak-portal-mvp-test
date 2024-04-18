import { useThrottleFn } from '@vueuse/core';
import ADialog from 'components/common/ADialog.vue';
import { Dialog, Notify } from 'quasar';
import ADialogContent from 'src/components/common/ADialogContent.vue';
import ADialogFull from 'src/components/common/ADialogFull.vue';
import { MaybeRefOrGetter, watch } from 'vue';
import { t } from 'src/utils/message-util';
import { Message } from 'src/services/common/common-model';
import { ADialogProps } from 'src/components/common/ADialog';
import { ADialogFullProps } from 'src/components/common/ADialogFull';
import { ADialogContentProps } from 'src/components/common/ADialogContent';

// Dialog, Notify throttle delay
const throttleDelay = 2000;

/**
 * Alert Dialog
 */
export function useAlertDialog(option: ADialogProps) {
  option.type = 'alert';
  return useDialog(option);
}

/**
 * Alert Dialog with throttle
 */
let alertDialogOption: ADialogProps;
export async function useAlertDialogThrottle(option: ADialogProps) {
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
export function useConfirmDialog(option: ADialogProps) {
  option.type = 'confirm';
  return useDialog(option);
}

export function useDialog(option: ADialogProps) {
  return Dialog.create({
    component: ADialog,
    componentProps: option,
  });
}

/**
 * Alert 전체화면 Dialog
 */
export function useAlertFullDialog(option: ADialogFullProps) {
  option.type = 'alert';
  return useFullDialog(option);
}

/**
 * Confirm 전체화면 Dialog
 */
export function useConfirmFullDialog(option: ADialogFullProps) {
  option.type = 'confirm';
  return useFullDialog(option);
}

export function useFullDialog(option: ADialogFullProps) {
  return Dialog.create({
    component: ADialogFull,
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
export function useContentDialog(option: ADialogContentProps) {
  return Dialog.create({
    component: ADialogContent,
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
  Notify.create({
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
