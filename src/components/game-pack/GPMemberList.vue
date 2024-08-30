<script lang="ts" setup>
import { ref } from 'vue';

interface User {
  name: string;
  role: string;
  avatar: string;
  manager: boolean;
}

const users = ref<User[]>([
  {
    name: '가나다라마바사',
    role: 'UI/UX Designer',
    avatar: '/images/dummy/member_dummy1.jpg',
    manager: true,
  },
  {
    name: '김민지',
    role: '3D Designer',
    avatar: '/images/dummy/member_dummy2.png',
    manager: false,
  },
  {
    name: '오정아',
    role: 'Programmer',
    avatar: '/images/dummy/member_dummy3.png',
    manager: false,
  },
]);
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="user in users"
      :key="user.name"
      class="flex items-center pb-[15px]"
    >
      <div>
        <c-img
          :src="user.avatar"
          :alt="user.name"
          class="w-[60px] h-[60px] rounded-full"
        >
        </c-img>
        <q-icon
          v-if="user.manager"
          name="img:/icons/icon_pm_badge.svg"
          size="20px"
          class="absolute z-10 left-[65px]"
        />
      </div>

      <div class="flex flex-col ml-[12px]">
        <p class="text-[#222222] text-base font-medium leading-snug">
          {{ user.name }}
        </p>
        <p class="text-[#056bf1] text-xs font-semibold leading-none mt-[2px]">
          {{ user.role }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
