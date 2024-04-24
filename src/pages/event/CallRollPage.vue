<script lang="ts" setup></script>
<template>
  <q-page class="flex flex-col">
    <!-- content -->
    <q-img
      src="/src/assets/images/recruitment_guide_2.png"
      fit="cover"
      class="w-full"
    />
    <h2 class="px-6 mt-[27px] text-primary font-medium text-lg">점호 체험</h2>
    <p class="px-6 mt-3 text-grey-4 font-pretendard text-base">
      체험 내용에 대한 안내 문구가 표시됩니다.<br />입장장소, 소요시간, 체험내용
      등 안내사항이 자세히 표시될 예정입니다.
      설명입니다설명입니다설명입니다설명입니다설명입니다설명입니다<br /><br />입장하기를
      눌러 직접 체험해 보세요!!
    </p>
    <div class="flex-1"></div>
    <!-- 연결할 페이지 안내 없음 -->
    <router-link
      :to="{ name: '' }"
      class="h-16 leading-16 q-btn--standard w-full font-medium text-base"
    >
      <q-btn class="size-full" color="primary" square unelevated
        >입장하기</q-btn
      >
    </router-link>
  </q-page>
</template>
