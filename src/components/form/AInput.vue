<!-- 공통 Input -->

<script setup lang="ts">
import { QInputProps } from 'quasar';
import { useForwardProps } from 'radix-vue';

interface Props extends QInputProps {
  done?: boolean;
  borderRadius?: string | undefined;
  inlineCounter: boolean;
}

const props = withDefaults(defineProps<Props>(), {
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
    :counter="inlineCounter"
    :type="inputType"
    ref="inputEl"
    :class="{ 'border-radius': borderRadius, 'inline-counter': inlineCounter }"
  >
    <template #append v-if="done || props.type === 'password'">
      <div class="mr-2">
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
