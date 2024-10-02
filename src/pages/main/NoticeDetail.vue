<script lang="ts" setup>
const route = useRoute();
const noticeId = ref(route.params.id);

const { data: noticeDetailData, refetch } = useNoticeDetail(noticeId);
watch(noticeId, () => {
  refetch();
});
const { options } = useCommonCode('NTC_CATE');
const noticeType = computed(
  () => options.value.find((item: Option) => item.value === noticeDetailData.value?.ntc_cate_cd)?.label
);
const fitModes = ['cover', 'fill', 'contain', 'none', 'scale-down'];
</script>
<template>
  <section class="px-6 mt-14">
    <div class="py-[16px] border-b border-[#f0f0f0]">
      <div class="flex justify-between items-end">
        <div>
          <p class="text-[#222222] text-base font-medium leading-snug">
            [{{ noticeType }}] {{ noticeDetailData?.title }}
          </p>
          <p class="text-[#767676] text-sm font-normal leading-tight">
            {{ formatDate(noticeDetailData?.created_at) }} {{ noticeDetailData?.mem_nickname }}
          </p>
        </div>
        <div></div>
      </div>
    </div>
  </section>

  <section class="px-6 min-h-80">
    <!-- <div class="mt-8 text-[#767676] text-sm font-normal leading-tight" v-html="filterHtml(data)"></div> -->
    <div class="mt-8 text-[#767676] text-sm font-normal leading-tight" v-html="noticeDetailData?.cont"></div>
    <hr class="h-1 bg-[#f7f7f7] mt-4" />
    <div v-for="file in noticeDetailData?.attch_files" :key="file.id" class="mt-4">
      <c-img :src="file.origin_addr" style="max-width: 100%; max-height: 300px" fit="contain" />
    </div>
  </section>
</template>
