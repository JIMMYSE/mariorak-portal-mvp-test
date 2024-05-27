<!-- 공통 > 페이지네이션 -->

<script setup lang="ts">
interface Props {
  totalRows?: number | undefined;
  from: number;
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  totalRows: undefined,
  size: 10,
});

const emit = defineEmits(['onChange']);

const rowsPerPage = computed(() => props.size ?? 10);
const myTotalRows = ref<number>(props.totalRows ?? 0);

watchEffect(() => {
  // * 주의: props.rows, props.totalRows는 vue-query의 data이기 때문에 새 데이터 조회 시 잠시 undefiend 상태가 됨.
  if (props.totalRows != null) {
    myTotalRows.value = props.totalRows;
  }
});

// 현재 페이지
const currentPage = computed({
  get: () => {
    return props.from / rowsPerPage.value + 1;
  },
  set: (val) => {
    const from = (val - 1) * rowsPerPage.value;
    emit('onChange', { from });
  },
});

// q-pagination 설정
const max = computed(() => {
  return Math.ceil(myTotalRows.value / rowsPerPage.value);
});
</script>

<template>
  <div class="row justify-center w-full h-24">
    <q-pagination
      class="pagination"
      v-model="currentPage"
      :max="max"
      max-pages="7"
      color="info"
      active-color="secondary"
      active-design="flat"
      active-text-color="primary"
      :boundary-numbers="false"
      :ellipses="false"
    />
    <!-- direction-links
      boundary-links -->
  </div>
</template>

<script lang="ts"></script>

<style lang="scss" scoped>
:deep(.q-pagination) {
  .q-btn {
    min-width: 25px !important;
  }
  .q-btn__content {
    font-size: 13px;
  }
}
</style>
