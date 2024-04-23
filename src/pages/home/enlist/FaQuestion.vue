<script lang="ts" setup>
import { ref } from 'vue';
import { faqList } from 'src/assets/data/dummyData';
const categories = ref([
  { id: 1, name: '편지' },
  { id: 2, name: '외출/휴가' },
  { id: 3, name: '특기/배속' },
  { id: 4, name: '면회' },
  { id: 5, name: '훈련병' },
  { id: 6, name: '기타' },
]);
const selectedCategory = ref(1);

const data = ref([...faqList]);

const openedId = ref(0);
</script>

<template>
  <q-page class="pt-[22px]">
    <ul
      class="mx-6 grid grid-cols-2 place-items-center h-[120px] border border-grey-1 bg-grey gap-[1px]"
    >
      <li
        v-for="item in categories"
        :key="item.id"
        class="text-base font-pretendard hover:text-primary size-full flex justify-center items-center bg-white"
        :class="item.id === selectedCategory ? 'text-primary' : 'text-grey-4'"
        @click="selectedCategory = item.id"
      >
        {{ item.name }}
      </li>
    </ul>

    <div class="mt-6 w-screen left-0 absolute h-[10px] bg-grey"></div>

    <section class="mt-6 mb-[9px]">
      <h3 class="py-[25px] px-6 text-sm font-medium text-grey-4">
        자주 묻는 질문 top 10
      </h3>
      <ul>
        <li
          v-for="item in data"
          :key="`faq-${item.id}`"
          class="flex flex-col relative"
        >
          <!-- QUESTION  -->
          <h3
            class="mx-6 py-[25px] text-[13px] font-medium relative"
            @click="openedId = openedId === item.id ? 0 : item.id"
          >
            {{ item.title }}
            <!-- ARROW ICON -->
            <q-icon
              size="30px"
              name="img:/src/assets/icons/down_arrow.svg"
              class="absolute right-0 top-[21px]"
              :class="openedId === item.id ? 'rotate-180' : ''"
            />
          </h3>
          <!-- ANSWER -->
          <div
            class="-mt-[1px] bg-grey w-full shrink overflow-hidden"
            :class="openedId === item.id ? 'flex-1' : 'flex-none basis-0'"
          >
            <p
              class="text-sm font-pretendard m-6"
              v-html="$filterHtml(item.content)"
            />
            <!-- ATTACHMENT FILE -->
            <p
              v-if="item.file"
              class="relative underline underline-offset-2 pl-[17px] mt-10 font-pretendard text-sm text-primary"
            >
              <q-icon name="img:/src/assets/icons/icon_file.svg" size="12px" />
              <a :href="item.file.url" target="_blank">{{ item.file.name }}</a>
            </p>
          </div>
          <!-- LINE -->
          <div
            class="absolute inset-x-6 bottom-0 h-[1px] border-b-[1px] border-b-[#E6E6E6]"
          ></div>
        </li>
      </ul>
    </section>
  </q-page>
</template>

<style lang="scss" scoped></style>
