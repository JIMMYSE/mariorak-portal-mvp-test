<script lang="ts" setup>
interface ListItem {
  label: string;
  name: string;
}

const items = ref<ListItem[]>([
  { label: '닉네임 변경', name: 'change-nickname' },
  { label: '아바타 변경', name: 'change-avatar' },
]);

const goToPage = (name: string) => {
  goToName(name);
};

const { data } = getMyDetail();
</script>
<template>
  <q-page>
    <section class="px-6 h-[240px]">
      <div class="w-full h-full flex justify-center items-center">
        <div class="flex-col text-center q-gutter-y-md">
          <c-img
            :src="data?.data?.user.avatar.circle_file.url"
            :alt="data?.data?.user.avatar.circle_file.id"
            class="w-[88px] h-[88px] rounded-full"
          >
          </c-img>
          <p class="text-[#222222] text-lg font-semibold leading-snug">
            {{ data?.data?.user.nickname }}
            <!-- <span>
                <q-icon name="img:/icons/icon_edit.svg" size="20px"></q-icon>
              </span> -->
          </p>
          <p class="text-[#056bf1] text-sm font-semibold leading-none mt-[2px]">
            {{ getCommonCodeName('MKR_ROL', data?.data?.user.maker?.mkr_rol_cd) }}
          </p>
        </div>
      </div>
    </section>
    <section class="px-6 mt-[28px]">
      <div class="mt-[8px]">
        <q-list bordered class="rounded-[10px] border-[#f0f0f0]">
          <q-item
            v-for="item in items"
            :key="item.label"
            clickable
            @click="goToPage(item.name)"
            class="py-[20px] px-[24px] border-b-[1px] border-[#f0f0f0] last:border-0"
          >
            <q-item-section>
              <q-item-label class="text-[#222222] text-base font-medium leading-tight">{{ item.label }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <c-icon name="icon_enter_arrow" color="#b5b5b5" size="16px" :fill="false"></c-icon>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </section>
  </q-page>
</template>
