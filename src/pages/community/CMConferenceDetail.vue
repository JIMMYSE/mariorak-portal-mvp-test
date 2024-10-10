<script lang="ts" setup>
import toNumber from 'lodash/toNumber';
import toString from 'lodash/toString';

const route = useRoute();
const prjRcrtId = toNumber(route.params.id.toString());
const { data: confDetail, refetch } = useConferenceDetail(prjRcrtId);

const confId = computed(() => toString(confDetail.value?.cnfr_id));

const { enterRoom } = useBridge();
</script>
<template>
  <q-page v-if="confDetail">
    <section>
      <div class="h-[210px] w-full">
        <q-img :src="confDetail?.thmn_file?.convert_addr" width="100%" height="100%" />
      </div>
    </section>

    <section class="px-6 mt-6">
      <div>
        <p class="text-[#222222] text-xl font-semibold leading-7 mt-[8px]">
          {{ confDetail?.title }}
        </p>
        <div class="space-y-2 mt-[20px]">
          <div class="flex justify-start items-center">
            <span class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]">시작 시간</span>
            <span class="text-[#222222] text-sm font-normal leading-tight]">{{
              formatDate(confDetail?.srt_dttm)
            }}</span>
          </div>

          <div class="flex justify-start items-center">
            <span class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]">주최측</span>
            <span class="text-[#222222] text-sm font-normal leading-tight">{{ confDetail?.host_mem_nickname }}</span>
          </div>
        </div>
        <!-- progress bar 추후 컴포넌트화 -->

        <div class="mt-4">
          <!-- TODO 앱 심사 히든 처리 -->
          <!-- <c-btn
            class="w-full rounded-[30px] text-[#056bf1] font-semibold text-sm py-4 pl-10 pr-[30px]"
            outline
            >프로젝트 후원하기
          </c-btn> -->
          <c-btn
            class="w-full rounded-[30px] text-[#056bf1] font-semibold text-sm py-4 pl-10 pr-[30px] mt-[8px]"
            @click="goTo(`/game-pack/project/${confId}`)"
            >컨퍼런스 입장하기
          </c-btn>
        </div>
      </div>
    </section>
    <hr class="h-2.5 bg-[#f7f7f7] mt-6" />
    <!-- 탭 영역 -->
    <section class="mt-[35px]">
      <h2 class="pl-6 text-[20px] font-semibold">컨퍼런스 소개</h2>
      <div class="mt-4 pl-6">
        <introduce-text :intro="confDetail?.cont" />
      </div>
    </section>

    <section class="mt-[35px]">
      <h2 class="pl-6 text-[20px] font-semibold">컨퍼런스 발표자</h2>
      <div class="mt-4 pl-6">
        <div
          class="row items-center q-mr-md shadow rounded-[10px] cursor-pointer py-[21px] mb-6"
          v-for="m in confDetail?.participant_list"
          :key="m.cnfr_ptcp_id"
        >
          <q-img class="w-14 h-14 rounded-full" :src="m.prfl_file?.convert_addr" />
          <div class="font-semibold ml-2 q-gutter-y-[5px] col">
            <p class="text-[#222222] leading-snug text-base font-semibold">{{ m.name }}</p>
            <p class="text-primary text-xs leading-none">
              {{ m.desc }}
            </p>
            <!-- <div v-if="scl"></div> -->
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>
<style lang="scss" scoped></style>
