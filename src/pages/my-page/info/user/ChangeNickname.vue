<!-- 회원가입 -->

<script lang="ts" setup>
import { NicknameAvatorChangeForm } from 'src/types/auth/auth-model';

const {
  meta,
  values: form,
  handleSubmit,
  setFieldValue,
} = useForm<NicknameAvatorChangeForm>({
  validationSchema: toTypedSchema(NicknameAvatorChangeSchema),
});

const { user } = useAuthStore();
setFieldValue('avatar_id', user.avatar.id);

//데이터 가져온거 뿌리기
const onSubmit = handleSubmit(async () => {
  const { nickname } = form;
  if (!nickname) return;

  await updateUserAvatarNickname(nickname, user.avatar.id);
  useAlertDialog({
    text: 'message.nicknameUpdated',
  }).onOk(() => {
    initUserDetailInfo();
    replaceToName('user-profile-manage');
  });
});
</script>

<template>
  <q-page class="px-6 bg-white">
    <div class="pt-10 text-h2 font-semibold text-[24px]">
      <p>{{ user.nickname }} 님</p>
      <p>변경할 닉네임을 입력해주세요!</p>
    </div>

    <form>
      <c-field label="닉네임" class="mt-8">
        <c-input
          name="nickname"
          placeholder="닉네임을 입력해 주세요"
          :maxlength="10"
          autofocus
          check-badwords
          :outlined="false"
          :rounded="false"
          border-radius="0px"
        />
      </c-field>
    </form>
    <section class="fixed inset-x-0 bottom-0 p-3">
      <div class="flex justify-center items-center" style="padding-inline: 1%">
        <button
          type="button"
          class="text-center text-white font-medium rounded-md w-full h-[50px] max-w-[512px]"
          :class="{
            'bg-primary': meta.valid,
            'bg-grey-2': !meta.valid,
          }"
          :disabled="!meta.valid"
          @click="onSubmit"
        >
          변경하기
        </button>
      </div>
    </section>
  </q-page>
</template>

<style lang="scss" scoped></style>
