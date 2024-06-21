<!-- 훈련병 > 즐겨찾기 > 등록 > 부대 선택 -->

<script lang="ts" setup>
import BookmarkEditDialog from './BookmarkEditDialog.vue';

// 교육대대 공통코드
const { options: battalionOptions } = useCommonCode('EDUCATIONAL_BATTALION');

// 즐겨찾기 목록 조회
const { data: bookmarkListData } = useBookmarkList();
const bookmarkedClassIdList = computed(() =>
  bookmarkListData.value?.rows.map((row) => row.educational_battalion_id)
);

// 기수 목록 조회
const { request } = useSearchFilter({
  requestDefault: {
    sort: [
      {
        educational_battalion_cd: 'asc',
        display_seq: 'asc',
      },
    ],
  },
});
const { data: listData } = useBookmarkClassList({
  searchRequest: request,
});

const $q = useQuasar();
function addBookmark(battalionName: string, item: any) {
  useMyConfirmDialog({
    text: 'message.bookmark.addConfirm',
  }).onOk(() => {
    $q.dialog({
      component: BookmarkEditDialog,
      componentProps: {
        id: item.id,
        battalionName,
        className: item.class_name,
      },
    }).onOk(() => {
      goToName('trainee-bookmark-list');
    });
  });
}
</script>

<template>
  <q-page>
    <q-list>
      <q-expansion-item
        v-for="category in battalionOptions"
        :key="category.id"
        class="bg-white"
        header-class="text-black text-[15px] font-medium border-b border-b-[#E6E6E6] "
        group="group1"
        :label="category.label"
      >
        <q-list class="pl-6 font-pretendard">
          <q-item
            v-for="item in listData?.rows.filter(
              (row : any) => row.educational_battalion_cd === category.value
            )"
            :key="item.id"
          >
            <q-item-section>{{ item.class_name }}</q-item-section>
            <q-item-section side>
              <a-btn-icon
                :icon="`img:/src/assets/icons/icon_heart2${
                  bookmarkedClassIdList?.includes(item.id) ? '' : '_d'
                }.svg`"
                size="30px"
                @click="addBookmark(category.label, item)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>
