<!-- 공통 Tab -->

<script setup lang="ts">
import { QTabsProps } from 'quasar';

type Model = string | number | undefined;

export interface ATabsProps extends QTabsProps {
  tabs: { label: string; name: Model }[];
  disable?: boolean;
}

const props = withDefaults(defineProps<ATabsProps>(), {
  disable: false,
});

const model = defineModel<Model>();
</script>

<template>
  <q-tabs
    class="rounded-md"
    v-model="model"
    align="left"
    active-color="primary"
    content-class="text-zinc-500"
  >
    <template v-for="tab in props.tabs" :key="tab.name">
      <q-tab
        class="px-6"
        :name="tab.name"
        :label="tab.label"
        :disable="props.disable"
      />
    </template>
  </q-tabs>
  <q-separator />
</template>

<style lang="scss" scoped>
:deep() {
  .q-tab__label {
    font-size: 1.005rem;
    line-height: 1.75rem; /* 28px */
    font-weight: 500;
    color: #767676;
  }
  .q-tab__indicator {
    background-color: #056bf1;
  }
}
</style>
