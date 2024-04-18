import { useForm, useField } from 'vee-validate';
import { object, string, addMethod } from 'yup';
export function useAuthForm({
  needPasswordConfirm,
  onSuccess,
}: {
  needPasswordConfirm: boolean;
  onSuccess: (values: {
    email: string;
    password: string;
    passwordConfirm: string;
  }) => void;
}) {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%()>]{10,16}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // [passwordConfirm validator]
  addMethod(string, 'passwordConfirm', function (message) {
    return this.test('passwordConfirm', message, function (value, context) {
      const { path, createError } = this;
      const password = context.parent.password;
      return password === value || createError({ path, message });
    });
  });

  const schema = object({
    email: string()
      .required('사용하실 이메일을 입력하세요.')
      .matches(emailRegex, '이메일 형식이 아닙니다.'),
    password: string()
      .required('사용하실 비밀번호를 입력하세요.')
      .matches(passwordRegex, '영문 대소문자, 숫자 포함 10~16자리가 아닙니다'),
    passwordConfirm: needPasswordConfirm
      ? string()
          .required('비밀번호를 다시한번 입력해 주세요.')
          .test({
            name: 'passwordConfirm',
            test: (v, c) => c.parent.password === v,
            message: '비밀번호가 일치하지 않습니다.',
          })
      : string().nullable(),
  });

  const formContext = useForm({
    validationSchema: schema,
    initialValues: { email: '', password: '' },
  });

  const email = useField('email');
  const password = useField('password');
  const passwordConfirm = useField('passwordConfirm');

  const {
    meta: formMeta,
    errors: formErrors,
    handleSubmit,
    isSubmitting,
  } = formContext;

  return {
    fields: {
      email,
      password,
      passwordConfirm,
    },
    formMeta,
    isSubmitting,
    formErrors,
    onSubmit: handleSubmit(onSuccess),
  };
}
