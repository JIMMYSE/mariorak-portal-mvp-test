<!-- 비밀번호 재설정 -->

<!-- 마이페이지 > 비밀번호 변경 -->

<script setup lang="ts">
// import { toTypedSchema } from '@vee-validate/yup';
import { usePassword } from 'src/composables/auth/auth';
import { goToName } from 'src/composables/common/app';
// import { useAlertDialog } from 'src/composables/common/dialog';
import useTryCatchWithLoading from 'src/composables/common/useTryCatchWithLoading';
import { quasarVeeConfig } from 'src/composables/common/veeValidate';
// import {
//   ChangePasswordForm,
//   // ChangePasswordFormSchema,
// } from 'src/services/auth/auth-model';
// import { useForm } from 'vee-validate';

type Props = { id: string; token: string };
const props = defineProps<Props>();

/**
 * =========================================================================
 * Vee Validation
 */
// const { handleSubmit, defineField } = useForm<ChangePasswordForm>({
//   // validationSchema: toTypedSchema(ChangePasswordFormSchema),
// });

// /** @see { @link https://vee-validate.logaretm.com/v4/examples/ui-libraries } */
// const [password, passwordProps] = defineField<'password', string>(
//   'password',
//   quasarVeeConfig
// );
// const [passwordConfirm, passwordConfirmProps] = defineField<
//   'passwordConfirm',
//   string
// >('passwordConfirm', quasarVeeConfig);

// const { tryCatchWithLoading } = useTryCatchWithLoading();
// const { changePasswordWithMobile } = usePassword();

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

async function onSuccess(values: { password: string }) {
  console.log('onSubmit', values);
  goToName('setting-change-password');
}

const { fields } = useAuthForm({
  needPasswordConfirm: false,
  onSuccess,
});
const { password, passwordProps } = fields;
</script>

<template>
  <q-page class="px-6 bg-grey">
    <div class="pt-[40px] text-h2 font-rokaf font-bold">
      <p>비밀번호 확인을 위한</p>
      <p><span class="text-primary">현재 비밀번호</span>를 입력해 주세요.</p>
    </div>
    <q-form @submit.prevent="onSubmit">
      <a-field label="비밀번호">
        <a-input
          type="password"
          v-model="password"
          :placeholder="$t('label.password')"
          :inline-counter="false"
          v-bind="passwordProps"
        />
      </a-field>
    </q-form>
    <div class="absolute bottom-0 bg-primary w-full h-[64px] left-0">
      <button
        @click="onSubmit"
        type="submit"
        class="text-center text-white font-base font-medium size-full flex justify-center items-center"
      >
        확인
      </button>
    </div>
  </q-page>
</template>
