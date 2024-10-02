<script lang="ts" setup>
import RecommendGameList from './game/RecommendGameList.vue';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String as PropType<'game' | 'project'>,
    required: true,
  },
  badge: {
    type: Array as PropType<string[]>,
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: '',
  },
  description: {
    type: String,
    required: true,
    default: '',
  },
  status: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    required: true,
    default: 0,
  },
  imgSrc: {
    type: String,
    required: true,
    default: '',
  },
  date: {
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
  if (!props.badge?.length) clearInterval(addBadge);

  if (height.value < 25) {
    if (props.badge[i]) badgeList.value.push(props.badge[i]);
  }
  if (i == props.badge.length - 1) {
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

const computedStatus = computed(() => {
  if (props.status == '10') return '진행전';
  else if (props.status == '40') return '출시대기';
  else return `진행률 ${props.status}%`;
});
const goToDetail = (id: number) => {
  if (props.type == 'game') goTo(`/game-pack/game/${id}`);
  else goTo(`/game-pack/project/${id}`);
};
</script>

<template>
  <div class="flex no-wrap" @click="goToDetail(id)">
    <div class="relative">
      <div class="absolute z-10 w-[55px] top-1 left-1 text-xs" v-if="type == 'project'">
        <GPbadge :cd="status" section-cd="PRJ_STT" />
      </div>

      <q-img :src="imgSrc" class="rounded-xl h-[78px] w-[139px]" />
    </div>

    <div class="text-caption q-mb-xs flex-grow pl-2">
      <div class="flex-col flex justify-between felx-col h-[78px]">
        <div>
          <div class="flex items-center q-col-gutter-x-xs" ref="badgeContainer" v-if="badgeList.length > 0">
            <q-badge color="grey" text-color="black" v-for="item in badgeList" :label="item" :key="item" />
            <c-icon name="icon_kebap" v-if="isEllipsis" />
          </div>
          <div v-else class="h-[25px]"></div>
          <div class="text-[#222222] text-sm font-semibold leading-tight ellipsis-2-lines">
            {{ props.title }}
          </div>
        </div>
        <div class="row justify-between">
          <div
            v-if="props.type == 'project'"
            :class="props?.status ?? null != '00' ? 'text-[#056bf1]' : ''"
            class="font-medium"
          >
            {{ computedStatus }}
          </div>
          <div v-else class="flex text-[#767676]">
            {{ formatDate(props.date) }}
          </div>
        </div>
      </div>
    </div>
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
