<!-- 개인정보처리방침 -->

<script setup lang="ts"></script>

<template>
  <q-page class="column">
    <q-card class="q-mb-xl" flat>
      <q-card-section>
        <div class="join__policy_desc col">
          <span class="policy__title mt-6"> 회원탈퇴는 어떻게 하나요? </span>
          <p class="policy__content mt-2 mb-6">
            회원 탈퇴를 원하신다면 아래 내용을 확인하시어 순차적으로 진행하면 가능합니다. <br /><br />
            1) CCF 로그인<br />
            2) 우측 상단의 마이페이지 선택<br />
            3) 계정 정보 관리 선택<br />
            4) 페이지 중앙에 [회원탈퇴] 버튼 선택<br />
            5) 확인 버튼 선택<br />
            6) 회원탈퇴 완료<br />
          </p>

          <span class="policy__title"> 회원 탈퇴 신청 후 탈퇴 신청을 취소할 수 있나요? </span>
          <p class="policy__content mt-2 mb-6">
            탈퇴 시에는 즉시 계정 정보 및 개인 정보가 파기되기 때문에 탈퇴 취소 신청이 불가합니다.
          </p>

          <span class="policy__title"> 삭제되거나 보관되는 데이터는 어떤 것들이 있나요? </span>
          <p class="policy__content mt-2 mb-6">
            탈퇴 시에는 즉시 삭제되는 정보와 일정 기간 보존되는 데이터가 존재합니다. <br /><br />
            1) 즉시 삭제되는 데이터 : 사용자 계정과 관련된 정보 (이름, 이메일, 닉네임, 성명) <br />
            2) 일정 기간 보관 데이터 <br />
            다음의 사유에 해당하는 경우 해당 기간 종료 시까지의 정보 범위에 한해 기록 후, 일정 기간 경과 시 삭제됩니다.
            <br />
            <table
              cellspacing="0"
              cellpadding="0"
              border="0"
              class="policy__table mt-2 mb-6"
            >
              <thead>
                <tr>
                  <th>관련 법령</th>
                  <th>수집정보</th>
                  <th>보유기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>전자상거래 등에서</td>
                  <td>소비자의 불만 또는 분쟁처리에 관한 기록</td>
                  <td>3년</td>
                </tr>
                <tr>
                  <td rowspan="2">소비자보호에 관한 법률</td>
                  <td>계약 또는 청약철회 등에 관한 기록</td>
                  <td>5년</td>
                </tr>
                <tr>
                  <td>대금결제 및 재화 등의 공급에 관한 기록</td>
                  <td>5년</td>
                </tr>
                <tr>
                  <td>통신비밀보호법</td>
                  <td>서비스 이용관련 정보(접속로그)</td>
                  <td>3개월</td>
                </tr>
              </tbody>
            </table>

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
