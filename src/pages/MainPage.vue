<!-- 메인페이지 -->

<script setup lang="ts">
const { user } = storeToRefs(useAuthStore());
onMounted(() => {
  const { data: listData } = useNoticePopupList();

  if (listData.value?.rows?.length) {
    useRequiredNoticeDialog();
  }
});
const { data: shortcutData } = useShortcutList();
const shortcutAList = computed(
  () => shortcutData.value?.rows.filter((r) => r.shortcut_area_cd === 'A') ?? []
);
const shortcutBList = computed(
  () => shortcutData.value?.rows.filter((r) => r.shortcut_area_cd === 'B') ?? []
);

const slide = ref(0);

const { enterRoom } = useBridge();

const enter = (title: string, space_id: number) => {
  let spwan_id = 1;
  switch (title) {
    case '비행장 구역':
      spwan_id = 2;
      break;
    case '훈련 구역':
      spwan_id = 3;
      break;
    case '작전 구역':
      spwan_id = 4;
      break;
    case '행정 구역':
      spwan_id = 5;
      break;
    case '생활관 구역':
      spwan_id = 6;
      break;
  }

  // enterRoom(space_id, spwan_id);
};
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
        v-for="(img, i) in imgList"
        :key="img.id"
        :name="i"
      >
        <main-card :image-src="img.src" />
      </q-carousel-slide>
    </c-carousel>

    {{ user }}
    <!-- footer -->
    <footer
      class="w-full h-[305px] bg-[#222] bottom-0 mt-[125px] min-w-[360px]"
    >
      <div class="pt-[30px] px-6">
        <p
          class="text-grey-1 font-pretendard text-xs underline underline-offset-2"
        >
          이용 약관
        </p>
        <p
          class="mt-2 text-grey-1 font-pretendard text-xs underline underline-offset-2"
        >
          개인정보 처리방침
        </p>
      </div>
    </footer>
  </q-page>
</template>

<script lang="ts">
const menuListForEnlist = [
  {
    title: '모병 안내',
    subtitle: '입대',
    icon: 'airplane',
    to: 'enrollment-ip',
  },
  {
    title: '입영 준비사항',
    subtitle: '입대',
    icon: 'airplane',
    to: 'enrollment-ep',
  },
  {
    title: '입영 행사안내',
    subtitle: '입대',
    icon: 'mic',
    to: 'enrollment-ee',
  },
  {
    title: '임관식 안내',
    subtitle: '입대',
    icon: 'soldier-1',
    to: 'enrollment-cm',
  },
  {
    title: '수료식 안내',
    subtitle: '입대',
    icon: 'certificate',
    to: 'enrollment-cp',
  },
  {
    title: '자주 묻는 질문',
    subtitle: '입대',
    icon: 'bulb',
    to: 'enrollment-faq',
  },
  {
    title: '찾아오는 법',
    subtitle: '입대',
    icon: 'search',
    to: 'enrollment-ts',
    class: 'col-span-3 !h-[100px]',
  },
];

const menuListForTrainee = [
  {
    title: '사진보기',
    subtitle: '훈련병',
    icon: 'soldier-1',
    to: 'trainee-photo-bookmark',
  },
  {
    title: '편지쓰기',
    subtitle: '훈련병',
    icon: 'post',
    // to: 'letter-favorite',
    onClick: () => {
      useAlertDialog({ text: '현재 이 기능은 지원되지 않습니다.' });
    },
  },
  {
    title: '소대 즐겨 찾기',
    subtitle: '훈련병',
    icon: 'star',
    to: 'trainee-bookmark-list',
  },
];

const socialList = [
  { name: 'facebook', url: 'https://www.facebook.com/rokairforce' },
  { name: 'youtube', url: 'https://www.youtube.com/user/rokafplay' },
  { name: 'instagram', url: 'https://www.instagram.com/rokaf_official/' },
  { name: 'tstory', url: 'https://afplay.tistory.com/' },
];
</script>

<style lang="scss" scoped></style>
