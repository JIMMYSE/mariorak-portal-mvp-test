<!-- 훈련병 > 즐겨찾기 > 목록 -->

<script lang="ts" setup>
const { data: listData } = useBookmarkList();

// 삭제
const { isSuccess: isDeleteSuccess, mutateAsync } = useBookmarkDelete();
const deleteBookmark = (data: any) => {
  useMyConfirmDialog({
    text: 'message.bookmark.deleteConfirm',
  }).onOk(() => {
    mutateAsync(data.id);
  });
};

const descriptions = {
  photo: `
    훈련병 등록 후 사진을 볼 수 있습니다. <br />
    즐겨찾기 추가를 통해 훈련병을 등록해 주세요.
`,
  platoon: `
    입력한 정보가 정확하지 않을 경우 사진보기 메뉴를 <br />
    정상적으로 이용할 수 없거나, 작성한 편지가 훈련병에게 <br />
    전달되지 않을 수 있습니다.
`,
  default: `
    입력한 정보가 정확하지 않을 경우 사진보기 메뉴를 <br />
    정상적으로 이용할 수 없거나, 작성한 편지가 훈련병에게 <br />
    전달되지 않을 수 있습니다.
`,
};
</script>

<template>
  <q-page class="px-6 pt-[25px] bg-grey">
    <transition-group name="list">
      <bookmark-list-card
        v-for="data in listData?.rows"
        :key="data.id"
        :data
        @on-delete="deleteBookmark"
      />
    </transition-group>

    <div>
      <!-- ADD BUTTON -->
      <q-btn
        v-if="listData?.rows && listData?.rows.length < 2"
        class="mt-[10px] font-pretendard w-full h-[100px]"
        outline
        color="primary"
        size="md"
        :to="{ name: 'trainee-bookmark-new' }"
      >
        <q-icon
          class="mr-1"
          name="img:/src/assets/icons/icon_plus.svg"
          size="10px"
        />
        즐겨찾기 추가
      </q-btn>
      <!-- MAX FAVORITE ITEMS -->
      <div
        v-if="listData?.rows && listData?.rows.length >= 2"
        class="mt-[10px] w-full h-[100px] text-center rounded-[5px] border border-grey-2 text-grey-3 text-xs font-pretendard flex justify-center items-center"
      >
        즐겨찾기는 최대 2명까지 가능합니다.
        <br />이미 등록된 즐겨찾기를 취소하신 후 추가해주세요.
      </div>
      <!-- WITH NO FAVORITE ITEMS -->
      <p
        class="mt-5 text-center text-xs font-pretendard text-grey-3 flex justify-center items-center"
      >
        <template v-if="listData?.rows && !listData?.rows.length">
          즐겨찾기 한 훈련병이 없습니다.<br />즐겨 찾기를 등록 주세요
        </template>
      </p>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(-100vw);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
