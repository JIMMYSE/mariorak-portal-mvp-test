<script lang="ts" setup>
const barStyle = {
  // 스크롤바 안보이게
  opacity: 1,
};

const thumbStyle = {
  // 스크롤바 색상
  backgroundColor: 'transparent',
};
</script>
<template>
  <q-scroll-area
    style="height: 140px"
    :bar-style="barStyle"
    :thumb-style="thumbStyle"
  >
    <div class="row no-wrap">
      <div
        class="w-[183px] h-[131px] bg-white rounded-[10px] shadow p-4 mr-4"
        v-for="n in 3"
        :key="n"
      >
        <div class="flex items-center gap-1 mb-2">
          <p class="text-[#056bf1] text-lg font-bold">GAME PACK</p>
          <p class="text-[#222222] text-xs font-medium">게임팩</p>
        </div>
        <div class="text-[#767676] text-[11px] leading-[16px]">
          스토어에 출시되는 그날까지,<br />
          또 출시되어 유명해지는 날까지<br />
          CCF가 함께하고 지원하는<br />
          모든 게임 프로젝트 입니다.
        </div>
      </div>
    </div>
  </q-scroll-area>
</template>
