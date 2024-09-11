<script lang="ts" setup>
const props = defineProps<{
  itemName?: string;
  message?: string;
}>();

const checkKorean = (name: string) => {
  const lastChar = name.charCodeAt(name.length - 1);
  const isThereLastChar = (lastChar - 0xac00) % 28;
  if (isThereLastChar) {
    return '이';
  }
  return '가';
};
</script>
<template>
  <div>
    <section class="flex justify-center items-center flex-col">
      <q-img src="/images/join_failed.svg" width="120px" height="120px" />
      <q-img src="/images/icon_shadow.svg" width="110px" height="25px" class="mt-[5px]" />
    </section>
    <p class="mt-[40px] text-center text-[#767676] text-base font-normal leading-snug">
      <template v-if="message">{{ message }}</template>
      <template v-else
        >해당 검색어에 맞는 {{ props.itemName }}{{ checkKorean(props.itemName as string) }} 없어요</template
      >
    </p>
  </div>
</template>
