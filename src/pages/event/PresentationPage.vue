<script lang="ts" setup></script>
<template>
  <q-page class="px-6 relative">
    <!-- content -->
    <q-img
      src="/src/assets/images/recruitment_guide_1.png"
      fit="contain"
      class="w-screen -translate-x-6"
    />
    <h2 class="mt-[27px] text-primary font-medium text-lg">상담실 둘러보기</h2>
    <p class="mt-3 text-grey-4 font-pretendard text-base">
      체험 내용에 대한 안내 문구가 표시됩니다.<br />입장장소, 소요시간, 체험내용
      등 안내사항이 자세히 표시될 예정입니다.
      설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다<br /><br />입장하기를
      눌러 직접 체험해 보세요!!
    </p>

    <router-link
      :to="{ name: 'counseling-room' }"
      class="h-16 leading-16 w-screen q-btn--standard -translate-x-6 absolute bottom-0 font-medium text-base"
    >
      <q-btn class="size-full" color="primary" square unelevated
        >입장하기</q-btn
      >
    </router-link>
  </q-page>
</template>
