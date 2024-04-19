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

    <div class="flex-1 rounded-[5px] border border-grey-1 mt-10 text-center">
      유의사항 이미지 영역
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
