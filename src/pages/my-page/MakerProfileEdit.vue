<script lang="ts" setup>
const barStyle = {
  // 스크롤바 안보이게
  opacity: 1,
};

const thumbStyle = {
  // 스크롤바 색상
  backgroundColor: 'transparent',
};

// 직무 선택
const showJobBottomSheet = ref(false);
const openJobBottomSheet = () => {
  showJobBottomSheet.value = !showJobBottomSheet.value;
};

// 연도선택
const showHistoryBottomSheet = ref(false);
const openHistoryBottomSheet = () => {
  showHistoryBottomSheet.value = !showHistoryBottomSheet.value;
};

// 관심분야
const showInterestBottomSheet = ref(false);
const openInterestBottomSheet = () => {
  showInterestBottomSheet.value = !showInterestBottomSheet.value;
};

const years = ref<number[]>([]);
const selectedYear = ref<number>(30);
for (let i = 1; i <= 35; i++) {
  years.value.push(i);
}

const onYearClick = (year: number) => {
  selectedYear.value = year;
};
</script>
<template>
  <q-page>
    <section class="px-6 pt-[30px]">
      <h2 class="text-[#222222] text-xl font-semibold">개발자 프로필</h2>
      <div class="mt-[16px]">
        <c-field
          label="닉네임"
          class="text-[#767676] text-xs font-medium leading-none"
        >
          <c-input
            class="w-full pb-[14px]"
            placeholder="닉네임을 입력하세요."
            :maxlength="20"
            autofocus
            :outlined="false"
            :rounded="false"
            border-radius="0px"
          />
        </c-field>

        <c-field
          label="직무"
          required
          class="text-[#767676] text-xs font-medium leading-none"
        >
          <div
            class="mt-[16px] pb-[14px] border-b border-[#f7f7f7] text-[#b5b5b5] text-lg font-normal leading-[25.20px] flex justify-between items-center"
            @click="openJobBottomSheet"
          >
            <p>직무를 선택해 주세요.</p>
            <c-icon
              name="icon_enter_arrow"
              size="20px"
              :color="'#767676'"
              :fill="false"
            />
          </div>
        </c-field>
        <c-field
          label="연차"
          required
          class="text-[#767676] text-xs font-medium leading-none"
        >
          <div
            class="mt-[16px] pb-[14px] border-b border-[#f7f7f7] text-[#b5b5b5] text-lg font-normal leading-[25.20px] flex justify-between items-center"
            @click="openHistoryBottomSheet"
          >
            <p>연차를 선택해 주세요.</p>
            <c-icon
              name="icon_enter_arrow"
              size="20px"
              :color="'#767676'"
              :fill="false"
            />
          </div>
        </c-field>
        <c-field
          label="포트폴리오 url (선택)"
          class="text-[#767676] text-xs font-medium leading-none"
        >
          <c-input
            class="w-full pb-[14px]"
            placeholder="제목을 입력하세요."
            :maxlength="20"
            autofocus
            :outlined="false"
            :rounded="false"
            border-radius="0px"
          />
        </c-field>
        <c-field
          label="자기소개"
          required
          class="text-[#767676] text-xs font-medium leading-none"
        >
          <c-input
            class="w-full border-0"
            type="textarea"
            maxlength="1000"
            input-class="h-[163px]"
            placeholder="본인을 소개해 주세요."
            :outlined="false"
            :rounded="false"
            border-radius="0px"
            inline-counter
          ></c-input>
        </c-field>
      </div>
    </section>

    <hr class="h-2.5 bg-[#f7f7f7] mt-8" />

    <section class="px-6 mt-[40px]">
      <h2 class="text-[#222222] text-xl font-semibold">인적 사항</h2>
      <div class="mt-[16px]">
        <c-field
          required
          label="한줄 프로필"
          class="text-[#767676] text-xs font-medium leading-none"
        >
          <c-input
            class="w-full border-b pb-[14px]"
            placeholder="나를 한줄로 표현해 주세요."
            :maxlength="30"
            autofocus
            :outlined="false"
            :rounded="false"
            border-radius="0px"
            inline-counter
          />
        </c-field>

        <c-field
          label="업무 스킬"
          required
          class="text-[#767676] text-xs font-medium leading-none"
        >
          <c-input
            class="w-full border-0"
            type="textarea"
            maxlength="1000"
            input-class="h-[163px]"
            placeholder="업무 스킬 추가"
            :outlined="false"
            :rounded="false"
            border-radius="0px"
          ></c-input>
        </c-field>
        <c-field
          label="희망 직무 (선택)"
          class="text-[#767676] text-xs font-medium leading-none"
        >
          <c-input
            class="w-full border-0"
            type="textarea"
            maxlength="1000"
            input-class="h-[163px]"
            placeholder="희망 직무 추가"
            :outlined="false"
            :rounded="false"
            border-radius="0px"
          ></c-input>
        </c-field>
        <c-field
          label="관심 분야"
          required
          class="text-[#767676] text-xs font-medium leading-none"
        >
          <div
            class="mt-[16px] pb-[14px] border-b border-[#f7f7f7] text-[#b5b5b5] text-lg font-normal leading-[25.20px] flex justify-between items-center"
            @click="openHistoryBottomSheet"
          >
            <p>관심 분야를 추가해 보세요.</p>
            <c-icon
              name="icon_enter_arrow"
              size="20px"
              :color="'#767676'"
              :fill="false"
            />
          </div>
        </c-field>
      </div>
    </section>

    <section class="bottom-[85px] w-full text-center mt-[85px] px-6 mb-[15px]">
      <c-btn
        class="rounded-[10px] font-semibold text-base w-full py-[14px] bottom-0"
        color="primary"
        >등록하기
      </c-btn>
    </section>

    <c-bottom-sheet v-model="showJobBottomSheet">
      <div class="flex flex-col justify-between">
        <section>
          <p class="text-[#767676] text-xs font-medium leading-none">
            직무 선택
          </p>
          <div class="mt-4">
            <q-item
              v-ripple
              clickable
              class="rounded-[5px] border border-[#dbdbdb] bg-[#fff] items-center px-4 py-0 w-fit h-[40px]"
              ><span
                class="text-center text-[#767676] text-sm font-medium leading-tight"
                >직무 종류</span
              ></q-item
            >
          </div>
        </section>
        <section class="bottom-[85px] w-full text-center mt-[85px]">
          <c-btn
            class="rounded-[10px] font-semibold text-base w-full py-[14px] bottom-0"
            color="primary"
            >선택 완료
          </c-btn>
        </section>
      </div>
    </c-bottom-sheet>

    <c-bottom-sheet v-model="showHistoryBottomSheet">
      <div class="flex flex-col justify-between">
        <section>
          <p class="text-[#767676] text-xs font-medium leading-none">
            연차 선택
          </p>
          <div class="mt-4">
            <q-scroll-area
              class="max-h-[300px]"
              style="height: 150px"
              :bar-style="barStyle"
              :thumb-style="thumbStyle"
            >
              <div class="flex flex-col items-center">
                <div
                  v-for="year in years"
                  :key="year"
                  :class="['year-item', { selected: year === selectedYear }]"
                  @click="onYearClick(year)"
                >
                  {{ year }}년차
                </div>
              </div>
            </q-scroll-area>
          </div>
        </section>
        <section class="w-full text-center mt-[10px]">
          <c-btn
            class="rounded-[10px] font-semibold text-base w-full py-[14px] bottom-0"
            color="primary"
            >선택 완료
          </c-btn>
        </section>
      </div>
    </c-bottom-sheet>

    <c-bottom-sheet v-model="showInterestBottomSheet">
      <div class="flex flex-col justify-between">
        <section>
          <p class="text-[#767676] text-xs font-medium leading-none">
            관심 분야
          </p>
          <div class="mt-4">
            <q-item
              v-ripple
              clickable
              class="rounded-[5px] border border-[#dbdbdb] bg-[#fff] items-center px-4 py-0 w-fit h-[40px]"
              ><span
                class="text-center text-[#767676] text-sm font-medium leading-tight"
                >직무 종류</span
              ></q-item
            >
          </div>
        </section>
        <section class="bottom-[85px] w-full text-center mt-[85px]">
          <c-btn
            class="rounded-[10px] font-semibold text-base w-full py-[14px] bottom-0"
            color="primary"
            >선택 완료
          </c-btn>
        </section>
      </div>
    </c-bottom-sheet>
  </q-page>
</template>

<style scoped lang="scss">
.year-item {
  width: 100%;
  padding: 15px 20px;
  text-align: center;
  color: #b5b5b5;
  cursor: pointer;

  &.selected {
    background-color: #f0f0f0;
    color: #000;
    border-radius: 10px;
  }
}
</style>
