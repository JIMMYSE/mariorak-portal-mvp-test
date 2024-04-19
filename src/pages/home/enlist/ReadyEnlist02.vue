<script lang="ts" setup></script>

<template>
  <q-page class="px-6 flex flex-col">
    <div class="btn-group mt-[15px] flex gap-[5px]">
      <div
        class="level-btn w-[78px] text-center text-[13px] font-medium leading-[40px] h-[40px] !border border-grey-1 rounded-[20px]"
      >
        장교
      </div>
      <div
        class="level-btn w-[78px] text-center text-[13px] font-medium leading-[40px] h-[40px] !border border-grey-1 rounded-[20px]"
      >
        부사관
      </div>
      <div
        class="level-btn w-[78px] text-center text-[13px] font-medium leading-[40px] h-[40px] !border border-grey-1 rounded-[20px]"
      >
        병사
      </div>
      <div
        class="level-btn w-[78px] text-center text-[13px] font-medium leading-[40px] h-[40px] !border border-grey-1 rounded-[20px]"
      >
        유의사항
      </div>
    </div>

    <section class="mt-10">
      <h3 class="text-[15px] leading-[22px] font-medium">🚨 필수 지참 목록</h3>
      <div
        class="rounded-[5px] border border-grey-1 mt-[10px] p-[15px] text-base text-grey-4 h-[142px]"
      >
        지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능
        품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목
        입니다.
      </div>
    </section>

    <section class="mt-5">
      <h3 class="text-[15px] leading-[22px] font-medium">😃 지참 가능 품목</h3>
      <div
        class="rounded-[5px] border border-grey-1 mt-[10px] p-[15px] text-base text-grey-4 h-[142px]"
      >
        지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능
        품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목
        입니다.
      </div>
    </section>

    <section class="mt-5">
      <h3 class="text-[15px] leading-[22px] font-medium">⛔ 지참 불가 항목</h3>
      <div
        class="rounded-[5px] border border-grey-1 mt-[10px] p-[15px] text-base text-grey-4 h-[142px]"
      >
        지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능
        품목 입니다.지참가능 품목 입니다.지참가능 품목 입니다.지참가능 품목
        입니다.
      </div>
    </section>
  </q-page>
</template>

<style lang="scss" scoped>
.level-btn:hover {
  background-color: #196af5;
  color: #fff;
  border: none;
}
</style>
