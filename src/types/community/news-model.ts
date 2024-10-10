import { ProjectNewsBase, ProjectNewsSearchRes, ProjectNewsCreateReq } from 'ccf-api-dto';

export type ProjectNewsType = InferType<typeof ProjectNewsBase>;
export type ProjectNewsSearchResType = InferType<typeof ProjectNewsSearchRes>;

export const ProjectNewsCreateReqFront = ProjectNewsCreateReq.shape({
  news_url: string()
    .nullable()
    .label('포트폴리오 URL')
    .matches(
      /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
      '웹 URL 형식이 아닙니다.'
    ),
});

export type ProjectNewsCreateReqType = InferType<typeof ProjectNewsCreateReqFront>;
