<!-- 프로필 -->

<script setup lang="ts">
import { NicknameAvatorChangeForm } from 'src/types/auth/auth-model';

const {
  meta,
  values: form,
  handleSubmit,
  setValues,
} = useForm<NicknameAvatorChangeForm>({
  validationSchema: toTypedSchema(NicknameAvatorChangeSchema),
});

const { user } = useAuthStore();

//데이터 가져온거 뿌리기
const onSubmit = async (avatarId: number) => {
  await updateUserAvatarNickname(form.nickname, avatarId);
  useAlertDialog({
    text: 'message.avatarUpdated',
  }).onOk(() => {
    initUserDetailInfo();
    replaceToName('user-profile-manage');
  });
};
</script>

<template>
  <q-page class="bg-white pt-6">
    <nickname-and-avatar @on-submit="onSubmit" :submit-label="'변경하기'" :initial-avatar-id="user.avatar.id" />
  </q-page>
</template>

<style scoped lang="scss"></style>
