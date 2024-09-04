<!-- 메인페이지 -->

<script setup lang="ts">
const { user } = storeToRefs(useAuthStore());

const slide = ref(0);
const { enterRoom } = useBridge();
const openRoom = () => {
  enterRoom(1, 1);
};
const openDialog = () => {
  useDialog({
    type: 'confirm',
    text: 'text',
    htmlText: 'htmlText',
    okLabel: 'okLabel',
    cancelLabel: 'cancelLabel',
    persistent: true,
    buttons: [
      {
        label: '취소',
        value: false,
        color: '#ff0000',
      },
      {
        label: '실행',
        value: true,
        color: '#ff0000',
      },
    ],
    closeButton: true,
  });
};

const openFullDialog = () => {
  useFullDialog({
    title: '알림',
  });
};
const openContentDialog = () => {
  useContentDialog({
    title: '알림',
  });
};
async function doLogout() {
  useLogout({
    onSuccess: () => goToName('login'),
  });
}
</script>

<template>
  <q-page class="column bg-white">
    <!-- 맵 바로가기 영역 -->
    <c-carousel
      class="bg-transparent"
      control-color-active="transparent"
      v-model="slide"
      height="360px"
      keep-alive
    >
      <q-carousel-slide
        class="p-0 h-[460px]"
        v-for="(img, i) in [{ id: 1, src: '/images/main-map-1.png' }]"
        :key="img.id"
        :name="i"
      >
        <main-card :image-src="img.src" />
      </q-carousel-slide>
    </c-carousel>

    <c-icon />
    {{ user }}

    <div class="flex col">
      <c-btn @click="openDialog"> 기본 다이얼로그열기 </c-btn>
      <c-btn @click="openFullDialog"> 풀 다이얼로그열기 </c-btn>
      <c-btn @click="openContentDialog"> 컨텐츠 다이얼로그열기 </c-btn>
      <c-btn @click="openRoom"> 룸 열기 </c-btn>
      <c-btn @click="doLogout"> 로그아웃 </c-btn>
    </div>

    <!-- footer -->
    <footer
      class="w-full h-[305px] bg-[#222] bottom-0 mt-[125px] min-w-[360px]"
    >
      <div class="pt-[30px] px-6">
        <p
          class="text-grey-1 font-pretendard text-xs underline underline-offset-2"
        >
          <router-link to="/policy/terms">이용 약관</router-link>
        </p>
        <p
          class="mt-2 text-grey-1 font-pretendard text-xs underline underline-offset-2"
        >
          <router-link to="/policy/privacy">개인정보 처리방침</router-link>
        </p>
      </div>
    </footer>
  </q-page>
</template>

<script lang="ts"></script>

<style lang="scss" scoped></style>
