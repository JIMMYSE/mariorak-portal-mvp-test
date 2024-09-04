<!-- 메인페이지 -->

<script setup lang="ts">
import FaqArea from 'src/components/game-pack/FaqArea.vue';
import GPItemList from 'src/components/game-pack/GPItemList.vue';

const slide = ref(0);
const barStyle = {
  // 스크롤바 안보이게
  opacity: 1,
};
const thumbStyle = {
  // 스크롤바 색상
  backgroundColor: 'transparent',
};

// img dummy
const imgList = [
  {
    src: '/images/dummy/main_dummy.svg',

    id: 1,
    title: '지금 CCF\n2024에 투표하세요',
    desc: 'CCF 2024 출품작을 즐기고, 상품도 덤으로',
  },
  {
    src: '/images/dummy/main_dummy1.svg',
    id: 2,
    title: '지금 CCF\n2024에 투표하세요',
    desc: 'CCF 2024 출품작을 즐기고, 상품도 덤으로',
  },
  {
    src: '/images/dummy/main_dummy2.svg',
    id: 3,
    title: '지금 CCF\n2024에 투표하세요',
    desc: 'CCF 2024 출품작을 즐기고, 상품도 덤으로',
  },
  {
    src: '/images/dummy/main_dummy3.svg',
    id: 4,
    title: '지금 CCF\n2024에 투표하세요',
    desc: 'CCF 2024 출품작을 즐기고, 상품도 덤으로',
  },
  {
    src: '/images/dummy/main_dummy4.svg',
    id: 5,
    title: '지금 CCF\n2024에 투표하세요',
    desc: 'CCF 2024 출품작을 즐기고, 상품도 덤으로',
  },
  {
    src: '/images/dummy/main_dummy5.svg',
    id: 6,
    title: '지금 CCF\n2024에 투표하세요',
    desc: 'CCF 2024 출품작을 즐기고, 상품도 덤으로',
  },
];

const introList = [
  {
    title: '검색, 추천',
    desc: '조건에 알맞은 프로젝트 인력을 검색하거나 CCF가 추천하는 적합한 프로젝트/ 인력의 상세 정보를 확인해요.',
  },
  {
    title: '신청, 요청',
    desc: '알맞은 프로젝트/ 인력을 찾았다면, 신청/ 요청하기를 통하여 당사자에게 협업에 대한 자세한 연락을 해보세요.',
  },
  {
    title: '결과, 참여',
    desc: '전달한 정보를 바탕으로 협업에 대한 응답이 올거에요! CCF는 서로에게 도움이 될 수 있도록 완료까지 항상 함께해요.',
  },
];
const recommendedRecruitProjectList = [
  {
    rcrt_mkr_rol_list: [
      {
        code: '02',
        name: '프로그래머',
      },
      {
        code: '07',
        name: '빅데이터분석AI엔지',
      },
      {
        code: '07',
        name: '프로듀서',
      },
      {
        code: '07',
        name: '프로듀서',
      },
      {
        code: '07',
        name: '프로듀서',
      },
    ],
    end_remain_days: 36,
    end_dttm: '2024-10-10T15:00:00.000Z',
    rcrt_mkr_num: 3,
    prj_stt_cd: '20',
    prj_rcrt_id: 1,
    created_at: '2024-08-28T09:41:04.000Z',
    game_gnre_cd: '04',
    tag_list: ['시뮬레이션', '모바일'],
    thmn_file: {
      id: 9735,
      file_name: '�����.png',
      origin_addr:
        'https://file-ccf.coardevelop.com/origin/2024/08/26/16/405gzmtm0apgofh',
      convert_addr:
        'https://file-ccf.coardevelop.com/thumb/2024/08/26/16/405gzmtm0apgofh',
    },
    desc: 'game의 새로운 신작을 소개합니다 game의 새로운 신작을 소개합니다',
    title: '[새롭게 돌아온] KINGDOM the blood 킹덤 더 블러드',
    prj_id: 2,
  },
  {
    rcrt_mkr_rol_list: [
      {
        code: '02',
        name: '프로그래머',
      },
      {
        code: '07',
        name: '프로듀서',
      },
    ],
    end_remain_days: 40,
    end_dttm: '2024-10-10T15:00:00.000Z',
    rcrt_mkr_num: 12,
    prj_stt_cd: '20',
    prj_rcrt_id: 2,
    created_at: '2024-08-28T09:41:04.000Z',
    game_gnre_cd: '04',
    tag_list: ['시뮬레이션', '모바일'],
    thmn_file: {
      id: 9735,
      file_name: '�����.png',
      origin_addr:
        'https://file-ccf.coardevelop.com/origin/2024/08/26/16/405gzmtm0apgofh',
      convert_addr:
        'https://file-ccf.coardevelop.com/thumb/2024/08/26/16/405gzmtm0apgofh',
    },
    desc: '용을 주제로 한 하이퀄리티 2D RPG',
    title: '용용죽겠지',
    prj_id: 2,
  },
];

//fecth
const { data: recommendedGameData } = useRecommendedGameList();
const recommendedGameList = computed(() => {
  return recommendedGameData.value?.rows;
});
const { data: recommededProjectData } = useRecommendedProjectList();
const recommendedProjectList = computed(() => {
  return recommededProjectData.value?.rows;
});
</script>

<template>
  <q-page class="column bg-white">
    <!-- 맵 바로가기 영역 -->
    <c-carousel
      class="bg-transparent"
      control-color-active="transparent"
      v-model="slide"
      height="360px"
      :total-slides="imgList.length"
      keep-alive
      infinite
    >
      <q-carousel-slide
        class="p-0 h-[460px]"
        v-for="(img, i) in imgList"
        :key="img.id"
        :name="i"
      >
        <main-card :image-src="img.src" :title="img.title" :desc="img.desc" />
      </q-carousel-slide>
    </c-carousel>
    <!-- 인력사무소 intro -->
    <section class="mt-10 px-6">
      <p class="text-[22px] font-semibold">인력사무소</p>
      <p class="text-[#767676] text-sm font-normal">
        서로에게 도움이 되는 만남의 장소
      </p>
      <div class="border-t-0 grid grid-col-3 gap-1.5 mt-4 h-[150px]">
        <q-scroll-area
          class="w-full"
          :bar-style="barStyle"
          :thumb-style="thumbStyle"
        >
          <div class="row no-wrap">
            <div
              class="mr-4 w-[183px] h-[131px]"
              v-for="n in introList"
              :key="n.title"
            >
              <q-card class="rounded-xl p-1">
                <q-card-section>
                  <p
                    class="text-[#056bf1] text-lg font-semibold leading-[25.20px]"
                  >
                    {{ n.title }}
                  </p>
                  <p
                    class="h-[68px] text-[#767676] text-xs font-normal mt-1 whitespace-pre-line"
                  >
                    {{ n.desc }}
                  </p>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </section>

    <hr class="h-2.5 bg-[#f7f7f7] mt-10" />

    <!-- CCF 추천 모집중 프로젝트 -->
    <section class="px-6 mt-10">
      <h2 class="text-[22px] font-semibold">CCF 모집중 추천프로젝트</h2>
      <div class="grid gap-1.5 mt-4">
        <recruit-recommened-project :p-list="recommendedRecruitProjectList" />
      </div>
    </section>

    <!-- CCF 추천 프로젝트 -->
    <section class="px-6 mt-[55px]">
      <h2 class="text-[22px] font-semibold">CCF 추천 프로젝트</h2>
      <div class="grid gap-1.5 mt-4">
        <g-p-item-list
          to-list="project-list"
          :gp-list="recommendedProjectList"
        />
      </div>
    </section>

    <!-- 배너영역 -->
    <section class="mt-[55px]">
      <img src="/images/dummy/banner_dummy.png" alt="banner" class="w-full" />
    </section>

    <!-- FAQ -->
    <section class="mt-[55px]">
      <h2 class="text-[22px] font-semibold px-6">FAQ</h2>
      <faq-area />
    </section>
  </q-page>
</template>
