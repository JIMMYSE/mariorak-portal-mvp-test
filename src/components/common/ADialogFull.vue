<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { Message } from 'src/services/common/common-model';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ADialogFullProps } from './ADialogFull';

const props = withDefaults(defineProps<ADialogFullProps>(), {
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
          {
            label: props.cancelLabel,
            value: false,
            color: 'white',
            textColor: 'black',
          },
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
  <QDialog
    ref="dialogRef"
    :persistent="persistent"
    :maximized="true"
    @hide="onDialogHide"
  >
    <QCard
      :class="`full-width !max-h-[calc(100vh+87px+67px)] flex-nowrap pb-[${
        buttonsComputed.length ? '87px' : '0px'
      }]`"
    >
      <!-- HEADER -->
      <q-card-section
        class="fixed top-0 inset-x-0 row justify-between items-center bg-white z-10 min-h-[74px]"
      >
        <div></div>
        <!-- TITLE TEXT -->
        <div class="text-[18px] font-medium">
          {{ $filterHtml(getMessage(dialogTitle)) }}
        </div>
        <q-icon
          name="img:/images/icons/btn_close.svg"
          class="cursor-pointer"
          size="35px"
          v-close-popup
        />
      </q-card-section>
      <div class="h-[67px]"></div>

      <!-- CONTENT COMPONENT -->
      <component v-if="contentComponent" :is="contentComponent"></component>
      <!-- CONTENT TITLE -->
      <q-card-section
        class="col text-light-14 text-grey-5 column items-center"
        style="word-break: break-all"
        v-if="htmlTitle || title"
      >
        <div
          class="text-[18px] font-medium"
          v-html="$filterHtml(getMessage(htmlTitle))"
          v-if="htmlTitle"
        />
        <div class="text-[18px] font-medium q-pt-md" v-else>
          {{ $filterHtml(getMessage(title)) }}
        </div>
        <!-- CONTENT TEXT -->
        <section
          data-cy-id="text"
          class="text-h3 column items-center"
          v-if="htmlText || text"
        >
          <div v-html="$filterHtml(getMessage(htmlText))" v-if="htmlText" />
          <div v-else>{{ $filterHtml(getMessage(text)) }}</div>
        </section>
      </q-card-section>
      <q-card-section
        class="fixed inset-x-0 bottom-0 p-4 flex gap-[10.5px] items-stretch z-10 bg-white"
      >
        <a-btn
          v-for="(b, i) in buttonsComputed"
          :key="i"
          :label="$filterHtml(getMessage(b.label))"
          :color="b.color ?? 'primary'"
          :text-color="b.textColor ?? 'white'"
          :outline="b.color === 'white'"
          @click="b.value === false ? onDialogCancel() : onDialogOK(b.value)"
          class="col !min-h-[55px]"
        />
      </q-card-section>
    </QCard>
  </QDialog>
</template>
<style scoped lang="scss">
:deep(.q-btn--outline:before) {
  border-color: #afafaf;
}
</style>
