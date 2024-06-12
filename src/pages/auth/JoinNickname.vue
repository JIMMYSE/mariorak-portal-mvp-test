<!-- 서비스 약관 동의 -->

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup';
import { Dialog } from 'quasar';
import { goBack, goToName } from 'src/composables/common/app';
import { useAlertDialog } from 'src/composables/common/dialog';
import { quasarVeeConfig } from 'src/composables/common/veeValidate';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import JoinCompleted from './JoinCompleted.vue';
import AInput from 'src/components/form/AInput.vue';
import useTryCatchWithLoading from 'src/composables/common/useTryCatchWithLoading';
import { object, string } from 'yup';

const store = useJoinStore();

// api 연동시 주석 해제
// if (!store.hasTermsAggree()) {
//   goBack();
// }

const NicknameSchema = object({ nckn_nm: string() });

const { defineField, handleSubmit, meta } = useForm({
  validationSchema: toTypedSchema(NicknameSchema),
  initialValues: { nckn_nm: '' },
});

const [nickname, nicknameProps] = defineField<'nckn_nm', string>(
  'nckn_nm',
  quasarVeeConfig
);

const { tryCatchWithLoading } = useTryCatchWithLoading();
const nicknameInput = ref<typeof AInput | undefined>();

const onSubmit = handleSubmit(() => {
  // tryCatchWithLoading(
  //   async () => {
  //     store.setNickname(nickname.value);
  //     await store.joinWithAccount();
  //     Dialog.create({
  //       component: JoinCompleted,
  //       fullWidth: true,
  //     }).onDismiss(() => goToName('main'));
  //   },
  //   (error: any) =>
  //     useAlertDialog({ text: error.message })?.onDismiss(() => {
  //       nicknameInput.value?.focus();
  //     })
  // );
});
</script>

<template>
  <QPage class="column px-6 pb-[87px] min-h-[calc(100vh-87px)]">
    <q-form class="column col" @submit.prevent="onSubmit">
      <s-field label="닉네임" class="grow">
        <a-input
          ref="nicknameInput"
          v-model="nickname"
          name="nckn_nm"
          v-bind="nicknameProps"
          autofocus
        />
        <template #bottom>
          <span class="text-caption text-grey-4"
            >😄한글, 영문, 숫자 사용 8자 이내</span
          >
        </template>
      </s-field>
      <div class="relative mb-3">
        <q-img
          src="~assets/images/shadow.svg"
          height="37px"
          fit="contain"
          class="absolute inset-x-auto -bottom-3"
        />
        <q-img
          src="/images/avatars/avatar_1.png"
          height="338px"
          fit="contain"
        />
      </div>
      <div class="fixed inset-x-0 bottom-0 p-4 bg-primary row h-[64px]">
        <button
          class="text-center text-white font-base font-medium size-full flex justify-center items-center"
          @click="onSubmit"
        >
          완료하기
        </button>
      </div>
    </q-form>
  </QPage>
</template>

<style lang="scss" scoped></style>
