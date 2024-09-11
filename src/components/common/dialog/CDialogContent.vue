<script setup lang="ts">
import { CDialogContentProps } from './CDialogContent';

const props = withDefaults(defineProps<CDialogContentProps>(), {
  title: '',
  text: '',
  html: '',
});

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
const { width } = useWindowSize();
</script>

<template>
  <q-dialog
    ref="dialogRef"
    persistent
    :maximized="width <= 512"
    @hide="onDialogHide"
  >
    <q-card class="flex flex-col flex-nowrap p-2 w-[512px] h-full" flat>
      <q-card-section
        class="sticky top-0 flex justify-center items-start h-12 py-1"
      >
        <div class="text-[17px]">
          {{ title }}
        </div>
        <q-icon
          class="absolute top-0 right-2 cursor-pointer"
          name="img:/icons/btn_delete.svg"
          size="30px"
          v-close-popup
        />
      </q-card-section>
      <q-card-section class="flex-1 font-pretendard text-[14px] pb-8">
        <q-scroll-area class="size-full">
          <div v-if="html" v-html="html" />
          <div v-if="text" class="whitespace-pre-wrap">{{ text }}</div>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </q-dialog>
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
