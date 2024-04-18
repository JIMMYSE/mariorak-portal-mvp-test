<!-- 회원가입 인트로 -->

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup';
import { QIcon } from 'quasar';
import { useJoinService } from 'src/composables/auth/auth';
import { useExistingUserDialog } from 'src/composables/auth/useExistingUserDialog';
import { goToName } from 'src/composables/common/app';
import {
  useAlertDialog,
  useConfirmFullDialog,
} from 'src/composables/common/dialog';
import { quasarVeeConfig } from 'src/composables/common/veeValidate';
import { JoinForm, JoinFormSchema } from 'src/services/auth/auth-model';
import { useJoinStore } from 'src/stores/join-store';
import { useForm } from 'vee-validate';
import { h } from 'vue';

const store = useJoinStore();
store.reset();

/**
 * =========================================================================
 * Vee Validation
 */
const {
  handleSubmit,
  meta: formMeta,
  defineField,
} = useForm<JoinForm>({
  validationSchema: toTypedSchema(JoinFormSchema),
  initialValues: {
    email: store.getEmail(),
  },
});

// /** @see { @link https://vee-validate.logaretm.com/v4/examples/ui-libraries } */
const [email, emailProps] = defineField<'email', string>(
  'email',
  quasarVeeConfig
);

const [password, passwordProps] = defineField<'password', string>(
  'password',
  quasarVeeConfig
);
const [passwordConfirm, passwordConfirmProps] = defineField<
  'passwordConfirm',
  string
>('passwordConfirm', quasarVeeConfig);

/**
 * =========================================================================
 * Handle submit
 */
const { findExistingEmailAddress } = useJoinService();
const onSubmit = handleSubmit(async (values) => {
  const { email, password } = values;
  const { data, error } = await findExistingEmailAddress(email);

  if (error) {
    useAlertDialog({ text: (error as any).message });
    return;
  } else if (!!data) {
    // 이미 가입된 이메일 계정이 있는 경우
    console.log('The email address is already in use');
    useExistingUserDialog(data.eml_addr, 'local');
  } else {
    // 이미 가입된 이메일 계정이 없는 경우
    store.setEmail(email);
    store.setPassword(password);
    goToName('join-mobile', { email });
  }
});
</script>

<template>
  <q-page class="column pb-[87px]">
    <q-form @submit.prevent="onSubmit">
      <q-card class="full-width" flat>
        <q-card-section class="pt-10 px-6 pb-0">
          <h3 class="text-h3">
            서로버스에 사용하실 <br /><span class="text-primary"
              >이메일 주소</span
            >, <span class="text-primary">비밀번호</span>를 입력해 주세요
          </h3>
        </q-card-section>
        <q-card-section class="px-6 pt-0">
          <s-field label="이메일 아이디">
            <a-input
              name="email"
              v-model="email"
              maxlength="100"
              placeholder="이메일 주소를 입력해 주세요."
              bottom-slots
              v-bind="emailProps"
              autofocus
            />
          </s-field>
          <s-field label="비밀번호">
            <a-input
              type="password"
              name="password"
              v-model="password"
              maxlength="16"
              placeholder="비밀번호를 입력해 주세요."
              hint="🔒 영문, 숫자, 특수문자 포함 10~16자리 이내"
              password-toggle-icon
              bottom-slots
              v-bind="passwordProps"
            />
          </s-field>
          <s-field label="비밀번호 확인">
            <a-input
              type="password"
              name="passwordConfirm"
              v-model="passwordConfirm"
              maxlength="16"
              placeholder="비밀번호를 한번 더 입력해 주세요."
              password-toggle-icon
              bottom-slots
              v-bind="passwordConfirmProps"
            />
          </s-field>
        </q-card-section>
      </q-card>
      <section class="px-4 fixed inset-x-0 bottom-0 bg-white p-4">
        <a-btn
          type="submit"
          class="full-width h-[55px]"
          label="확인"
          :disable="!formMeta.valid"
        />
      </section>
    </q-form>
  </q-page>
</template>

<style scoped lang="scss"></style>
