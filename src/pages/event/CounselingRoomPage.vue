<script lang="ts" setup>
import { metaverseList } from 'src/assets/data/dummyData';
import { useConfirmDialog } from 'src/composables/common/dialog';
import { useBridge } from 'src/composables/common/useBridge';
import { ref } from 'vue';

const data = ref(
  metaverseList.rows.filter(({ page }) => page === 'counseling')
);

const { enterRoom } = useBridge();
function enterMetaverse(item: any) {
  if (!item.active) return;

  const mapName = item.title;
  // user
  useConfirmDialog({
    text: { key: 'metaverse.enter.confirm.text', data: { mapName } },
    okLabel: 'label.yes',
    cancelLabel: 'label.no',
  }).onOk(() => {
    enterRoom(item.id);
  });
}
</script>

<template>
  <q-page class="px-6 pt-[30px] pb-[35px] bg-grey">
    <h1 class="text-[18px] font-medium">입영 상담실 선택</h1>
    <p class="mt-2 font-pretendard text-base leading-5 text-grey-4">
      상담실 운영에 대한 안내사항, 참여 방법에 대한 <br />
      안내사항이 표시됩니다. 상담실을 선택해 주세요.
    </p>

    <div class="mt-6">
      <q-card
        v-for="item in data"
        :key="item.id"
        flat
        class="mt-[10px] relative w-full h-[100px] flex items-center"
        :class="item.active ? 'bg-white' : 'bg-grey-1'"
        @click="enterMetaverse(item)"
      >
        <q-card-section class="p-0 flex-1 pl-[15px]">
          <h2
            class="font-medium text-primary"
            :class="item.active ? 'font-medium text-primary' : 'text-grey-4'"
          >
            {{ item.title }}
          </h2>
          <p
            v-html="item.content"
            class="text-sm font-pretendard text-grey-3 leading-[18px]"
          ></p>
        </q-card-section>
        <q-card-section class="p-0 pr-2">
          <q-icon
            name="img:/src/assets/icons/icon_arrow_event.svg"
            size="30px"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
