<template>
  <QLayout view="hhh lpr fff">
    <QPageContainer>
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.path" />
      </router-view>
    </QPageContainer>
  </QLayout>
</template>

<script setup lang="ts"></script>
