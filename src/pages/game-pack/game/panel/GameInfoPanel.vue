<script lang="ts" setup></script>
<template>
  <div class="w-full">
    <section class="mt-6">
      <h2 class="text-[20px] font-semibold">게임 소개</h2>
      <div class="mt-4">
        <introduce-text />
      </div>
    </section>
    <section class="mt-[60px]">
      <h2 class="text-[20px] font-semibold">In Game Shot</h2>
      <div class="mt-4">
        <!-- <game-shot-movie /> -->
      </div>
    </section>
    <section class="mt-[40px]">
      <h2 class="text-[20px] font-semibold">프로젝트 참여 멤버</h2>
      <div class="mt-4">
        <g-p-member-list />
      </div>
    </section>
    <section class="mt-[40px]">
      <h2 class="text-[20px] font-semibold">유사한 게임</h2>
      <div class="mt-4">
        <normal-project-list />
      </div>
    </section>
  </div>
</template>
