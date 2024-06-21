<!-- 공통 Input -->

<script setup lang="ts">
import { QInputProps } from 'quasar';
import { useForwardProps } from 'radix-vue';

type Model = string | number | null | undefined;

interface Props extends Omit<QInputProps, 'modelValue'> {
  name?: string;
  done?: boolean;
  borderRadius?: string | undefined;
  inlineCounter?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  type: 'text',
  color: 'primary',
  inputClass: 'text-grey-5 text-weight-light',
  bgColor: 'white',
  outlined: true,
  clearable: true,
  clearIcon: 'close',
  rounded: true,
  done: false,
  noErrorIcon: true,
  borderRadius: undefined,
  inlineCounter: false,
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
    if (value !== fieldValue.value) fieldValue.value = value;
  });
}

const inputEl = ref<HTMLInputElement | null>(null);

const isPasswordVisible = ref(false);
const inputType = computed(() =>
  isPasswordVisible.value ? 'text' : props.type
);

defineExpose({
  focus() {
    inputEl.value?.focus();
  },
});
</script>

<template>
  <q-input
    v-bind="forwarded"
    ref="inputEl"
    v-model="model"
    :type="inputType"
    :class="{ 'border-radius': borderRadius, 'inline-counter': inlineCounter }"
    :counter="inlineCounter"
    :error="
      props.error ?? (props.name ? !!field?.errorMessage.value : !!errorMessage)
    "
    :error-message="
      props.errorMessage ??
      (props.name ? field?.errorMessage.value : errorMessage)
    "
    :bottom-slots="false"
  >
    <template #before v-if="$slots.before">
      <slot name="before" />
    </template>
    <template #append>
      <slot name="append" />
      <div v-if="done || props.type === 'password'" class="mr-2">
        <!-- done icon -->
        <q-icon
          name="img:/src/assets/icons/check.svg"
          size="30px"
          color="primary"
          v-if="done"
        />
        <!-- eye icon -->
        <q-icon
          :name="
            isPasswordVisible
              ? 'img:/src/assets/icons/eye_a.svg'
              : 'img:/src/assets/icons/eye_d.svg'
          "
          class="cursor-pointer"
          size="30px"
          @click="isPasswordVisible = !isPasswordVisible"
          v-if="props.type === 'password'"
        />
      </div>
    </template>
    <template #after v-if="$slots.after">
      <slot name="after" />
    </template>
  </q-input>
</template>

<style scoped lang="scss">
:deep(.q-field__native) {
  font-family: 'Pretendard Variable';
  font-weight: 400;
  line-height: 18px;
}
.border-radius {
  :deep(.q-field__control) {
    border-radius: v-bind(borderRadius) !important;
  }
}
.q-input.inline-counter {
  :deep(.q-field__native) {
    padding-right: 3.5rem;
  }
  :deep(.q-field__bottom) {
    margin-top: 0;
    min-height: 0;
    height: 0.1px !important;
    padding: 0;

    .q-field__counter {
      position: absolute;
      bottom: 1rem;
      right: 1.2rem;
      color: $grey-2;
    }
  }
}
.q-field--with-bottom.inline-counter {
  padding: 0;
}
.q-textarea.inline-counter {
  position: relative;
  :deep(.q-field__native) {
    margin-bottom: 2.5rem;
    padding: 14px 20px;
  }
  :deep(.q-field__bottom) {
    position: absolute;
    bottom: 0;
    padding: 0;
    // margin-top: 0;
    // min-height: 0;
    // height: 0.1px !important;

    .q-field__counter {
      position: absolute;
      bottom: 2.5rem;
      right: 20px;
      color: $grey-2;
    }
  }
}
</style>
