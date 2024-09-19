<script setup lang="ts">
const badgeList = ref<string[]>([]);
const isEllipsis = ref(true);

const showPopup = ref(false);
function open() {
  showPopup.value = true;
}

defineExpose({
  open,
});
</script>

<template>
  <q-dialog v-model="showPopup" full-width>
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">프로젝트 지원하기</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <div class="flex flex-col justify-center items-center h-screen pb-48 bg-white w-full">
        <div class="w-full px-6">
          <section class="flex justify-center items-center flex-col border-b-[1px] border-[#f0f0f0] pb-[20px]">
            <div class="flex no-wrap w-full">
              <div>
                <q-img src="/images/dummy/recent_pj_dummy.png" class="rounded-xl h-[78px] w-[139px]" />
              </div>

              <div class="text-caption q-mb-xs flex-grow pl-2">
                <div class="flex items-center q-col-gutter-x-xs" ref="badgeContainer">
                  <q-badge color="grey" text-color="black" v-for="item in badgeList" :label="item" :key="item" />
                  <c-icon name="icon_kebap" v-if="isEllipsis" />
                </div>
                <div class="text-[#222222] text-sm font-semibold leading-tight ellipsis-2-lines">아아아아게임제목</div>
                <div class="flex justify-between">
                  <div class="text-[#b5b5b5] text-xs font-normal leading-none">2024.06.06 | D-30</div>
                </div>
              </div>
            </div>
          </section>
          <section class="border-b-[1px] border-[#f0f0f0] py-[20px]">
            <c-input
              class="w-full border-0"
              type="textarea"
              maxlength="1000"
              input-class="h-[163px]"
              placeholder="프로젝트에 지원하는 내용을 입력해주세요.&#10;예)&#10; &#8226; 프로젝트 지원 분야&#10; &#8226; 본인의 역량&#10; &#8226; 포트폴리오"
              :outlined="false"
              :rounded="false"
              border-radius="0px"
              inline-counter
            ></c-input>
          </section>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss"></style>
