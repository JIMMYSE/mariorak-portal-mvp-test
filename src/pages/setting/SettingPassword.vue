<!-- 설정 > 계정 설정 > 비밀번호 변경 -->

<script setup lang="ts">
// async function onSuccess(values: { email: string; password: string }) {
//   console.log('onSubmit', values);
// }

// const onSubmit = () => {
//   goToName('setting');
// };

// const { fields } = useAuthForm({
//   needPasswordConfirm: false,
//   onSuccess,
// });
// const { password, passwordProps, passwordConfirm, passwordConfirmProps } =
//   fields;

// 현재 비밀번호 확인 여부
const isConfirmed = ref(true);

const onComplete = () => {
  setTimeout(() => {
    goToName('setting');
  }, 2000);
};
</script>

<template>
  <q-page class="px-8 bg-grey">
    <password-confirm v-if="!isConfirmed" v-model:is-confirmed="isConfirmed" />
    <password-new v-else @on-complete="onComplete" />
  </q-page>
</template>
