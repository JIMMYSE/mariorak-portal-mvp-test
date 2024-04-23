<script lang="ts" setup></script>

<template>
  <q-page class="px-6 pt-[25px] bg-grey">
    <router-link :to="{ name: 'photo-album-list' }">
      <q-card flat class="relative p-5 w-full h-[100px] bg-white rounded-[5px]">
        <h2 class="flex items-center text-[17px] font-medium text-primary">
          김공군
          <q-icon name="img:/src/assets/icons/icon_arrow_pic.svg" size="16px" />
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
      </q-card>
    </router-link>

    <!-- ADD BUTTON -->
    <q-btn
      outline
      color="primary"
      size="md"
      class="mt-[10px] font-pretendard w-full h-[100px]"
    >
      <q-icon
        name="img:/src/assets/icons/icon_plus.svg"
        size="10px"
        class="mr-1"
      />
      즐겨찾기 추가
    </q-btn>
    <!-- MAX FAVORITE ITEMS -->
    <div
      class="mt-[10px] w-full h-[100px] text-center rounded-[5px] border border-grey-2 text-grey-3 text-xs font-pretendard flex justify-center items-center"
    >
      즐겨찾기는 최대 2명까지 가능합니다.
      <br />이미 등록된 즐겨찾기를 취소하신 후 추가해주세요.
    </div>
    <!-- WITH NO FAVORITE ITEMS -->
    <p
      class="mt-5 text-center text-xs font-pretendard text-grey-3 flex justify-center items-center"
    >
      훈련병 등록 후 사진을 볼 수 있습니다.
      <br />즐겨찾기 추가를 통해 훈련병을 등록해 주세요.
    </p>
  </q-page>
</template>

<style lang="scss" scoped></style>
