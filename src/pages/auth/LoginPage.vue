<script setup lang="ts">
import ACheckbox from 'src/components/form/ACheckbox.vue';
import { useAutoLogin } from 'src/composables/auth/auth';
import { useAuthForm } from 'src/composables/auth/useAuthForm';
import { goToName } from 'src/composables/common/app';
import { useAlertDialog } from 'src/composables/common/dialog';
import { useAuthStore } from 'src/stores/auth-store';

const isAutoLogin = useAutoLogin();
let isWithdrawing = false;

const { login } = useLogin();
const onSuccess = async (values: { email: string; password: string }) => {
  const { email, password } = values;

  const { data, isSuccess, error } = await login(email, password);
  if (!data.value) return;

  handleLoginResult({ isWithdrawing, isSuccess: isSuccess.value });
  isWithdrawing = false;
};

const { fields, formMeta, onSubmit } = useAuthForm({
  needPasswordConfirm: false,
  onSuccess,
});
const { email, emailProps, password, passwordProps } = fields;
const store = useAuthStore();
function handleLoginResult({
  isWithdrawing,
  isSuccess,
}: {
  isWithdrawing: boolean;
  isSuccess: boolean;
}) {
  if (isWithdrawing) {
    useAlertDialog({
      text: 'auth.withdrawal.text',
    });
  } else if (isSuccess) {
    goToName('main');
  }
}

// function confirmToChangePassword() {
//   showConfirm({
//     data: {
//       title: '비밀번호 변경안내',
//       text:
//         '안전한 사용을 위해 6개월 이상 비밀번호를 변경하지 않은 경우' +
//         '비밀번호 변경에 대한 안내를 드립니다. 비밀번호를 변경해 주세요.',
//     },
//     actions: [
//       { label: '6개월 후 변경하기', value: false },
//       { label: '지금 변경하기', value: true },
//     ],
//   })
//     .onCancel(() => {
//       // TODO: defer changing password
//       store.deferChangingPassword();
//       router.push('/');
//     })
//     .onOk(onChangePassword);
// }
</script>

<template>
  <q-page class="column justify-center items-center px-6 bg-grey">
    <q-img src="~assets/images/main-logo-blue.png" width="173px" height="45" />
    <q-card class="w-full mt-12 bg-transparent" :flat="true">
      <!-- EMAIL LOGIN -->
      <q-card-section>
        <q-form @submit.prevent="onSubmit">
          <a-input
            type="text"
            input-class="text-primary font-light"
            ref="loginIdInput"
            v-model="email"
            :placeholder="$t('label.id')"
            autofocus
            v-bind="emailProps"
          />
          <a-input
            type="password"
            class="mt-[15px]"
            input-class="text-primary text-weight-light"
            v-model="password"
            ref="passwordInput"
            :placeholder="$t('label.password')"
            v-bind="passwordProps"
          />
          <a-checkbox
            :label="$t('label.autoLogin')"
            class="text-caption"
            v-model="isAutoLogin"
          />
          <a-btn
            type="submit"
            class="full-width mt-[25px] text-[18px] font-medium"
            style="min-height: 50px"
            :label="$t('label.login')"
            :disable="!formMeta.valid"
          />
          <!-- :disable="!email || !password" -->
        </q-form>
        <div class="w-full flex justify-center items-center mt-3">
          <a-btn
            class="text-grey-5 text-caption q-pa-sm font-light"
            flat
            :label="$t('label.join')"
            @click="goToName('join-email')"
          />
          <span class="text-grey-2">|</span>
          <a-btn
            class="text-grey-5 text-caption q-pa-sm font-light"
            flat
            :label="$t('label.findPassword')"
            @click="goToName('find-password')"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped lang="scss">
.bar {
  padding: 0 24px;
  flex: 1;
  height: 0px;
  /* UI Properties */
  border: 1px solid $grey-2;
  border: 1px solid #e6e6e6;
  opacity: 1;
}

.q-field--outlined .q-field__control {
  height: 55px;
}
:deep(.q-btn--round) {
  min-width: 35px;
  min-height: 35px;
}
</style>
