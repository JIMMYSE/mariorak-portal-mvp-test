import { ReviewSearchListRes, ReviewCreate } from 'ccf-api-dto';
const { hasBadword } = useBadwords();
export type ReviewSearchListResType = InferType<typeof ReviewSearchListRes>;
export const ReviewCreateFrontType = ReviewCreate.shape({
  cont: string()
    .required()
    .label('내용')
    .test('nickname', t('auth.nickname.hasBadword'), (value: string) => {
      //금칙어 관련 처리
      return !hasBadword(value);
    }),
});

export type ReviewCreateType = InferType<typeof ReviewCreateFrontType>;
