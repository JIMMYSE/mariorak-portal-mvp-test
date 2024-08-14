<script setup lang="ts">
import { ref } from 'vue';

type Props = { reportedCount: number; maxCount: number };
defineProps<Props>();
const checked = ref(false);
</script>
<template>
  <div class="p-6">
    <section class="col gap-2 h-44 text-h3 leading-[25px] mt-3">
      <p>
        사용자님께서 릴레이 창작전에 <br />
        <span class="text-primary">등록한 글이 신고</span>
        를 받았습니다. <br /><span class="text-primary"
          >{{ maxCount }}회 이상 신고</span
        >
        받을 경우<span class="text-primary"> 계정이 <br />삭제</span>
        될 수 있음을 알려드립니다.
      </p>
      <div class="text-red text-body1 mt-3">
        신고 잔여 횟수 ({{ reportedCount }}/{{ maxCount }})
      </div>
      <div class="text-left mt-2 text-caption text-grey-4">
        <c-checkbox
          v-model="checked"
          label="내용을 확인하였으며, 주의하도록 하겠습니다."
        />
      </div>
    </section>
    <div class="absolute bottom-0 right-0 p-1 text-end">
      <c-btn label="확인" :disable="!checked" v-close-popup flat />
    </div>
  </div>
</template>
