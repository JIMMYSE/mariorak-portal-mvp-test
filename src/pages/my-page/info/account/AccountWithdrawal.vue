<script lang="ts" setup>
const { user } = useAuthStore();
console.log('user', user);
async function doLogout() {
  useLogout(user.nickname, {
    onSuccess: () => goToName('login'),
  });
}
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
const socialBgClass = computed(() => {
  switch (user.register_type) {
    case 'google':
      return 'border-[#DBDBDB] bg-white';
    case 'kakao':
      return 'bg-[#fae300]';
    case 'naver':
      return 'bg-[#03c75a]';
    case 'apple':
      return 'bg-grey-5';
    default:
      return 'border-[#DBDBDB]';
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
  </q-page>
</template>
<style scoped lang="scss"></style>
