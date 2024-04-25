<!-- 메인페이지 -->

<script setup lang="ts">
import { metaverseList } from 'src/assets/data/dummyData';
import MainCard from 'src/components/main/MainCard.vue';
import MenuCard from 'src/components/main/MenuCard.vue';
import MenuItem from 'src/components/main/MenuItem.vue';
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
const socialList = [
  { name: 'facebook', url: 'https://www.facebook.com/rokairforce' },
  { name: 'youtube', url: 'https://www.youtube.com/user/rokafplay' },
  { name: 'instagram', url: 'https://www.instagram.com/rokaf_official/' },
  { name: 'tstory', url: 'https://afplay.tistory.com/' },
];
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
        <menu-card
          :to="{ name: 'recruit-info' }"
          title="모병안내"
          subtitle="입대"
          icon="airplane"
        />
        <menu-card
          :to="{ name: 'ready-enlist' }"
          title="입영 준비사항"
          subtitle="입대"
          icon="briefcase"
        />
        <menu-card
          :to="{ name: 'enlist-event' }"
          title="입영행사 안내"
          subtitle="입대"
          icon="mic"
        />
        <menu-card
          :to="{ name: 'commission-event' }"
          title="임관식 안내"
          subtitle="입대"
          icon="soldier-1"
        />
        <menu-card
          :to="{ name: 'graduation-event' }"
          title="수료식 안내"
          subtitle="입대"
          icon="certificate"
        />
        <menu-card
          :to="{ name: 'faq' }"
          title="자주 묻는 질문"
          subtitle="입대"
          icon="bulb"
        />

        <menu-card
          :to="{ name: 'way-to-come' }"
          class="col-span-3 !h-[100px]"
          title="찾아오는 법"
          subtitle="입대"
          icon="search"
        />
      </div>
    </section>

    <!-- 훈련병 관련사항 -->
    <section class="px-6 mt-10">
      <h2 class="text-h3 px-1">훈련병 관련사항</h2>
      <div class="grid grid-cols-3 gap-1.5 mt-4">
        <menu-card
          :to="{ name: 'photo-album' }"
          title="사진보기"
          subtitle="훈련병"
          icon="camera"
        />
        <menu-card
          :to="{ name: 'sent-mailbox' }"
          title="편지쓰기"
          subtitle="훈련병"
          icon="post"
        />
        <menu-card
          :to="{ name: 'sent-mailbox' }"
          title="소대 즐겨 찾기"
          subtitle="훈련병"
          icon="star"
        />
      </div>
    </section>

    <!-- 공군 생활 체험 -->
    <section class="px-6 mt-[55px]">
      <h2 class="text-h3 pl-1">공군 생활 체험</h2>
      <q-list class="flex flex-col gap-[35px] mt-3">
        <menu-item
          v-for="item in roomList"
          :key="item.id"
          :title="item.title"
          :subtitle="item.subtitle"
          :tag="item.tag"
          :image="item.img_url"
          :to="{ name: 'metaverse-detail', params: { id: item.id } }"
        />
      </q-list>
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
          <a-btn-icon
            v-for="item in socialList"
            :key="item.name"
            :icon="`img:/src/assets/images/main/${item.name}.png`"
            size="27px"
            :href="item.url"
            target="_blank"
          />
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
