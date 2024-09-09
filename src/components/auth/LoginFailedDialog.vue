<script setup lang="ts"></script>

<template>
  <div
    class="flex flex-col justify-center items-center h-screen pb-48 bg-white"
  >
    <div>
      <section class="flex justify-center items-center flex-col">
        <q-img src="/images/join_failed.svg" width="120px" height="120px" />
        <q-img
          src="/images/icon_shadow.svg"
          width="110px"
          height="25px"
          class="mt-[5px]"
        />
      </section>
      <section class="mt-[34px]">
        <p
          class="px-6 font-pretendard text-[28px] font-semibold text-center leading-[1.325]"
        >
          현재 요청하신 작업을
        </p>
        <p
          class="px-6 font-pretendard text-[28px] font-semibold text-center leading-relaxed"
        >
          수행할 수 없어요
        </p>
        <p
          class="mt-8 text-center text-[#767676] text-sm font-normal font-['Pretendard'] leading-snug"
        >
          서비스 이용에 불편을 드려 죄송합니다. <br />
          시스템에 오류가 발생되어 페이지를 정상적으로 <br />
          노출하지 못하였습니다.
        </p>
        <p
          class="mt-2 text-center text-[#767676] text-sm font-normal font-['Pretendard'] leading-snug"
        >
          동일 오류가 반복하여 발생할 경우<br />고객센터에 문의 부탁드립니다.
          <br />
          오류코드[400]
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
