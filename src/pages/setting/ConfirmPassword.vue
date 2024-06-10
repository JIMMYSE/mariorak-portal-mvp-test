<!-- 비밀번호 재설정 -->

<!-- 마이페이지 > 비밀번호 변경 -->

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup';
import { usePassword } from 'src/composables/auth/auth';
import { goBack } from 'src/composables/common/app';
import { goToName } from 'src/composables/common/app';
import { useAlertDialog } from 'src/composables/common/dialog';
import useTryCatchWithLoading from 'src/composables/common/useTryCatchWithLoading';
import { quasarVeeConfig } from 'src/composables/common/veeValidate';
import {
  ChangePasswordForm,
  // ChangePasswordFormSchema,
} from 'src/services/auth/auth-model';
import { useForm } from 'vee-validate';

type Props = { id: string; token: string };
const props = defineProps<Props>();

/**
 * =========================================================================
 * Vee Validation
 */
const { handleSubmit, defineField } = useForm<ChangePasswordForm>({
  // validationSchema: toTypedSchema(ChangePasswordFormSchema),
});

// /** @see { @link https://vee-validate.logaretm.com/v4/examples/ui-libraries } */
const [password, passwordProps] = defineField<'password', string>(
  'password',
  quasarVeeConfig
);
const [passwordConfirm, passwordConfirmProps] = defineField<
  'passwordConfirm',
  string
>('passwordConfirm', quasarVeeConfig);

const { tryCatchWithLoading } = useTryCatchWithLoading();
const { changePasswordWithMobile } = usePassword();

// const onSubmit = handleSubmit(async (values) => {
//   const { password } = values;
//   console.log('onSubmit', password);
//   tryCatchWithLoading(
//     async () => {
//       await changePasswordWithMobile(Number(props.id), password, props.token);
//       useAlertDialog({
//         text: '사용자님 아이디의 비밀번호가 변경되었습니다.',
//       }).onOk(goBack);
//     },
//     (error) => useAlertDialog({ text: error.message })
//   );
// });

const onSubmit = () => {
  goToName('setting-change-password');
};
</script>

<template>
  <q-page class="column px-6 pb-[87px]">
    <q-form @submit.prevent="onSubmit">
      <s-field label="비밀번호 확인">
        <a-input
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 입력"
          class="mt-[30px]"
          v-model="password"
        />
      </s-field>
      <div class="w-screen -ml-6 p-4 fixed bottom-0 bg-white">
        <a-btn type="submit" class="w-full h-[55px]" label="완료" />
      </div>
    </q-form>
  </q-page>
</template>
