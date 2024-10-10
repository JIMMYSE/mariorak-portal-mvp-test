<script lang="ts" setup>
const { user } = useAuthStore();

const { unregister } = useAuthUnregister();
const cont = ref(null);
const withdrawal = () => {
  useMyConfirmDialog({
    htmlText: `<div class="text-center">${user.nickname} 님, <br/> 정말 탈퇴하시겠습니까? </div>`,
  }).onOk(() => {
    console.log(reason.value, cont.value);
    unregister(
      () => {
        goToName('withdrawal-complete');
      },
      reason.value,
      cont.value
    );
  });
};

const reason = ref('');
const { options: reasons } = useCommonCode('WHDR_RSN');

const checkWithdrawal = ref(false);
const disabled = computed(() => {
  return (!checkWithdrawal.value || !reason.value) && !(reason.value === '05' && cont.value);
});
const onSubmit = () => {
  if (disabled.value) {
    return;
  }
  withdrawal();
};
watch(reason, (val) => {
  if (val !== '05') {
    cont.value = null;
  }
});
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
    </section>
    <section class="px-6">
      <div class="bg-[#f7f7f7] rounded-[10px]">
        <c-input
          class="w-full h-[114px]"
          type="textarea"
          :clearable="false"
          :disable="reason !== '05'"
          v-model="cont"
          placeholder="탈퇴사유를 직접 입력해주세요."
          input-class="bg-[#f7f7f7] px-3 text-[#767676] font-normal text-base "
        />
      </div>
    </section>
    <section class="p-3 mt-4 mb-20">
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
          회원탈퇴하기
        </button>
      </div>
    </section>
  </q-page>
</template>
<style scoped lang="scss"></style>
