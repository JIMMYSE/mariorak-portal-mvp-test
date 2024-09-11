<script lang="ts" setup>
import { ref } from 'vue';

const isMenuOpen = ref(false); // 내가 신청한 프로젝트 메뉴 열림 여부 상태

const toggleMenu = (event: Event) => {
  event.stopPropagation();
  isMenuOpen.value = !isMenuOpen.value;
};

const isProjectMenuOpen = ref(false); // 내 프로젝트 참여 지원자 메뉴 열림 여부 상태

const toggleProjectMenu = (event: Event) => {
  event.stopPropagation();
  isProjectMenuOpen.value = !isProjectMenuOpen.value;
};

const isApplyMenuOpen = ref(false); // 참여 요청 보낸 개발자 메뉴 열림 여부 상태

const toggleApplyMenu = (event: Event) => {
  event.stopPropagation();
  isApplyMenuOpen.value = !isApplyMenuOpen.value;
};

const isProjectDropdownOpen = ref(false); //  내 프로젝트 참여 지원자 드롭다운 열림 여부 상태
const toggleProjectDropdown = (event: Event) => {
  event.stopPropagation();
  isProjectDropdownOpen.value = !isProjectDropdownOpen.value;
};

const isApplyDropdownOpen = ref(false); // 참여 요청 보낸 개발자 드롭다운 열림 여부 상태
const toggleApplyDropdown = (event: Event) => {
  event.stopPropagation();
  isApplyDropdownOpen.value = !isApplyDropdownOpen.value;
};
</script>

<template>
  <div>
    <section class="px-6 mt-[30px]">
      <p class="text-[#222222] text-xl font-semibold leading-7">내가 신청한 프로젝트</p>
      <div class="mt-[15px]">
        <div class="flex no-wrap w-full">
          <div>
            <q-img src="/images/dummy/recent_pj_dummy.png" class="rounded-xl h-[78px] w-[139px]" />
          </div>

          <div class="text-caption q-mb-xs flex justify-between pl-2 w-full">
            <div
              class="flex items-start justify-between text-[#222222] h-[40px] text-sm font-semibold leading-tight ellipsis-2-lines"
            >
              <span class="w-[140px]">아아아아게임제목아아아아게게임제목</span>

              <div class="absolute right-[30px]">
                <q-icon
                  name="img:/icons/icon_kebap.svg"
                  size="24px"
                  class="rotate-90 cursor-pointer"
                  @click.stop="toggleMenu"
                />

                <q-menu v-model="isMenuOpen" anchor="top right" self="top right">
                  <q-list style="min-width: 120px">
                    <q-item clickable v-ripple>
                      <q-item-section>프로젝트 상세</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section>신청 취소하기</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </div>
            </div>

            <div class="flex flex-col justify-between items-start w-full">
              <div class="text-[#b5b5b5] text-xs font-normal leading-none">
                <span class="text-[#056bf1] text-xs font-medium leading-none">신청</span>
                2024.06.06
              </div>
              <div class="text-[#b5b5b5] text-xs font-normal leading-none">
                <span class="text-[#767676] text-xs font-medium leading-none">마감</span>
                2024.06.06
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="px-6 mt-[30px]">
      <p class="text-[#222222] text-xl font-semibold leading-7">프로젝트 요청내역</p>

      <div class="mt-[24px]">
        <ul>
          <li class="flex flex-col relative cursor-pointer border-b-[1px] border-b-[#f0f0f0]">
            <!-- QUESTION  -->
            <h3
              class="py-[15px] px-[5px] font-semibold text-[#767676] text-base relative bottom-0"
              @click="toggleProjectDropdown"
            >
              내 프로젝트 참여 지원자(2)
              <!-- ARROW ICON -->
              <q-icon
                size="23px"
                name="img:/icons/down_arrow.svg"
                class="absolute right-0 top-[14px]"
                :class="isProjectDropdownOpen ? 'rotate-180' : ''"
              />
            </h3>
            <!-- ANSWER -->
          </li>
          <div
            v-if="isProjectDropdownOpen"
            class="-mt-[1px] w-full shrink overflow-hidden py-6"
            :class="isProjectDropdownOpen ? 'flex-1' : 'flex-none basis-0 py-0'"
          >
            <div class="flex flex-col">
              <q-card class="w-full shadow-1 rounded-xl">
                <q-card-section>
                  <div class="row items-center">
                    <q-img class="w-14 h-14 rounded-full" src="m.circle_file.convert_addr" />
                    <div class="font-semibold ml-2 q-gutter-y-[5px] col">
                      <p class="text-[#222222] leading-snug">닉네임</p>

                      <div class="absolute top-[10px] right-[10px]">
                        <q-icon
                          name="img:/icons/icon_kebap.svg"
                          size="24px"
                          class="rotate-90 cursor-pointer"
                          @click.stop="toggleProjectMenu"
                        />

                        <q-menu v-model="isProjectMenuOpen" anchor="top right" self="top right">
                          <q-list style="min-width: 120px">
                            <q-item clickable v-ripple>
                              <q-item-section>신청내용 확인</q-item-section>
                            </q-item>
                            <q-item clickable v-ripple>
                              <q-item-section>거절하기</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </div>

                      <p class="text-primary text-xs p ellipsis">직업</p>
                      <div class="row font-normal align-middle flex items-center">
                        <p class="text-[#767676] text-xs">1년차</p>
                        <p class="h-[8px] w-0 border-r-[1px] border-[#b5b5b5] mx-[5px]"></p>
                        <p class="w-20 text-[#b5b5b5] text-xs">프로젝트 500회</p>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </ul>
      </div>

      <div>
        <ul>
          <li
            class="flex flex-col relative cursor-pointer"
            :class="isApplyDropdownOpen ? 'border-b-[1px] border-b-[#f0f0f0]' : ''"
          >
            <!-- QUESTION  -->
            <h3
              class="py-[15px] px-[5px] font-semibold text-[#767676] text-base relative bottom-0"
              @click="toggleApplyDropdown"
            >
              참여 요청 보낸 개발자(2)
              <!-- ARROW ICON -->
              <q-icon
                size="23px"
                name="img:/icons/down_arrow.svg"
                class="absolute right-0 top-[14px]"
                :class="isApplyDropdownOpen ? 'rotate-180' : ''"
              />
            </h3>
            <!-- ANSWER -->
          </li>
          <div
            v-if="isApplyDropdownOpen"
            class="-mt-[1px] w-full shrink overflow-hidden py-6"
            :class="isApplyDropdownOpen ? 'flex-1' : 'flex-none basis-0 py-0'"
          >
            <div class="flex flex-col">
              <q-card class="w-full shadow-1 rounded-xl">
                <q-card-section>
                  <div class="row items-center">
                    <q-img class="w-14 h-14 rounded-full" src="m.circle_file.convert_addr" />
                    <div class="font-semibold ml-2 q-gutter-y-[5px] col">
                      <p class="text-[#222222] leading-snug">닉네임</p>

                      <div class="absolute top-[10px] right-[10px]">
                        <q-icon
                          name="img:/icons/icon_kebap.svg"
                          size="24px"
                          class="rotate-90 cursor-pointer"
                          @click.stop="toggleApplyMenu"
                        />

                        <q-menu v-model="isApplyMenuOpen" anchor="top right" self="top right">
                          <q-list style="min-width: 120px">
                            <q-item clickable v-ripple>
                              <q-item-section>개발자 프로필</q-item-section>
                            </q-item>
                            <q-item clickable v-ripple>
                              <q-item-section>신청 취소하기</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </div>

                      <p class="text-primary text-xs p ellipsis">직업</p>
                      <div class="row font-normal align-middle flex items-center">
                        <p class="text-[#767676] text-xs">1년차</p>
                        <p class="h-[8px] w-0 border-r-[1px] border-[#b5b5b5] mx-[5px]"></p>
                        <p class="w-20 text-[#b5b5b5] text-xs">프로젝트 500회</p>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
