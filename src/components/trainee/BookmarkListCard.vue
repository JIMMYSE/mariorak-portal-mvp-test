<!-- 훈련병 > 즐겨찾기 > 목록 > 카드-->

<script lang="ts" setup>
type Props = {
  data: any;
  hasLink?: boolean;
  hasIcon?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  hasLink: false,
  hasIcon: true,
});

const emits = defineEmits(['onDelete']);
</script>

<template>
  <q-card flat class="relative p-5 w-full h-[100px] bg-white rounded-[5px]">
    <h2 class="flex items-center text-[17px] font-medium text-primary">
      {{ data.name }}
      <q-icon
        v-if="props.hasLink"
        name="img:/icons/icon_arrow_pic.svg"
        size="16px"
      />
    </h2>
    <div class="font-pretendard font-medium text-sm text-grey-5 leading-[18px]">
      <p>
        [{{ data.battalion_name }}] {{ data.class_name }}
        <br />
        {{ data.company_name }} {{ data.platoon_name }} {{ data.trainee_no }}번
      </p>
      <q-icon
        v-if="hasIcon"
        class="absolute top-1 right-1"
        name="img:/icons/icon_heart.svg"
        size="40px"
        @click="$emit('onDelete', data)"
      />
    </div>
  </q-card>
</template>

<style lang="scss" scoped></style>
