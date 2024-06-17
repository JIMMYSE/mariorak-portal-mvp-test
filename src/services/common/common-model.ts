export type Message =
  | string
  | {
      key: string;
      data: Record<string, unknown>;
    };

// 닉네임 정규식
export const REGEXP_NICKNAME = /^[a-zA-Z가-힣0-9]{2,10}$/;
