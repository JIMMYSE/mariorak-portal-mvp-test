<!-- 회원가입 -->

<script lang="ts" setup>
import { JoinForm } from 'src/services/auth/auth-model';

const { isLoggedIn } = useUserInfo();
watch(isLoggedIn, (b) => {
  if (b) goToName('main');
});

const joinStore = useJoinStore();
const { joinData } = storeToRefs(joinStore);
const { encodeByAES256 } = cryptoJS();

const {
  meta,
  errors,
  errorBag,
  values: form,
  handleSubmit,
} = useForm<JoinForm>({
  validationSchema: toTypedSchema(JoinFormSchema),
});

const onSubmit = handleSubmit(async () => {
  joinStore.$init();
  if (!joinData.value) return;
  joinData.value.email = form.email;
  joinData.value.password = encodeByAES256(form.passwordInput);
  goToName('join-terms');
});
</script>

<template>
  <q-page class="px-6 bg-grey">
    <div class="pt-10 text-h2 font-medium text-[17px]">
      <p>이메일 인증을 위한</p>
      <p><span class="text-primary">가입정보</span>를 입력해 주세요.</p>
    </div>

    <form>
      <c-field label="아이디 (이메일)" class="mt-8">
        <c-input
          name="email"
          placeholder="이메일 주소 입력"
          :done="!errorBag.email && !!form.email!.length"
          :maxlength="320"
          autofocus
        />
      </c-field>
      <c-field label="비밀번호">
        <c-input
          type="password"
          name="passwordInput"
          :maxlength="16"
          :placeholder="$t('auth.password.placeholder')"
          :done="!errorBag.passwordInput && form.passwordInput!.length >= 10"
          :clearable="false"
        />
      </c-field>
      <c-field label="비밀번호 확인">
        <c-input
          type="password"
          name="passwordConfirmInput"
          :maxlength="16"
          placeholder="비밀번호 확인"
          :done="!errorBag.passwordConfirmInput && form.passwordConfirmInput!.length >= 10"
          :clearable="false"
        />
      </c-field>
    </form>
    <div
      class="absolute bottom-0 bg-primary w-full h-[64px] left-0"
      :class="{
        'bg-primary': meta.valid,
        'bg-grey-2': !meta.valid,
      }"
    >
      <button
        type="submit"
        class="text-center text-white font-base font-medium size-full flex justify-center items-center"
        :disabled="!meta.valid"
        @click="onSubmit"
      >
        다음
      </button>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
