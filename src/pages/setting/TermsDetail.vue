<!-- 공지사항 > 상세 -->

<script setup lang="ts">
const route = useRoute();
const pageType = computed(() =>
  route.name === 'service-terms' ? 'service' : 'privacy'
);

const props = defineProps<{
  id?: Id;
}>();

const { data } = useTermsDetail(props.id);
</script>

<template>
  <q-page class="">
    <!-- <p class="px-6 mt-[11px] font-pretendard text-sm text-secondary leading-5">
      {{ data?.contents }}
    </p> -->
    <div
      class="px-6 mt-[11px] font-pretendard text-sm text-secondary leading-5"
      flat
    >
      <div
        class="tiptap-editor"
        v-html="$filterHtmlWithNewLine(data?.contents)"
      ></div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
