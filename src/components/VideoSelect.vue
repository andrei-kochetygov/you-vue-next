<template>
    <div class="video-select">
        <video-snippet
            class="video-select__item"
            v-for="video in videos"
            :key="video.id"
            :title="video.title"
            :thumbnail="video.thumbnail"
            @click="$emit('update:modelValue', video.id)"
        />
    </div>
</template>

<script>
  import VideoSnippet from './VideoSnippet'

  export default {
    components: { VideoSnippet },
    props: {
      videos: Array,
      modelValue: String,
    },
  }
</script>
