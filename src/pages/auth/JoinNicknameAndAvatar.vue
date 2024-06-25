<!-- 프로필 -->

<script setup lang="ts">
const joinStore = useJoinStore();
const { joinData } = storeToRefs(joinStore);
if (!joinData.value) goToName('join-email');

// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDI5LCJmcm9tIjoiUCIsImlzR3Vlc3QiOmZhbHNlLCJndWVzdElkIjpudWxsLCJpYXQiOjE3MTkyOTYzMzcsImlzcyI6ImNvYXJzb2Z0LmNvbSJ9.iwPbn2jKjLuO39pNYz0FLzBT4Si_nU3Xq6EUr2sqFXE",
//   "user": {
//     "emails": [
//       {
//         "account_type_cd": "L",
//         "email": "jay8126@gmail.coma",
//         "id": 429
//       }
//     ],
//     "password_update_at": "2024-06-25T06:18:57.000Z",
//     "nickname": "123123",
//     "id": 429
//   }
// }

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

  goToName('join-completed');
};
</script>

<template>
  <q-page class="bg-grey pt-6">
    {{ joinData }}
    <!-- content -->
    <nickname-and-avatar @on-submit="onSubmit" />
  </q-page>
</template>

<style scoped></style>
