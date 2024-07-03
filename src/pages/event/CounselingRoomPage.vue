<!-- 메인 > 이벤트 > 입영 상담소 -->

<script lang="ts" setup>
const route = useRoute();
const { data: spaceData } = useSpaceListBySpaceTypeId({
  spaceTypeId: Number(route.query.spaceTypeId as string),
});

const { enterRoom } = useBridge();
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
        v-for="item in spaceData?.rows"
        :key="item.id"
        class="mt-[10px] relative w-full h-[100px] flex items-center"
        :class="item.space_status_cd === '50' ? 'bg-white' : 'bg-grey-1'"
        flat
        @click="
          enterMetaverse({
            id: item.id,
            name: item.name,
            space_status_cd: item.space_status_cd,
            onOk: () => {
              enterRoom(item.id);
            },
          })
        "
      >
        <q-card-section class="p-0 flex-1 pl-[15px]">
          <h2
            class="font-medium text-primary"
            :class="
              item.space_status_cd === '50'
                ? 'font-medium text-primary'
                : 'text-grey-4'
            "
          >
            {{ item.name }}
          </h2>
          <p
            class="text-sm font-pretendard text-grey-3 leading-[18px] whitespace-pre-wrap line-clamp-2"
          >
            {{ item.contents }}
          </p>
        </q-card-section>
        <q-card-section class="p-0 pr-2">
          <q-icon name="img:/icons/icon_arrow_event.svg" size="30px" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts"></script>

<style lang="scss" scoped></style>
