<template>
  <section style="height: calc(100vw); max-height: 512px">
    <ckv-banner :img-list="imgList" :counter="true" />
  </section>
</template>

<script setup lang="ts">
// img dummy
const imgList = [
  {
    src: '/images/recruit/mainKV/recruit_KV_1.png',
    id: 1,
    title: '보다 나은 게임 개발을\n위한 만남의 공간',
    desc: '프로젝트 완성에 딱 맞는 개발 인력이 가득해요.',
  },
  {
    src: '/images/main/Main_KV/512/kv_02.png',
    id: 2,
    title: '',
    desc: '',
    link: 'https://k-dmts.com/fairDash.do',
  },
  {
    src: '/images/main/Main_KV/512/kv_03.png',
    id: 3,
    title: '',
    desc: '',
  },
];
</script>
