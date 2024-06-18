<!-- 모병 안내 -->

<script lang="ts" setup>
const route = useRoute();

const { data: listData } = useEnrollmentList({
  enrollmentGuideCd: route.meta.enrollmentGuideCd,
});

const selectedId = ref<Id>(undefined);
const { data: detailData } = useEnrollmentDetail(selectedId);

watch(
  listData,
  () => {
    if (listData.value?.rows.length) {
      selectedId.value = listData.value.rows[0].id;
    }
  },
  {
    immediate: true,
  }
);

type Menu = {
  id: number;
  title: string;
  content: string;
  mandatoryItems: string;
  optionalItems: string;
  prohibitedItems: string;
};
</script>

<template>
  <q-page>
    <q-scroll-area class="max-w-screen h-[70px]" :visible="false">
      <div
        class="w-full px-6 mt-[15px] flex flex-nowrap gap-[6px]"
        v-if="selectedId !== undefined"
      >
        <q-btn
          v-for="item in listData?.rows"
          :key="item.id"
          class="q-btn--outline-grey h-10 min-w-[78px]"
          rounded
          unelevated
          no-wrap
          size="md"
          :visible="false"
          :color="selectedId === item.id ? 'primary' : 'grey-1'"
          :outline="selectedId !== item.id"
          :text-color="selectedId === item.id ? 'white' : 'black'"
          @click="selectedId = item.id"
        >
          {{ item.title }}
        </q-btn>
      </div>
    </q-scroll-area>

    <section class="mt-[25px]">
      <div
        class="tiptap-editor"
        v-html="$filterHtml(detailData?.contents_description)"
      ></div>
    </section>
  </q-page>
</template>

<style lang="scss" scoped></style>
