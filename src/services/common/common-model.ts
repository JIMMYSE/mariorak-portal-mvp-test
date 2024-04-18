// 지역코드
export type Region = 'J' | 'I';

export type Message =
  | string
  | {
      key: string;
      data: Record<string, unknown>;
    };
