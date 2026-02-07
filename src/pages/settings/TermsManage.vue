<script setup lang="ts">
const terms = ref([
  { id: 1, label: '[필수] 만 14세 이상', agreed: true, hasDetail: false },
  { id: 2, label: '[필수] 서비스 이용약관', agreed: true, hasDetail: true },
  { id: 3, label: '[필수] 개인정보 수집 이용동의', agreed: true, hasDetail: true },
  { id: 4, label: '[선택] 마케팅 정보 수신동의', agreed: false, hasDetail: true },
]);

const showTermDetail = ref(false);
const selectedTerm = ref<any>(null);

const onViewDetail = (term: any) => {
  selectedTerm.value = term;
  showTermDetail.value = true;
};
</script>

<template>
  <q-page class="bg-white pb-20">
    <div class="mx-4 mt-4 bg-white rounded-lg border border-grey-1 p-4">
      <div v-for="(term, idx) in terms" :key="term.id">
        <div class="py-3">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <span class="text-[14px] text-grey-5">{{ term.label }}</span>
              <q-icon v-if="term.hasDetail" name="chevron_right" size="20px" class="text-grey-3 cursor-pointer" @click="onViewDetail(term)" />
            </div>
          </div>
          <div class="flex justify-end items-center gap-2 mt-1">
            <span class="text-[14px]" :class="term.agreed ? 'text-grey-5' : 'text-grey-3'">
              {{ term.agreed ? '동의' : '미동의' }}
            </span>
            <q-toggle v-model="term.agreed" color="pink" />
          </div>
        </div>
        <q-separator v-if="idx < terms.length - 1" />
      </div>
    </div>

    <!-- 약관 상세 다이얼로그 -->
    <q-dialog v-model="showTermDetail" full-width>
      <q-card class="rounded-lg">
        <q-card-section>
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-[16px] font-bold text-grey-5">{{ selectedTerm?.label }}</h3>
            <q-btn flat round size="sm" icon="close" v-close-popup />
          </div>
          <p class="text-[12px] text-grey-3 mb-2">최종 갱신일 : 2026-05-12 13:22:12</p>
          <p class="text-[14px] text-grey-4 leading-relaxed">
            서비스 이용약관입니다. 서비스 이용약관에 대한 상세 내용이 표시됩니다.
          </p>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
