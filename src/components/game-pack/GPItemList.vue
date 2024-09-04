<script lang="ts" setup>
import { RecommendedGameListType } from 'src/types/gamepack/game-model';
import { RecommendedProjectListType } from 'src/types/gamepack/project-model';

type Props = {
  toList: string;
  gpList: RecommendedGameListType[] | RecommendedProjectListType[] | undefined;
};
const props = defineProps<Props>();

const barStyle = {
  // 스크롤바 안보이게
  opacity: 1,
};

const thumbStyle = {
  // 스크롤바 색상
  backgroundColor: 'transparent',
};

const goToListPage = () => {
  props.toList ? goToName(props.toList) : goToName('game-pack-main');
};
</script>
<template>
  <div>
    <q-scroll-area
      style="height: 300px"
      :bar-style="barStyle"
      :thumb-style="thumbStyle"
    >
      <div class="row no-wrap">
        <div
          class="game-card q-mr-md"
          v-for="gp in props.gpList"
          :key="gp.created_at"
        >
          <c-img
            :src="gp.thmn_file.convert_addr"
            width="100%"
            class="rounded-xl game-image"
          />
          <div class="game-info q-mt-sm">
            <div class="text-caption q-mb-xs mt-[16px]">
              <span
                class="badge font-medium"
                v-for="badge in gp.tag_list"
                :key="badge"
                >{{ badge }}</span
              >
            </div>
            <p
              class="text-[#222222] text-[16px] font-semibold leading-snug mt-[8px]"
            >
              {{ gp.title }}
            </p>
            <p
              class="text-[#696969] text-xs font-normal leading-4 mt-[6px] ellipsis-2-lines"
            >
              {{ gp.desc }}
            </p>
          </div>
        </div>
      </div>
    </q-scroll-area>
    <div class="text-center">
      <c-btn
        @click="goToListPage()"
        class="enter_btn rounded-[30px] text-[#056bf1] font-semibold text-sm py-3 pl-10 pr-[30px]"
        outline
        >전체 목록 보기
        <c-icon
          name="icon_enter_arrow"
          size="14px"
          :color="'#056BF1'"
          :fill="false"
        />
      </c-btn>
    </div>
  </div>
</template>
<style scoped>
.game-card {
  width: 234px;
  overflow: hidden;
}

.game-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.game-info {
  color: white;
}

.badge {
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 5px;
  color: #222;
}
</style>
