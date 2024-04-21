<script setup lang="ts">
import AvatarAndNickname from 'src/components/AvatarAndNickname.vue';
import { ref } from 'vue';

const avatarId = ref(2);
</script>
<template>
  <q-page class="bg-grey pt-6">
    <!-- content -->
    <avatar-and-nickname v-model="avatarId" />
  </q-page>
</template>

<style scoped></style>
