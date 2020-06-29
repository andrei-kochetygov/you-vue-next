<template>
    <input
        class="video-search"
        type="search"
        placeholder="Поиск видео..."
        :value="term"
        @input="term = $event.target.value"
    >
</template>

<script>
  import { ref, watch, watchEffect } from 'vue'
  import { debounce } from 'lodash'
  import { youtubeApiKey } from '../lib/config'
  import useYoutubeApi from '../composition/useYoutubeApi'

  export default {
    props: {
      modelValue: Array,
    },
    setup(props, { emit }) {
      const term = ref(null)
      const videos = ref([])
      const _pageToken = ref(null)
      const _prevPageToken = ref(null)
      const _nextPageToken = ref(null)
      const { fetchSearchResults } = useYoutubeApi(youtubeApiKey)

      watch(videos, newVideos => emit('update:modelValue', newVideos))
      watch(_pageToken, newPageToken => {
        if (newPageToken !== 'undefined' && newPageToken) {
          search({ pageToken: newPageToken, q: term.value, type: ['video'] })
        }
      })

      function prev () {
        _pageToken.value = _prevPageToken.value
      }

      function next () {
        _pageToken.value = _nextPageToken.value
      }

      const search = debounce(async (options) => {
        const { prevPageToken, nextPageToken, items } = await fetchSearchResults(options)
        _prevPageToken.value = prevPageToken
        _nextPageToken.value = nextPageToken
        videos.value = items.map(video => {
          return {
            ...video,
            id: video.id.videoId,
            kind: video.id.kind,
            thumbnail: video.snippet.thumbnails.medium,
            ...video.snippet,
          }
        })
      }, 500)

      // TODO: Поменять просто на watch
      watchEffect(() => {
        search({
          q: term.value,
          type: 'video',
          maxResults: 15,
        })
      })

      return {
        term,
        search,
        prev,
        next,
      }
    }
  }
</script>

<style scoped>
    .video-search {
        width: 100%;
        padding: .75rem 1rem;
        border-radius: 4px;
        border: 1px solid #BDBDBD;
        font-size: 1rem;
    }
    .video-search:focus {
        outline: 0;
    }
</style>
