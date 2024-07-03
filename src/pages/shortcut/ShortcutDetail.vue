<!-- 체험, 이벤트 상세 조회 -->

<script lang="ts" setup>
const props = defineProps<{
  id: Id;
}>();

const emit = defineEmits(['title']);

const { data } = useShortcutDetail(props.id);
watch(
  data,
  (newData) => {
    if (newData) {
      emit('title', newData.title);
    }
  },
  { immediate: true }
);

const { enterRoom } = useBridge();
function enter() {
  const mapName = data.value?.title;
  if (mapName === '입영 상담실') {
    goTo({
      name: 'event-counseling-room',
      query: { spaceTypeId: 6 },
    });
  } else {
    enterMetaverse({
      id: data.value!.space_id,
      name: data.value!.title,
      onOk: () => {
        enterRoom(data.value!.space_id);
      },
    });
  }
}
</script>

<template>
  <q-page class="flex flex-col">
    <!-- content -->
    <q-img
      :src="data?.image_file?.origin_addr ?? undefined"
      fit="cover"
      class="w-full"
    />
    <h2 class="px-6 mt-[27px] text-primary font-medium text-lg">
      {{ data?.title }}
    </h2>
    <p
      class="px-6 mt-3 text-grey-4 font-pretendard text-base whitespace-pre-wrap"
    >
      {{ data?.description }}
    </p>
    <div class="flex-1 mb-32"></div>
    <!-- 연결할 페이지 안내 없음 -->
    <div
      class="fixed inset-x-0 bottom-0 h-16 leading-16 w-full font-medium text-base z-10"
    >
      <q-btn
        type="button"
        class="size-full"
        color="primary"
        square
        unelevated
        :disable="!data"
        @click="enter"
        >입장하기</q-btn
      >
    </div>
  </q-page>
</template>

<script lang="ts"></script>

<style lang="scss" scoped></style>
