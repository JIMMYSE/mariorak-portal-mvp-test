<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup';
import ReportAlert from 'src/components/auth/ReportAlert.vue';
import SocialLoginGroup from 'src/components/auth/SocialLoginGroup.vue';
import ACheckbox from 'src/components/form/ACheckbox.vue';
import { useAutoLogin, useLogin } from 'src/composables/auth/auth';
import { goToName } from 'src/composables/common/app';
import {
  useAlertDialog,
  useConfirmDialog,
  useDialog,
} from 'src/composables/common/dialog';
import { quasarVeeConfig } from 'src/composables/common/veeValidate';
import { useForm } from 'vee-validate';
import { MaybeRef } from 'vue';
import { toValue } from 'vue';
import { h } from 'vue';
import { InferType, object, string } from 'yup';

const LoginFormSchema = object({
  email: string().email().required(),
  password: string().required(),
});
const isAutoLogin = useAutoLogin();
const {
  handleSubmit,
  meta: formMeta,
  defineField,
} = useForm<InferType<typeof LoginFormSchema>>({
  validationSchema: toTypedSchema(LoginFormSchema),
  initialValues: {
    email: '',
    password: '',
  },
});

/** @see { @link https://vee-validate.logaretm.com/v4/examples/ui-libraries } */
const [email, emailProps] = defineField<'email', string>(
  'email',
  quasarVeeConfig
);
const [password, passwordProps] = defineField<'password', string>(
  'password',
  quasarVeeConfig
);

function openReportAlert(reportedCount: number, maxCount: number = 3) {
  if (reportedCount < maxCount)
    useDialog({
      contentComponent: h(ReportAlert, { reportedCount, maxCount }),
      buttons: [],
    }).onDismiss(() => {
      goToName('main');
    });
  else
    useAlertDialog({
      htmlTitle: '<span class="text-primary">계정 삭제</span>알림',
      htmlText: `<p>사용자님께서 릴레이 창작전에서 등록하였던<br/>
글의 신고횟수가 ${maxCount}회를 넘었습니다. <br/>
따라서 해당 계정은 삭제 처리 되었습니다. <br/>
감사합니다.</p>`,
    });
}

const { login } = useLogin();
const onSubmit = handleSubmit(async (values) => {
  const { email, password } = values;
  console.log('onSubmit', email, password);
  const { data, isSuccess, error } = await login(email, password);
  if (!data.value) return;

  console.log('LoginPage::', data, isSuccess, error);
  handleLoginResult({ data, isSuccess });
});

function handleLoginResult(payload: {
  data: MaybeRef<{
    current_reported_cnt: number;
    max_reported_cnt: number;
  }>;
  isSuccess: MaybeRef<boolean>;
  error: MaybeRef<any>;
}) {
  const { data, isSuccess, error } = payload;
  const _data = toValue(data);
  const _isSuccess = toValue(isSuccess);
  const _error = toValue(error);
  console.log('LoginPage:: handleLoginSuccess', _data, _isSuccess, _error);
  if (_data.current_reported_cnt >= _data.max_reported_cnt) {
    openReportAlert(_data.current_reported_cnt, _data.max_reported_cnt);
  } else {
    goToName('main');
  }
}

function onSocialLoginFail(error: any) {
  console.warn('onSocialLoginFail', error);
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
  <QPage class="column justify-center">
    <QCard class="full-width p-[8px] mt-[20px]" :flat="true">
      <!-- EMAIL LOGIN -->
      <QCardSection class="mb-[24px]">
        <div class="text-left q-mb-sm">
          <QIcon class="q-pr-lg" size="30px">
            <img src="~assets/images/main-logo.png" />
          </QIcon>
        </div>
        <div class="text-left" style="font-size: 28px">
          <span class="text-primary">이메일로</span> 로그인
        </div>
      </QCardSection>

      <QCardSection>
        <QForm @submit.prevent="onSubmit">
          <AInput
            type="text"
            input-class="text-primary font-light"
            ref="loginIdInput"
            v-model="email"
            :placeholder="$t('auth.email.required')"
            autofocus
            v-bind="emailProps"
          />
          <AInput
            type="password"
            class="mt-[15px]"
            input-class="text-primary text-weight-light"
            v-model="password"
            ref="passwordInput"
            :placeholder="$t('auth.password.required')"
            v-bind="passwordProps"
          />
          <ABtn
            type="submit"
            class="full-width mt-[25px] text-[18px] font-medium"
            style="min-height: 55px"
            :label="$t('label.login')"
            :disable="!formMeta.valid"
          />
          <!-- :disable="!email || !password" -->
        </QForm>
        <div class="row justify-between text-caption text-grey-5 pt-2">
          <ACheckbox
            :label="$t('label.autoLogin')"
            class="font-light"
            v-model="isAutoLogin"
          />
          <div class="">
            <ABtn
              class="text-grey-5 text-caption q-pa-sm font-light"
              flat
              :label="$t('label.findUser')"
              @click="goToName('find-user')"
            />
            <span class="text-grey-2">|</span>
            <ABtn
              class="text-grey-5 text-caption q-pa-sm font-light"
              flat
              :label="$t('label.join')"
              @click="goToName('join')"
            />
          </div>
        </div>
      </QCardSection>

      <!-- OTHER LOGIN -->
      <QCardSection>
        <div class="row justify-between items-center mb-[36px] mt-[42px]">
          <div class="bar"></div>
          <span class="px-[28px] text-caption font-medium text-grey-3">
            간편로그인
          </span>
          <div class="bar"></div>
        </div>
        <social-login-group
          type="login"
          @login="handleLoginResult"
          @error="onSocialLoginFail"
        />
      </QCardSection>
    </QCard>
  </QPage>
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
