<script lang="ts" setup></script>
<template>
  <div
    class="flex flex-col justify-center items-center h-full bg-white pt-[200px]"
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
          class="px-6 text-center text-[#222222] text-2xl font-semibold leading-[33.60px]"
        >
          등록된 개발자 정보가 없어요.
        </p>
        <p
          class="mt-6 text-center text-[#767676] text-sm font-normal leading-tight"
        >
          아래의 등록하기 버튼을 눌러 <br />
          개발자 프로필을 등록해 보세요!
        </p>
      </section>
      <section class="w-full text-center mt-[205px]">
        <c-btn
          class="rounded-[10px] font-semibold text-base w-full py-[14px] bottom-0"
          color="primary"
          @click="goToName('maker-profile-new')"
          >등록하기
        </c-btn>
      </section>
    </div>
  </div>
</template>
