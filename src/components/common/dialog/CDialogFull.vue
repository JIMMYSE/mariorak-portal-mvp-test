<script setup lang="ts">
import { Message } from 'src/types/common/common-model';
import { useI18n } from 'vue-i18n';
import { CDialogFullProps } from './CDialogFull';

const props = withDefaults(defineProps<CDialogFullProps>(), {
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
  hideButtons: false,
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
  <q-dialog
    ref="dialogRef"
    :persistent="persistent"
    :maximized="true"
    @hide="onDialogHide"
  >
    <q-card
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
          name="img:/icons/btn_delete.svg"
          class="cursor-pointer"
          size="30px"
          v-close-popup
        />
      </q-card-section>
      <div class="h-[67px]"></div>

      <!-- CONTENT COMPONENT -->
      <component v-if="contentComponent" :is="contentComponent"></component>

      <!-- CONTENT TITLE -->
      <q-card-section v-if="text" class="font-pretendard">
        <!-- CONTENT TEXT -->
        <div class="whitespace-pre-wrap">
          {{ text }}
        </div>
      </q-card-section>

      {{ props }}

      <q-card-section
        v-if="!props.hideButtons"
        class="fixed inset-x-0 bottom-0 p-4 flex gap-[10.5px] items-stretch z-10 bg-white"
      >
        <c-btn
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
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
:deep(.q-btn--outline:before) {
  border-color: #afafaf;
}
</style>
