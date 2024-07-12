<!-- 서비스 이용제한 안내 -->

<script lang="ts" setup>
import { formatDateTime } from 'src/utils/date-util';

const { user } = useUserInfo();

// 상세 조회
const route = useRoute();
const code = ref<string>(route.params.code as string);

const { data } = useAuthRestrictUserInfo(user.value.id);
</script>

<template>
  <q-page class="px-6 relative pt-[35px]">
    <h1 class="text-h1 text-[#f5192f] leading-[30px]">
      {{
        ['1005', '1003'].includes(code)
          ? '로그인 차단 안내'
          : '서비스 이용 제한 안내'
      }}
    </h1>
    <p class="mt-[10px] font-pretendard text-sm leading-5 text-grey-4">
      서비스 운영정책 위반으로 아래와 같이 사용이 제한되었습니다.
      <template v-if="code === '1011'">
        운영정책 위반행위가 반복되거나 다른 이용제한 사유가 발견되는 경우
        이용제한 조치가 가중되거나 영구적으로 제한될 수 있습니다.
      </template>
    </p>

    <div
      class="mt-[30px] h-[110px] flex bg-grey rounded-[5px]"
      v-if="code === '1011'"
    >
      <div class="flex-1 flex-col flex justify-center items-center">
        <p class="text-sm leading-4 font-pretendard text-grey-3">제한 내용</p>
        <p class="mt-2 text-[15px] leading-5 font-medium">
          {{ getCommonCodeName('RESTRICT_TYPE', data?.data.restrict_type_cd) }}
        </p>
      </div>
      <div class="flex-1 flex-col flex justify-center items-center">
        <p class="text-sm leading-4 font-pretendard text-grey-3">제한 사유</p>
        <p class="mt-2 text-[15px] leading-5 font-medium">
          {{ data?.data.restrict_reason }}
        </p>
      </div>
    </div>
    <div
      class="mt-[10px] h-[110px] flex flex-col justify-center items-center bg-grey rounded-[5px]"
    >
      <template v-if="code === '1011'">
        <p class="text-sm leading-4 font-pretendard text-grey-3">해제 일시</p>
        <p class="mt-2 text-[15px] leading-5 font-medium">
          {{ formatDateTime(data?.data.restrict_end_at) }} 이후
        </p>
      </template>
      <template v-else>
        <p class="text-sm leading-4 font-pretendard text-grey-3">차단 사유</p>
        <p class="mt-2 text-[15px] leading-5 font-medium">
          {{ code === '1005' ? '3개월 이상 미접속' : '로그인 실패 5회 이상' }}
        </p>
      </template>
    </div>
    <p class="mt-[15px] font-pretendard text-sm leading-5 text-grey-4">
      이용제한에 대한 문의 및 운영정책에 대한 자세한 내용은<br />
      이용약관을 참조해 주세요.
    </p>

    <div class="absolute bottom-0 bg-primary w-full h-[64px] left-0">
      <button
        class="text-center text-white font-base font-medium size-full flex justify-center items-center"
        @click="goToName('login')"
      >
        확인
      </button>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
