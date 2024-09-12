<script lang="ts" setup>
import { barStyle, thumbStyle } from 'src/utils/style-variable';
type Props = {
  toList?: string;
  pList: any;
};
const props = defineProps<Props>();

const goToListPage = () => {
  goToName('recruit-detail');
};
const recruitMakeRolList = (rolList: any) => {
  const rolNameList = rolList.map((rol: any) => {
    return rol.name;
  });
  return rolNameList.join('/');
};
</script>

<template>
  <div>
    <div class="pl-6">
      <q-scroll-area style="height: 300px" :bar-style="barStyle" :thumb-style="thumbStyle">
        <div class="row no-wrap">
          <div
            class="project-card q-mr-md cursor-pointer"
            v-for="p in pList"
            :key="p.created_at"
            @click="goTo(`/recruit/project/${p.prj_rcrt_id}`)"
          >
            <div class="relative">
              <div class="absolute z-10 top-2 left-3">
                <div class="bg-[#d8e5f8] image_badge">
                  <p class="text-[#056bf1] text-sm font-medium font-['Pretendard'] leading-tight">
                    D-{{ p.end_remain_days }}
                  </p>
                </div>
                <div class="bg-primary image_badge q-mt-xs" v-if="p.rcrt_mkr_num > 0">
                  <p class="text-white text-sm font-medium leading-tight vertical-middle">
                    {{ p.rcrt_mkr_num }}명 모집중
                  </p>
                </div>
              </div>
              <c-img :src="p.thmn_file.convert_addr" width="100%" class="rounded-xl game-image" />
            </div>
            <div class="game-info q-mt-sm">
              <div class="text-caption q-mb-xs">
                <span class="badge font-medium" v-for="badge in p.tag_list" :key="badge">{{ badge }}</span>
              </div>
              <card-info :title="p.title" :desc="p.desc" :height="'78px'" />
              <div class="flex row items-center mt-[8px]">
                <q-icon name="img:/icons/icon_profile_fill.svg" size="16px" />
                <p class="text-primary text-xs leading-none ellipsis col ml-1">
                  {{ recruitMakeRolList(p.rcrt_mkr_rol_list) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
    <div class="text-center mt-[55px]">
      <c-btn
        @click="goToListPage()"
        class="enter_btn rounded-[30px] text-[#056bf1] font-semibold text-sm py-3 pl-10 pr-[30px]"
        outline
        >모집 중인 프로젝트 더보기
        <c-icon name="icon_enter_arrow" size="14px" :color="'#056BF1'" :fill="false" />
      </c-btn>
    </div>
  </div>
</template>
<style scoped>
.project-card {
  width: 246px;
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
.image_badge {
  height: 24px;
  width: fit-content;
  padding: 3px 8px 2px 8px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
}
</style>
