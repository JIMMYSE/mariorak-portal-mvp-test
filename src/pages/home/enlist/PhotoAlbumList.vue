<script lang="ts" setup></script>

<template>
  <q-page class="px-6 pt-[25px] bg-grey">
    <div class="relative p-5 w-full h-[100px] bg-white rounded-[5px]">
      <h2
        class="relative text-[17px] font-medium text-primary after:content-[''] after:absolute after:left-[14%] after:top-[20%] after:w-4 after:h-4 after:bg-[url('/src/assets/icons/icon_arrow_pic.svg/')]"
      >
        김공군
      </h2>
      <p class="font-pretendard text-sm text-grey-5 leading-[18px]">
        [신병 n 대대]<br />
        신병 231기 21중대 2소대 12번
      </p>
      <q-icon
        name="img:/src/assets/icons/icon_heart.svg"
        size="40px"
        class="absolute top-1 right-1"
      ></q-icon>
    </div>

    <div
      class="mt-[10px] relative w-full h-[100px] rounded-[5px] border border-[#196af5] text-primary text-sm font-pretendard flex justify-center items-center before:absolute before:content-[''] before:bg-[url('/src/assets/icons/icon_plus.svg')] before:w-[10px] before:h-[10px] before:bg-cover before:bg-no-repeat before:left-[33%]"
    >
      즐겨찾기 추가
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
