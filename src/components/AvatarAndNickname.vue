<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { watch } from 'vue';
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';

type Props = {
  modelValue: number;
};
const props = defineProps<Props>();
const emit = defineEmits(['update:avatarId', 'save']);

// ================================
// state
const nickname = ref('공군예비훈련병');
const avatarList = ref([
  {
    id: 1,
    name: '남군전투복',
    src: new URL('/src/assets/images/avatar-1.png', import.meta.url).href,
    thumbnailSrc: new URL('/src/assets/images/avatar-1s.png', import.meta.url)
      .href,
  },
  {
    id: 2,
    name: '여군전투복',
    src: new URL('/src/assets/images/avatar-2.png', import.meta.url).href,
    thumbnailSrc: new URL('/src/assets/images/avatar-2s.png', import.meta.url)
      .href,
  },
  {
    id: 3,
    name: '남군활동복',
    src: new URL('/src/assets/images/avatar-3.png', import.meta.url).href,
    thumbnailSrc: new URL('/src/assets/images/avatar-3s.png', import.meta.url)
      .href,
  },
  {
    id: 4,
    name: '여군활동복',
    src: new URL('/src/assets/images/avatar-4.png', import.meta.url).href,
    thumbnailSrc: new URL('/src/assets/images/avatar-4s.png', import.meta.url)
      .href,
  },
]);

const selectedAvatarId = ref(2);

// ================================
// swiper
const swiperRef = ref<Swiper | null>(null);
const setSwiperRef = (swiper: Swiper) => {
  swiperRef.value = swiper;
};

function swiperSlideTo(index: number) {
  console.log('swiperSlideTo', index, swiperRef.value);
  swiperRef.value?.slideTo(index - 1, 300);
}

function onSlideChange(swiper: Swiper) {
  const avatarId = swiper.activeIndex + 1;
  selectedAvatarId.value = avatarId;
  console.log('onSlideChange', swiper.activeIndex, selectedAvatarId.value);
}

function onClickAvatarList(id: number) {
  swiperSlideTo(id);
  selectedAvatarId.value = id;
}

const thumbnailList = ref<HTMLElement[] | null>(null);

watch(selectedAvatarId, (id) => emit('update:avatarId', id));
const marginY = 12;
const thumbnailWrapper = ref();
const thumbnailOffset = ref();

function scrollThumbnailOn(id: number) {
  const item = thumbnailList.value?.[id - 1];
  const parent = item?.parentElement;
  if (!item || !parent) return;

  const top = item.offsetTop - parent.offsetTop - marginY;
  if (top !== 0) console.log('scrollTop', top);
  parent.scrollTo({
    top,
    behavior: 'smooth',
  });
}

watch(() => props.modelValue, scrollThumbnailOn);

onMounted(() => {
  swiperSlideTo(selectedAvatarId.value - 1);
  thumbnailOffset.value = thumbnailWrapper.value.getBoundingClientRect().y;
  scrollThumbnailOn(selectedAvatarId.value);
});

// ================================
// save action
const ableToSave = ref(true);
const $q = useQuasar();
function save() {
  //TODO: save avatar and nickname via API
  $q.notify({
    message: '아바타 설정이 완료되었어요.',
    color: 'black',
    textColor: 'white',
    icon: 'done',
    iconColor: 'white',
    timeout: 1000,
  });
}
</script>
<template>
  <div>
    <q-input
      name="nickname"
      v-model="nickname"
      rounded
      outlined
      bottom-slots
      no-error-icon
      class="nickname-input px-6 mt-6"
      color="primary"
      input-class="font-medium"
      min="2"
      maxlength="10"
      error-message="2~10자 한글, 영문, 숫자 입력 가능"
    >
      <!-- NICHNAME FIELD -->
      <template #before>
        <span class="py-3 font-pretendard text-body2 text-black">
          🐸 나의 이름은</span
        >
      </template>
      <template #append>
        <a-btn-icon icon="img:/src/assets/icons/edit.svg" size="35px" />
      </template>
    </q-input>

    <!-- AVATAR SWIPER -->
    <section class="mt-[18px] px-6">
      <swiper
        :initial-slide="modelValue"
        direction="horizontal"
        @swiper="setSwiperRef"
        @slide-change="onSlideChange"
      >
        <swiper-slide v-for="avatar in avatarList" :key="avatar.id">
          <section class="h-full relative pb-2 flex justify-center">
            <div class="absolute bottom-0 flex justify-center w-full">
              <img src="/src/assets/images/shadow.svg" alt="shadow" />
            </div>
            <q-img :src="avatar.src" height="359px" fit="contain" />
          </section>
        </swiper-slide>
      </swiper>
    </section>

    <!-- THUMBNAIL LIST -->
    <section
      ref="thumbnailWrapper"
      class="w-full grid grid-flow-col justify-center gap-[17px] mt-[18px] py-5 px-6 bg-white mb-16"
    >
      <div
        v-for="avatar in avatarList"
        :key="avatar.id"
        ref="thumbnailList"
        class="flex flex-col justify-center items-center"
        :avatarId="avatar.id"
        @click="onClickAvatarList(avatar.id)"
      >
        <div
          class="w-[69px] h-[113px] flex justify-center items-center rounded-[5px]"
          :class="
            selectedAvatarId === avatar.id
              ? 'border-[--q-primary] border-[2px] bg-white'
              : 'bg-grey-1'
          "
        >
          <q-img
            :src="avatar.thumbnailSrc"
            fit="contain"
            width="30px"
            height="90px"
          />
        </div>
        <span
          class="font-pretendard text-body2"
          :class="selectedAvatarId === avatar.id ? 'text-black' : 'text-grey-3'"
          >{{ avatar.name }}</span
        >
      </div>
    </section>
    <section class="w-full fixed bottom-0 z-10 bg-white">
      <q-btn
        class="w-full h-16 text-subtitle1"
        color="primary"
        :disable="!ableToSave"
        square
        unelevated
        @click="save"
        >완료하기</q-btn
      >
    </section>
  </div>
</template>

<style scoped lang="scss">
.is-active {
  border: solid 2px $primary;
  background: white !important;
}
</style>
