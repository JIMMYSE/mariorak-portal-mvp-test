<script lang="ts" setup>
import { barStyle, thumbStyle } from 'src/utils/style-variable';
type Props = {
  toList?: string;
  mList: any;
};
const props = defineProps<Props>();

const goToListPage = () => {
  goToName('recruit-detail', { active: 'maker' });
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
    <div>
      <q-scroll-area style="height: 185px" :bar-style="barStyle" :thumb-style="thumbStyle">
        <div class="row no-wrap pl-6">
          <q-card
            class="maker-card q-mr-md shadow-1 rounded-xl cursor-pointer"
            @click="goTo(`/recruit/profile/${m.mem_id}`)"
            v-for="m in mList"
            :key="m.created_at"
          >
            <q-card-section>
              <div class="row items-center">
                <q-img class="w-14 h-14 rounded-full" :src="m.circle_file.convert_addr" />
                <div class="font-semibold ml-2 q-gutter-y-[5px] col">
                  <p class="text-[#222222] leading-snug">{{ m.nickname }}</p>
                  <p class="text-primary text-xs p ellipsis">
                    {{ getCommonCodeName('MKR_ROL', m.mkr_rol_cd) }}
                    <!-- {{ m.prfl.job_objs?.flatMap((rol: any) => rol).join(' / ') }} -->
                  </p>
                  <div class="row font-normal align-middle flex items-center">
                    <p class="text-[#767676] text-xs">{{ m.expr_year }}년차</p>
                    <p class="h-[8px] w-0 border-r-[1px] border-[#b5b5b5] mx-[5px]"></p>
                    <p class="w-20 text-[#b5b5b5] text-xs">프로젝트 {{ m.prj_num }}회</p>
                  </div>
                </div>
              </div>
              <div class="row items-center mt-[14px]">
                <div class="px-1.5 py-0.5 bg-primary rounded justify-center items-center">
                  <p class="text-white text-[10px] font-medium leading-[14px]">Skill</p>
                </div>
                <p class="text-[#222222] text-xs ellipsis col ml-1">
                  {{ m.prfl.skills?.flatMap((skill: any) => skill).join(' , ') }}
                </p>
              </div>
              <p class="] text-grey-3 text-xs mt-[9px]">
                {{ m.desc }}
              </p>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
    <!-- TODO 앱 심사 히든처리 -->
    <div class="text-center mt-[55px]">
      <c-btn
        @click="goToListPage()"
        class="enter_btn rounded-[30px] text-[#056bf1] font-semibold text-sm py-3 pl-10 pr-[30px]"
        outline
        >전체 목록 보기
        <c-icon name="icon_enter_arrow" size="14px" :color="'#056BF1'" :fill="false" />
      </c-btn>
    </div>
  </div>
</template>
<style scoped>
.maker-card {
  width: 260px;
  height: 173px;
  overflow: hidden;
}

.maker-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.maker-info {
  color: white;
}
</style>
