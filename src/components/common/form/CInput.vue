<!-- 공통 Input -->

<script setup lang="ts">
import { event, QInputProps, QInput } from 'quasar';
import { useForwardProps } from 'radix-vue';

type Model = string | number | null | undefined;

interface Props extends Omit<QInputProps, 'modelValue'> {
  name?: string;
  done?: boolean;
  borderRadius?: string | undefined;
  inlineCounter?: boolean;
  noError?: boolean;
  checkBadwords?: boolean;
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
  noError: false,
});

const forwarded = useForwardProps({ ...props, clearable: false });
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

const inputEl = ref<null | QInput>(null);

const isPasswordVisible = ref(false);
const inputType = computed(() => (isPasswordVisible.value ? 'text' : props.type));

defineExpose({
  focus() {
    inputEl.value?.focus();
  },
});
const emits = defineEmits(['hasBadword']);

//q-input 한글 바로 반영되게 처리
onMounted(() => {
  const el = inputEl.value?.getNativeElement();
  el?.addEventListener('input', (e: any) => {
    model.value = e.target?.value;
  });
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
    :error="!props.noError && (props.name ? !!field?.errorMessage.value : !!errorMessage)"
    :error-message="props.errorMessage ?? (props.name ? field?.errorMessage.value : errorMessage)"
  >
    <template #before v-if="$slots.before">
      <slot name="before" />
    </template>
    <template #append>
      <slot name="append" />
      <div v-if="done || props.type === 'password'" class="mr-2">
        <!-- eye icon -->
        <q-icon
          :name="isPasswordVisible ? 'img:/icons/eye_a.svg' : 'img:/icons/eye_d.svg'"
          class="cursor-pointer"
          size="30px"
          @click="isPasswordVisible = !isPasswordVisible"
          v-if="props.type === 'password'"
        />
        <!-- done icon -->
        <q-icon name="img:/icons/check.svg" size="30px" color="primary" v-if="done" />
      </div>
      <q-icon
        v-if="model && clearable"
        class="cursor-pointer"
        name="img:/icons/close.svg"
        size="20px"
        @click.stop.prevent="model = null"
      />
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
    border: none;
  }
}
.q-input.inline-counter {
  :deep(.q-field__native) {
  }
  :deep(.q-field__bottom) {
    margin-top: 0;
    min-height: 0;
    height: 0.1px !important;
    padding: 0;

    .q-field__counter {
      position: absolute;
      bottom: 1rem;
      right: 1.5rem;
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
