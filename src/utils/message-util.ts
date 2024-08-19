import { i18n } from 'src/boot/i18n';
import { Message } from 'src/types/common/common-model';

export function t(message: Message) {
  const { t } = i18n.global;

  console.log(typeof message, message);
  if (typeof message === 'string') {
    return t(message);
  }
  return t(message.key, message.data);
}
