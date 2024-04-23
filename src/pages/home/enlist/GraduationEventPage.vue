<script lang="ts" setup></script>

<template>
  <q-page class="px-6 pt-[10px] bg-grey">
    <div
      class="w-full h-[93px] bg-[#fff] rounded-[5px] flex flex-col justify-center items-center"
    >
      <p class="text-[17px] leading-[25px] font-medium">
        🕗 행사시작 <span class="text-primary">11:00</span>
      </p>
      <p class="mt-[6px] font-pretendard text-base leading-[19px]">
        (부대출입 가능시간 10:00~)
      </p>
    </div>

    <section class="mt-[42px]">
      <a-title>주요내용</a-title>
      <a-body-text>text text text</a-body-text>
    </section>

    <section class="py-5 grid grid-cols-1 gap-5">
      <div>
        <a-subtitle>수료증서 및 상장수여</a-subtitle>
        <div class="flex gap-[7px] mt-[5px]">
          <q-img src="~assets/images/enlist_event_01.png" class="flex-1" />
          <q-img src="~assets/images/enlist_event_02.png" class="flex-1" />
        </div>
      </div>
      <div>
        <a-subtitle>수료신고</a-subtitle>
        <div class="flex gap-[7px] mt-[5px]">
          <q-img src="~assets/images/enlist_event_03.png" class="flex-1" />
          <q-img src="~assets/images/enlist_event_04.png" class="flex-1" />
        </div>
      </div>
      <div class="">
        <a-subtitle>우리의 다짐 제창</a-subtitle>
        <div class="flex gap-[7px] mt-[5px]">
          <q-img src="~assets/images/enlist_event_05.png" class="flex-1" />
          <q-img src="~assets/images/enlist_event_06.png" class="flex-1" />
        </div>
      </div>
      <div>
        <a-subtitle>태극기 부착</a-subtitle>
        <div class="flex gap-[7px] mt-[5px]">
          <q-img src="~assets/images/enlist_event_05.png" class="flex-1" />
          <q-img src="~assets/images/enlist_event_06.png" class="flex-1" />
        </div>
      </div>
    </section>
  </q-page>
</template>

<style lang="scss" scoped></style>
