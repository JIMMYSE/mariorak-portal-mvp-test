<script lang="ts" setup>
const { data: myMakerProfileData, isFinished } = useMyMakerDetail();
const myMakerProfile = computed(() => myMakerProfileData.value?.data);

watch(myMakerProfile, (newVal) => {
  console.log('>>>', newVal);
  if (newVal) {
    if (newVal?.mkr_id == null) {
      replaceToName('not-register-profile');
    }
  }
});

const { options: jobOptions } = useCommonCode('MKR_ROL');
const job = computed(() => jobOptions.value.find((option) => option.value === myMakerProfile?.value?.mkr_rol_cd));
const openPortfolio = () => {
  window.open(myMakerProfile?.value?.prtf.prtf_url ?? '', '_blank');
};
</script>
<template>
  <q-page v-show="isFinished && myMakerProfile?.mkr_id">
    <section class="px-6 pt-[30px]">
      <div class="flex flex-col">
        <div class="flex items-center pb-[15px]">
          <div>
            <c-img :src="myMakerProfile?.circle_thumbnail_url ?? ''" class="w-[60px] h-[60px] rounded-full"> </c-img>
          </div>

          <div class="flex flex-col ml-[12px]">
            <p class="text-[#222222] text-base font-medium leading-snug">
              {{ myMakerProfile?.nickname }}
            </p>
            <p class="text-[#056bf1] text-xs font-semibold leading-none mt-[2px]">{{ job?.label }}</p>
            <p class="flex items-center mt-[2px]">
              <span class="text-[#767676] text-xs font-normal leading-none">{{ myMakerProfile?.expr_year }}년차</span>
              <q-separator vertical class="h-[10px] mx-[6px] my-[4px] top-[6px]" />
              <span class="text-[#b5b5b5] text-xs font-normal leading-none"
                >프로젝트 {{ myMakerProfile?.project_histories?.length }}회</span
              >
            </p>
          </div>
        </div>
        <div class="mt-[12px] text-[#222222] text-sm font-normal leading-tight">
          <introduce-text :intro="myMakerProfile?.desc" />
        </div>
        <div class="mt-[30px]" v-if="myMakerProfile?.prtf?.prtf_url">
          <div
            @click="notAvailableAlert()"
            class="rounded-[20px] bg-[#f7f7f7] h-20 flex items-center pl-[30px] pr-[20px] justify-between cursor-pointer"
          >
            <div @click="openPortfolio">
              <p class="text-[#222222] text-base font-medium leading-snug">포트폴리오 방문하기</p>
              <p class="text-[#767676] text-xs font-medium leading-none">{{ myMakerProfile?.prtf?.prtf_url }}</p>
            </div>
            <q-icon name="img:/icons/icon_enter_arrow.svg" size="26px" />
          </div>
        </div>
      </div>
    </section>
    <hr class="h-2.5 bg-[#f7f7f7] mt-8" />
    <!-- 숨김 처리 -->
    <!-- <section class="px-6 mt-[40px]">
      <h2 class="text-[22px] font-semibold">인적 사항</h2>
      <div class="space-y-2 mt-[14px]">
        <div class="flex justify-start items-center">
          <span class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]">국적</span>
          <span class="text-[#222222] text-sm font-normal leading-tight]">{{ myMakerProfile?.prfl?.bio?.ntnl }}</span>
        </div>
        <div class="flex justify-start items-center">
          <span class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]">언어</span>
          <span class="text-[#222222] text-sm font-normal leading-tight">{{ myMakerProfile?.prfl?.bio?.lang }}</span>
        </div>
        <div class="flex justify-start items-center">
          <span class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]">거주지역</span>
          <span class="text-[#222222] text-sm font-normal leading-tight">{{ myMakerProfile?.prfl?.bio?.loct }}</span>
        </div>
      </div>
    </section> -->
    <section class="px-6 mt-[60px]">
      <h2 class="text-[22px] font-semibold">업무 정보</h2>
      <div class="mt-[12px]">
        <p class="text-[#b5b5b5] text-xs font-semibold leading-none">한 줄 프로필</p>
        <p class="mt-[8px] text-[#222222] text-sm font-normal leading-tight">{{ myMakerProfile?.prfl?.onln_prfl }}</p>
      </div>
      <div class="mt-[22px]">
        <p class="text-[#b5b5b5] text-xs font-semibold leading-none">업무 스킬</p>
        <p
          class="mt-[8px] text-[#222222] text-xs font-normal leading-none"
          v-for="(skill, i) in myMakerProfile?.prfl?.skills"
          :key="i"
        >
          · {{ skill }}
        </p>
      </div>
      <div class="mt-[22px]">
        <p class="text-[#b5b5b5] text-xs font-semibold leading-none">희망 직무</p>
        <p
          class="mt-[8px] text-[#222222] text-xs font-normal leading-none"
          v-for="(jobObj, i) in myMakerProfile?.prfl?.job_objs"
          :key="i"
        >
          · {{ jobObj }}
        </p>
      </div>
      <!-- TODO 오픈 때 히든처리 -->
      <!-- <div class="mt-[24px]">
        <p class="text-[#b5b5b5] text-xs font-semibold leading-none">관심 분야</p>
        <div class="text-caption q-mb-xs mt-[16px]">
          <span class="badge-primary text-[14px] font-medium">롤플레잉</span>
        </div>
      </div> -->
    </section>
    <section class="px-6 mt-[60px]">
      <!-- <h2 class="text-[22px] font-semibold">참여했던 프로젝트 (10회)</h2>
      <normal-project-list type="project" /> -->
    </section>
    <section class="bottom-[85px] w-full text-center px-6 mt-[85px] mb-6">
      <!-- <c-btn
        class="rounded-[10px] font-semibold text-base w-full py-[14px] bottom-0"
        color="primary"
        @click="goToName('maker-profile-new')"
        >수정하기
      </c-btn> -->
      <c-btn
        class="rounded-[10px] font-semibold text-base w-full py-[14px] bottom-0"
        color="primary"
        @click="goToName('maker-profile-edit')"
        >수정하기
      </c-btn>
    </section>
  </q-page>
</template>
