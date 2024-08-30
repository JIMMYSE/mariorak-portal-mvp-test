const codeObjectSchema = object({
  code: string().required(),
  created_at: string().required(), // 형식 검사 추가 가능
  deleted_at: mixed().nullable(), // null 또는 string
  description: string().required(),
  group: string().required(),
  id: number().required(),
  is_active: boolean().required(),
  name: string().required(),
  sequence: number().required(),
  updated_at: string().required(), // 형식 검사 추가 가능
});

export type CodeObjectType = InferType<typeof codeObjectSchema>;
