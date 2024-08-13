<script lang="ts" setup></script>

<template>
  <q-page class="px-6 pt-[10px] bg-grey">
    <div
      class="w-full h-[93px] bg-[#fff] rounded-[5px] flex flex-col justify-center items-center"
    >
      <p class="text-[17px] leading-[25px] font-medium">
        🕗 행사시작 <span class="text-primary">14:00</span>
      </p>
      <p class="mt-[6px] font-pretendard text-base leading-[19px]">
        (부대출입 가능시간 12:00~)
      </p>
    </div>

    <section class="mt-[42px]">
      <c-title>주요내용</c-title>
      <c-body-text> 입영시 진행되는 주요 행사를 확인해보세요. </c-body-text>
    </section>

    <section class="py-5 grid grid-cols-1 gap-5">
      <div>
        <c-subtitle>생활관 견학</c-subtitle>
        <div class="flex gap-[7px] mt-[5px]">
          <q-img src="/images/enlist_event_01.png" class="flex-1" />
          <q-img src="/images/enlist_event_02.png" class="flex-1" />
        </div>
      </div>
      <div>
        <c-subtitle>의장대 공연</c-subtitle>
        <div class="flex gap-[7px] mt-[5px]">
          <q-img src="/images/enlist_event_03.png" class="flex-1" />
          <q-img src="/images/enlist_event_04.png" class="flex-1" />
        </div>
      </div>
      <div>
        <c-subtitle>입영식</c-subtitle>
        <div class="flex gap-[7px] mt-[5px]">
          <q-img src="/images/enlist_event_05.png" class="flex-1" />
          <q-img src="/images/enlist_event_06.png" class="flex-1" />
        </div>
      </div>
      <div>
        <c-subtitle>입영 홍보 부스</c-subtitle>
        <div class="flex gap-[7px] mt-[5px]">
          <q-img src="/images/enlist_event_05.png" class="flex-1" />
          <q-img src="/images/enlist_event_06.png" class="flex-1" />
        </div>
      </div>
    </section>
  </q-page>
</template>

<style lang="scss" scoped></style>
