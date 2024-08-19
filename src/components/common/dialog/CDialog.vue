<script setup lang="ts">
import { Message } from 'src/types/common/common-model';
import { useI18n } from 'vue-i18n';
import { CDialogProps } from './CDialog';

const props = withDefaults(defineProps<CDialogProps>(), {
  type: 'alert',
  dialogTitle: '',
  title: '',
  htmlTitle: '',
  text: '',
  htmlText: '',
  okLabel: 'label.ok',
  cancelLabel: 'label.cancel',
  persistent: true,
  buttons: undefined,
  contentComponent: null,
  contentComponentProps: undefined,
  closeButton: false,
});

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const { t } = useI18n();

const buttonsComputed = computed(
  () =>
    props.buttons ??
    (props.type === 'confirm'
      ? [
          { label: props.cancelLabel, value: false },
          { label: props.okLabel, value: true },
        ]
      : [{ label: props.okLabel, value: true }])
);

function getMessage(message: Message) {
  if (typeof message === 'string') {
    return t(message);
  }
  return t(message.key, message.data);
}
</script>

<template>
  <q-dialog ref="dialogRef" :persistent="persistent" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <!-- HEADER -->
      <q-card-section
        class="px-[28px] pt-[37px] pb-[21px] leading-6"
        style="word-break: break-all"
        v-if="htmlTitle || title"
      >
        <!-- TITLE TEXT -->
        <div
          class="text-h3 font-medium"
          v-html="getMessage(htmlTitle)"
          v-if="htmlTitle"
        ></div>
        <div v-else class="text-h3 font-medium">
          {{ getMessage(title) }}
        </div>
      </q-card-section>

      <!-- CONTENT COMPONENT -->
      <component
        v-if="contentComponent"
        :is="contentComponent"
        v-bind="contentComponentProps"
        @ok="onDialogOK"
      />

      <!-- CONTENT TEXT -->
      <q-card-section
        data-cy-id="text"
        class="text-black p-10 text-[15px] tracking-tight break-all justify-center items-center column w-full"
        v-if="htmlText || text"
      >
        <div v-html="getMessage(htmlText)" v-if="htmlText"></div>
        <div v-else>{{ getMessage(text) }}</div>
      </q-card-section>

      <div
        v-if="buttonsComputed.length > 0"
        class="p-0 flex m-0"
        style="height: 55px; background-color: #f3f4f6"
      >
        <q-btn
          v-for="(b, i) in buttonsComputed"
          :key="i"
          :label="getMessage(b.label)"
          :color="b.value ? 'primary' : 'grey'"
          :text-color="b.value ? 'white' : 'primary'"
          square
          flat
          inelevated
          class="text-[15px] flex-1"
          :class="b.value ? 'font-medium bg-primary' : 'font-light'"
          @click="b.value === false ? onDialogCancel() : onDialogOK(b.value)"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
.q-card__actions .q-btn--rectangle {
  padding: 0;
}
</style>
