<script lang="ts" setup>
import { PostCreate } from 'ccf-api-dto';
import { isInteger, set, toInteger } from 'lodash';
import { QUploader } from 'quasar';
import { PostCreateType } from 'src/types/community/post-model';

const isMakerBoard = ref(true);
const route = useRoute();
const prjId = route.params.id;
const showBottomSheet = ref(false);
const openCategoryBottomSheet = () => {
  showBottomSheet.value = !showBottomSheet.value;
};
const { options } = useCommonCode('POST_TY');
const postTypeSubject = options.value.filter((opt) => toInteger(opt.value) > 10);
const postTypeNotice = options.value.filter((opt) => toInteger(opt.value) < 10);
const { maker } = useAuthStore();
const channels = computed(() =>
  maker.project_histories
    ?.map((prj: any) => {
      return { prj_id: prj.prj_id, title: prj.title };
    })
    .filter((prj: any) => prj.prj_id == prjId)
);
const {
  values: form,
  handleSubmit,
  errors,
  setFieldValue,
  setValues,
  meta,
} = useForm<PostCreateType>({
  validationSchema: toTypedSchema(PostCreate),
  initialValues: {
    prj_id: null,
    post_cate_cd: null,
    post_ty_cd: null,
    title: '',
    cont: '',
  },
});

watch(
  channels,
  (newVal) => {
    if (newVal.length == 1) {
      setFieldValue('prj_id', newVal[0].prj_id);
      setFieldValue('post_cate_cd', '01');
    }
  },
  { immediate: true }
);

watch(
  () => form.prj_id,
  (newVal) => {
    if (newVal) setFieldValue('post_cate_cd', '01');
  }
);

// 선택 완료 버튼 클릭시
const temp = ref({});
const categoryText = ref('');
let isReset = true; // 초기화여부

watch(showBottomSheet, (val) => {
  if (val) {
    temp.value = { ...form };
  }
  if (!val && isReset) {
    setValues(temp.value);
  }
});

const onClickSelect = () => {
  isReset = false;
  categoryText.value = tempcategoryText.value;
  showBottomSheet.value = false;
};

const tempcategoryText = computed(() => {
  const prefix = !form.prj_id ? '' : channels.value.find((ch) => ch.prj_id == form.prj_id)?.title + '/';
  const postfix = options.value.find((opt) => opt.value === form.post_ty_cd)?.label ?? null;

  if (!postfix) return null;
  return `${prefix} ${postfix}`;
});

const fileUploader = ref<QUploader | null>(null);

const onImageUpload = () => {
  const files = fileUploader.value?.files;
};

const dummyImages = ref([]);

const onRejected = (e: any) => {
  console.log(e);
  if (e[0].failedPropValidation == 'max-file-size') {
    useNotifyThrottle('10MB 이하의 파일만 업로드 가능합니다.');
  } else if (e[0].failedPropValidation == 'max-files') {
    useNotifyThrottle('최대 5개의 파일만 업로드 가능합니다.');
  }
};
</script>
<template>
  <div class="h-full pt-10">
    <section class="px-6">
      <p class="text-[#767676] text-xs font-medium leading-none">카테고리 선택</p>
      <div @click="openCategoryBottomSheet">
        <c-input
          class="w-full pb-[14px] text-[#222222] text-lg"
          placeholder="카테고리를 선택해 주세요."
          :outlined="false"
          :rounded="false"
          border-radius="0px"
          :clearable="false"
          readonly
          disable
          :no-error="categoryText.length > 0"
          error-message="채널과 주제/공지를 1개씩 꼭 선택해주세요."
          v-model="categoryText"
          ><template #append><c-icon name="icon_enter_arrow" size="20px" :color="'#767676'" :fill="false" /></template
        ></c-input>
      </div>
    </section>
    <section class="px-6 mt-[30px]">
      <p class="text-[#767676] text-xs font-medium leading-none">글 작성</p>
      <div
        class="mt-[16px] pb-[14px] text-[#b5b5b5] text-lg font-normal leading-[25.20px] flex justify-between items-center"
      >
        <c-input
          class="w-full mb-[14px]"
          placeholder="제목을 입력하세요."
          :maxlength="20"
          name="title"
          :outlined="false"
          :rounded="false"
          border-radius="0px"
        />
        <c-input
          class="w-full border-0"
          type="textarea"
          :maxlength="100"
          input-class="h-[163px]"
          name="cont"
          placeholder="게시글 내용을 입력해 주세요."
          :outlined="false"
          :rounded="false"
          border-radius="0px"
        />
      </div>
      <q-uploader
        class="w-full"
        flat
        ref="fileUploader"
        multiple
        :max-files="5 - dummyImages.length"
        max-file-size="10485760"
        @rejected="($event) => onRejected($event)"
        accept="image/*"
      >
        <template #header="scope"></template>
        <template #list="scope">
          <div class="flex q-gutter-sm">
            <div v-for="(img, i) in dummyImages" :key="i" class="w-[75px] h-[75px] relative">
              <c-img src="https://picsum.photos/200" class="w-[75px] h-[75px] rounded-[5px]" />
              <button class="absolute top-0 right-0" @click="dummyImages.splice(i, 1)">
                <q-icon name="img:/icons/close_image.svg" size="16px" />
              </button>
            </div>
            <div v-for="file in scope.files" :key="file.__key" class="flex relative">
              <div v-if="file.__img" class="relative">
                <c-img :src="file.__img.src" class="w-[75px] h-[75px] rounded-[5px]" />
                <button class="absolute top-0 right-0" @click="scope.removeFile(file)">
                  <q-icon name="img:/icons/close_image.svg" size="16px" />
                </button>
              </div>
            </div>
            <div
              class="w-[75px] h-[75px] bg-[#f0f0f0] rounded-[5px] border border-[#b5b5b5] flex justify-center items-center z-0 relative"
            >
              <q-uploader-add-trigger
                style="position: unset; height: 80px"
                v-if="dummyImages.length + scope.files.length < 5"
              />
              <q-icon :name="`img:/icons/add_image.svg`" class="absolute" />
              <div class="text-[#b5b5b5] text-sm font-medium leading-tight absolute bottom-1">
                {{ dummyImages.length + scope.files.length }} / 5
              </div>
            </div>
          </div>
        </template>
      </q-uploader>
    </section>
    <section class="fixed bottom-[85px] px-6 w-full max-w-[512px]">
      <c-btn
        class="rounded-[10px] font-semibold text-base mt-[30px] w-full py-[14px] bottom-0"
        color="primary"
        :disable="!meta.valid"
        >게시하기
      </c-btn>
    </section>
    <c-bottom-sheet v-model="showBottomSheet">
      <div class="flex flex-col justify-between">
        <section>
          <p class="text-[#767676] text-xs font-medium leading-none">채널 선택</p>
          <div class="mt-4 flex q-gutter-md">
            <q-item
              v-if="isMakerBoard"
              v-ripple
              clickable
              @click="setFieldValue('prj_id', null)"
              :active="!form.prj_id"
              active-class="bg-primary text-white"
              class="rounded-[5px] border border-[#dbdbdb] bg-[#fff] items-center px-4 py-0 w-fit h-[40px] text-[#767676]"
              ><span class="text-center text-sm font-medium leading-tight">개발자 게시판</span></q-item
            >
            <q-item
              v-for="(channel, index) in channels"
              :key="index"
              v-ripple
              clickable
              @click="setFieldValue('prj_id', channel.prj_id)"
              :active="channel.prj_id == form.prj_id"
              active-class="bg-primary text-white"
              class="rounded-[5px] border border-[#dbdbdb] bg-[#fff] items-center px-4 py-0 w-fit h-[40px] text-[#767676]"
              ><span class="text-center text-sm font-medium leading-tight">{{ channel.title }}</span></q-item
            >
          </div>
        </section>
        <section class="mt-[30px]">
          <p class="text-[#767676] text-xs font-medium leading-none">주제</p>
          <div class="mt-4 flex q-gutter-md">
            <q-item
              v-for="(subject, index) in postTypeSubject"
              :key="index"
              v-ripple
              clickable
              @click="setFieldValue('post_ty_cd', subject.value)"
              :active="subject.value == form.post_ty_cd"
              active-class="bg-primary text-white"
              class="rounded-[5px] border text-[#767676] border-[#dbdbdb] bg-[#fff] items-center px-4 py-0 w-fit h-[40px]"
              ><span class="text-center text-sm font-medium leading-tight">{{ subject.label }}</span></q-item
            >
          </div>
        </section>
        <section class="mt-[30px]">
          <p class="text-[#767676] text-xs font-medium leading-none">공지</p>
          <div class="mt-4 flex q-gutter-md">
            <q-item
              v-for="(notice, index) in postTypeNotice"
              :key="index"
              v-ripple
              clickable
              @click="setFieldValue('post_ty_cd', notice.value)"
              :active="notice.value == form.post_ty_cd"
              active-class="bg-primary text-white"
              class="rounded-[5px] border text-[#767676] border-[#dbdbdb] bg-[#fff] items-center px-4 py-0 w-fit h-[40px]"
              ><span class="text-center text-sm font-medium leading-tight">{{ notice.label }}</span></q-item
            >
          </div>
        </section>
        <section class="bottom-[85px] w-full text-center mt-[85px]">
          <c-btn
            class="rounded-[10px] font-semibold text-base w-full py-[14px] bottom-0"
            color="primary"
            :disabled="!form.post_ty_cd"
            @click="onClickSelect"
            >선택 완료
          </c-btn>
        </section>
      </div>
    </c-bottom-sheet>
  </div>
</template>
