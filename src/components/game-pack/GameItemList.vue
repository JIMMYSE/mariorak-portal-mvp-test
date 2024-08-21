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
    style="height: 300px"
    :bar-style="barStyle"
    :thumb-style="thumbStyle"
  >
    <div class="row no-wrap">
      <q-img src="/images/dummy/game_dummy.svg" width="100%" height="138px" />
    </div>
  </q-scroll-area>
</template>
