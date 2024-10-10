<script lang="ts" setup>
interface ListItem {
  label: string;
  name: string;
}

const infoItems = ref<ListItem[]>([
  { label: '계정 정보 관리', name: 'account-manage' },
  { label: '개인 프로필 관리', name: 'user-profile-manage' },
  { label: '개발자 프로필 관리', name: 'maker-profile-manage' },
]);
const activityItems = ref<ListItem[]>([
  // { label: '나의 프로젝트 내역', name: '' },
  // { label: '나의 서포트 내역', name: '' },
  { label: '나의 활동 내역', name: 'activity-manage' },
]);
const csItems = ref<ListItem[]>([{ label: '1:1 문의하기', name: '' }]);

const goToPage = (name: string) => {
  goToName(name);
};

const { data } = getMyDetail();

const isLocal = process.env.IS_LOCAL;
const isDev = process.env.IS_DEV;
const { enterRoom } = useBridge();
</script>
<template>
  <q-page>
    <section class="px-6 pt-8">
      <div class="flex flex-col">
        <div class="flex items-center">
          <div>
            <c-img
              :src="data?.data?.user.avatar.circle_file.url"
              :alt="data?.data?.user.avatar.circle_file.id?.toString()"
              class="w-[60px] h-[60px] rounded-full"
            >
            </c-img>
          </div>

          <div class="flex flex-col ml-[12px]">
            <p class="text-[#222222] text-base font-medium leading-snug">
              {{ data?.data?.user.nickname }}
              <!-- <span>
                <q-icon name="img:/icons/icon_edit.svg" size="20px"></q-icon>
              </span> -->
            </p>
            <p class="text-[#056bf1] text-xs font-semibold leading-none mt-[2px]">
              {{ getCommonCodeName('MKR_ROL', data?.data?.user.maker?.mkr_rol_cd) }}
            </p>
          </div>
        </div>
      </div>
      <div class="mt-[23px]">
        <div class="rounded-[10px] bg-[#056bf1]/5 h-[50px] flex justify-between items-center px-[20px]">
          <p class="text-[#056bf1] text-sm font-semibold leading-tight">
            <q-icon name="img:/icons/icon_point.svg" size="28px" class="mr-1"></q-icon>
            포인트
          </p>
          <p class="text-[#056bf1] text-lg font-semibold leading-tight">{{ data?.data?.user.sav_pint }}P</p>
        </div>
      </div>
    </section>
    <hr class="h-2.5 bg-[#f7f7f7] mt-8" />
    <section class="px-6 mt-[28px]">
      <p class="text-[#767676] text-sm font-medium leading-none pl-[10px]">정보 관리</p>
      <div class="mt-[8px]">
        <q-list bordered class="rounded-[10px] border-[#f0f0f0]">
          <q-item
            v-for="item in infoItems"
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
          <q-item
            v-if="isLocal || isDev"
            class="py-[20px] px-[24px] border-b-[1px] border-[#f0f0f0] last:border-0"
            @click="enterRoom(77, 1)"
            clickable
          >
            <q-item-section>
              <q-item-label class="text-[#056bf1] text-base font-medium leading-tight">컨퍼런스 입장</q-item-label>
            </q-item-section>
            <q-item-section side>
              <c-icon name="icon_enter_arrow" color="#056bf1" size="16px" :fill="false"></c-icon>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </section>
    <section class="px-6 mt-[28px]">
      <p class="text-[#767676] text-sm font-medium leading-none pl-[10px]">활동 관리</p>
      <div class="mt-[8px]">
        <q-list bordered class="rounded-[10px] border-[#f0f0f0]">
          <q-item
            v-for="item in activityItems"
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
    <section class="px-6 mt-[28px]">
      <p class="text-[#767676] text-sm font-medium leading-none pl-[10px]">고객 센터</p>
      <div class="mt-[8px]">
        <q-list bordered class="rounded-[10px] border-[#f0f0f0]">
          <q-item
            v-for="item in csItems"
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
