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
  done: false,
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
  <q-input v-bind="forwarded" :type="inputType" ref="inputEl">
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
