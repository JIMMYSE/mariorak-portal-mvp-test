<template>
  <QLayout view="hhh lpr fff">
    <q-page-container>
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.path" />
      </router-view>
    </q-page-container>
  </QLayout>
</template>

<script setup lang="ts"></script>
