<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { useMyConfirmDialog } from 'src/composables/common/dialog';
import { reactive } from 'vue';
import FavoriteAddPage from 'pages/home/trainee/FavoriteAddPage.vue';

const data = reactive([
  {
    id: 1,
    title: '장교교육대대',
    isOpened: false,
  },
  {
    id: 2,
    title: '부사관교육대대',
  },
  {
    id: 3,
    title: '신병 1대대',
  },
  {
    id: 4,
    title: '신병 2대대',
  },
  {
    id: 5,
    title: '신병 3대대',
  },
  {
    id: 6,
    title: '신병 4대대',
  },
]);
const $q = useQuasar();
function addFavorite() {
  console.log('addFavorite');
  useMyConfirmDialog({
    title: '즐겨찾기 등록',
    text: '등록하시겠습니까?',
  }).onOk(() => {
    console.log('confirm');
    $q.dialog({
      component: FavoriteAddPage,
      componentProps: { battalion: '신병 1대대', division: '53기' },
    });
  });
}
</script>
<template>
  <q-page>
    <q-list>
      <q-expansion-item
        group="group1"
        v-for="item in data"
        :key="item.id"
        :label="item.title"
        class="bg-white"
        header-class="text-black text-[15px] font-medium border-b border-b-[#E6E6E6] "
      >
        <q-expansion-item
          expand-separator
          label="학군사관 후보생"
          default-opened
          header-class="bg-grey font-pretendard font-medium pl-11"
        >
          <q-list class="pl-12 font-pretendard">
            <q-item>
              <q-item-section> 제 52기 </q-item-section>
              <q-item-section side>
                <a-btn-icon
                  icon="img:/src/assets/icons/icon_heart2.svg"
                  size="30px"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section> 제 53기 </q-item-section>
              <q-item-section side>
                <a-btn-icon
                  icon="img:/src/assets/icons/icon_heart2_d.svg"
                  size="30px"
                  @click="addFavorite"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          label="학사사관 후보생"
          header-class="bg-grey font-pretendard pl-11"
        >
          <q-list class="pl-12">
            <q-item>
              <q-item-section> 제 52기 </q-item-section>
              <q-item-section side>
                <a-btn-icon
                  icon="img:/src/assets/icons/icon_heart2.svg"
                  size="30px"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section> 제 53기 </q-item-section>
              <q-item-section side>
                <a-btn-icon
                  icon="img:/src/assets/icons/icon_heart2_d.svg"
                  size="30px"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <!-- LINE -->
        <!-- <div -->
        <!--   class="absolute inset-x-6 bottom-0 w-full h-px border-b border-b-[#E6E6E6]" -->
        <!-- ></div> -->
      </q-expansion-item>
    </q-list>
  </q-page>
</template>
