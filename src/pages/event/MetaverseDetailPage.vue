<script lang="ts" setup>
import { metaverseList } from 'src/assets/data/dummyData';
import { useMyConfirmDialog } from 'src/composables/common/dialog';
import { useBridge } from 'src/composables/common/useBridge';
import { Id } from 'src/types/common/api-model';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const props = defineProps<{
  id: Id;
}>();

const detailId = Number(props.id);

const data = ref(metaverseList.rows.find((item) => item.id === detailId)!);

const route = useRoute();

route.meta.title = data.value.title;

const emit = defineEmits(['title']);
emit('title', data.value.title);

const { enterRoom } = useBridge();
function enterMetaverse() {
  const mapName = data.value.title;
  // user
  useMyConfirmDialog({
    text: { key: 'metaverse.enter.confirm.text', data: { mapName } },
    okLabel: 'label.yes',
    cancelLabel: 'label.no',
  }).onOk(() => {
    enterRoom(data.value.id);
  });
}
</script>
<template>
  <q-page class="flex flex-col">
    <!-- content -->
    <q-img :src="data.img_url" fit="cover" class="w-full" />
    <h2 class="px-6 mt-[27px] text-primary font-medium text-lg">
      {{ data.title }}
    </h2>
    <p
      class="px-6 mt-3 text-grey-4 font-pretendard text-base"
      v-html="data.content"
    />
    <div class="flex-1 mb-32"></div>
    <!-- 연결할 페이지 안내 없음 -->
    <div
      class="fixed inset-x-0 bottom-0 h-16 leading-16 w-full font-medium text-base z-10"
    >
      <q-btn
        class="size-full"
        color="primary"
        square
        unelevated
        @click="enterMetaverse"
        >입장하기</q-btn
      >
    </div>
  </q-page>
</template>
