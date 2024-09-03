<!-- 개인정보처리방침 -->

<script setup lang="ts">
const { request } = useSearchFilter({
  requestDefault: {
    filters: {
      is_active: {
        eq: true,
      },
    },
    from: 0,
    size: 10,
    sort: [
      {
        sequence: 'asc',
      },
    ],
  },
});

const { data: termsData } = useTermsList({ searchRequest: request });
const privacyData = computed(() =>
  termsData.value?.rows.find(
    (r: { type: string }) => r.type === 'PERSONAL_DATA_PROCESS'
  )
);
</script>

<template>
  <q-page class="column">
    <q-card v-if="privacyData" class="q-mb-xl" flat>
      <q-card-section>
        <div v-html="privacyData.content"></div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style lang="scss" scoped>
.join__policy_content {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  width: 100%;
  flex: 1 0 0%;

  .join__policy_desc {
    width: 100%;
    padding: 16px;
    border: 1px solid #e0e0e0;
    font-size: 12px;
    line-height: 1.5;
  }
}

:deep(.policy__header) {
  font-size: 12px;
  color: #111;
}

:deep(.policy__title) {
  display: block;
  font-weight: 700;
  font-size: 14px;
  color: #111;
  margin-top: 1.2rem;
}

:deep(.policy__subTitle) {
  display: block;
  font-weight: 400;
  font-size: 14px;
  color: #111;
}

:deep(.policy__content) {
  font-size: 12px;
  color: #424242;
}

:deep(.policy__list) {
  padding-left: 8px;
  font-size: 12px;
  list-style: none;
}

:deep(.policy__table) {
  border: 1px solid #bdbdbd;
  font-size: 12px;
  color: #111;

  th,
  td {
    padding: 8px;
    &:not(:last-child) {
      border-right: 1px solid #bdbdbd;
    }
  }

  th {
    border-bottom: 1px solid #bdbdbd;
    text-align: center;
  }

  strong {
    color: #8365e8;
    font-size: 1.4rem;
  }
}

.is-bold {
  font-weight: 700;
}

.is-underline {
  text-decoration: underline;
}
</style>
