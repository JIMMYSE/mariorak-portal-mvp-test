<script lang="ts" setup>
interface Options {
  /**
   * 팝업 닫을 시 핸들러
   * @param isUpdated 업데이트 여부
   */
  onClosed: (isUpdated: boolean) => void;
}

const showPopup = ref(false);
const prjAplyId = ref(0);
const isUpdated = ref(false);
const finalOptions = ref<Options>();
const {
  data: applimentData,
  isFetched,
  isLoading,
} = useRecruiteApplyment(prjAplyId, {
  enabled: computed(() => !!prjAplyId.value),
});

/**
 * 팝업 오픈 여부
 */
function open(_prjAplyId: number, options?: Options) {
  init();
  prjAplyId.value = _prjAplyId;
  finalOptions.value = options;
  showPopup.value = true;
}

function init() {
  prjAplyId.value = 0;
  finalOptions.value = null;
  isUpdated.value = false;
}

function openUrl(url: string) {
  window.open(url, '_blank');
}

/**
 * 거절 처리
 */
function rejectAppliment() {
  useMyConfirmDialog({
    text: '신청을 거절한 내역이 해당 개발자에게 전달이됩니다. 거절하시겠습니까?',
  }).onOk(async () => {
    try {
      await rejectRecruitApplyment(prjAplyId.value);
      isUpdated.value = true;
      nextTick(() => {
        useAlertDialog({ text: '해당 신청내용을 거절하였습니다.' }).onOk(() => {
          showPopup.value = false;
        });
      });
    } catch (e) {
      nextTick(() =>
        useAlertDialog({
          text: e.message,
        })
      );
    }
  });
}

/**
 * 승인 처리
 */
function approveAppliment() {
  useMyConfirmDialog({
    text: '해당 개발자의 프로젝트 멤버 참여를 수락하시겠습니까?',
  }).onOk(async () => {
    try {
      await approveRecruitApplyment(prjAplyId.value);
      isUpdated.value = true;
      nextTick(() => {
        useAlertDialog({ htmlText: '축하드립니다.<br/>개발자가 프로젝트에 참여하였습니다.' }).onOk(() => {
          showPopup.value = false;
        });
      });
    } catch (e) {
      nextTick(() =>
        useAlertDialog({
          text: e.message,
        })
      );
    }
  });
}

watch(showPopup, (v) => {
  if (v === false && finalOptions.value?.onClosed) {
    finalOptions.value.onClosed(isUpdated.value);
  }
});

defineExpose({
  open,
});
</script>
<template>
  <q-dialog v-model="showPopup" full-width maximized>
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">신청 내용 확인</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <template v-if="isFetched && applimentData">
        <section class="px-6 pt-[30px]">
          <div class="flex flex-col">
            <div class="flex items-center pb-[15px]">
              <div>
                <c-img :src="applimentData.appliment.maker.circle_thumbnail_url" class="w-[60px] h-[60px] rounded-full">
                </c-img>
              </div>

              <div class="flex flex-col ml-[12px]">
                <p class="text-[#222222] text-base font-medium leading-snug">
                  {{ applimentData.appliment.maker.nickname }}
                </p>
                <p class="text-[#056bf1] text-xs font-semibold leading-none mt-[2px]">
                  {{ applimentData.appliment.maker.desc }}
                </p>
                <p class="flex items-center mt-[2px]">
                  <span class="text-[#767676] text-xs font-normal leading-none"
                    >{{ applimentData.appliment.maker.expr_year }}년차</span
                  >
                  <q-separator vertical class="h-[10px] mx-[6px] my-[4px] top-[6px]" />
                  <span class="text-[#b5b5b5] text-xs font-normal leading-none"
                    >프로젝트 {{ applimentData.appliment.maker.project_histories.length }} 회</span
                  >
                </p>
              </div>
            </div>
            <div class="mt-[12px]">
              <introduce-text :intro="applimentData.appliment.cont" />
            </div>
            <div
              class="mt-[30px]"
              v-if="applimentData.appliment.maker.prtf?.prtf_dspy_yn && applimentData.appliment.maker.prtf?.prtf_url"
            >
              <div class="rounded-[20px] bg-[#f7f7f7] h-20 flex items-center pl-[30px] pr-[20px] justify-between">
                <div>
                  <p class="text-[#222222] text-base font-medium leading-snug">포트폴리오 방문하기</p>
                  <p class="text-[#767676] text-xs font-medium leading-none">
                    {{ applimentData.appliment.maker.prtf?.prtf_url }}
                  </p>
                </div>
                <q-icon
                  class="cursor-pointer"
                  name="img:/icons/icon_enter_arrow.svg"
                  size="26px"
                  @click="openUrl(applimentData.appliment.maker.prtf?.prtf_url)"
                />
              </div>
            </div>
          </div>
        </section>
        <hr class="h-2.5 bg-[#f7f7f7] mt-8" />
        <section class="px-6 mt-[40px]">
          <h2 class="text-[22px] font-semibold">인적 사항</h2>
          <div class="space-y-2 mt-[14px]">
            <div class="flex justify-start items-center">
              <span class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]">국적</span>
              <span class="text-[#222222] text-sm font-normal leading-tight]">{{
                applimentData.appliment.maker.prfl?.bio?.ntnl
              }}</span>
            </div>
            <div class="flex justify-start items-center">
              <span class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]">언어</span>
              <span class="text-[#222222] text-sm font-normal leading-tight">{{
                applimentData.appliment.maker.prfl?.bio?.lang
              }}</span>
            </div>
            <div class="flex justify-start items-center">
              <span class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]">거주지역</span>
              <span class="text-[#222222] text-sm font-normal leading-tight">{{
                applimentData.appliment.maker.prfl?.bio?.loct
              }}</span>
            </div>
          </div>
        </section>
        <section class="px-6 mt-[60px]">
          <h2 class="text-[22px] font-semibold">업무 정보</h2>
          <div class="mt-[12px]">
            <p class="text-[#b5b5b5] text-xs font-semibold leading-none">한 줄 프로필</p>
            <p class="mt-[8px] text-[#222222] text-sm font-normal leading-tight">
              {{ applimentData.appliment.maker.desc }}
            </p>
          </div>
          <div class="mt-[22px]">
            <p class="text-[#b5b5b5] text-xs font-semibold leading-none">업무 스킬</p>
            <p class="mt-[8px] text-[#222222] text-xs font-normal leading-none">
              {{ applimentData.appliment.maker.prfl?.skills?.join(' , ') }}
            </p>
          </div>
          <div class="mt-[22px]">
            <p class="text-[#b5b5b5] text-xs font-semibold leading-none">희망 직무</p>
            <p class="mt-[8px] text-[#222222] text-xs font-normal leading-none">
              {{ applimentData.appliment.maker.prfl?.job_objs?.join(' , ') }}
            </p>
          </div>
          <!-- <div class="mt-[24px]">
            <p class="text-[#b5b5b5] text-xs font-semibold leading-none">관심 분야</p>
            <div class="text-caption q-mb-xs mt-[16px]">
              <span class="badge-primary text-[14px] font-medium">롤플레잉</span>
            </div>
          </div> -->
        </section>
        <section class="px-6 mt-[60px]" v-if="applimentData.appliment.maker.project_histories.length">
          <h2 class="text-[22px] font-semibold">
            참여했던 프로젝트 ({{ applimentData.appliment.maker.project_histories.length }}회)
          </h2>
          <!-- <NormalProjectList type="project" :p-list="applimentData.appliment.maker.project_histories" /> -->
          <!-- @vue-expect-error -->
          <RecruitMakerProjectList class="mt-[20px]" :p-list="applimentData.appliment.maker.project_histories" />
        </section>
        <section
          class="bottom-[85px] w-full text-center px-6 mt-[85px] mb-6 flex flex-row gap-1"
          v-if="applimentData.recruitment.active"
        >
          <c-btn
            class="rounded-[10px] font-semibold text-base py-[14px] bottom-0 grow"
            color="primary"
            outline
            @click="() => rejectAppliment()"
            >거절
          </c-btn>
          <c-btn
            class="rounded-[10px] font-semibold text-base py-[14px] bottom-0 grow"
            color="primary"
            @click="() => approveAppliment()"
            >수락
          </c-btn>
        </section>
      </template>
      <template v-if="isFetched && !applimentData">
        <not-find-item message="데이터를 조회할 수 없습니다." />
      </template>
      <template v-if="isLoading">
        <not-find-item message="데이터를 조회 중 입니다." />
      </template>
    </q-card>
  </q-dialog>
</template>
