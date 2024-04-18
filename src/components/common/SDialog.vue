<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { Message } from 'src/services/common/common-model';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ADialogProps } from './ADialog';

// export interface ADialogProps {
//   type?: 'alert' | 'confirm';
//   dialogTitle?: Message;
//   title?: Message;
//   htmlTitle?: Message;
//   text?: Message;
//   htmlText?: Message;
//   contentComponent?: any;
//   okLabel?: Message;
//   cancelLabel?: Message;
//   persistent?: boolean;
//   buttons?: { label: string; value: unknown; color?: string }[];
// }

const props = withDefaults(defineProps<ADialogProps>(), {
  type: 'alert',
  dialogTitle: '',
  title: '',
  htmlTitle: '',
  text: '',
  htmlText: '',
  contentComponent: null,
  okLabel: 'label.ok',
  cancelLabel: 'label.cancel',
  persistent: true,
  buttons: undefined,
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
  <QDialog ref="dialogRef" :persistent="persistent" @hide="onDialogHide">
    <QCard class="q-dialog-plugin">
      <!-- HEADER -->
      <QCardSection
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
      </QCardSection>

      <!-- CONTENT COMPONENT -->
      <component v-if="contentComponent" :is="contentComponent"></component>

      <!-- CONTENT TEXT -->
      <QCardSection
        data-cy-id="text"
        class="text-grey-4 px-[28px] pb-[40px] text-[13px] font-light tracking-tight"
        style="word-break: break-all; color: #888888"
        v-if="htmlText || text"
      >
        <div v-html="getMessage(htmlText)" v-if="htmlText"></div>
        <div v-else>{{ getMessage(text) }}</div>
      </QCardSection>

      <QCardActions
        class="px-[20px]"
        align="right"
        style="height: 55px; background-color: #f3f4f6"
      >
        <ABtn
          v-for="(b, i) in buttonsComputed"
          :key="i"
          :label="getMessage(b.label)"
          :color="b.value ? 'primary' : 'grey-3'"
          :text-color="b.value === false ? 'grey-5' : undefined"
          flat
          class="text-4"
          :class="b.value ? 'font-medium' : 'font-light'"
          @click="b.value === false ? onDialogCancel() : onDialogOK(b.value)"
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
<style scoped lang="scss">
.q-card__actions .q-btn--rectangle {
  padding: 0;
}
</style>
