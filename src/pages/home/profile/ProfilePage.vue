<!-- 프로필 -->

<script setup lang="ts">
const onSubmit = async ({
  nickname,
  avatarId,
}: {
  nickname: string;
  avatarId: number;
}) => {
  const { user } = useUserInfo();

  if (nickname !== user.value?.nickname) {
    // 업데이트
    await updateUserNickname(nickname);
  }

  await updateUserAvatar(avatarId);

  // 유저정보 재조회
  await initUserDetailInfo(user.value?.id);

  useNotifyDone('message.avatarUpdated');

  // resetForm({
  //   values: {
  //     nickname: form.nickname,
  //     avatarId: form.avatarId,
  //   },
  // });
};
</script>

<template>
  <q-page class="bg-grey pt-6">
    <!-- content -->
    <nickname-and-avatar @on-submit="onSubmit" />
  </q-page>
</template>

<style scoped></style>
