<script setup lang="ts">
import { ref, computed } from 'vue';
import { Id } from 'src/types/common/api-model';
import { useRoute } from 'vue-router';

const emit = defineEmits(['ok']);

// 목록 조회
const { data: listData } = useNoticePopupList();

// 현재 보고 있는 공지사항의 인덱스
const currentIndex = ref(0);

// 현재 공지사항
const currentNotice: any = computed(() => {
  return listData.value?.rows &&
    listData.value.rows.length >= currentIndex.value
    ? listData?.value?.rows[currentIndex.value]
    : [];
});

// 마지막 공지사항인지 확인
const isLastNotice = computed(() => {
  return (
    !listData.value || currentIndex.value === listData.value.rows.length - 1
  );
});

const confirmNotice = async (id?: Id) => {
  if (id) {
    await usePost({
      url: `/notice/${id}/confirm`,
    });
  }

  if (isLastNotice.value) {
    // 마지막 공지사항이면 다이얼로그를 닫음
    emit('ok');
  } else {
    // 다음 공지사항으로 이동
    currentIndex.value++;
  }
};
</script>

<template>
  <q-card v-if="currentNotice">
    <article class="min-w-80 max-w-screen-sm px-8">
      <div class="text-caption text-center mt-4">
        {{ currentNotice?.description }}
      </div>
      <c-btn
        class="full-width mt-12 mb-12"
        color="primary"
        :label="isLastNotice ? '확인' : '다음'"
        @click="confirmNotice(currentNotice?.id)"
      />
    </article>
  </q-card>
</template>
