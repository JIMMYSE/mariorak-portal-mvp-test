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
  fcm_token: string().nullable().optional(),
  platform: object({
    os: string().optional(),
    device_id: string().optional(),
    app_version: string().optional(),
    device_model: string().optional(),
  }).optional(),
  os: string().optional(),
  sdk_version: string().optional(),
});

export const ThumbnailFileSchema = object({
  id: number().required(),
  file_name: string().required(),
  origin_addr: string().nullable(),
  convert_addr: string().nullable(),
});
