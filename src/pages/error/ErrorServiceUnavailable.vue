<script setup lang="ts">
import { useBridge } from 'src/composables/common/useBridge';
import { ref } from 'vue';

// TODO : Get data from API
const data =
  ref(`2024년 01월 15일 (월)<br />오후 13시 30분 - 14시 30분 까지<br />
(약 1시간)`);

const { closeApp } = useBridge();
</script>

<template>
  <q-page class="column w-full px-6 pb-[87px] pt-[10px]">
    <q-icon
      name="img:/images/icons/icon-awesome-exclamation-circle.svg"
      size="47px"
      class="self-center"
    ></q-icon>
    <div
      class="mt-10 pl-[2px] text-lg font-medium leading-[25px] text-[#FF0000]"
    >
      <span>시스템 점검중</span>
      <span>이예요.</span>
      <br />
    </div>
    <div class="mt-4 pl-[2px]">
      <p class="text-base leading-[25px] font-light">
        서비스 이용에 불편을 드려 죄송합니다.
      </p>
      <p class="mt-6 text-base leading-[25px] font-light">
        보다 나은 서비스를 위한 서버 점검으로 인하여<br />서로버스 서비스 이용이
        일시 중단되었습니다.
      </p>
      <p class="mt-6 text-base leading-[25px] font-light">
        더욱 안정적인 서비스로 보답 드리겠습니다.<br />감사합니다.
      </p>
    </div>

    <q-card
      flat
      class="w-full h-[130px] bg-[#f4f4f4] mt-10 column items-center"
    >
      <p class="mt-[15px] text-sm font-light leading-4">서버 점검시간</p>
      <div
        class="mt-4 text-base text-center font-medium text-primary leading-[25px]"
        v-html="$filterHtml(data)"
      ></div>
    </q-card>

    <div class="w-screen -ml-6 p-4 fixed bottom-0 bg-white">
      <a-btn
        class="w-full h-[55px]"
        label="어플리케이션 종료"
        @click="closeApp"
      />
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
