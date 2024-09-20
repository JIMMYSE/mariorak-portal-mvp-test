<script setup lang="ts">
import { ProjectApplimentAddReqType, ProjectApplimentAddReq } from 'src/types/gamepack/recruit-model';

interface Options {
  /**
   * 팝업 닫을 시 핸들러
   * @param isUpdated 업데이트 여부
   */
  onClosed: (isUpdated: boolean) => void;
}

const isEllipsis = ref(true);

const showPopup = ref(false);
const prjRcrtId = ref(0);
const finalOptions = ref<Options>();
const isUpdated = ref(false);

const {
  data: recruitData,
  isLoading,
  isFetched,
} = useProjectRecruitDetail(prjRcrtId, {
  enabled: computed(() => prjRcrtId.value > 0),
});

const form = useForm<ProjectApplimentAddReqType>({
  validationSchema: toTypedSchema(ProjectApplimentAddReq),
});

const fields = {
  cont: useField<string>('cont'),
};

/**
 * 지원 창 오픈
 */
function open(_prjRcrtId: number, options: Options) {
  init();
  prjRcrtId.value = _prjRcrtId;
  finalOptions.value = options;
  showPopup.value = true;
}

function init() {
  prjRcrtId.value = 0;
  finalOptions.value = null;
  isUpdated.value = false;
  form.resetForm({
    values: {
      cont: null,
    },
  });
}

async function applyProject() {
  if (!recruitData.value.hasProfile) {
    useAlertDialog({
      text: '개발자 등록이 필요합니다. "마이페이지-개발자 프로필"에서 정보를 입력해주세요.',
    });
    return;
  }

  const validResult = await form.validate();
  if (!validResult.valid) {
    useAlertDialog({
      htmlText: '프로젝트 지원 내용을 입력해주세요.',
    });
    return;
  }

  useMyConfirmDialog({
    text: '프로젝트에 지원하시겠습니까?',
  }).onOk(async () => {
    await useApplyProject(prjRcrtId.value, fields.cont.value.value);
    isUpdated.value = true;

    useAlertDialog({
      htmlText: '프로젝트에 지원 하였습니다!<br/>지원 진행상황은 마이페이지에서 확인 가능합니다.',
    }).onOk(() => {
      showPopup.value = false;
    });
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
  <q-dialog v-model="showPopup" full-width>
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">프로젝트 지원하기</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <div class="flex flex-col justify-center items-center pt-10 pb-5 bg-white w-full">
        <div class="w-full px-6" v-if="isFetched && recruitData">
          <section class="flex justify-center items-center flex-col border-b-[1px] border-[#f0f0f0] pb-[20px]">
            <div class="flex no-wrap w-full">
              <div>
                <q-img :src="recruitData.thmn_file.convert_addr" class="rounded-xl h-[78px] w-[139px]" />
              </div>

              <div class="text-caption q-mb-xs flex-grow pl-2">
                <div class="flex items-center q-col-gutter-x-xs" ref="badgeContainer">
                  <q-badge
                    color="grey"
                    text-color="black"
                    v-for="item in recruitData.tag_list"
                    :label="item"
                    :key="item"
                  />
                  <c-icon name="icon_kebap" v-if="isEllipsis" />
                </div>
                <div class="text-[#222222] text-sm font-semibold leading-tight ellipsis-2-lines">
                  {{ recruitData.title }}
                </div>
                <div class="flex justify-between mt-2">
                  <div class="text-[#b5b5b5] text-xs font-normal leading-none">
                    {{ formatDate(recruitData.end_dttm) }} | D-{{ recruitData.rcrt.end_remain_days }}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="border-b-[1px] border-[#f0f0f0] py-[20px]">
            <c-input
              v-model="fields.cont.value.value"
              class="w-full border-0"
              type="textarea"
              maxlength="1000"
              input-class="h-[163px]"
              placeholder="프로젝트에 지원하는 내용을 입력해주세요.&#10;예)&#10; &#8226; 프로젝트 지원 분야&#10; &#8226; 본인의 역량&#10; &#8226; 포트폴리오"
              :outlined="false"
              :rounded="false"
              border-radius="0px"
              inline-counter
            ></c-input>
          </section>

          <section class="bottom-[85px] w-full text-center px-6 mt-[85px] mb-6 flex flex-row gap-1">
            <c-btn
              class="rounded-[10px] font-semibold text-base py-[14px] bottom-0 grow"
              color="primary"
              :disable="!form.meta.value.valid"
              @click="applyProject"
              >지원하기
            </c-btn>
          </section>
        </div>
        <div class="w-full px-6" v-else-if="isFetched && !recruitData">
          <not-find-item message="데이터를 조회할 수 없습니다." />
        </div>
        <div class="w-full px-6" v-else-if="isLoading">
          <not-find-item message="데이터를 조회 중 입니다." />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss"></style>
