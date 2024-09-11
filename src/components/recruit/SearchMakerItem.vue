<script lang="ts" setup>
const props = defineProps({
  skill: {
    type: Array as PropType<string[]>,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: '',
  },
  job: {
    type: String,
    required: true,
    default: '',
  },
  years: {
    type: String,
    required: true,
  },
  projectNumber: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  imgSrc: {
    type: String,
    required: true,
    default: '',
  },
});

const badgeContainer = ref<HTMLElement | null>(null);
const { height } = useElementSize(badgeContainer);
const isEllipsis = ref(true);

const badgeList = ref<string[]>([]);

let i = 0;
const addBadge = setInterval(() => {
  if (!props.skill?.length) clearInterval(addBadge);

  if (height.value < 25) {
    if (props.skill[i]) badgeList.value.push(props.skill[i]);
  }
  if (i == props.skill.length - 1) {
    clearInterval(addBadge);
  }
  i++;
}, 20);

watch(height, (newHeight) => {
  if (newHeight >= 25) {
    clearInterval(addBadge);
    isEllipsis.value = true;
    let b = badgeList.value.pop();
    console.log('>>>pop', b);
  }
});
</script>

<template>
  <div class="flex flex-col mt-[16px]">
    <q-card class="w-full shadow-1 rounded-xl">
      <q-card-section>
        <div class="row items-center">
          <q-img
            class="w-14 h-14 rounded-full"
            src="m.circle_file.convert_addr"
          />
          <div class="font-semibold ml-2 q-gutter-y-[5px] col">
            <p class="text-[#222222] leading-snug">닉네임</p>
            <p class="text-primary text-xs p ellipsis">직업</p>
            <div class="row font-normal align-middle flex items-center">
              <p class="text-[#767676] text-xs">1년차</p>
              <p
                class="h-[8px] w-0 border-r-[1px] border-[#b5b5b5] mx-[5px]"
              ></p>
              <p class="w-20 text-[#b5b5b5] text-xs">프로젝트 500회</p>
            </div>
          </div>
        </div>
        <div class="row items-center mt-[14px]">
          <div
            class="px-1.5 py-0.5 bg-primary rounded justify-center items-center"
          >
            <p class="text-white text-[10px] font-medium leading-[14px]">
              Skill
            </p>
          </div>
          <p class="text-[#222222] text-xs ellipsis col ml-1">
            스킬 야호야호
            <!-- {{ m.prfl.skills?.flatMap((skill: any) => skill).join(' , ') }} -->
          </p>
        </div>
        <p class="] text-grey-3 text-xs mt-[9px]">이것은 설명</p>
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
