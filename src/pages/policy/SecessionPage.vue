<!-- 개인정보처리방침 -->

<script setup lang="ts"></script>

<template>
  <q-page class="column">
    <q-card class="q-mb-xl" flat>
      <q-card-section>
        <div class="join__policy_desc col">
          <span class="policy__title mt-6"> 회원탈퇴는 어떻게 하나요? </span>
          <p class="policy__content mt-2 mb-6">
            회원 탈퇴를 원하신다면 아래 내용을 확인하시어 순차적으로 진행하면
            가능합니다. <br /><br />
            1) CCF 로그인<br />
            2) 우측 상단의 마이페이지 선택<br />
            3) 계정 정보 관리 선택<br />
            4) 페이지 중앙에 [회원탈퇴] 버튼 선택<br />
            5) 확인 버튼 선택<br />
            6) 회원탈퇴 완료<br />
          </p>

          <span class="policy__title">
            회원 탈퇴 신청 후 탈퇴 신청을 취소할 수 있나요?
          </span>
          <p class="policy__content mt-2 mb-6">
            탈퇴 시에는 즉시 계정 정보 및 개인 정보가 파기되기 때문에 탈퇴 취소
            신청이 불가합니다.
          </p>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style lang="scss" scoped>
.join__policy_content {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  width: 100%;
  flex: 1 0 0%;

  .join__policy_desc {
    width: 100%;
    padding: 16px;
    border: 1px solid #e0e0e0;
    font-size: 12px;
    line-height: 1.5;
  }
}

:deep(.policy__header) {
  font-size: 12px;
  color: #111;
}

:deep(.policy__title) {
  display: block;
  font-weight: 700;
  font-size: 14px;
  color: #111;
  margin-top: 1.2rem;
}

:deep(.policy__subTitle) {
  display: block;
  font-weight: 400;
  font-size: 14px;
  color: #111;
}

:deep(.policy__content) {
  font-size: 12px;
  color: #424242;
}

:deep(.policy__list) {
  padding-left: 8px;
  font-size: 12px;
  list-style: none;
}

:deep(.policy__table) {
  border: 1px solid #bdbdbd;
  font-size: 12px;
  color: #111;

  th,
  td {
    padding: 8px;
    &:not(:last-child) {
      border-right: 1px solid #bdbdbd;
    }
  }

  th {
    border-bottom: 1px solid #bdbdbd;
    text-align: center;
  }

  strong {
    color: #8365e8;
    font-size: 1.4rem;
  }
}

.is-bold {
  font-weight: 700;
}

.is-underline {
  text-decoration: underline;
}
</style>
