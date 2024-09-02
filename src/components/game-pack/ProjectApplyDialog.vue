<script setup lang="ts">
const isEllipsis = ref(true);
</script>

<template>
  <div
    class="flex flex-col justify-center items-center h-screen pb-48 bg-white"
  >
    <div>
      <section class="flex justify-center items-center flex-col">
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
            <div
              class="text-[#222222] text-sm font-semibold leading-tight ellipsis-2-lines"
            >
              아아아아게임제목
            </div>
            <div class="flex justify-between">
              <div class="text-[#b5b5b5] text-xs font-normal leading-none">
                2024.06.06 | D-30
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="mt-[34px]">
        <c-input type="textarea"></c-input>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
