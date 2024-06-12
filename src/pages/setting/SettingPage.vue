<script lang="ts" setup>
import { useLogout, useUserInfo } from 'src/composables/auth/auth';
import { useTermsList } from 'src/composables/setting/setting';

async function doLogout() {
  useLogout({
    onSuccess: () => goToName('login'),
  });
}

const { request } = useSearchFilter({
  requestDefault: {
    filters: {
      terms_type_cd: {
        in: ['1', '2', '3'],
      },
      is_required: {
        in: [true, false],
      },
    },
    search: {},
    from: 0,
    size: 10,
    sort: [
      {
        terms_type_cd: 'desc',
      },
    ],
  },
});

const { data: listData } = useTermsList({
  searchRequest: request,
});

const serviceTermsId = computed(() => {
  return listData?.value?.rows.find(
    (item: any) => item.is_active === true && item.terms_type_cd === '1'
  )?.id;
});

const privacyTermsId = computed(() => {
  return listData?.value?.rows.find(
    (item: any) => item.is_active === true && item.terms_type_cd === '2'
  )?.id;
});
</script>

<template>
  <q-page>
    <!-- 계정 설정 > 비밀번호 변경 예시 페이지 -->
    <router-link
      :to="{ name: 'confirm-password' }"
      class="w-full h-[67px] pl-6 pr-3 flex justify-between items-center"
    >
      <a-subtitle>계정 설정</a-subtitle>
      <q-icon
        name="img:/src/assets/icons/icon_arrow_set.svg"
        size="30px"
      ></q-icon>
    </router-link>

    <!-- 서비스 약관 -->
    <div
      class="pl-6 py-2 w-full bg-grey font-pretendard text-caption text-grey-4 leading-[14px]"
    >
      서비스 약관
    </div>

    <router-link
      :to="{ path: `/setting/service-terms/${serviceTermsId}` }"
      class="w-full h-[67px] pl-6 pr-3 flex justify-between items-center border-b border-grey-1"
    >
      <h3 class="text-sm font-pretendard font-medium text-secondary">
        서비스 이용약관
      </h3>
      <q-icon
        name="img:/src/assets/icons/icon_arrow_set.svg"
        size="30px"
      ></q-icon>
    </router-link>
    <router-link
      :to="{ path: `/setting/privacy-terms/${privacyTermsId}` }"
      class="w-full h-[67px] pl-6 pr-3 flex justify-between items-center"
    >
      <h3 class="text-sm font-pretendard font-medium text-secondary">
        개인정보 처리방침
      </h3>
      <q-icon
        name="img:/src/assets/icons/icon_arrow_set.svg"
        size="30px"
      ></q-icon>
    </router-link>

    <!-- 고객 지원 -->
    <div
      class="pl-6 py-2 w-full bg-grey font-pretendard text-caption text-grey-4 leading-[14px]"
    >
      고객 지원
    </div>

    <div
      class="w-full h-[67px] pl-6 pr-3 flex justify-between items-center border-b border-grey-1"
    >
      <h3 class="text-sm font-pretendard font-medium text-secondary">
        버전정보
      </h3>
      <p class="pr-3 font-pretendard text-sm text-primary">n.n.n</p>
    </div>
    <router-link
      :to="{ name: 'notice-list' }"
      class="w-full h-[67px] pl-6 pr-3 flex justify-between items-center border-b border-grey-1"
    >
      <h3 class="text-sm font-pretendard font-medium text-secondary">
        공지사항
      </h3>
      <q-icon
        name="img:/src/assets/icons/icon_arrow_set.svg"
        size="30px"
      ></q-icon>
    </router-link>
    <router-link
      :to="{ name: 'cancel-membership' }"
      class="w-full h-[67px] pl-6 pr-3 flex justify-between items-center"
    >
      <h3 class="text-sm font-pretendard font-medium text-secondary">
        회원탈퇴
      </h3>
      <q-icon
        name="img:/src/assets/icons/icon_arrow_set.svg"
        size="30px"
      ></q-icon>
    </router-link>

    <div class="flex flex-center mt-8">
      <a-btn label="로그아웃(테스트용)" type="button" @click="doLogout" />
    </div>
  </q-page>
</template>
