<script lang="ts" setup></script>

<template>
  <q-page class="px-6 relative pt-[35px]">
    <h1 class="text-h1 text-[#f5192f] leading-[30px]">서비스 이용제한 안내</h1>
    <p class="mt-[10px] font-pretendard text-sm leading-5 text-grey-4">
      서비스 운영정책 위반으로 아래와 같이 사용이 제한되었습니다. 운영정책
      위반행위가 반복되거나 다른 이용제한 사유가 발견되는 경우 이용제한 조치가
      가중되거나 영구적으로 제한될 수 있습니다.
    </p>

    <div class="mt-[30px] h-[110px] flex bg-grey rounded-[5px]">
      <div class="flex-1 flex-col flex justify-center items-center">
        <p class="text-sm leading-4 font-pretendard text-grey-3">제한 내용</p>
        <p class="mt-2 text-[15px] leading-5 font-medium">이용제한 30일</p>
      </div>
      <div class="flex-1 flex-col flex justify-center items-center">
        <p class="text-sm leading-4 font-pretendard text-grey-3">제한 사유</p>
        <p class="mt-2 text-[15px] leading-5 font-medium">운영정책 위반</p>
      </div>
    </div>
    <div
      class="mt-[10px] h-[110px] flex flex-col justify-center items-center bg-grey rounded-[5px]"
    >
      <p class="text-sm leading-4 font-pretendard text-grey-3">해제 일시</p>
      <p class="mt-2 text-[15px] leading-5 font-medium">
        2024-02-22 13:30 이후
      </p>
    </div>
    <p class="mt-[15px] text-sm leading-5 text-grey-4">
      이용제한에 대한 문의 및 운영정책에 대한 자세한 내용은<br />
      이용약관을 참조해 주세요.
    </p>

    <div class="absolute bottom-0 bg-primary w-full h-[64px] left-0">
      <button
        class="text-center text-white font-base font-medium size-full flex justify-center items-center"
      >
        확인
      </button>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
