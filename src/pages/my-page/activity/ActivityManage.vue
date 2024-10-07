<script lang="ts" setup>
interface ListItem {
  label: string;
  name: string;
}

const activivyItems = ref<ListItem[]>([
  { label: '좋아요 표시한 프로젝트', name: 'like-project' },
  { label: '좋아요 표시한 게임', name: 'like-game' },
]);

const goToPage = (name: string) => {
  goToName(name);
};
</script>
<template>
  <q-page>
    <section class="px-6 mt-[28px] pt-[30px]">
      <div class="mt-[8px]">
        <q-list bordered class="rounded-[10px] border-[#f0f0f0]">
          <q-item
            v-for="item in activivyItems"
            :key="item.label"
            clickable
            @click="goToPage(item.name)"
            class="py-[20px] px-[24px] border-b-[1px] border-[#f0f0f0] last:border-0"
          >
            <q-item-section>
              <q-item-label class="text-[#222222] text-base font-medium leading-tight">{{ item.label }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <c-icon name="icon_enter_arrow" color="#b5b5b5" size="16px" :fill="false"></c-icon>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </section>
  </q-page>
</template>
