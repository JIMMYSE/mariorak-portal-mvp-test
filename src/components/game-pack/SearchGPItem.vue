<script lang="ts" setup>
const props = defineProps({
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
</script>

<template>
  <div class="flex no-wrap">
    <div>
      <q-img
        src="/images/dummy/recent_pj_dummy.png"
        class="rounded-xl h-[78px] w-[139px]"
      />
    </div>

    <div class="text-caption q-mb-xs flex-grow pl-2">
      <div
        class="flex items-center q-col-gutter-x-xs"
        ref="badgeContainer"
        v-if="badgeList.length > 0"
      >
        <q-badge
          color="grey"
          text-color="black"
          v-for="item in badgeList"
          :label="item"
          :key="item"
        />
        <c-icon name="icon_kebap" v-if="isEllipsis" />
      </div>
      <div v-else class="h-[25px]"></div>
      <div
        class="text-[#222222] text-sm font-semibold leading-tight ellipsis-2-lines"
      >
        {{ props.title }}
      </div>
      <div class="flex justify-between">
        <div
          :class="props?.status != '00' ? 'text-[#056bf1]' : ''"
          class="font-medium"
        >
          {{ computedStatus }}
        </div>
        <div class="flex text-[#767676]">
          <c-icon :name="'icon_heart'" color="#EA2E2E" size="16px" />
          <p class="pl-2">
            {{ props.like }}
          </p>
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
