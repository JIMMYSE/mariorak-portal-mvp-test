<script lang="ts" setup>
import { MakerListType } from 'src/types/gamepack/project-model';
import { ref } from 'vue';

type Props = {
  makerList: MakerListType | undefined;
};
const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="maker in props.makerList"
      :key="maker.mem_id"
      class="flex items-center pb-[15px]"
    >
      <div>
        <c-img
          :src="maker.prfl_img.convert_addr"
          :alt="maker.mem_nickname"
          class="w-[60px] h-[60px] rounded-full"
        >
        </c-img>
        <q-icon
          v-if="maker.mkr_rol_cd == '01'"
          name="img:/icons/icon_pm_badge.svg"
          size="20px"
          class="absolute z-10 left-[65px]"
        />
      </div>

      <div class="flex flex-col ml-[12px]">
        <p class="text-[#222222] text-base font-medium leading-snug">
          {{ maker.mem_nickname }}
        </p>
        <p class="text-[#056bf1] text-xs font-semibold leading-none mt-[2px]">
          {{ getCommonCodeName('MKR_ROL', maker.mkr_rol_cd) }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
