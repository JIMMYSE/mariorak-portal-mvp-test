<script lang="ts" setup>
import { ref } from 'vue';
type Item = {
  id: number;
  name: string;
  content: string;
};

const list = ref<Item[]>([
  {
    id: 1,
    name: '자동차',
    content: '',
  },
  {
    id: 2,
    name: '버스',
    content: '',
  },
  {
    id: 3,
    name: '기차',
    content: '',
  },
  {
    id: 4,
    name: '항공기',
    content: '',
  },
]);

const selectedItem = ref<Item>(list.value[0]);
</script>

<template>
  <q-page class="px-6 flex flex-col">
    <div class="btn-group mt-[15px] flex gap-[5px]">
      <q-btn
        v-for="item in list"
        :key="item.id"
        rounded
        :outline="selectedItem !== item"
        :color="selectedItem === item ? 'primary' : 'grey-1'"
        unelevated
        size="md"
        class="h-10 flex-1 q-btn--outline-grey"
        :text-color="selectedItem === item ? 'white' : 'black'"
        @click="selectedItem = item"
      >
        {{ item.name }}
      </q-btn>
    </div>

    <div
      class="flex-1 flex justify-center items-center rounded-[5px] border border-grey-1 mt-10 text-center text-grey-3"
    >
      <p>관련 이미지 영역</p>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.level-btn:hover {
  background-color: #196af5;
  color: #fff;
  border: none;
}
</style>
