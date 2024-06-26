<!-- 공통 > 현재 비밀번호 확인 -->

<script setup lang="ts">
const emits = defineEmits(['onConfirmed']);

// 현재 비밀번호 확인 여부
const isConfirmed = defineModel<boolean>('isConfirmed');

const { encodeByAES256 } = useCryptoJS();

const {
  meta,
  errors,
  errorBag,
  values: form,
  handleSubmit,
} = useForm({
  validationSchema: toTypedSchema(
    object({
      password: PasswordSchema,
    })
  ),
});

const onSubmit = handleSubmit(async () => {
  const b = await confirmMyPassword(encodeByAES256(form.password!));
  isConfirmed.value = b;
  if (b) {
    emits('onConfirmed', true);
  } else {
    useAlertDialog({
      text: 'auth.password.mismatch',
    });
  }
});
</script>

<template>
  <section class="pt-[40px]">
    <div class="flex-none">
      <p class="text-[17px] leading-relaxed">
        <span class="text-primary">현재 비밀번호</span>를 입력해 주세요.
      </p>
    </div>
    <form>
      <a-field label="비밀번호" class="mt-[30px]">
        <a-input
          type="password"
          name="password"
          :maxlength="16"
          placeholder="현재 비밀번호"
          :done="!errorBag.password && form.password!.length >= 10"
          :clearable="false"
          autofocus
          autocomplete
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
