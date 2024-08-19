<!-- 프로필 > 아바타/닉네임 설정 -->

<script setup lang="ts">
import 'swiper/css';
import 'swiper/css/navigation';
import type { Swiper as SwiperClass } from 'swiper/types/index.d.ts';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { goToName } from 'src/router/router-util';

type Props = {
  initialNickname: string;
  initialAvatarId: number;
};

const props = withDefaults(defineProps<Props>(), {
  initialNickname: '',
  initialAvatarId: 1,
});

const { data: avatarData } = useAvatarList();

const emit = defineEmits(['onSubmit']);

const {
  meta,
  values: form,
  errors,
  setFieldValue,
  handleSubmit,
  resetForm,
} = useForm({
  validationSchema: toTypedSchema(NicknameAndAvatarFormSchema),
  // initialValues: {
  //   nickname: props.initialNickname,
  //   avatarId: props.initialAvatarId,
  // },
});

const {
  value: nickname,
  meta: nicknameMeta,
  errorMessage: nicknameErrorMessage,
} = useField<string>('nickname');

const save = () => {
  // emit('onSubmit', { nickname: form.nickname, avatarId: form.avatarId }, () => {
  //   resetForm({
  //     values: {
  //       nickname: form.nickname,
  //       avatarId: form.avatarId,
  //     },
  //   });
  // });

  goToName('join-completed');
};

// ================================
// swiper
const swiperRef = ref<SwiperClass | null>(null);
const setSwiperRef = (swiper: SwiperClass) => {
  swiperRef.value = swiper;
};

const swiperSlideTo = (index: number) => {
  swiperRef.value?.slideTo(index, 300);
};

const onSlideChange = (swiper: SwiperClass) => {
  setFieldValue('avatarId', swiper.activeIndex + 1);
};

const onClickAvatarList = (avatarId: number, index: number) => {
  swiperSlideTo(index);
  setFieldValue('avatarId', avatarId);
};

const thumbnailList = ref<HTMLElement[] | null>(null);

const marginY = 12;
const thumbnailWrapper = ref();

const scrollThumbnailOn = () => {
  const item = thumbnailList.value?.[myAvatarIndex.value ?? 0];
  const parent = item?.parentElement;
  if (!item || !parent) return;

  const top = item.offsetTop - parent.offsetTop - marginY;
  parent.scrollTo({
    top,
    behavior: 'smooth',
  });
};

const myAvatarIndex = computed(() => {
  return avatarData.value?.rows.findIndex(
    (avatar) => avatar.id === form.avatarId
  );
});

onMounted(() => {
  scrollThumbnailOn();
});

const inputDoneIcon = computed(() => {
  return (
    'img:/icons/' +
    (!errors.value?.nickname && nickname.value && nickname.value.length > 2
      ? 'btn_change_check_a.svg'
      : 'btn_change_check_d.svg')
  );
});
</script>

<template>
  <div class="flex flex-col size-full bg-white" style="min-height: inherit">
    <section class="flex-none w-full px-8 mt-[46px]">
      <p class="font-pretendard font-semibold text-2xl text-black">
        멋진 닉네임이에요
      </p>
      <p class="font-pretendard font-semibold text-2xl text-black">
        아바타를 선택해 주세요!
      </p>
    </section>

    <!-- AVATAR SWIPER -->
    <section
      v-if="myAvatarIndex != null"
      class="flex-none w-full mt-[52px] px-6"
    >
      <swiper
        :initial-slide="myAvatarIndex"
        direction="horizontal"
        @swiper="setSwiperRef"
        @slide-change="onSlideChange"
      >
        <swiper-slide v-for="avatar in avatarData?.rows" :key="avatar.id">
          <section class="h-full relative pb-2 flex justify-center">
            <div class="absolute bottom-0 flex justify-center w-full">
              <img src="/images/shadow.svg" alt="shadow" />
            </div>
            <q-img
              :src="avatar.profile_image.convert_addr ?? undefined"
              height="359px"
              fit="contain"
            />
          </section>
        </swiper-slide>
      </swiper>
    </section>

    <!-- THUMBNAIL LIST -->
    <section
      v-if="myAvatarIndex != null"
      ref="thumbnailWrapper"
      class="flex-1 w-full flex justify-center items-start gap-[17px] mt-[18px] px-6 py-5 bg-white"
    >
      <div
        v-for="(avatar, i) in avatarData?.rows"
        :key="avatar.id"
        ref="thumbnailList"
        class="flex flex-col justify-center items-center"
        :avatarId="avatar.id"
        @click="onClickAvatarList(avatar.id, i)"
      >
        <div
          class="w-[69px] h-[113px] flex justify-center items-center rounded-[5px]"
          :class="
            form.avatarId === avatar.id
              ? 'border-[--q-primary] border-[2px] bg-white'
              : 'bg-grey-1'
          "
        >
          <q-img
            :src="avatar.profile_image.convert_addr ?? undefined"
            fit="contain"
            width="30px"
            height="90px"
          />
        </div>
      </div>
    </section>

    <section class="w-full fixed bottom-0 z-10 bg-white">
      <q-btn
        class="w-full h-16 text-subtitle1"
        color="primary"
        square
        unelevated
        @click="save"
        >가입 완료하기</q-btn
      >
    </section>
  </div>
</template>

<style scoped lang="scss">
.nickname-input {
  :deep(.q-field__control) {
    padding-right: 6px;
  }
}

.is-active {
  border: solid 2px $primary;
  background: white !important;
}
</style>
