<!-- 샘플 등록/수정-->
<!-- VeeValidate + Yup Best practice: https://vee-validate.logaretm.com/v4/guide/best-practices -->

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup';
import { goBack, goTo } from 'src/composables/common/app';
import { useAlertDialog, useNotify } from 'src/composables/common/dialog';
import {
  MyNoticeCreate,
  MyNoticeUpdate,
  useNoticeDetail,
  useNoticeSave,
} from 'src/composables/notice/notice';
import { Id } from 'src/services/common/api-model';
import { useForm } from 'vee-validate';
import { watch, watchEffect } from 'vue';
import { InferType } from 'yup';

const props = defineProps<{
  id?: Id;
}>();

const isNew = !props.id;

// const noticeData = {
//   /** 공지유형코드 */
//   ntc_type_cd: 'N',
//   /** 공지제목 */
//   title: '',
//   /** 공지내용 */
//   ntc_cn: '',
//   /** 노출여부 */
//   expsr_yn: true,
//   /** 게시일시 */
//   pstg_bgng_dt: new Date(),
//   /** 첨부파일아이디 */
//   atch_file_id: null,
//   /** HTML사용여부 */
//   html_use_yn: false,
//   /** 관리자아이디 */
//   mngr_id: null,
// };

// Yup Object Schema
const schema = isNew ? MyNoticeCreate : MyNoticeUpdate;
// InferType: Yup Schema를 TypeScript Type으로 변환

type MyType = InferType<typeof schema>;
// useForm: VeeValidate 사용
const {
  errors,
  errorBag,
  meta,
  values: detail,
  setValues,
  setFieldValue,
  handleSubmit,
} = useForm({
  validationSchema: toTypedSchema(schema),
  // initialValues: noticeData,
});

// // 에러 발생 시 Notify
// watch(errors, (err) => {
//   Object.keys(err).forEach((key: keyof MyType) =>
//     useNotify(err[key] as string)
//   );
// });

// 수정 시 상세 조회
// props.id가 없을 때(신규 등록)는 enabled: flase 처리되어있음
const { isPending, isError, data, error } = useNoticeDetail(props.id);
if (!isNew) {
  watch(data, () => {
    if (data.value) {
      // 상세 조회 데이터를 Form에 바인딩
      setValues({
        title: data.value.title,
        ntc_cn: data.value.ntc_cn,
      });
      // 위와 같음
      // setFieldValue('title', data.value.title);
      // setFieldValue('ntc_cn', data.value.ntc_cn);
    }
  });
}

// 저장
const {
  // isPending: isSavePending,
  // isError: isSaveError,
  // error: saveError,
  isSuccess: isSaveSuccess,
  mutate,
} = useNoticeSave<MyType>(props.id);

// 저장
const saveNotice = handleSubmit(async () => {
  // Validate
  if (isNew) {
    try {
      const result = await schema.validate(detail, { abortEarly: false });
      console.log('result', result);
    } catch (e) {
      console.log('!!', e);
      return;
    }
  }

  // Save
  mutate(detail as MyType);

  watch(isSaveSuccess, (value) => {
    if (!value) return;

    useAlertDialog({
      title: isNew ? 'message.registered' : 'message.updated',
    }).onDismiss(() => {
      if (isNew) {
        goTo('/sample/list');
      } else {
        goBack();
      }
    });
  });
});
</script>

<template>
  <q-page class="column">
    <q-card flat>
      <q-card-section v-if="!isNew && isPending">Loading...</q-card-section>
      <q-card-section v-else-if="!isNew && isError">
        Error: {{ error?.message }}
      </q-card-section>
      <template v-else>
        <q-card-section>
          <div>{{ JSON.stringify(detail, null, 2) }}</div>
          <a-input-vee
            name="title"
            maxlength="300"
            placeholder="제목을 입력해 주세요."
            clearable
            hint="항목 설명 힌트입니다. 힌트입니다. 힌트입니다. "
            bottom-slots
          />
        </q-card-section>
        <q-card-section>
          <a-input-vee
            type="textarea"
            name="ntc_cn"
            maxlength="4000"
            placeholder="내용을 입력해 주세요."
            bottom-slots
          />
        </q-card-section>
        <q-card-section>
          <!-- <div>{{ JSON.stringify(errors, null, 2) }}</div> -->
          <a-btn class="full-width" label="저장" @click="saveNotice" />
        </q-card-section>
      </template>
    </q-card>
  </q-page>
</template>

<style lang="scss" scoped></style>
