<script setup lang="ts">
const introList = [
  {
    title: '검색, 추천',
    desc: '조건에 알맞은 프로젝트 인력을 검색하거나 CCF가 추천하는 적합한 프로젝트/ 인력의 상세 정보를 확인해요.',
  },
  {
    title: '신청, 요청',
    desc: '알맞은 프로젝트/ 인력을 찾았다면, 신청/ 요청하기를 통하여 당사자에게 협업에 대한 자세한 연락을 해보세요.',
  },
  {
    title: '결과, 참여',
    desc: '전달한 정보를 바탕으로 협업에 대한 응답이 올거에요! CCF는 서로에게 도움이 될 수 있도록 완료까지 항상 함께해요.',
  },
];
</script>
<template>
  <section class="mt-10">
    <p class="pl-6 text-[22px] font-semibold">인력사무소</p>
    <p class="pl-6 text-[#767676] text-sm font-normal">서로에게 도움이 되는 만남의 장소</p>
    <div class="border-t-0 grid grid-col-3 gap-1.5 mt-4 h-[150px]">
      <q-scroll-area class="w-full" :bar-style="barStyle" :thumb-style="thumbStyle">
        <div class="row no-wrap pl-6">
          <div class="mr-4 w-[183px] h-[131px]" v-for="n in introList" :key="n.title">
            <q-card class="rounded-xl p-1">
              <q-card-section>
                <p class="text-[#056bf1] text-lg font-semibold leading-[25.20px]">
                  {{ n.title }}
                </p>
                <p class="h-[68px] text-[#767676] text-xs font-normal mt-1 whitespace-pre-line">
                  {{ n.desc }}
                </p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-scroll-area>
    </div>
  </section>
</template>
