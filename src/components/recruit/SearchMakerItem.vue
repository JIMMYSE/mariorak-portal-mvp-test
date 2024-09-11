<script lang="ts" setup>
const props = defineProps<{
  /** 제작자 아이디 */
  mkrId: number;

  /** 회원 아이디 */
  memId: number;

  /** 스킬 목록 */
  skills: string[];

  /** 제작자 명(닉네임) */
  name: string;

  /** 직무 */
  job: string;

  /** 연차 */
  years: number;

  /** 프로젝트 수 */
  projectNumber: number;

  /** 설명 */
  description: string;

  /** 이미지 */
  imgSrc?: string;
}>();

// const badgeContainer = ref<HTMLElement | null>(null);
// const { height } = useElementSize(badgeContainer);
// const isEllipsis = ref(true);

// const badgeList = ref<string[]>([]);

// let i = 0;
// const addBadge = setInterval(() => {
//   if (!props.skills?.length) clearInterval(addBadge);

//   if (height.value < 25) {
//     if (props.skills[i]) badgeList.value.push(props.skills[i]);
//   }
//   if (i == props.skills.length - 1) {
//     clearInterval(addBadge);
//   }
//   i++;
// }, 20);

// watch(height, (newHeight) => {
//   if (newHeight >= 25) {
//     clearInterval(addBadge);
//     isEllipsis.value = true;
//     let b = badgeList.value.pop();
//     console.log('>>>pop', b);
//   }
// });

// #region 직업 표시
const mkrRolCd = useCommonCode('MKR_ROL');
const jobName = computed(() => {
  return mkrRolCd.code.value?.list?.find((item) => item.cd === props.job)?.cd_name || '';
});
// #endregion
</script>

<template>
  <div class="flex flex-col mt-[16px] cursor-pointer" @click="goTo(`/recruit/profile/${props.mkrId}`)">
    <q-card class="w-full shadow-1 rounded-xl">
      <q-card-section>
        <div class="row items-center">
          <q-img class="w-14 h-14 rounded-full" :src="props.imgSrc" />
          <div class="font-semibold ml-2 q-gutter-y-[5px] col">
            <p class="text-[#222222] leading-snug">{{ props.name }}</p>
            <p class="text-primary text-xs p ellipsis">{{ jobName }}</p>
            <div class="row font-normal align-middle flex items-center">
              <p class="text-[#767676] text-xs">{{ props.years }}년차</p>
              <p class="h-[8px] w-0 border-r-[1px] border-[#b5b5b5] mx-[5px]"></p>
              <p class="w-20 text-[#b5b5b5] text-xs">프로젝트 {{ props.projectNumber }} 회</p>
            </div>
          </div>
        </div>
        <div class="row items-center mt-[14px]">
          <div class="px-1.5 py-0.5 bg-primary rounded justify-center items-center">
            <p class="text-white text-[10px] font-medium leading-[14px]">Skill</p>
          </div>
          <p class="text-[#222222] text-xs ellipsis col ml-1">
            {{ (props.skills || []).join(' , ') }}
          </p>
        </div>
        <p class="] text-grey-3 text-xs mt-[9px]">{{ props.description }}</p>
      </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
.badge {
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 5px;
  color: #222;
}
</style>
