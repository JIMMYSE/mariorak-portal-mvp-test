<!-- 공통 Input -->
<!-- vee-validate v4 + yup -->

<script setup lang="ts">
import { QInputProps } from 'quasar';
import { useForwardProps } from 'radix-vue';
import { getRandomId } from 'src/utils/string-util';
import { useField } from 'vee-validate';
import { computed, ref } from 'vue';

interface Props extends Omit<QInputProps, 'modelValue'> {
  name: string;
  modelValue?: string | number | null | undefined;
  done?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  inputClass: 'text-grey-5 text-weight-light',
  bgColor: 'white',
  outlined: true,
  clearable: false,
  clearIcon: 'close',
  done: false,
  modelValue: undefined,
});

const forwarded = useForwardProps(props);

const inputEl = ref<HTMLInputElement | null>(null);

const isPasswordVisible = ref(false);
const inputType = computed(() =>
  isPasswordVisible.value ? 'text' : props.type
);

const { value: modelValue, errorMessage } = useField(
  props.name ?? getRandomId(),
  undefined,
  {
    initialValue: props.modelValue,
    syncVModel: true,
  }
);
</script>

<template>
  <q-input
    v-bind="forwarded"
    ref="inputEl"
    :type="inputType"
    v-model="modelValue"
    :error="!!errorMessage"
    :error-message="errorMessage"
  >
    <template #append>
      <div class="q-gutter-x-md">
        <!-- done icon -->
        <q-icon
          name="img:/images/icons/icon_cheack_a.svg"
          size="40px"
          color="primary"
          v-if="done"
        />
        <!-- eye icon -->
        <q-icon
          :name="
            isPasswordVisible
              ? 'img:/images/icons/icon_eyes_a.svg'
              : 'img:/images/icons/icon_eyes_d.svg'
          "
          class="cursor-pointer"
          size="40px"
          @click="isPasswordVisible = !isPasswordVisible"
          v-if="props.type === 'password'"
        />
      </div>
    </template>
  </q-input>
</template>

<style scoped lang="scss"></style>
