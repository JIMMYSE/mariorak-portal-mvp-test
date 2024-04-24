<!-- 공통 Input -->

<script setup lang="ts">
import { QInputProps } from 'quasar';
import { useForwardProps } from 'radix-vue';
import { computed, ref } from 'vue';

interface Props extends QInputProps {
  done?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  inputClass: 'text-grey-5 text-weight-light',
  bgColor: 'white',
  outlined: true,
  clearable: false,
  clearIcon: 'close',
  rounded: true,
  done: false,
  noErrorIcon: true,
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
  <q-input v-bind="forwarded" :type="inputType" ref="inputEl" color="primary">
    <template #append>
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

<style scoped lang="scss"></style>
