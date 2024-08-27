<script lang="ts" setup>
const like = ref(false);

const onLikeProject = () => {
  like.value = !like.value;
};
</script>
<template>
  <q-page>
    <section>
      <div class="h-[210px] w-full">
        <q-icon
          name="img:/icons/icon_in_progress.svg"
          size="50px"
          class="absolute z-10 ml-[13px]"
        />
        {{ like }}
        <c-icon
          name="icon_heart_btn"
          size="20px"
          :active="like"
          active-color="#FF0000"
          color="#FFFF00"
          input-class="absolute z-10 mr-[13px]"
          @click="onLikeProject"
        />

        <q-img src="/images/dummy/game_detail_dummy.svg" width="100%" />
      </div>
    </section>
    <section></section>
  </q-page>
</template>
