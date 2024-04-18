import { toTypedSchema } from '@vee-validate/rules';
import { useField, useForm } from 'vee-validate';
import { string } from 'yup';

const mobileRegex = /^(01[016789]{1})-?[0-9]{4}-?[0-9]{4}$/;
export const mobileSchema = string()
  .matches(mobileRegex, '휴대폰번호를 다시 확인해 주세요.')
  .required('사용하실 휴대폰 번호를 입력하세요.');

const mobileCodeRegex = /^\d{6}$/;
export const validationCodeSchema = string()
  .matches(mobileCodeRegex, '6자리를 입력해 주세요.')
  .required('인증번호를 입력해 주세요.');

export const useMobileFields = () => {
  const form = useForm({
    validationSchema: toTypedSchema({
      mobile: mobileSchema,
      validationCode: validationCodeSchema,
    }),
  });
  return {
    mobile: useField('mobile', mobileSchema, {
      initialValue: '',
    }),
    code: useField('validationCode', validationCodeSchema, {
      initialValue: '',
    }),
    form,
  };
};
