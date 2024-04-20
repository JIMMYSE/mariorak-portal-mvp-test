<script lang="ts" setup></script>

<template>
  <q-page class="px-6 flex flex-col">
    <div class="btn-group mt-[15px] flex gap-[5px]">
      <div
        class="level-btn w-[78px] text-center text-[13px] font-medium leading-[40px] h-[40px] !border border-grey-1 rounded-[20px]"
      >
        자동차
      </div>
      <div
        class="level-btn w-[78px] text-center text-[13px] font-medium leading-[40px] h-[40px] !border border-grey-1 rounded-[20px]"
      >
        버스
      </div>
      <div
        class="level-btn w-[78px] text-center text-[13px] font-medium leading-[40px] h-[40px] !border border-grey-1 rounded-[20px]"
      >
        기차
      </div>
      <div
        class="level-btn w-[78px] text-center text-[13px] font-medium leading-[40px] h-[40px] !border border-grey-1 rounded-[20px]"
      >
        항공기
      </div>
    </div>

    <div
      class="flex-1 flex justify-center items-center rounded-[5px] border border-grey-1 mt-10 text-center text-grey-3"
    >
      <p>관련 이미지 영역</p>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.level-btn:hover {
  background-color: #196af5;
  color: #fff;
  border: none;
}
</style>
