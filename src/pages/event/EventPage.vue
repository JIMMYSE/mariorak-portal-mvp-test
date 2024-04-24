<template>
  <q-page class="px-6 pt-[23px] bg-grey">
    <!-- title -->
    <p class="font-medium text-[13px] text-secondary">
      메타버스 공간에서 체험하는 병영생활
    </p>
    <!-- contents -->
    <router-link v-for="item in data" :key="item.id" :to="{ name: item.togo }">
      <q-card flat class="mt-4 px-[15px] pt-[17px] h-[100px] relative">
        <h3 class="font-medium text-[15px] text-primary">
          {{ item.title }}
        </h3>
        <p
          class="text-sm text-grey-4 text-pretendard"
          v-html="item.content"
        ></p>
        <q-icon
          :name="`img:/src/assets/icons/${item.img}`"
          size="85px"
          class="absolute right-0 bottom-0"
        ></q-icon>
      </q-card>
    </router-link>
  </q-page>
</template>

<script lang="ts" setup>
import { eventList } from 'src/assets/data/dummyData';
import { ref } from 'vue';

const data = ref([...eventList]);
</script>
