<!-- 메인페이지 -->

<script setup lang="ts">
import GPItemList from 'src/components/game-pack/GPItemList.vue';

const { data } = getMyDetail();

const slide = ref(0);
const keyword = ref<string>('');
const businessInfo = ref(false);
const toggleBusinessInfo = (target: boolean) => {
  businessInfo.value = !target;
};
// img dummy
const imgList = [
  {
    src: '/images/main/Main_KV/512/kv_01.png',
    id: 1,
    seq: 1,
    title: '',
    desc: '',
  },
  {
    src: '/images/main/Main_KV/512/kv_02.png',
    id: 2,
    seq: 2,
    title: '',
    desc: '',
    link: 'https://k-dmts.com/fairDash.do',
  },
  {
    src: '/images/main/Main_KV/512/kv_03.png',
    id: 2,
    seq: 3,
    title: '',
    desc: '',
  },
];
const cultureList = [
  {
    src: '/images/main/main_culture_2.png',
    title: '팬과 크리에이터의\n공간',
    desc: '팬과 크리에이터가 동반자의 관계가 되어\n실시간으로 피드백을 남기고\n응원하는 공간이에요.',
  },
  {
    src: '/images/main/main_culture_1.png',
    title: '재정적 안정을\n지원하는 공간',
    desc: '제작부터 출시되는 순간까지\n팬들의 펀딩과 도네이션, CCF의\n지원이 함께해요.',
  },
];
const tabList = [
  {
    src: '/images/main/joystick.png',
    title: '게임',
  },
  {
    src: '/images/main/magicwand.png',
    title: '프로젝트',
  },
  {
    src: '/images/main/megaphone.png',
    title: '모집중',
  },
  {
    src: '/images/main/blacknib.png',
    title: '개발자',
  },
  {
    src: '/images/main/developer.png',
    title: '개발자 게시판',
  },
  {
    src: '/images/main/handshake.png',
    title: '커뮤니티',
  },
];
const barStyle = {
  // 스크롤바 안보이게
  opacity: 1,
};
const thumbStyle = {
  // 스크롤바 색상
  backgroundColor: 'transparent',
};

//fecth

const { data: recommendedGameData } = useRecommendedGameList();
const recommendedGameList = computed(() => {
  return recommendedGameData.value?.rows;
});
const { data: recommededProjectData } = useRecommendedProjectList();
const recommendedProjectList = computed(() => {
  return recommededProjectData.value?.rows;
});

const slideInfo = ref<any>({});
const slideEvent = (info: any) => {
  console.log(info);
  slideInfo.value = info;
};

const isLocal = ref(process.env.IS_LOCAL !== undefined);
const isDev = ref(process.env.IS_DEV !== undefined);

/** 상세 보기 약관 */
const detailEnabled = ref(false);
const detail = ref<{ title: string; content: string } | null>(null);
const { request } = useSearchFilter({
  requestDefault: {
    filters: {
      is_active: {
        eq: true,
      },
    },
    from: 0,
    size: 10,
    sort: [
      {
        sequence: 'asc',
      },
    ],
  },
});

const { data: termsData } = useTermsList({ searchRequest: request });

const openDetailDialog = async (type: string) => {
  const term = termsData.value?.rows.find(
    (r: { type: string }) => r.type === type
  );
  detail.value = { title: term.title, content: term.content };
  detailEnabled.value = true;
};
</script>

<template>
  <q-page class="column bg-white">
    <!-- 맵 바로가기 영역 -->
    <ckv-banner :img-list="imgList" counter />

    <!-- 상단 탭 -->
    <q-scroll-area
      class="bg-[#f8f8f8] h-[100px] w-full px-3"
      :bar-style="barStyle"
      :thumb-style="thumbStyle"
    >
      <div class="row no-wrap">
        <div
          class="w-[70px] h-[100px] text-center mr-4"
          v-for="n in tabList"
          :key="n.src"
        >
          <div class="h-full flex flex-col items-center justify-center">
            <q-img :src="n.src" class="h-[44px] w-[44px]" />
            <p class="text-xs">
              {{ n.title }}
            </p>
          </div>
        </div>
      </div>
    </q-scroll-area>

    <!-- 게임팩 대해 궁금하다면 -->
    <section class="mt-10">
      <p class="pl-6 text-[22px] font-semibold">
        유저와 함께하는 게임 제작 문화
      </p>
      <p class="pl-6 text-[#767676] text-sm font-normal">
        CCF가 제공하는 다양한 혜택을 즐겨보세요
      </p>
      <div class="border-t-0 grid grid-col-3 gap-1.5 mt-4 h-[270px] pl-6">
        <q-scroll-area
          class="w-full"
          :bar-style="barStyle"
          :thumb-style="thumbStyle"
        >
          <div class="row no-wrap">
            <div
              class="h-[270px] mr-4 w-[200px]"
              v-for="n in cultureList"
              :key="n.src"
            >
              <q-card class="rounded-xl">
                <q-img :src="n.src" class="w-[200px] h-[123px]" />

                <q-card-section>
                  <p
                    class="text-[#222222] font-semibold leading-snug whitespace-pre"
                  >
                    {{ n.title }}
                  </p>
                  <p class="text-[#767676] text-xs mt-3">{{ n.desc }}</p>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </section>

    <hr class="h-2.5 bg-[#f7f7f7] mt-10" />

    <!-- CCF 추천게임 -->
    <section class="mt-10">
      <h2 class="pl-6 text-[22px] font-semibold">CCF 추천게임</h2>
      <div class="grid gap-1.5 mt-4">
        <g-p-item-list
          type="game"
          to-list="game-list"
          :gp-list="recommendedGameList"
        />
      </div>
    </section>

    <!-- CCF 추천 프로젝트 -->
    <section class="mt-[55px]">
      <h2 class="pl-6 text-[22px] font-semibold">CCF가 주목하는 프로젝트</h2>
      <div class="grid gap-1.5 mt-4">
        <g-p-item-list
          type="project"
          to-list="project-list"
          :gp-list="recommendedProjectList"
        />
      </div>
    </section>

    <!-- 배너영역 -->
    <!-- <q-img
      class="mt-[55px]"
      src="/images/dummy/banner_dummy.png"
      alt="banner"
      width="100%"
      height="100%"
    /> -->

    <!-- 사업자 정보 -->

    <section class="bottom-0 bg-[#f7f7f7] px-6 pt-6 mt-[55px]">
      <div class="flex justify-between">
        <div><q-img src="/images/main-logo.png" alt="" class="w-14" /></div>

        <div>
          <h6
            class="text-[#767676] text-sm font-medium font-['Pretendard'] leading-tight relative pr-5 cursor-pointer"
            @click="toggleBusinessInfo(businessInfo)"
          >
            사업자 정보
            <q-icon
              size="23px"
              name="img:/icons/down_arrow.svg"
              class="absolute left-16 bottom-0"
              :class="businessInfo ? 'rotate-180' : ''"
            />
          </h6>
        </div>
      </div>
      <div class="mt-6" v-show="businessInfo">
        <div class="flex justify-center">
          <div
            class="text-[#767676] text-xs font-normal font-['Pretendard'] underline leading-none cursor-pointer"
            @click="openDetailDialog('PERSONAL_DATA_PROCESS')"
          >
            개인정보 처리방침
          </div>
          <div class="border-l-2 border-[#f0f0f0] mx-3"></div>
          <div
            class="text-[#767676] text-xs font-normal font-['Pretendard'] underline leading-none cursor-pointer"
            @click="openDetailDialog('SERVICE_AGREEMENT')"
          >
            서비스 이용약관
          </div>
          <div class="border-l-2 border-[#f0f0f0] mx-3"></div>
          <!-- <div
            class="text-[#767676] text-xs font-normal font-['Pretendard'] underline leading-none cursor-pointer"
          >
            사업자 정보 확인
          </div> -->
        </div>
        <!-- <div class="flex mt-3 justify-center">
          <div
            class="text-[#767676] text-xs font-normal font-['Pretendard'] underline leading-none cursor-pointer"
          >
            프로젝트 심사 기준
          </div>
          <div class="border-l-2 border-[#f0f0f0] mx-3"></div>
          <div
            class="text-[#767676] text-xs font-normal font-['Pretendard'] underline leading-none cursor-pointer"
          >
            CCF 정책
          </div>
        </div> -->
      </div>

      <div>
        <div class="w-full h-[0px] border border-[#f0f0f0] mt-5"></div>
        <div class="text-[#b5b5b5] text-[10px] leading-[14px] mt-7">
          CCF는 플랫폼 제공자로서 프로젝트의 당사자가 아니며, 직접적인 통신
          판매를 진행하지 않습니다. 프로젝트의 완수의 책임은 해당 프로젝트의
          창작자에게 있으며, 프로젝트와 관련하여 후원자와 발생하는 법적 분쟁에
          대한 책임은 해당 창작자가 부담합니다.
        </div>
        <div
          class="text-[#767676] text-[10px] mt-16 pb-8 leading-[14px] text-center w-full underline"
        >
          <a href="mailto:npc-dev@cc-fan.com" v-if="isLocal || isDev">
            Copyright©COARSOFT
          </a>
          <a href="mailto:npc@cc-fan.com" v-else>Copyright©COARSOFT</a>
        </div>
      </div>
    </section>
  </q-page>
  <!-- 팝업 -->
  <c-dialog-content
    v-model="detailEnabled"
    :title="detail?.title"
    :html="detail?.content"
  />
</template>
