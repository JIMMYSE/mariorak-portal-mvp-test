<!-- 공통 Input(Number Only)-->

<script setup lang="ts">
import { QInput, QInputProps } from 'quasar';
import { useForwardProps } from 'radix-vue';

type Model = QInputProps['modelValue'];

export interface SInputProps extends Omit<QInputProps, 'modelValue'> {
  name?: string;
  inputType?: 'number' | 'currency' | undefined;
  done?: boolean;
  hintMaxlength?: boolean;
}

const props = withDefaults(defineProps<SInputProps>(), {
  name: '',
  type: 'text',
  inputType: 'number',
  inputClass: 'text-grey-5 font-light placeholder:text-gray-500',
  outlined: true,
  clearable: false,
  clearIcon: 'close',
  done: false,
  dense: true,
});

const forwarded = useForwardProps(props);
const model = defineModel<Model>({
  required: false,
  default: '',
});

let field: FieldContext<Model> | null = null;
if (props.name) {
  field = useField<Model>(() => props.name);
  const { value: fieldValue } = field;
  watch(
    fieldValue,
    (value) => {
      if (value !== model.value) model.value = value;
    },
    { immediate: true }
  );
  watch(model, (value) => {
    const val = value ? '' + +value : '0';
    if (value !== val) {
      nextTick(() => {
        model.value = val;
      });
    } else if (fieldValue.value !== val) {
      fieldValue.value = val;
    }
    return;
  });
}

const inputEl = ref<QInput | null>(null);

const mask = computed(() => props.mask || '###,###,###');

const inputStyle = computed(() => {
  let style;
  if (typeof props.inputStyle === 'string') {
    style = `${props.inputStyle} text-align: right`;
  } else if (Array.isArray(props.inputStyle)) {
    style = [...props.inputStyle, 'text-align: right'];
  } else {
    style = { ...props.inputStyle, 'text-align': 'right' };
  }
  return style;
});
</script>

<template>
  <q-input
    ref="inputEl"
    v-bind="forwarded"
    v-model="model"
    :error="props.name ? !!field?.errorMessage.value : !!errorMessage"
    :error-message="props.name ? field?.errorMessage.value : errorMessage"
    :hint="
      props.hint ??
      (props.hintMaxlength
        ? $t('message.input.maxLength', { length: props.maxlength })
        : undefined)
    "
    :mask
    reverse-fill-mask
    :suffix="
      props.suffix ?? (props.inputType === 'currency' ? '원' : undefined)
    "
    :maxlength="props.maxlength ?? 11"
    :bg-color="disable ? 'grey-1' : undefined"
    :input-style
    unmasked-value
  >
    <template #before v-if="$slots.before">
      <slot name="before" />
    </template>
    <template #append>
      <slot name="append" />
      <!-- done icon -->
      <q-icon
        name="img:/images/icons/icon_cheack_a.svg"
        size="40px"
        color="primary"
        v-if="done"
      />
    </template>
    <template #after v-if="$slots.after">
      <slot name="after" />
    </template>
  </q-input>
</template>

<style lang="scss" scoped>
.q-input {
  :deep(.q-field__suffix) {
    font-weight: 300 !important;
  }
}
</style>
