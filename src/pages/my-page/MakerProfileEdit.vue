<script lang="ts" setup></script>
<template>
  <q-page>
    <section class="px-6 pt-[30px]">
      <h2 class="text-[#222222] text-xl font-semibold">개발자 프로필</h2>
      <div class="mt-[16px]">
        <c-field
          label="닉네임"
          class="text-[#767676] text-xs font-medium leading-none"
        >
          <c-input
            class="w-full border-b border-[#f7f7f7] pb-[14px]"
            placeholder="닉네임을 입력하세요."
            :maxlength="20"
            autofocus
            :outlined="false"
            :rounded="false"
            border-radius="0px"
          />
        </c-field>

        <c-field
          label="직무"
          required
          class="text-[#767676] text-xs font-medium leading-none"
        >
          <c-input
            class="w-full border-b border-[#f7f7f7] pb-[14px]"
            placeholder="직무를 선택해 주세요."
            :maxlength="20"
            autofocus
            :outlined="false"
            :rounded="false"
            border-radius="0px"
          />
        </c-field>
        <c-field
          label="연차"
          required
          class="text-[#767676] text-xs font-medium leading-none"
        >
          <c-input
            class="w-full border-b border-[#f7f7f7] pb-[14px]"
            placeholder="연차를 선택해 주세요."
            :maxlength="20"
            autofocus
            :outlined="false"
            :rounded="false"
            border-radius="0px"
          />
        </c-field>
        <c-field
          label="포트폴리오 url (선택)"
          class="text-[#767676] text-xs font-medium leading-none"
        >
          <c-input
            class="w-full border-b border-[#f7f7f7] pb-[14px]"
            placeholder="제목을 입력하세요."
            :maxlength="20"
            autofocus
            :outlined="false"
            :rounded="false"
            border-radius="0px"
          />
        </c-field>
        <c-field
          label="자기소개"
          required
          class="text-[#767676] text-xs font-medium leading-none"
        >
          <c-input
            class="w-full border-0"
            type="textarea"
            maxlength="1000"
            input-class="h-[163px]"
            placeholder="본인을 소개해 주세요."
            :outlined="false"
            :rounded="false"
            border-radius="0px"
            inline-counter
          ></c-input>
        </c-field>
      </div>
    </section>
  </q-page>
</template>
