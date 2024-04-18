<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { toValue } from 'vue';
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
    <q-card class="fit col">
      <q-card-section class="row justify-between items-center">
        <div />
        <div class="text-[18px] font-medium">
          {{ toValue(title) }}
        </div>
        <ABtn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section
        data-cy-id="text"
        class="col-grow text-grey-4 q-px-xl q-pb-xl text-caption"
        style="word-break: break-all; color: #888888"
      >
        <q-scroll-area style="height: 500px; max-width: 500px">
          <div v-if="html" v-html="html" />
          <div v-if="text">{{ text }}</div>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
