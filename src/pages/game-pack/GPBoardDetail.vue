<script lang="ts" setup>
import { comment } from 'postcss';

const route = useRoute();
const postId = ref(route.params.boardId);
const prjId = ref(route.params.id);

const { data: postDetailData } = usePostDetail({ postId: postId, prjId: prjId, category: 'gp' });
const { options } = useCommonCode('POST_TY');
const postType = computed(
  () => options.value.find((item: Option) => item.value === postDetailData.value?.post_ty_cd)?.label
);
const onClickPost = (id: number | null | undefined) => {
  if (!id) return;
  replaceTo(`/game-pack/board/${prjId.value}/${id}`);
};

// 댓글 목록

const { request } = useSearchFilter({
  requestDefault: {
    from: 0,
    size: null,
    sort: [
      {
        created_at: 'asc',
      },
    ],
  },
});

const {
  values: form,
  setFieldValue,
  resetField,
} = useForm<SearchRequest>({
  validationSchema: toTypedSchema(SearchRequestSchema),
  initialValues: request,
});

const queryParam = ref(form);

const { data: commentList, refetch } = usePostCommentList({
  postId: postId,
  searchRequest: queryParam,
  queryOption: {
    enabled: true,
  },
});

// 댓글 등록

const newCommnet = ref('');
const onRegisterCommnet = () => {
  useCreateComment(postId.value, newCommnet.value);
  refetch();
  newCommnet.value = '';
};
</script>
<template>
  <section class="px-6">
    <div class="py-[16px] border-b border-[#f0f0f0]">
      <div class="flex justify-between items-end">
        <div>
          <p class="text-[#222222] text-base font-medium leading-snug">[{{ postType }}] {{ postDetailData?.title }}</p>
          <p class="text-[#767676] text-sm font-normal leading-tight">
            {{ formatDate(postDetailData?.created_at) }} {{ postDetailData?.mem_nickname }}
          </p>
        </div>
        <div>
          <q-icon name="img:/icons/icon_comment.svg" size="20px" />
          <span class="text-[#767676] text-sm font-normal leading-tight">{{ postDetailData?.cmmt_cnt }}</span>
        </div>
      </div>
    </div>
  </section>
  <section class="px-6 min-h-80">
    <!-- <div class="mt-8 text-[#767676] text-sm font-normal leading-tight" v-html="filterHtml(data)"></div> -->
    <div class="mt-8 text-[#767676] text-sm font-normal leading-tight">{{ postDetailData?.cont }}</div>
    <div v-for="file in postDetailData?.attch_files" :key="file.id" class="my-4">
      <c-img :src="file.origin_addr" style="max-width: 100%; max-height: 300px" fit="contain" />
    </div>
  </section>

  <section>
    <div class="flex justify-between">
      <c-btn
        class="enter_btn rounded-[30px] font-semibold text-base"
        flat
        color="grey-3"
        :disabled="!postDetailData?.prev_post_id"
        @click="onClickPost(postDetailData?.prev_post_id)"
        ><c-icon name="icon_preview_arrow" size="16px" :color="'#767676'" :fill="false" />이전글
      </c-btn>
      <c-btn
        class="enter_btn rounded-[30px] font-semibold text-base"
        flat
        :disabled="!postDetailData?.next_post_id"
        @click="onClickPost(postDetailData?.next_post_id)"
        >다음글<c-icon name="icon_enter_arrow" size="16px" :color="'#056bf1'" :fill="false" />
      </c-btn>
    </div>
  </section>
  <hr class="h-2.5 bg-[#f7f7f7] mt-4" />
  <section class="px-6 mt-[30px] pb-[50px]">
    <p class="text-[#222222] text-lg font-semibold leading-[25.20px]">댓글 ({{ commentList?.count }})</p>
    <div class="py-[14px] border-b border-[#f0f0f0]" v-for="commnet in commentList?.rows" :key="commnet.post_cmmt_id">
      <div class="flex justify-between items-center">
        <p class="text-[#767676] text-xs font-medium leading-none">
          {{ formatDate(commnet?.created_at) }} {{ commnet?.mem_nickname }}
        </p>
        <c-btn class="p-0 font-semibold text-base" flat><c-icon name="icon_delete" size="20px" :fill="false" /></c-btn>
      </div>
      <p class="text-[#222222] text-sm font-normal leading-tight">{{ commnet?.cont }}</p>
      <c-btn class="font-normal text-xs leading-none p-0 mt-[2px]" color="grey-2" flat>답글쓰기 </c-btn>
    </div>
  </section>
  <q-footer class="py-[19px] px-[16px] fixed bottom-0 w-full bg-[#fff]" elevated>
    <div class="bg-[#f7f7f7] rounded-[5px] pr-[10px]">
      <div class="row no-wrap items-center">
        <c-input
          placeholder="댓글을 남겨주세요."
          v-model="newCommnet"
          :outlined="false"
          :rounded="false"
          class="col comment_input"
          hide-bottom-space
        >
        </c-input>

        <c-btn class="p-0" flat @click="onRegisterCommnet"><c-icon name="icon_send" size="28px" :fill="false" /></c-btn>
      </div>
    </div>
  </q-footer>
</template>
<style lang="scss">
.comment_input {
  .q-field__control {
    background-color: #f7f7f7 !important;
    padding: 0 0 0 15px;

    &::before {
      border: none;
    }

    input::placeholder {
      line-height: 19.6px;
      font-size: 14px;
      color: #767676;
    }
  }
}
</style>
