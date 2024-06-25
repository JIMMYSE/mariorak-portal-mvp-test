<!-- 설정 > 계정 설정 > 비밀번호 변경 -->

<script setup lang="ts">
async function onSuccess(values: { email: string; password: string }) {
  console.log('onSubmit', values);
}

const onSubmit = () => {
  goToName('setting');
};

const { fields } = useAuthForm({
  needPasswordConfirm: false,
  onSuccess,
});
const { password, passwordProps, passwordConfirm, passwordConfirmProps } =
  fields;

// 현재 비밀번호 확인 여부
const isConfirmed = ref(false);
</script>

<template>
  <q-page class="px-8 bg-grey">
    <div class="pt-[40px]">
      <p class="text-[17px] leading-relaxed">
        <template v-if="!isConfirmed">
          <span class="text-primary">현재 비밀번호</span>를 입력해 주세요.
        </template>
        <template v-else>
          비밀번호 변경을 위한
          <br />
          <span class="text-primary">새 비밀번호</span>를 입력해 주세요.
        </template>
      </p>
    </div>
    <q-form @submit.prevent="onSubmit">
      <a-field label="비밀번호" class="mt-[30px]">
        <a-input
          v-model="password"
          name="password"
          type="password"
          placeholder="영문 대소문자, 숫자 포함 최소 10자리"
          autofocus
          v-bind="passwordProps"
        />
      </a-field>
      <a-field label="비밀번호 확인">
        <a-input
          type="password"
          v-model="passwordConfirm"
          placeholder="비밀번호 확인"
          :inline-counter="false"
          v-bind="passwordConfirmProps"
        />
      </a-field>
    </q-form>
    <div class="absolute bottom-0 bg-primary w-full h-[64px] left-0">
      <button
        type="submit"
        @click="onSubmit"
        class="text-center text-white font-base font-medium size-full flex justify-center items-center"
      >
        확인
      </button>
    </div>
  </q-page>
</template>
