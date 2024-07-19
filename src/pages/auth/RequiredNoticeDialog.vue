<!-- 필수 공지사항 다이얼로그 -->
<script setup lang="ts">
import { Id } from 'src/services/common/api-model';
import { useRoute } from 'vue-router';

//FIXME: implement get user id from route
const route = useRoute();

const emit = defineEmits(['ok']);

// 목록 조회
const { data: listData } = useNoticePopupList();
// listData 중 updated_at 가 가장 최신인 데이터
const latestNotice = computed(
  () =>
    listData.value?.rows.sort((a: any, b: any) => {
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    })[0]
);

console.log(latestNotice.value);

const confirmNotice = (id: Id) => {
  usePost({
    url: `/notice/${id}/confirm`,
  });
  emit('ok');
};
</script>

<template>
  <q-card>
    <article class="min-w-80 max-w-screen-sm px-8">
      <div class="text-caption text-center mt-4">
        {{ latestNotice?.description }}
      </div>
      <a-btn
        class="full-width mt-12 mb-12"
        color="primary"
        label="확인"
        @click="confirmNotice(latestNotice?.id)"
      />
    </article>
  </q-card>
</template>
