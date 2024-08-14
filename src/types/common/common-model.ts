import { t } from 'src/utils/message-util';

export interface Option {
  label: string;
  value: any;
  disable?: boolean;
  /**
   * Any other props from QToggle, QCheckbox, or QRadio
   */
  [props: string]: any | undefined;
}

export type Message =
  | string
  | {
      key: string;
      data: Record<string, unknown>;
    };

export interface Menu {
  id: number;
  menu_nm: string;
  prgrm_path_nm: string;
  prvc_incl_yn: boolean;
  active?: boolean;
  tracking_type?: string;
}

//d
export const DeviceAgent = object({
  fcm_token: string().nullable(),
  platform: object({
    os: string(),
    device_id: string(),
    app_version: string(),
    device_model: string(),
  }),
  os: string(),
  sdk_version: string(),
});
