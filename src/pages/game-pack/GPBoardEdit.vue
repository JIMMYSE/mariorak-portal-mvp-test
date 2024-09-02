<script lang="ts" setup>
import CBottomSheet from 'src/components/common/layout/CBottomSheet.vue';
const showBottomSheet = ref(false);
const openCategoryBottomSheet = () => {
  showBottomSheet.value = !showBottomSheet.value;
};
</script>
<template>
  <div class="h-full">
    <section class="px-6">
      <p class="text-[#767676] text-xs font-medium leading-none">
        카테고리 선택
      </p>
      <div
        class="mt-[16px] pb-[14px] border-b border-[#f7f7f7] text-[#b5b5b5] text-lg font-normal leading-[25.20px] flex justify-between items-center"
        @click="openCategoryBottomSheet"
      >
        <p>카테고리를 선택해 주세요.</p>
        <c-icon
          name="icon_enter_arrow"
          size="20px"
          :color="'#767676'"
          :fill="false"
        />
      </div>
    </section>
    <section class="px-6 mt-[30px]">
      <p class="text-[#767676] text-xs font-medium leading-none">글 작성</p>
      <div
        class="mt-[16px] pb-[14px] text-[#b5b5b5] text-lg font-normal leading-[25.20px] flex justify-between items-center"
      >
        <c-input
          class="w-full border-b border-[#f7f7f7] pb-[14px]"
          placeholder="제목을 입력하세요."
          :maxlength="20"
          autofocus
          :outlined="false"
          :rounded="false"
          border-radius="0px"
        />
        <c-input
          class="w-full border-0"
          type="textarea"
          :maxlength="100"
          input-class="h-[163px]"
          placeholder="게시글 내용을 입력해 주세요."
          :outlined="false"
          :rounded="false"
          border-radius="0px"
        />
      </div>
    </section>
    <section class="fixed bottom-[85px] px-6 w-full">
      <c-btn
        class="rounded-[10px] font-semibold text-base mt-[30px] w-full py-[14px] bottom-0"
        color="primary"
        >게시하기
      </c-btn>
    </section>
    <c-bottom-sheet />
  </div>
</template>
