<script setup lang="ts">
import { useQuasar } from 'quasar';
import 'swiper/css';
import 'swiper/css/navigation';
import { useSwiper } from 'swiper/vue';
import { ref } from 'vue';

type Props = {
  modelValue: number;
};
const props = defineProps<Props>();
const emit = defineEmits(['update:avatarId', 'save']);
type SwiperClass = ReturnType<typeof useSwiper>;

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
// save action
const ableToSave = ref(true);
const $q = useQuasar();
function save() {
  //TODO 로그인 자동으로되고, 메인하면으로 가도록 변경필요
  goToName('login');
}
</script>
<template>
  <div class="flex flex-col justify-center items-center h-screen pb-48 bg-grey">
    <div>
      <section
        class="pt-10 px-6 font-rokaf font-medium text-xl flex justify-center"
      >
        <p>
          <span class="text-primary">{{ nickname }}</span> 님 <br />
          가입을 축하드려요!
        </p>
      </section>
      <!-- AVATAR SWIPER -->
      <section class="mt-[18px] px-6">
        <section class="h-full relative pb-2 flex justify-center">
          <div class="absolute bottom-0 flex justify-center w-full">
            <img src="/src/assets/images/shadow.svg" alt="shadow" />
          </div>
          <q-img
            :src="avatarList[selectedAvatarId].src"
            height="359px"
            fit="contain"
          />
        </section>
      </section>
    </div>

    <section class="w-full fixed bottom-0 z-10 bg-white">
      <q-btn
        class="w-full h-16 text-subtitle1"
        color="primary"
        :disable="!ableToSave"
        square
        unelevated
        @click="save"
        >시작하기</q-btn
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
