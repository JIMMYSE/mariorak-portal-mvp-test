import { Message } from 'src/services/common/common-model';

export interface CDialogFullProps {
  type?: 'alert' | 'confirm';
  dialogTitle?: Message;
  title?: Message;
  htmlTitle?: Message;
  text?: Message;
  htmlText?: Message;
  contentComponent?: any;
  okLabel?: Message;
  cancelLabel?: Message;
  persistent?: boolean;
  hideButtons?: boolean;
  buttons?:
    | {
        label: string;
        value: unknown;
        color?: string;
        textColor?: string;
      }[];
}
