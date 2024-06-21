<script lang="ts" setup>
const form = ref({
  senderName: '',
  relation: '',
  title: '',
  content: '',
});
</script>

<template>
  <q-page class="pt-5 bg-white flex flex-col">
    <form action="" class="flex flex-col gap-4 px-6 mb-32">
      <label for="senderName">
        <h4 class="ml-[5px] text-grey-3 text-[13px] font-medium">
          보내는 사람 이름
        </h4>
        <a-input
          name="senderName"
          v-model="form.senderName"
          bg-color="grey"
          color="black"
          placeholder="보내는 사람 이름 입력"
          border-radius="23px"
        />
      </label>
      <label for="relation"
        ><h4 class="ml-[5px] text-grey-3 text-[13px] font-medium">관계</h4>
        <a-input
          name="relation"
          v-model="form.relation"
          bg-color="grey"
          color="black"
          placeholder="수신자와의 관계 입력"
      /></label>
      <label for="title"
        ><h4 class="ml-[5px] text-grey-3 text-[13px] font-medium">제목</h4>
        <a-input
          name="title"
          v-model="form.title"
          bg-color="grey"
          color="black"
          maxlength="40"
          inline-counter
          placeholder="제목 입력"
      /></label>
      <label for="content"
        ><h4 class="ml-[5px] text-grey-3 text-[13px] font-medium">내용</h4>
        <a-input
          name="content"
          v-model="form.content"
          bg-color="grey"
          color="black"
          type="textarea"
          maxlength="1200"
          inline-counter
          input-class="h-[163px]"
          placeholder="내용을 입력해 주세요. 편지 작성은 1200자 까지 가능합니다. (초과 입력 시 1200자 까지만 저장됩니다.)"
      /></label>
    </form>
    <div
      class="fixed inset-x-0 bottom-0 h-16 leading-16 w-full font-medium text-base z-10"
    >
      <q-btn class="size-full" color="primary" square unelevated
        >작성완료</q-btn
      >
    </div>
  </q-page>
</template>
<style lang="scss" scoped></style>
