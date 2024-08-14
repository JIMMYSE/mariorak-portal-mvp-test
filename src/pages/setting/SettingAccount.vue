<!-- 설정 > 계정 설정 -->

<script setup lang="ts">
const { user } = useUserInfo();

async function doLogout() {
  useLogout({
    onSuccess: () => goToName('login'),
  });
}
</script>

<template>
  <q-page class="flex flex-col bg-grey">
    <q-card flat class="bg-grey">
      <q-card-section class="">
        <!-- {{ user }} -->
      </q-card-section>
      <q-card-section class="flex flex-col items-center">
        <h3 class="text-h1">{{ user.nickname }}</h3>
        <div class="font-pretendard text-caption">{{ user.email }}</div>
      </q-card-section>
      <q-card-section class="relative flex flex-col items-center">
        <q-img
          :src="user.avatar.profile_image.convert_addr"
          height="359px"
          fit="contain"
        />
        <div class="absolute bottom-2">
          <img src="/images/shadow.svg" alt="shadow" />
        </div>
      </q-card-section>
      <q-card-section class="flex flex-col items-center gap-4 pt-20">
        <c-btn
          class="text-base"
          :label="$t('label.changePassword')"
          style="width: 165px; height: 50px"
          :to="{ name: 'setting-password' }"
        />
        <q-btn
          class="font-pretendard text-sm underline"
          color="grey-3"
          flat
          :label="$t('label.logout')"
          @click="doLogout"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped lang="scss"></style>
