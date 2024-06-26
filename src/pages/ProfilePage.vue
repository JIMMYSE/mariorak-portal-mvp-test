<!-- 프로필 -->

<script setup lang="ts">
const { user } = useUserInfo();

const onSubmit = async (
  {
    nickname,
    avatarId,
  }: {
    nickname: string;
    avatarId: number;
  },
  resetForm: () => void
) => {
  // 업데이트
  if (nickname !== user.value?.nickname) {
    await updateUserNickname(nickname);
  }
  await updateUserAvatar(avatarId);
  // 유저정보 재조회
  await initUserDetailInfo(user.value?.id);
  resetForm();
  useNotifyDone('message.avatarUpdated');
};
</script>

<template>
  <q-page class="bg-grey pt-6">
    <nickname-and-avatar
      :initial-nickname="user.nickname"
      :initial-avatar-id="user.avatar_id"
      @on-submit="onSubmit"
    />
  </q-page>
</template>

<style scoped></style>
