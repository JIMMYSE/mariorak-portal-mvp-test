<script lang="ts" setup>
import { ref } from 'vue';

interface User {
  name: string;
  role: string;
  avatar: string;
  like: string | number;
}

const users = ref<User[]>([
  {
    name: '가나다라마바사',
    role: 'UI/UX Designer',
    avatar: '/images/dummy/member_dummy1.jpg',
    like: 1,
  },
  {
    name: '김민지',
    role: '3D Designer',
    avatar: '/images/dummy/member_dummy2.png',
    like: 1,
  },
  {
    name: '오정아',
    role: 'Programmer',
    avatar: '/images/dummy/member_dummy3.png',
    like: 1,
  },
]);
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="user in users"
      :key="user.name"
      class="flex items-center py-[15px] border-b-[1px] border-[#f0f0f0]"
    >
      <div>
        <c-img
          :src="user.avatar"
          :alt="user.name"
          class="w-[40px] h-[40px] rounded-full"
        ></c-img>
      </div>

      <div class="flex justify-between items-end ml-[12px] flex-1">
        <div>
          <p class="text-[#222222] text-base font-semibold leading-snug">
            {{ user.name }}
          </p>
          <p class="text-[#767676] text-sm font-normal leading-tight">
            {{ user.role }}
          </p>
        </div>
        <div class="ml-auto">
          <q-icon name="img:/icons/icon_comment.svg" size="20px" />
          <span class="text-[#767676] text-sm font-normal leading-tight"
            >25</span
          >
        </div>
      </div>

      <p class="mt-[10px] text-[#767676] text-sm font-normal leading-tight">
        게임을 체험한 서포터즈가 작성한 리뷰입니다게임을 체험한 서포터즈가
        작성한 리뷰입니다게임을 체험한 서포터즈가 작성한 리뷰입니다게임을 체험한
        서포터즈가 작성한 리뷰입니다 게임을 체험한 서포터즈가 작성한 리뷰입니다
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
