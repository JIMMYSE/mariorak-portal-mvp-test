<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const barStyle = {
  // 스크롤바 안보이게
  opacity: 1,
};

const thumbStyle = {
  // 스크롤바 색상
  backgroundColor: 'transparent',
};

interface Video {
  id: number;
  title: string;
  src: string;
  thumbnail: string;
}

const videos = ref<Video[]>([
  {
    id: 1,
    title: 'Kingdom: The Blood',
    src: '/videos/dummy/video_dummy1.mp4',
    thumbnail: '/thumbnails/kingdom1.jpg',
  },
  {
    id: 2,
    title: 'Kingdom: Cinematic',
    src: '/videos/dummy/video_dummy1.mp4',
    thumbnail: '/thumbnails/kingdom2.jpg',
  },
  {
    id: 3,
    title: 'Kingdom: Gameplay',
    src: '/videos/dummy/video_dummy2.mp4',
    thumbnail: '/thumbnails/kingdom3.jpg',
  },
  {
    id: 4,
    title: 'Kingdom: Trailer',
    src: '/videos/dummy/video_dummy2.mp4',
    thumbnail: '/thumbnails/kingdom4.jpg',
  },
]);

const currentVideo = ref<Video>(videos.value[0]);
const videoPlayer = ref<HTMLVideoElement | null>(null);

const playVideo = (video: Video) => {
  currentVideo.value = video;
  if (videoPlayer.value) {
    videoPlayer.value.load();
    videoPlayer.value.play();
  }
};

onMounted(() => {
  if (videoPlayer.value) {
    videoPlayer.value.src = currentVideo.value.src;
  }
});
</script>

<template>
  <div class="video-player-container">
    <video ref="videoPlayer" controls class="main-video" :key="currentVideo.id">
      <source :src="currentVideo.src" type="video/mp4" />
      현재 비디오를 지원하지 않습니다.
    </video>
    <q-scroll-area
      style="height: 120px; max-width: 100%"
      :bar-style="barStyle"
      :thumb-style="thumbStyle"
    >
      <div class="row no-wrap">
        <c-img
          v-for="video in videos"
          :key="video.id"
          :src="video.thumbnail"
          @click="playVideo(video)"
          class="thumbnail cursor-pointer"
          :class="{ 'active-thumbnail': video.id === currentVideo.id }"
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
