<script lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Pagination } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [FreeMode, Pagination],
    };
  },
};
</script>

<template>
  <q-page>
    <!-- content -->

    <div class="pl-6 btn-group mt-7 overflow-hidden">
      <swiper
        :slides-per-view="4"
        :space-between="5"
        :free-mode="true"
        :modules="modules"
        :pagination="{
          clickable: true,
        }"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <swiper-slide>
          <div
            class="level-btn w-[78px] text-center text-[13px] font-medium leading-[40px] h-[40px] !border border-grey-1 rounded-[20px]"
          >
            장교
          </div>
        </swiper-slide>
        <swiper-slide>
          <div
            class="level-btn w-[78px] text-center text-[13px] font-medium leading-[40px] h-[40px] !border border-grey-1 rounded-[20px]"
          >
            부사관
          </div>
        </swiper-slide>
        <swiper-slide>
          <div
            class="level-btn w-[78px] text-center text-[13px] font-medium leading-[40px] h-[40px] !border border-grey-1 rounded-[20px]"
          >
            병사
          </div>
        </swiper-slide>
        <swiper-slide>
          <div
            class="level-btn w-[220px] text-center text-[13px] font-medium leading-[40px] h-[40px] !border border-grey-1 rounded-[20px]"
          >
            예비역 재임용/항공통제 준사관
          </div>
        </swiper-slide>
        <swiper-slide>
          <div
            class="level-btn w-[78px] text-center text-[13px] font-medium leading-[40px] h-[40px] !border border-grey-1 rounded-[20px]"
          >
            빈버튼
          </div>
        </swiper-slide>
        <swiper-slide>
          <div
            class="level-btn w-[78px] text-center text-[13px] font-medium leading-[40px] h-[40px] !border border-grey-1 rounded-[20px]"
          >
            빈버튼
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <section>
      <div class="text-title">
        <h2 class="text-h3 px-6 mt-10 leading-6">✋ 장교소개</h2>
        <p
          class="text-[14px] text-grey-3 leading-5 px-6 mt-[3px] font-pretendard"
        >
          공군의 장교 과정에 대해서 알려드립니다.
        </p>
      </div>

      <div>
        <q-img
          src="~assets/images/recruitment_guide_1.png"
          fit="cover"
          class="mt-[25px]"
        ></q-img>

        <div class="text-sub">
          <h2 class="text-h3 px-6 mt-4 leading-6">공군사관학교</h2>
          <p
            class="text-base text-grey-4 leading-5 px-6 mt-[5px] font-pretendard"
          >
            공군 장교의 정규 양성기관인 공군사관학교에서 4년간 군사교육 후
            장기복무 장교로 임관하는 제도
          </p>
        </div>
      </div>

      <div class="mb-[125px]">
        <q-img
          src="~assets/images/recruitment_guide_2.png"
          fit="cover"
          class="mt-[25px]"
        ></q-img>

        <div class="text-sub">
          <h2 class="text-h3 px-6 mt-4 leading-6">공군사관학교</h2>
          <p
            class="text-base text-grey-4 leading-5 px-6 mt-[5px] font-pretendard"
          >
            공군 장교의 정규 양성기관인 공군사관학교에서 4년간 군사교육 후
            장기복무 장교로 임관하는 제도
          </p>
        </div>
      </div>
    </section>
  </q-page>
</template>

<style lang="scss" scoped>
.level-btn:hover {
  background-color: #196af5;
  color: #fff;
  border: none;
}
</style>
