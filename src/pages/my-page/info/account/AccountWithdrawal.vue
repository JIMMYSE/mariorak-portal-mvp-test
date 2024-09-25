<script lang="ts" setup>
const { user } = useAuthStore();

const { unregister } = useAuthUnregister();
const withdrawal = () => {
  useMyConfirmDialog({
    htmlText: `<div class="text-center">${user.nickname} 님, <br/> 정말 탈퇴하시겠습니까? </div>`,
  }).onOk(() => {
    unregister(() => {
      goToName('login');
    });
  });
};

const reason = ref('');
const reasons = [
  {
    label: '재가입(ID변경)',
    value: 'rejoin',
  },
  {
    label: '나에게 필요한 정보가 부족한 것 같습니다.',
    value: 'info',
  },
  {
    label: '타사용자로 인한 불쾌감',
    value: 'bad',
  },
  {
    label: '개인정보 유출 방지 등 보안 상의 문제',
    value: 'privacy',
  },
  {
    label: '기타',
    value: 'etc',
  },
];

const checkWithdrawal = ref(false);
const disabled = computed(() => {
  return !checkWithdrawal.value || !reason.value;
});
const onSubmit = () => {
  if (disabled.value) {
    return;
  }
  withdrawal();
};
</script>
<template>
  <q-page>
    <section class="px-6 pt-8">
      <div class="text-[#222222] text-xl font-semibold">
        <span>너무 아쉽습니다...<br /> </span>
        <span class="text-[#056bf1]">CCF</span>
        <span>를 탈퇴하시기전에 <br />회원탈퇴 유의사항을 꼭 확인해주세요!</span>
      </div>
    </section>
    <section class="px-6 pt-8">
      <div class="w-full min-h-[360px] bg-[#f7f7f7] rounded-[10px] p-3">
        <div class="text-[#767676] leading-normal">회원탈퇴 유의사항이 노출되는 영역입니다.</div>
      </div>
    </section>
    <section class="px-6 pt-10">
      <div class="text-[#222222] text-xl font-semibold leading-7">
        회원탈퇴를 하시는 이유를 알려주세요! <br />더좋은CCF가되도록노력하겠습니다.
      </div>

      <div class="p-3 q-gutter-y-sm">
        <div class="flex items-center" v-for="r in reasons" :key="r.value">
          <q-radio v-model="reason" :val="r.value" size="sm" dense class="pb-[2px] mr-2" />
          <div class="text-[#767676]">{{ r.label }}</div>
        </div>
      </div>
      <div class="w-full min-h-[114px] bg-[#f7f7f7] rounded-[10px] p-3">
        <div class="text-[#767676] leading-normal">탈퇴사유를 직접 입력해주세요.</div>
      </div>
    </section>
    <section class="p-3 mb-20">
      <div class="flex justify-start items-center">
        <c-checkbox v-model="checkWithdrawal">
          <div class="text-[#222222] text-lg">상기 내용을 확인하였으며 동의합니다.</div>
        </c-checkbox>
      </div>
    </section>
    <section class="fixed inset-x-0 bottom-0 p-3 bg-white">
      <div class="flex justify-center items-center" style="padding-inline: 1%">
        <button
          type="button"
          class="text-center text-white font-medium rounded-md w-full h-[50px] max-w-[512px]"
          :class="{
            'bg-primary': !disabled,
            'bg-grey-2': disabled,
          }"
          :disabled="disabled"
          @click="onSubmit"
        >
          다음
        </button>
      </div>
    </section>
  </q-page>
</template>
<style scoped lang="scss"></style>
