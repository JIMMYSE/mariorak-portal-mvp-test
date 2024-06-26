<!-- 설정 > 계정 설정 > 비밀번호 변경 -->

<script setup lang="ts">
// 현재 비밀번호 확인 여부
const isConfirmed = ref(false);

const onComplete = () => {
  setTimeout(() => {
    goToName('setting');
  }, 1000);
};
</script>

<template>
  <q-page class="px-8 bg-grey">
    <password-confirm v-if="!isConfirmed" v-model:is-confirmed="isConfirmed" />
    <password-new v-else @on-complete="onComplete" />
  </q-page>
</template>
