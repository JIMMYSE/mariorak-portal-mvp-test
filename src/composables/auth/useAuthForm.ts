import { t } from 'src/utils/message-util';
import { useForm, useField } from 'vee-validate';
import { object, string, addMethod } from 'yup';
import { quasarVeeConfig } from '../common/veeValidate';
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
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d()>]{10,16}$/;
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
      .required(t('auth.email.required'))
      .matches(emailRegex, t('auth.email.invalid')),
    password: string()
      .required(t('auth.password.required'))
      .matches(passwordRegex, t('auth.password.invalid')),
    passwordConfirm: needPasswordConfirm
      ? string()
          .required(t('auth.passwordConfirm.required'))
          .test({
            name: 'passwordConfirm',
            test: (v, c) => c.parent.password === v,
            message: t('auth.passwordConfirm.invalid'),
          })
      : string().nullable(),
  });

  const formContext = useForm({
    validationSchema: schema,
    initialValues: { email: '', password: '', passwordConfirm: '' },
  });

  const [email, emailProps] = formContext.defineField<'email', string>(
    'email',
    quasarVeeConfig
  );
  const [password, passwordProps] = formContext.defineField<'password', string>(
    'password',
    quasarVeeConfig
  );
  const [passwordConfirm, passwordConfirmProps] = formContext.defineField<
    'passwordConfirm',
    string
  >('passwordConfirm', quasarVeeConfig);

  const {
    meta: formMeta,
    errors: formErrors,
    handleSubmit,
    isSubmitting,
  } = formContext;

  return {
    fields: {
      email,
      emailProps,
      password,
      passwordProps,
      passwordConfirm,
      passwordConfirmProps,
    },
    formMeta,
    isSubmitting,
    formErrors,
    onSubmit: handleSubmit(onSuccess),
  };
}
