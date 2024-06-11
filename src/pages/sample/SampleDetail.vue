<!-- 공지사항 상세 -->

<script setup lang="ts">
import { goBack, goTo } from 'src/composables/common/app';
import { useMyConfirmDialog } from 'src/composables/common/dialog';
import {
  useNoticeDelete,
  useNoticeDetail,
} from 'src/composables/notice/notice';
import { filterHtml } from 'src/utils/html-filter';
import { watch } from 'vue';

const props = defineProps<{
  id: number | string;
}>();

// 상세 조회
const { isPending, isError, data, error } = useNoticeDetail(props.id);

// 삭제
const {
  isPending: isDeletePending,
  isError: isDeleteError,
  error: deleteError,
  isSuccess: isDeleteSuccess,
  mutate,
} = useNoticeDelete(props.id);

// 삭제
function deleteNotice() {
  useMyConfirmDialog({
    title: 'message.deleteConfirm',
  }).onOk(() => {
    mutate(props.id);
    watch(isDeleteSuccess, (value) => {
      if (!value) return;
      goBack();
    });
  });
}
</script>

<template>
  <q-page class="column">
    <q-card flat>
      <q-card-section v-if="isPending">Loading...</q-card-section>
      <q-card-section v-else-if="isError">
        Error: {{ error?.message }}
      </q-card-section>
      <template v-else-if="data">
        <q-card-section class="">
          <h3>{{ data?.title }}</h3>
          <div>
            {{ data.pstg_bgng_dt }}
          </div>
        </q-card-section>
        <q-card-section class="">
          <div v-html="filterHtml(data.ntc_cn)"></div>
          <a-btn
            class="full-width"
            label="수정(테스트)"
            @click="goTo(`/sample/${id}/edit`)"
          >
          </a-btn>
          <a-btn
            class="full-width q-mt-md"
            color="red"
            label="삭제(테스트)"
            @click="deleteNotice"
          >
          </a-btn>
        </q-card-section>
      </template>
    </q-card>
  </q-page>
</template>

<style lang="scss" scoped></style>
