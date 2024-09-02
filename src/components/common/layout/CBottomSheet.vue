<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const visible = ref(props.modelValue);

const closeSheet = () => {
  visible.value = false;
  emit('update:modelValue', false);
};

watch(
  () => props.modelValue,
  (newVal) => {
    visible.value = newVal;
  }
);
</script>

<template>
  <div v-if="visible" class="backdrop" @click="closeSheet">
    <div class="bottom-sheet" @click.stop>
      <div class="handle"></div>
      <slot />
    </div>
  </div>
</template>
<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 999;
}

.bottom-sheet {
  width: 100vh;
  min-height: 580px;
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
  animation: slide-up 0.3s ease-out;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.handle {
  width: 40px;
  height: 5px;
  background: #ccc;
  border-radius: 5px;
  margin: 0 auto 10px auto;
}
</style>
