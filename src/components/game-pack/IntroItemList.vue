<script lang="ts" setup>
const barStyle = {
  // 스크롤바 안보이게
  opacity: 1,
};

const thumbStyle = {
  // 스크롤바 색상
  backgroundColor: 'transparent',
};

const introList = [
  {
    title: 'GAME PACK',
    subTitle: '게임팩',
    content:
      '스토어에 출시되는 그날까지,<br/>또 출시되어 유명해지는 날까지<br/>CCF가 함께하고 지원하는<br/>모든 게임 프로젝트 입니다.',
  },
  {
    title: 'GAME',
    subTitle: '게임',
    content:
      '스토어에 출시까지 완료한<br/>프로젝트 목록입니다.<br/>게임을 재미있게 즐기시고<br/>회원님의 다양한 피드백을 남겨주세요.',
  },
  {
    title: 'PROJECT',
    subTitle: '프로젝트',
    content:
      '출시를 목적으로 열정적으로<br/>제작중인 프로젝트입니다.<br/>관심있는 프로젝트를<br/>찾으신 후 출시하는 그날까지<br/>함께 해주세요.',
  },
];
</script>
<template>
  <q-scroll-area
    style="height: 151px"
    :bar-style="barStyle"
    :thumb-style="thumbStyle"
  >
    <div class="row no-wrap">
      <div
        class="w-[183px] h-[150px] bg-white rounded-[10px] shadow p-4 mr-4"
        v-for="n in introList"
        :key="n.content"
      >
        <div class="flex items-center gap-1 mb-2">
          <p class="text-[#056bf1] text-lg font-bold">{{ n.title }}</p>
          <p class="text-[#222222] text-xs font-medium">{{ n.subTitle }}</p>
        </div>
        <div
          class="text-[#767676] text-[11px] leading-[16px]"
          v-html="n.content"
        ></div>
      </div>
    </div>
  </q-scroll-area>
</template>
