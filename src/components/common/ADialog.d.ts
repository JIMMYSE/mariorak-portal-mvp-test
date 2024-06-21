import { Message } from 'src/services/common/common-model';

export interface ADialogProps {
  type?: 'alert' | 'confirm';
  dialogTitle?: Message;
  title?: Message;
  htmlTitle?: Message;
  text?: Message;
  htmlText?: Message;
  okLabel?: Message;
  cancelLabel?: Message;
  persistent?: boolean;
  buttons?: { label: string; value: unknown; color?: string }[];
  contentComponent?: any;
  contentComponentProps?: any;
  closeButton?: boolean;
}
