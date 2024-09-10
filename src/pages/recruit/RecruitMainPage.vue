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
    src: '/images/recruit/mainKV/recruit_KV_1.png',

    id: 1,
    title: '보다 나은 게임 개발을\n위한 만남의 공간',
    desc: '프로젝트 완성에 딱 맞는 개발 인력이 가득해요.',
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

// const recommendedMakerList = [
//   {
//     prj_num: 1,
//     square_file: {
//       id: 9707,
//       file_name: 'Woman_01.png',
//       origin_addr:
//         'https://file-ccf.coardevelop.com/origin/2024/08/20/17/405gzn10m025zzes',
//       convert_addr:
//         'https://file-ccf.coardevelop.com/thumb/2024/08/20/17/405gzn10m025zzes',
//     },
//     circle_file: {
//       id: 9708,
//       file_name: 'Woman_01_th.png',
//       origin_addr:
//         'https://file-ccf.coardevelop.com/origin/2024/08/20/17/405gzn10m025zzek',
//       convert_addr:
//         'https://file-ccf.coardevelop.com/thumb/2024/08/20/17/405gzn10m025zzek',
//     },
//     nickname: '지구별전략가#2358',
//     prtf: {
//       prtf_url: 'https://github.com',
//       prtf_dspy_yn: true,
//     },
//     prfl: {
//       bio: {
//         lang: '영어',
//         loct: '미국 북부',
//         ntnl: '북한',
//       },
//       skills: [
//         '스킬1',
//         '스킬1',
//         '스킬1',
//         '스킬1',
//         '스킬1',
//         '스킬1',
//         '스킬1',
//         '스킬1',
//       ],
//       kjob_objs: ['디자인', '개발보조'],
//       onln_prfl: '한줄 프로필입니다.',
//     },
//     desc: '저는 디자이너자입니다.',
//     expr_year: 10,
//     mkr_rol_cd: '02',
//     mem_id: 14157,
//     mkr_id: 1,
//   },
//   {
//     prj_num: 1,
//     square_file: {
//       id: 9707,
//       file_name: 'Woman_01.png',
//       origin_addr:
//         'https://file-ccf.coardevelop.com/origin/2024/08/20/17/405gzn10m025zzes',
//       convert_addr:
//         'https://file-ccf.coardevelop.com/thumb/2024/08/20/17/405gzn10m025zzes',
//     },
//     circle_file: {
//       id: 9708,
//       file_name: 'Woman_01_th.png',
//       origin_addr:
//         'https://file-ccf.coardevelop.com/origin/2024/08/20/17/405gzn10m025zzek',
//       convert_addr:
//         'https://file-ccf.coardevelop.com/thumb/2024/08/20/17/405gzn10m025zzek',
//     },
//     nickname: '지구별전략가#2358',
//     prtf: {
//       prtf_url: 'https://github.com',
//       prtf_dspy_yn: true,
//     },
//     prfl: {
//       bio: {
//         lang: '일본어',
//         loct: '경기 서부',
//         ntnl: '대한민국',
//       },
//       skills: ['스킬1'],
//       job_objs: ['개발보조', '개발리딩'],
//       onln_prfl: '한줄 프로필입니다.',
//     },
//     desc: '저는 개발자입니다.',
//     expr_year: 10,
//     mkr_rol_cd: '02',
//     mem_id: 14157,
//     mkr_id: 2,
//   },
// ];

//fecth
const { data: recommendedMakerData } = useRecruitRecommendedMakerList();
const recommendedMakerList = computed(() => {
  return recommendedMakerData.value?.rows;
});
const { data: recommededProjectData } = useRecruitRecommendedProjectList();
const recommendedProjectList = computed(() => {
  return recommededProjectData.value?.rows;
});
</script>

<template>
  <q-page class="column bg-white">
    <!-- 맵 바로가기 영역 -->
    <section style="height: calc(100vw); max-height: 512px">
      <ckv-banner :img-list="imgList" :counter="false" />
    </section>
    <!-- 인력사무소 intro -->
    <section class="mt-10">
      <p class="pl-6 text-[22px] font-semibold">인력사무소</p>
      <p class="pl-6 text-[#767676] text-sm font-normal">
        서로에게 도움이 되는 만남의 장소
      </p>
      <div class="border-t-0 grid grid-col-3 gap-1.5 mt-4 h-[150px] pl-6">
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
    <section class="mt-10">
      <h2 class="pl-6 text-[22px] font-semibold">CCF 모집중 추천프로젝트</h2>
      <div class="grid gap-1.5 mt-4">
        <recruit-recommened-project :p-list="recommendedProjectList" />
      </div>
    </section>

    <!-- CCF 추천 개발 인력 -->
    <section class="mt-[55px]">
      <h2 class="pl-6 text-[22px] font-semibold">CCF 추천 개발 인력</h2>
      <div class="grid gap-1.5 mt-4">
        <recruit-recommened-maker :m-list="recommendedMakerList" />
      </div>
    </section>

    <!-- 배너영역 -->
    <!-- <section class="mt-[55px]">
      <img src="/images/dummy/banner_dummy.png" alt="banner" class="w-full" />
    </section> -->

    <!-- FAQ -->
    <section class="mt-[55px] mb-[50px]">
      <h2 class="text-[22px] font-semibold px-6">FAQ</h2>
      <faq-area />
    </section>
  </q-page>
</template>
