<script lang="ts" setup>
import { ProjectNewsCreateReq } from 'ccf-api-dto';
import { toInteger } from 'lodash';
import { ProjectNewsCreateReqType } from 'src/types/community/news-model';

const route = useRoute();
const prjId = route.params.id;

const {
  values: form,
  handleSubmit,
  errors,
  setFieldValue,
  meta,
} = useForm<ProjectNewsCreateReqType>({
  validationSchema: toTypedSchema(ProjectNewsCreateReqFront),
  initialValues: {
    prj_id: toInteger(prjId),
    title: '',
    news_url: '',
    thmn_file_id: null,
  },
});

const fileUploader = ref<any | null>(null);

const getFlieId = async () => {
  const file = fileUploader.value.files[0];
  const { data } = await uploadFile({ file: file });
  console.log(data);
  return data.data.file.id;
};
/** 등록 */
const { mutateAsync, isSuccess, data } = useNewsCreate();

const onSubmit = handleSubmit(async () => {
  console.log('onSubmit', form);
  const fileId = await getFlieId();
  if (fileId) {
    setFieldValue('thmn_file_id', fileId);
  }

  mutateAsync({
    ...form,
  });

  watch(isSuccess, (value) => {
    if (value) {
      goBack();
    }
  });
});

const onRejected = (e: any) => {
  console.log(e);
  if (e[0].failedPropValidation == 'max-file-size') {
    useNotifyThrottle('10MB 이하의 파일만 업로드 가능합니다.');
  } else if (e[0].failedPropValidation == 'max-files') {
    useNotifyThrottle('최대 1개의 파일만 업로드 가능합니다.');
  }
};
</script>
<template>
  <div class="h-full pt-1">
    <section class="px-6">
      <c-field label="제목 입력" class="text-[#767676] text-xs font-medium leading-none">
        <c-input
          class="w-full mb-[14px]"
          placeholder="제목을 입력하세요."
          :maxlength="20"
          name="title"
          :outlined="false"
          :rounded="false"
          border-radius="0px"
        />
      </c-field>
      <c-field label="URL" class="text-[#767676] text-xs font-medium leading-none mt-8 mb-8">
        <c-input
          class="w-full pb-[14px]"
          name="news_url"
          placeholder="URL을 입력하세요."
          :maxlength="100"
          :outlined="false"
          :rounded="false"
          border-radius="0px"
        />
      </c-field>
      <q-uploader
        class="w-full"
        flat
        ref="fileUploader"
        multiple
        :max-files="1"
        max-file-size="10485760"
        @rejected="($event) => onRejected($event)"
        accept="image/*"
      >
        <template #header="scope"></template>
        <template #list="scope">
          <div class="flex q-gutter-sm">
            <!-- <div v-for="(img, i) in dummyImages" :key="i" class="w-[75px] h-[75px] relative">
              <c-img src="https://picsum.photos/200" class="w-[75px] h
              <button class="absolute top-0 right-0" @click="dummyImages.splice(i, 1)">
                <q-icon name="img:/icons/close_image.svg" size="16px" />
              </button>
            </div> -->
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
              <q-uploader-add-trigger style="position: unset; height: 80px" />
              <q-icon :name="`img:/icons/add_image.svg`" class="absolute" />
              <div class="text-[#b5b5b5] text-sm font-medium leading-tight absolute bottom-1">
                {{ scope.files.length }} / 1
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
        :disable="!meta.valid || fileUploader?.files.length == 0"
        @click="onSubmit"
        >게시하기
      </c-btn>
    </section>
  </div>
</template>
