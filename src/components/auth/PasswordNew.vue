<!-- 공통 > 새 비밀번호 설정 -->

<script setup lang="ts">
const emits = defineEmits(['onComplete']);

const { encodeByAES256 } = useCryptoJS();

const {
  meta,
  errors,
  errorBag,
  values: form,
  handleSubmit,
} = useForm({
  validationSchema: toTypedSchema(NewPasswordFormSchema),
});

// 비밀번호 변경 완료 여부
const isCompleted = defineModel<boolean>('isCompleted');

const onSubmit = handleSubmit(async () => {
  isCompleted.value = await updateMyPassword(
    encodeByAES256(form.new_password!)
  );
  if (isCompleted.value) {
    useNotifyDone('message.passwordUpdated');
    emits('onComplete', true);
  }
});
</script>

<template>
  <section class="pt-[40px]">
    <div class="flex-none">
      <p class="text-[17px] leading-relaxed">
        비밀번호 변경을 위한
        <br />
        <span class="text-primary">새 비밀번호</span>를 입력해 주세요.
      </p>
    </div>
    <form>
      <a-field label="비밀번호" class="mt-[30px]">
        <a-input
          type="password"
          name="new_password"
          :maxlength="16"
          placeholder="영문 대소문자, 숫자포함 최소 10자리"
          :done="!errorBag.new_password && form.new_password!.length >= 10"
          :clearable="false"
          autofocus
        />
      </a-field>
      <a-field label="비밀번호 확인">
        <a-input
          type="password"
          name="passwordConfirm"
          :maxlength="16"
          placeholder="비밀번호 확인"
          :done="!errorBag.passwordConfirm && form.passwordConfirm!.length >= 10"
          :clearable="false"
        />
      </a-field>

      <div class="absolute bottom-0 bg-primary w-full h-[64px] left-0">
        <a-btn
          type="submit"
          class="text-center text-white font-base font-medium size-full flex justify-center items-center"
          :label="$t('label.complete')"
          @click="onSubmit"
        >
        </a-btn>
      </div>
    </form>
  </section>
</template>
