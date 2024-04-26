<script lang="ts" setup>
import { ref } from 'vue';
import { sendLetterList } from 'src/assets/data/dummyData';
import { formatDate } from 'src/utils/date-util';
import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

const data = ref([...sendLetterList]);
const currentPage = ref(1);
const { height } = useWindowSize();
const rowsPerPage = computed(() => Math.floor((height.value - 250 - 54) / 65));
const list = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = currentPage.value * rowsPerPage.value;
  return data.value.slice(start, end);
});
const maxPages = computed(() =>
  Math.ceil(data.value.length / rowsPerPage.value)
);
</script>

<template>
  <q-page class="px-6 pt-[25px] min-w-[375px]">
    <q-card
      flat
      outline
      class="w-full h-[100px] border flex"
      style="border-color: #196af5"
    >
      <div class="py-5 pl-5 flex-1">
        <h2 class="text-[17px] font-medium text-primary leading-[23px]">
          김공군
        </h2>
        <p class="font-pretendard text-sm font-medium leading-[18px]">
          [신병 n 대대]<br />
          신병 231기 21중대 2소대 12번
        </p>
      </div>
      <router-link :to="{ name: 'write-letter' }" class="bg-primary w-[80px]">
        <q-btn flat square color="white" class="py-[20px] size-full">
          <q-icon
            name="img:/src/assets/icons/icon_letter.svg"
            size="22px"
          ></q-icon>
          <p class="text-xs font-pretendard font-medium">편지쓰기</p>
        </q-btn>
      </router-link>
    </q-card>

    <div
      class="mt-6 inset-x-4 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
    ></div>

    <q-list>
      <q-item
        v-for="item in list"
        :key="`item-${item.id}`"
        :label="item.letter_nm"
        clickable
        v-ripple
        class="w-full h-[65px] relative"
        style="padding-left: 0; padding-right: 0"
        :to="{ name: 'sent-mailbox-detail', params: { id: item.id } }"
      >
        <q-item-section>
          <h3 class="text-[13px] font-medium line-clamp-1">
            {{ item.letter_nm }}
          </h3>
          <div
            class="text-caption text-grey-4 font-pretendard flex items-center gap-2"
          >
            <span> {{ formatDate(item.crt_dt) }}</span>

            <span
              class="text-primary font-pretendard text-caption"
              :class="item.delivered ? 'visible' : 'hidden'"
              >전달완료</span
            >
          </div>
        </q-item-section>
        <!-- line -->
        <div
          class="absolute inset-x-0 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
        ></div>
      </q-item>
    </q-list>
    <div class="column items-center bottom-5 absolute w-full bg-white h-[54px]">
      <q-pagination
        v-model="currentPage"
        :max="maxPages"
        max-pages="5"
        :boundary-numbers="false"
        flat
        class="pagination text-[13px]"
        active-color="secondary"
        active-design="flat"
        color="info"
      />
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
