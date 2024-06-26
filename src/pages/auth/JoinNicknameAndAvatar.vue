<!-- 프로필 -->

<script setup lang="ts">
const joinStore = useJoinStore();
const { joinData } = storeToRefs(joinStore);
if (!joinData.value) goToName('join-email');

const onSubmit = async ({
  nickname,
  avatarId,
}: {
  nickname: string;
  avatarId: number;
}) => {
  if (!joinData.value) return;
  joinData.value.nickname = nickname;
  joinData.value.avatar_id = avatarId;

  await registerUser(joinData.value);

  joinStore.$reset();

  goTo({ name: 'join-completed', replace: true });
};
</script>

<template>
  <q-page class="bg-grey pt-6">
    <nickname-and-avatar @on-submit="onSubmit" />
  </q-page>
</template>

<style scoped lang="scss"></style>
