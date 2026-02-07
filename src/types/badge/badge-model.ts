/** 뱃지 아이템 */
export interface BadgeItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  isAcquired: boolean;
  acquiredAt?: string;
}
