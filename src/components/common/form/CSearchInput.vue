<!-- 공통 Search Input -->

<script setup lang="ts">
import { useForwardProps } from 'radix-vue';

type Model = string | number | null | undefined;
interface inputType {
  name?: string;
  modelValue?: Model;
}

interface Props extends inputType {
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
});

const forwarded = useForwardProps(props);
const model = defineModel<Model>({
  required: false,
  default: '',
});

let field: FieldContext<Model> | null = null;
if (props.name) {
  field = useField<Model>(() => props.name);
  const { value: fieldValue } = field;
  watch(
    fieldValue,
    (value) => {
      if (value !== model.value) model.value = value;
    },
    { immediate: true }
  );
  watch(model, (value) => {
    if (value !== fieldValue.value) fieldValue.value = value;
  });
}

const inputEl = ref<null | HTMLInputElement>(null);

defineExpose({
  focus() {
    inputEl.value?.focus();
  },
});

onMounted(() => {
  // const el = inputEl.value.getNativeElement();
  // console.log(el);
  // el?.addEventListener('input', (e: any) => {
  //   model.value = e.target?.value;
  // });
});

const eventer = (e: Event) => {
  e.target?.addEventListener('input', (e: any) => {
    model.value = e.target?.value;
  });
};
</script>

<template>
  <div class="w-full h-11 bg-[#f7f7f7] rounded-[5px] flex">
    <img src="/icons/icon_search.svg" alt="shadow" />
    <input
      type="text"
      ref="inputEl"
      v-model="model"
      placeholder="검색어를 입력해주세요"
      @input="(e : Event) =>  eventer(e)"
      class="bg-transparent w-full h-full pl-2"
    />
  </div>
</template>

<style scoped lang="scss"></style>
