<!-- 필수 공지사항 다이얼로그 -->
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup';
import { useRoute } from 'vue-router';

//FIXME: implement get user id from route
const route = useRoute();

const emit = defineEmits(['ok']);

const {
  values: form,
  errorBag,
  meta: formMeta,
  handleSubmit,
} = useForm<>({
  validationSchema: toTypedSchema(),
  initialValues: {
    currentPassword: '',
    password: '',
    passwordConfirm: '',
  },
});

const onSubmit = handleSubmit(async () => {
  emit('ok');
});
</script>

<template>
  <q-card>
    <article class="min-w-80 max-w-screen-sm px-8">
      <!-- 다이얼로그 내용 -->
    </article>
  </q-card>
</template>
