<script lang="ts" setup>
import { DetailFileType } from 'src/types/gamepack/project-model';
import { ref, onMounted } from 'vue';
import { barStyle, thumbStyle } from 'src/utils/style-variable';

type Props = {
  detailFileList?: DetailFileType[];
};
const props = defineProps<Props>();

const currentVideo = ref<DetailFileType>({} as DetailFileType);
const videoPlayer = ref<HTMLVideoElement | null>(null);

const playVideo = (video: DetailFileType) => {
  currentVideo.value = video;
  if (videoPlayer.value) {
    videoPlayer.value.load();
    videoPlayer.value.play();
  }
};

onMounted(() => {
  if (videoPlayer.value) {
    videoPlayer.value.src = currentVideo.value.content_file.convert_addr;
  }
});
</script>

<template>
  <div class="video-player-container">
    <video ref="videoPlayer" controls class="main-video" :key="currentVideo.detail_content_id">
      <source :src="currentVideo.content_file.convert_addr" type="video/mp4" />
      현재 비디오를 지원하지 않습니다.
    </video>
    <q-scroll-area style="height: 120px; max-width: 100%" :bar-style="barStyle" :thumb-style="thumbStyle">
      <div class="row no-wrap">
        <c-img
          v-for="video in detailFileList"
          :key="video.detail_content_id"
          :src="video.thumbnail_file.convert_addr"
          @click="playVideo(video)"
          class="thumbnail cursor-pointer"
          :class="{
            'active-thumbnail': video.detail_content_id === currentVideo.detail_content_id,
          }"
        >
        </c-img>
      </div>
    </q-scroll-area>
  </div>
</template>

<style lang="scss" scoped>
.video-player-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-video {
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.thumbnail {
  width: 140px;
  height: 80px;
  margin-right: 10px;
  transition: all 0.3s ease;
}

.active-thumbnail {
  border: 3px solid #1976d2;
}
</style>
