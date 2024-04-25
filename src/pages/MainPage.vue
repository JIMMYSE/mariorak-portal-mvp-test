<!-- 메인페이지 -->

<script setup lang="ts">
import { metaverseList } from 'src/assets/data/dummyData';
import MainCard from 'src/components/main/MainCard.vue';
import { useConfirmDialog } from 'src/composables/common/dialog';
import { useBridge } from 'src/composables/common/useBridge';
import { ref } from 'vue';
const slide = ref(1);
const slides = ref(
  Array(3)
    .fill(0)
    .map((_, i) => i + 1)
);

const { enterRoom } = useBridge();
function enterMetaverse(roomId: number = 1) {
  const mapName = '{맵이름}';
  // user
  useConfirmDialog({
    text: { key: 'metaverse.enter.confirm.text', data: { mapName } },
    okLabel: 'label.yes',
    cancelLabel: 'label.no',
  }).onOk(() => {
    enterRoom(roomId);
  });
}

const roomList = ref(metaverseList.rows.filter(({ page }) => page === 'main'));
</script>

<template>
  <q-page class="column bg-grey">
    <!-- 맵 바로가기 영역 -->
    <a-carousel
      class="bg-transparent"
      control-color-active="#196af5"
      v-model="slide"
      height="438px"
      keep-alive
    >
      <q-carousel-slide
        v-for="item in slides"
        :key="item"
        :name="item"
        class="p-0 h-[460px]"
      >
        <main-card @enter="enterMetaverse(item)" />
      </q-carousel-slide>
    </a-carousel>

    <!-- 공군입대에 대해 궁금하다면 -->
    <section class="px-6 mt-10">
      <h2 class="text-h3 px-1">공군 입대 안내사항</h2>
      <div class="grid grid-col-3 gap-1.5 mt-4">
        <router-link
          :to="{ name: 'recruit-info' }"
          class="bg-white h-[120px] pt-[11px] pl-[10px] rounded-[5px] min-w-[105px]"
        >
          <div
            class="bg-[url('./src/assets/icons/airplane.svg')] bg-right-bottom bg-no-repeat size-full"
          >
            <p class="text-xs font-pretendard text-primary leading-[14px]">
              입대
            </p>
            <p
              class="mt-[3px] text-[13px] font-rokaf font-medium text-[#000] leading-[17px]"
            >
              모병안내
            </p>
          </div>
        </router-link>
        <router-link
          :to="{ name: 'ready-enlist' }"
          class="bg-white h-[120px] pt-[11px] pl-[10px] rounded-[5px] min-w-[105px]"
        >
          <div
            class="bg-[url('./src/assets/icons/briefcase.svg')] bg-right-bottom bg-no-repeat size-full"
          >
            <p class="text-xs font-pretendard text-primary">입대</p>
            <p class="text-[13px] font-rokaf text-[#000] font-medium">
              입영 준비사항
            </p>
          </div>
        </router-link>
        <router-link
          :to="{ name: 'enlist-event' }"
          class="bg-white h-[120px] pt-[11px] pl-[10px] rounded-[5px] min-w-[105px]"
        >
          <div
            class="bg-[url('./src/assets/icons/mic.svg')] bg-right-bottom bg-no-repeat size-full"
          >
            <p class="text-xs font-pretendard text-primary">입대</p>
            <p class="text-[13px] font-rokaf text-[#000] font-medium">
              입영행사 안내
            </p>
          </div>
        </router-link>
        <router-link
          :to="{ name: 'commission-event' }"
          class="bg-white h-[120px] pt-[11px] pl-[10px] rounded-[5px]"
        >
          <div
            class="bg-[url('./src/assets/icons/soldier-1.svg')] bg-right-bottom bg-no-repeat size-full"
          >
            <p class="text-xs font-pretendard text-primary">입대</p>
            <p class="text-[13px] font-rokaf text-[#000] font-medium">
              임관식 안내
            </p>
          </div>
        </router-link>
        <router-link
          :to="{ name: 'graduation-event' }"
          class="bg-white h-[120px] pt-[11px] pl-[10px] rounded-[5px]"
        >
          <div
            class="bg-[url('./src/assets/icons/certificate.svg')] bg-right-bottom bg-no-repeat size-full"
          >
            <p class="text-xs font-pretendard text-primary">입대</p>
            <p class="text-[13px] font-rokaf text-[#000] font-medium">
              수료식 안내
            </p>
          </div>
        </router-link>
        <router-link
          :to="{ name: 'faq' }"
          class="bg-white h-[120px] pt-[11px] pl-[10px] rounded-[5px]"
        >
          <div
            class="bg-[url('./src/assets/icons/bulb.png')] bg-right-bottom bg-cover bg-no-repeat size-full"
          >
            <p class="text-xs font-pretendard text-primary">입대</p>
            <p class="text-[13px] font-rokaf text-[#000] font-medium">
              자주 묻는 질문
            </p>
          </div>
        </router-link>
        <router-link
          :to="{ name: 'way-to-come' }"
          class="col-span-3 bg-white h-[100px] pt-[11px] pl-[10px] rounded-[5px]"
        >
          <div
            class="bg-[url('./src/assets/icons/lacation.svg')] bg-right-bottom bg-cover bg-no-repeat size-full"
          >
            <p class="text-xs font-pretendard text-primary">입대</p>
            <p class="text-[13px] font-rokaf text-[#000] font-medium">
              찾아오는 법
            </p>
            <p class="text-grey-4 text-xs font-pretendard">
              공군 기지의 위치를 안내해드릴게요.
            </p>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 훈련병 관련사항 -->
    <section class="px-6 mt-10">
      <h2 class="text-h3 px-1">훈련병 관련사항</h2>
      <div class="grid grid-cols-3 gap-1.5 mt-4">
        <router-link
          :to="{ name: 'photo-album' }"
          class="bg-white h-[120px] pt-[11px] pl-[10px] rounded-[5px] min-w-[105px]"
        >
          <div
            class="bg-[url('./src/assets/icons/camera.svg')] bg-right-bottom bg-no-repeat size-full"
          >
            <p class="text-xs font-pretendard text-primary leading-[14px]">
              훈련병
            </p>
            <p
              class="mt-[3px] text-[13px] font-rokaf font-medium text-[#000] leading-[17px]"
            >
              사진보기
            </p>
          </div>
        </router-link>
        <router-link
          :to="{ name: 'sent-mailbox' }"
          class="bg-white h-[120px] pt-[11px] pl-[10px] rounded-[5px] min-w-[105px]"
        >
          <div
            class="bg-[url('./src/assets/icons/post.svg')] bg-right-bottom bg-no-repeat size-full"
          >
            <p class="text-xs font-pretendard text-primary">훈련병</p>
            <p class="text-[13px] font-rokaf text-[#000] font-medium">
              편지쓰기
            </p>
          </div>
        </router-link>
        <div
          class="bg-white h-[120px] pt-[11px] pl-[10px] rounded-[5px] min-w-[105px]"
        >
          <div
            class="bg-[url('./src/assets/icons/star.svg')] bg-right-bottom bg-no-repeat size-full"
          >
            <p class="text-xs font-pretendard text-primary">훈련병</p>
            <p class="text-[13px] font-rokaf text-[#000] font-medium">
              소대 즐겨 찾기
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 공군 생활 체험 -->
    <section class="px-6 mt-[55px]">
      <h2 class="text-h3 pl-1">공군 생활 체험</h2>
      <router-link
        v-for="item in roomList"
        :key="item.id"
        :to="{
          name: 'metaverse-detail',
          params: { id: item.id },
        }"
        class="mt-3 flex"
      >
        <div>
          <img :src="item.img_url" :alt="item.title" class="w-[130px]" />
        </div>
        <div class="flex-1 ml-[14px]">
          <div class="flex">
            <a-tag>{{ item.tag }}</a-tag>
            <p class="font-rokaf text-[13px] leading-5 ml-[5px]">
              {{ item.title }}
            </p>
          </div>
          <p
            class="font-pretendard text-xs text-grey-4 leading-[19px] mt-[7px]"
          >
            {{ item.subtitle }}
          </p>
          <p
            class="font-pretendard text-xs text-grey-3 leading-[16px] mt-[12px] flex items-center"
          >
            더보기
            <q-icon name="img:/src/assets/icons/arrow.svg" size="16px" />
          </p>
        </div>
      </router-link>
    </section>

    <!-- footer -->
    <footer
      class="w-full h-[305px] bg-[#222] bottom-0 mt-[125px] min-w-[375px]"
    >
      <div class="pt-[30px] px-6">
        <p
          class="text-grey-1 font-pretendard text-xs underline underline-offset-2"
        >
          이용 약관
        </p>
        <p
          class="mt-2 text-grey-1 font-pretendard text-xs underline underline-offset-2"
        >
          개인정보 처리방침
        </p>
        <p class="text-grey-3 font-pretendard text-xs leading-[17px] mt-[18px]">
          민원안내 : 042-552-7945 | 군부대 전화번호 안내 : 042-52-0114
          copyright(c) Republic of Korea Airforce. All Right Reserved
        </p>
        <div class="group-icon flex mt-[33px] gap-5 justify-center">
          <q-icon
            name="img:/src/assets/icons/facebook.svg"
            size="27px"
          ></q-icon>
          <q-icon name="img:/src/assets/icons/youtube.svg" size="27px"></q-icon>
          <q-icon
            name="img:/src/assets/icons/instagram.png"
            size="27px"
          ></q-icon>
          <q-icon name="img:/src/assets/icons/tstory.svg" size="27px"></q-icon>
        </div>
        <div class="flex justify-center">
          <q-icon
            name="img:/src/assets/icons/icon_footer.svg"
            size="102px"
          ></q-icon>
        </div>
      </div>
    </footer>
  </q-page>
</template>

<style lang="scss" scoped></style>
