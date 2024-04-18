import { i18n } from 'src/boot/i18n';
import { Message } from 'src/services/common/common-model';

export function t(message: Message) {
  const { t } = i18n.global;
  if (typeof message === 'string') {
    return t(message);
  }
  return t(message.key, message.data);
}
