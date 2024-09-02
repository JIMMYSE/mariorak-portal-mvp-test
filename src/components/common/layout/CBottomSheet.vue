<script lang="ts" setup>
import { BottomSheet } from 'quasar';
</script>

<template>
  <div>
    <bottom-sheet>
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section>Overview</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>Q&A</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>Related</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>More</q-item-section>
        </q-item>
      </q-list>
    </bottom-sheet>
  </div>
</template>
