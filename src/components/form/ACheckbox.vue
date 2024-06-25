<!-- 공통 Checkbox -->
<!-- vee-validate v4 + yup -->

<script setup lang="ts">
import { QCheckboxProps } from 'quasar';
import { FieldContext } from 'vee-validate';

type Model = QCheckboxProps['modelValue'];

interface Props extends Omit<QCheckboxProps, 'modelValue'> {
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
});

const model = defineModel<Model>({
  required: false,
  default: null,
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
</script>

<template>
  <q-checkbox
    v-bind="props"
    v-model="model"
    checked-icon="img:/src/assets/icons/checkbox_a.svg"
    unchecked-icon="img:/src/assets/icons/checkbox_d.svg"
    size="32px"
  >
    <slot />
  </q-checkbox>
</template>

<style lang="scss" scoped></style>
