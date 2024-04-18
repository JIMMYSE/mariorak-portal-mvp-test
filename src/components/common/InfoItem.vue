<script setup lang="ts">
type Props = {
  iconName: string;
  label: string;
};
defineProps<Props>();
</script>

<template>
  <q-item class="pl-0" style="min-height: 34px">
    <q-item-section avatar class="w-[23px] pt-1" top>
      <q-icon
        :name="`img:/images/icons/${iconName}.svg`"
        size="13px"
        class="mr-2.5"
    /></q-item-section>
    <q-item-section top>
      <span class="text-[13px] font-light text-grey-4 break-all">
        {{ label }}
      </span>
    </q-item-section>
  </q-item>
</template>

<style scoped>
:deep(.q-item__section--avatar) {
  min-width: 23px;
}
</style>
