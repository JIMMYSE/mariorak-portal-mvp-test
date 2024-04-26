<script lang="ts" setup>
import { ref } from 'vue';

const email = ref('');
</script>

<template>
  <q-page class="px-6 pt-10 bg-grey flex flex-col">
    <h2 class="text-[17px] font-medium leading-[26px]">
      가입했던 이메일을 입력하시면<br />
      <span class="text-primary">비밀번호 재설정 메일</span>을 보내드려요.
    </h2>
    <form class="mb-32">
      <p class="mt-[30px] text-[13px] text-grey-3 font-medium">
        아이디 (이메일)
      </p>
      <a-input
        type="email"
        placeholder="이메일 주소 입력"
        v-model="email"
        color="black"
        class="mt-[5px] w-full"
      />
    </form>
    <div
      class="fixed inset-x-0 bottom-0 h-16 leading-16 w-full font-medium text-base z-10"
    >
      <q-btn class="size-full" color="primary" square unelevated>다음</q-btn>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
