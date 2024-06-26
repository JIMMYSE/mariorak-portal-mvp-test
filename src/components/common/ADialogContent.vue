<script setup lang="ts">
import { ADialogContentProps } from './ADialogContent';

const props = withDefaults(defineProps<ADialogContentProps>(), {
  title: '',
  text: '',
  html: '',
});

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>

<template>
  <q-dialog ref="dialogRef" persistent maximized @hide="onDialogHide">
    <q-card class="flex flex-col flex-nowrap p-2" flat>
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
