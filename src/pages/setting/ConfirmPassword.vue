<!-- 설정 > 계정 설정 > 비밀번호 재설정 -->

<script setup lang="ts">
type Props = { id: string; token: string };
const props = defineProps<Props>();

const onSubmit = () => {
  goToName('setting-change-password');
};

async function onSuccess(values: { password: string }) {
  console.log('onSubmit', values);
  goToName('setting-change-password');
}

const { fields } = useAuthForm({
  needPasswordConfirm: false,
  onSuccess,
});
const { password, passwordProps } = fields;
</script>

<template>
  <q-page class="px-6 bg-grey">
    <div class="pt-[40px] text-h2 font-rokaf font-bold">
      <p>비밀번호 확인을 위한</p>
      <p><span class="text-primary">현재 비밀번호</span>를 입력해 주세요.</p>
    </div>
    <q-form @submit.prevent="onSubmit">
      <a-field label="비밀번호">
        <a-input
          type="password"
          v-model="password"
          :placeholder="$t('label.password')"
          :inline-counter="false"
          v-bind="passwordProps"
        />
      </a-field>
    </q-form>
    <div class="absolute bottom-0 bg-primary w-full h-[64px] left-0">
      <button
        @click="onSubmit"
        type="submit"
        class="text-center text-white font-base font-medium size-full flex justify-center items-center"
      >
        확인
      </button>
    </div>
  </q-page>
</template>
