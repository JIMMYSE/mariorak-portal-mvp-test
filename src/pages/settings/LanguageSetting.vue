<script setup lang="ts">
const selectedLanguage = ref('ko');

const languages = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'zh', label: '中文' },
];
</script>

<template>
  <q-page class="bg-white pb-20">
    <div class="mx-4 mt-4 bg-white rounded-lg border border-grey-1 p-4">
      <div v-for="(lang, idx) in languages" :key="lang.value">
        <div
          class="flex items-center gap-3 py-3 cursor-pointer"
          @click="selectedLanguage = lang.value"
        >
          <q-icon
            :name="selectedLanguage === lang.value ? 'check_circle' : 'radio_button_unchecked'"
            :color="selectedLanguage === lang.value ? 'pink' : 'grey'"
            size="20px"
          />
          <span class="text-[14px] text-grey-5">{{ lang.label }}</span>
        </div>
        <q-separator v-if="idx < languages.length - 1" />
      </div>
    </div>
  </q-page>
</template>
