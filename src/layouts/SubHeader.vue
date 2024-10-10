<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
const { bgColor } = useHeaderBGColor();

const route = useRoute();

const isPost = computed(() => route.name === 'board-detail');
const showTooltip = ref(false);
const boardId = computed(() => route.params.boardId);

const { target } = useOutSideTarget();

onClickOutside(target, (event) => {
  showTooltip.value = false;
});

const { mutateAsync: onDelete } = usePostDelete(boardId);
const onClick = () => {
  useMyConfirmDialog({
    text: t('message.deleteConfirm'),
  }).onOk(async () => {
    await onDelete(boardId.value.toString());
    goBack();
  });
};

const { currentPost } = useCurrentPostInfo();
const { maker } = useAuthStore();
</script>
<template>
  <q-header class="fixed flex flex-center text-grey-5 pt-[var(--statusbar-h)]" :class="`bg-${bgColor}`">
    <q-toolbar class="flex justify-items-center h-[var(--main-header-h)] pr-1 bg-white justify-between">
      <div>
        <c-btn-icon @click="goBack()" icon="img:/icons/icon_back.svg" size="30px" />
      </div>

      <div
        class="text-center text-[#191919] text-base font-medium leading-tight absolute left-1/2 transform -translate-x-1/2"
      >
        {{ route.meta.title }}
      </div>
      <div>
        <div v-if="isPost && currentPost?.mem_id == maker?.mem_id">
          <q-icon name="img:/icons/icon_detail.svg" @click="showTooltip = !showTooltip" />
          <div
            class="w-[120px] h-[52px] p-2 bg-white rounded-md shadow flex-col justify-start items-start gap-1 inline-flex tooltip"
            v-if="showTooltip"
          >
            <div class="self-stretch px-3 py-2 bg-white rounded-md justify-start items-start inline-flex">
              <div
                class="grow shrink basis-0 text-white/10 text-sm font-medium font-['Pretendard'] leading-tight text-center"
                @click="onClick"
              >
                게시글 삭제
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>
<style lang="scss" scoped>
.tooltip {
  position: fixed;
  top: 30px;
  right: calc(100% / 2 - 250px);
  @media (max-width: 512px) {
    right: 10px;
  }
}
</style>
