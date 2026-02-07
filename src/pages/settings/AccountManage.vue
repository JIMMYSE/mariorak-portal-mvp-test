<script setup lang="ts">
const accountInfo = ref({
  loginId: 'applepie@gmail.com',
  socialType: 'apple',
  phone: '010-1234-5678',
  phoneVerified: true,
});

const snsLinks = ref([
  { name: '카카오 로그인 연결', connected: true },
  { name: '구글 로그인 연결', connected: false },
  { name: '네이버 로그인 연결', connected: false },
  { name: '애플 로그인 연결', connected: false },
]);
</script>

<template>
  <q-page class="bg-white pb-20">
    <div class="mx-4 mt-4 bg-white rounded-lg border border-grey-1 p-4">
      <!-- 로그인 ID -->
      <div class="flex justify-between items-center py-3">
        <span class="text-[14px] text-grey-5">로그인 ID</span>
        <div class="flex items-center gap-2">
          <q-icon :name="`img:/icons/icon_${accountInfo.socialType}.svg`" size="24px" />
          <span class="text-[14px] text-grey-4">{{ accountInfo.loginId }}</span>
        </div>
      </div>
      <q-separator />

      <!-- 휴대폰 번호 -->
      <div class="py-3">
        <div class="flex justify-between items-center">
          <span class="text-[14px] text-grey-5">휴대폰 번호</span>
          <span class="text-[14px] text-grey-4">{{ accountInfo.phone }}</span>
        </div>
        <div class="flex justify-end mt-2" v-if="!accountInfo.phoneVerified">
          <span class="px-3 py-1 rounded-full text-[12px] font-medium border border-primary text-primary cursor-pointer">
            휴대폰 인증
          </span>
        </div>
      </div>
      <q-separator />

      <!-- SNS 계정연동 -->
      <div class="py-3">
        <span class="text-[14px] text-grey-5">SNS 계정연동</span>
      </div>
      <div v-for="sns in snsLinks" :key="sns.name" class="flex justify-between items-center py-3">
        <span class="text-[14px] text-grey-5">{{ sns.name }}</span>
        <q-toggle v-model="sns.connected" color="pink" />
      </div>
      <q-separator />
    </div>
  </q-page>
</template>
