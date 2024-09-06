<!-- 회원가입 -->

<script lang="ts" setup>
import { NicknameJoinForm } from 'src/types/auth/auth-model';
const joinStore = useJoinStore();
const { joinData } = storeToRefs(joinStore);

const { isLoggedIn } = useUserInfo();
watch(isLoggedIn, (b) => {
  if (b) goToName('main');
});

const {
  meta,
  values: form,
  handleSubmit,
} = useForm<NicknameJoinForm>({
  validationSchema: toTypedSchema(NicknameJoinSchema),
});

const onSubmit = handleSubmit(() => {
  if (!joinData.value) return;
  joinData.value.nickname = form.nickname;
  goToName('join-avatar');
});
</script>

<template>
  <q-page class="px-6 bg-white">
    <div class="pt-10 text-h2 font-semibold text-[24px]">
      <p>사용하실</p>
      <p>닉네임을 알려주세요</p>
    </div>

    <form>
      <c-field label="닉네임" class="mt-8">
        <c-input
          name="nickname"
          placeholder="닉네임을 입력해 주세요"
          :maxlength="10"
          autofocus
          check-badwords
          :outlined="false"
          :rounded="false"
          border-radius="0px"
        />
      </c-field>
    </form>
    <section class="fixed inset-x-0 bottom-0 p-3">
      <div class="flex justify-center items-center" style="padding-inline: 1%">
        <button
          type="button"
          class="text-center text-white font-medium rounded-md w-full h-[64px] max-w-[512px]"
          :class="{
            'bg-primary': meta.valid,
            'bg-grey-2': !meta.valid,
          }"
          :disabled="!meta.valid"
          @click="onSubmit"
        >
          다음
        </button>
      </div>
    </section>
  </q-page>
</template>

<style lang="scss" scoped></style>
