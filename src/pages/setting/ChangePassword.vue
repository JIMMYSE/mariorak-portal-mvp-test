<!-- 비밀번호 재설정 -->

<!-- 마이페이지 > 비밀번호 변경 -->

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup';
import { usePassword } from 'src/composables/auth/auth';
import { goBack } from 'src/composables/common/app';
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

const onSubmit = handleSubmit(async (values) => {
  const { password } = values;
  console.log('onSubmit', password);
  tryCatchWithLoading(
    async () => {
      await changePasswordWithMobile(Number(props.id), password, props.token);
      useAlertDialog({
        text: '사용자님 아이디의 비밀번호가 변경되었습니다.',
      }).onOk(goBack);
    },
    (error) => useAlertDialog({ text: error.message })
  );
});
</script>

<template>
  <q-page class="column px-6 pb-[87px]">
    <!-- <div class="pt-[40px] text-h3">
      <p>사용자님 아이디의</p>
      <p><span class="text-primary">비밀번호를 변경</span>합니다</p>
    </div>
    <div class="mt-4">
      <p class="text-sm leading-5 font-light">
        비밀번호는 영문, 숫자, 특수문자 조합으로 10자리<br />
        이상, 16자리 이하로만 설정 가능합니다.<br />
        - 허용 가능한 특수문자 : !, @, #, $, %, ^
      </p>
    </div> -->
    <q-form @submit.prevent="onSubmit" class="mt-5">
      <s-field label="비밀 번호" class="mt-[30px]">
        <a-input
          v-model="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          autofocus
          v-bind="passwordProps"
        />
      </s-field>
      <!-- <p class="text-xs mt-2 font-light text-[#888888]">
        🔒 영문, 숫자, 특수문자 포함 10~16자리 이내
      </p> -->
      <s-field label="비밀번호 확인">
        <a-input
          v-model="passwordConfirm"
          name="passwordConfirm"
          type="password"
          placeholder="비밀 번호 확인"
          v-bind="passwordConfirmProps"
        />
      </s-field>
      <div class="w-screen -ml-6 p-4 fixed bottom-0 bg-white">
        <a-btn type="submit" class="w-full h-[55px]" label="완료" />
      </div>
    </q-form>
  </q-page>
</template>
