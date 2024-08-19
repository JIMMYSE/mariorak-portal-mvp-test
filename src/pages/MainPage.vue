<!-- 메인페이지 -->

<script setup lang="ts">
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

  enterRoom(space_id, spwan_id);
};
</script>

<template>
  <q-page class="column bg-grey">
    <!-- 맵 바로가기 영역 -->
    <c-carousel
      class="bg-transparent"
      control-color-active="#196af5"
      v-model="slide"
      height="438px"
      keep-alive
    >
      <q-carousel-slide
        v-for="(item, i) in shortcutAList"
        :key="item.id"
        :name="i"
        class="p-0 h-[460px]"
      >
        <main-card
          :title="item.title"
          :description="item.description"
          :image-src="item.image_file?.origin_addr"
          @enter="
            enterMetaverse({
              id: item.space_id,
              name: item.title,
              onOk: () => {
                enter(item.title, item.space_id);
              },
            })
          "
        />
      </q-carousel-slide>
    </c-carousel>

    <!-- 공군입대에 대해 궁금하다면 -->
    <section class="px-6 mt-10">
      <h2 class="text-h3 px-1">공군 입대 안내사항</h2>
      <div class="grid grid-col-3 gap-1.5 mt-4">
        <menu-card
          v-for="item in menuListForEnlist"
          :key="item.title"
          :to="{ name: item.to }"
          :class="item.class ?? ''"
          :title="item.title"
          :subtitle="item.subtitle"
          :icon="item.icon"
        />
      </div>
    </section>

    <!-- 훈련병 관련사항 -->
    <section class="px-6 mt-10">
      <h2 class="text-h3 px-1">훈련병 관련사항</h2>
      <div class="grid grid-cols-3 gap-1.5 mt-4">
        <menu-card
          v-for="item in menuListForTrainee"
          :key="item.title"
          :to="{ name: item.to }"
          :title="item.title"
          :subtitle="item.subtitle"
          :icon="item.icon"
          :on-click="item.onClick"
        />
      </div>
    </section>

    <!-- 공군 생활 체험 -->
    <section class="px-6 mt-[55px]">
      <h2 class="text-h3 pl-1">공군 생활 체험</h2>
      <q-list class="flex flex-col gap-[35px] mt-3">
        <menu-item
          v-for="item in shortcutBList"
          :key="item.id"
          :title="item.title"
          :description="item.description"
          tag="생활"
          :image="item.image_file?.origin_addr"
          :to="{
            name: 'shortcut-detail',
            params: { id: item.id },
          }"
        />
      </q-list>
    </section>

    <!-- footer -->
    <footer
      class="w-full h-[305px] bg-[#222] bottom-0 mt-[125px] min-w-[375px]"
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
        <p class="text-grey-3 font-pretendard text-xs leading-[17px] mt-[18px]">
          민원안내 : 042-552-7945 | 군부대 전화번호 안내 : 042-52-0114
          copyright(c) Republic of Korea Airforce. All Right Reserved
        </p>
        <div class="group-icon flex mt-[33px] gap-5 justify-center">
          <c-btn-icon
            v-for="item in socialList"
            :key="item.name"
            :icon="`img:/images/main/${item.name}.png`"
            size="27px"
            :href="item.url"
            target="_blank"
          />
        </div>
        <div class="flex justify-center">
          <q-icon name="img:/icons/icon_footer.svg" size="102px"></q-icon>
        </div>
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
