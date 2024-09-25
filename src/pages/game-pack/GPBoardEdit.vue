<script lang="ts" setup>
import { BottomSheet } from 'quasar';

const showBottomSheet = ref(false);
const openCategoryBottomSheet = () => {
  showBottomSheet.value = !showBottomSheet.value;
};
</script>
<template>
  <div class="h-full">
    <section class="px-6">
      <p class="text-[#767676] text-xs font-medium leading-none">카테고리 선택</p>
      <div
        class="mt-[16px] pb-[14px] border-b border-[#f7f7f7] text-[#b5b5b5] text-lg font-normal leading-[25.20px] flex justify-between items-center"
        @click="openCategoryBottomSheet"
      >
        <p>카테고리를 선택해 주세요.</p>
        <c-icon name="icon_enter_arrow" size="20px" :color="'#767676'" :fill="false" />
      </div>
    </section>
    <section class="px-6 mt-[30px]">
      <p class="text-[#767676] text-xs font-medium leading-none">글 작성</p>
      <div
        class="mt-[16px] pb-[14px] text-[#b5b5b5] text-lg font-normal leading-[25.20px] flex justify-between items-center"
      >
        <c-input
          class="w-full pb-[14px]"
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
    <section class="fixed bottom-[85px] px-6 max-w-[512px] w-full">
      <c-btn class="rounded-[10px] font-semibold text-base mt-[30px] w-full py-[14px] bottom-0" color="primary"
        >게시하기
      </c-btn>
    </section>
    <c-bottom-sheet v-model="showBottomSheet">
      <div class="flex flex-col justify-between">
        <section>
          <p class="text-[#767676] text-xs font-medium leading-none">채널 선택</p>
          <div class="mt-4">
            <q-item
              v-ripple
              clickable
              class="rounded-[5px] border border-[#dbdbdb] bg-[#fff] items-center px-4 py-0 w-fit h-[40px]"
              ><span class="text-center text-[#767676] text-sm font-medium leading-tight">게임 제목</span></q-item
            >
          </div>
        </section>
        <section class="mt-[30px]">
          <p class="text-[#767676] text-xs font-medium leading-none">주제</p>
          <div class="mt-4">
            <q-item
              v-ripple
              clickable
              class="rounded-[5px] border border-[#dbdbdb] bg-[#fff] items-center px-4 py-0 w-fit h-[40px]"
              ><span class="text-center text-[#767676] text-sm font-medium leading-tight">게임 제목</span></q-item
            >
          </div>
        </section>
        <section class="mt-[30px]">
          <p class="text-[#767676] text-xs font-medium leading-none">공지</p>
          <div class="mt-4">
            <q-item
              v-ripple
              clickable
              class="rounded-[5px] border border-[#dbdbdb] bg-[#fff] items-center px-4 py-0 w-fit h-[40px]"
              ><span class="text-center text-[#767676] text-sm font-medium leading-tight">게임 제목</span></q-item
            >
          </div>
        </section>
        <section class="bottom-[85px] w-full text-center mt-[85px]">
          <c-btn class="rounded-[10px] font-semibold text-base w-full py-[14px] bottom-0" color="primary"
            >선택 완료
          </c-btn>
        </section>
      </div>
    </c-bottom-sheet>
  </div>
</template>
å
