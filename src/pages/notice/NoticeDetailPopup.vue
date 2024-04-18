<!-- 공지사항 상세 -->

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { useNoticeDetail } from 'src/composables/notice/notice';
import { Id } from 'src/services/common/api-model';
import { formatDate } from 'src/utils/date-util';
import { filterHtml } from 'src/utils/html-filter';
import { ref } from 'vue';

const props = defineProps<{
  id: Id;
}>();

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

// 상세 조회
const detailId = ref(props.id);
const { isPending, isError, data: detail, error } = useNoticeDetail(detailId);
</script>

<template>
  <q-dialog ref="dialogRef" class="column full-dialog" full-height full-width>
    <q-card flat square class="px-2 flex flex-col flex-1">
      <q-card-section class="flex justify-between min-h-[74px]">
        <h3 class="text-h3 font-medium absolute-center">공지사항 상세</h3>
        <div class="col"></div>
        <q-icon
          name="img:/images/icons/btn_close.svg"
          class="cursor-pointer"
          size="35px"
          v-close-popup
        />
      </q-card-section>
      <q-card-section class="py-7">
        <h3 class="text-h3">{{ detail?.ntc_nm }}</h3>
        <div class="text-caption text-grey-3 pt-1">
          {{ formatDate(detail?.crt_dt) }}
        </div>
      </q-card-section>
      <q-card-section class="pt-0 flex-1 grow">
        <div
          class="text-grey-4 font-light"
          v-html="filterHtml(detail?.ntc_cn)"
        ></div>
      </q-card-section>
      <q-card-section class="min-h-[78px] border-t !border-[#f1f1f1] pt-0">
        <section class="flex justify-between">
          <q-btn
            flat
            unelevated
            :class="detail?.prev_id ? 'block' : 'invisible'"
            @click="detailId = detail.prev_id"
          >
            <div>
              <q-icon name="img:/images/icons/icon_back.svg" size="24px" />
              <span class="text-grey-5 font-light text-body2">이전글</span>
            </div>
          </q-btn>
          <q-btn
            flat
            unelevated
            :class="detail?.next_id ? 'block' : 'invisible'"
            @click="detailId = detail.next_id"
          >
            <div>
              <span class="text-grey-5 font-light text-body2">다음글</span>
              <q-icon name="img:/images/icons/icon_next.svg" size="24px" />
            </div>
          </q-btn>
        </section>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
