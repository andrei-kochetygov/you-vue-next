<template>
    <div class="video-player">
        <aspect-ratio :height="9" :width="16">
            <iframe
                class="video-player__frame"
                :key="id"
                :src="`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                v-if="id"
            ></iframe>
            <div class="video-player__holder" v-else>Выберите видео!</div>
        </aspect-ratio>
        <div class="video-player__details" v-if="video">
            <h1 class="video-player__details-title">{{ video.title }}</h1>
            <div class="video-player__details-description">{{ video.description }}</div>
        </div>
    </div>
</template>

<script>
  import { ref, watchEffect } from 'vue'
  import { youtubeApiKey } from '../lib/config'
  import useYoutubeApi from '../composition/useYoutubeApi'
  import AspectRatio from './AspectRatio'
  export default {
    components: { AspectRatio },
    props: {
      id: String,
    },
    setup(props) {
      const video = ref(null)
      const { fetchVideo } = useYoutubeApi(youtubeApiKey)

      watchEffect(async () => {
        const { items } = await fetchVideo({ id: props.id })
        video.value = items.map(({ snippet }) => snippet)[0]
      })

      return { video }
    }
  }
</script>

<style scoped>
    .video-player__frame,
    .video-player__holder {
        width: 100%;
        height: 100%;
        border: 0;
    }

    .video-player__holder {
        display: flex;
        font-size: 2rem;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: bold;
        background: #424242;
    }

    .video-player__details-title {
        font-size: 1.25rem;
    }
</style>
