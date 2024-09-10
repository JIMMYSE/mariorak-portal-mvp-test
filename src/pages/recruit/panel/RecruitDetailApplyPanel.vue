<script lang="ts" setup></script>
<template>
  <div>
    <section class="px-6 mt-[30px]">
      <p class="text-[#222222] text-xl font-semibold leading-7">
        내가 신청한 프로젝트
      </p>
      <div class="mt-[15px]">
        <div class="flex no-wrap w-full">
          <div>
            <q-img
              src="/images/dummy/recent_pj_dummy.png"
              class="rounded-xl h-[78px] w-[139px]"
            />
          </div>

          <div class="text-caption q-mb-xs flex justify-between pl-2">
            <div
              class="flex items-start justify-between text-[#222222] h-[40px] text-sm font-semibold leading-tight ellipsis-2-lines"
            >
              <span class="w-[140px]">아아아아게임제목아아아아게게임제목</span>
              <q-icon
                name="img:/icons/icon_kebap.svg"
                size="24px"
                class="rotate-90"
              />
            </div>
            <div class="flex justify-between items-end">
              <div class="text-[#b5b5b5] text-xs font-normal leading-none">
                <span class="text-[#056bf1] text-xs font-medium leading-none"
                  >신청</span
                >
                2024.06.06
              </div>
              <div class="text-[#b5b5b5] text-xs font-normal leading-none">
                <span class="text-[#767676] text-xs font-medium leading-none"
                  >마감</span
                >
                2024.06.06
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
