<!-- 회원가입 -->

<script lang="ts" setup>
import { NicknameForm, NicknameSchema } from 'src/types/auth/auth-model';

const { isLoggedIn } = useUserInfo();
watch(isLoggedIn, (b) => {
  if (b) goToName('main');
});

// const joinStore = useJoinStore();
// const { joinData } = storeToRefs(joinStore);
// const { encodeByAES256 } = useCryptoJS();

const {
  meta,
  errors,
  errorBag,
  values: form,
  handleSubmit,
  setErrors,
} = useForm<NicknameForm>({
  validationSchema: toTypedSchema(NicknameSchema),
});

const onSubmit = handleSubmit(() => {
  // joinStore.$init();
  // if (!joinData.value) return;
  goToName('join-avatar');
});
</script>

<template>
  <q-page class="px-6 bg-white">
    <div class="pt-10 text-h2 font-semibold text-[24px]">
      <p>사용하실</p>
      <p>닉네임을 알려주세요</p>
    </div>

    <form>
      <c-field label="닉네임" class="mt-8">
        <c-input
          name="nickname"
          placeholder="닉네임을 입력해 주세요"
          :maxlength="10"
          autofocus
          check-badwords
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
