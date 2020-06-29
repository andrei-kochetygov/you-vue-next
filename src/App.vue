<template>
  <div class="app">
    <header class="app__header">
      <video-search v-model="fetchedVideos" ref="videoSearch"></video-search>
    </header>
    <main class="app__main">
      <video-player class="app__video-player" :id="selectedVideoId"/>
    </main>
    <aside class="app__aside">
      <div class="app__navigation">
        <button class="app__navigation-prev" @click="prev">&#60;&#60;</button>
        <button class="app__navigation-next" @click="next">&#62;&#62;</button>
      </div>
      <video-select class="app__video-select" :videos="fetchedVideos" v-model="selectedVideoId"/>
    </aside>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import VideoSelect from './components/VideoSelect'
  import VideoPlayer from './components/VideoPlayer'
  import VideoSearch from './components/VideoSearch'
  export default {
    components: { VideoSearch, VideoPlayer, VideoSelect },
    setup() {
      const videoSearch = ref(null)
      const fetchedVideos = ref([])
      const selectedVideoId = ref(null)

      function prev () {
        videoSearch.value.prev()
      }

      function next () {
        videoSearch.value.next()
      }

      return {
        videoSearch,
        fetchedVideos,
        selectedVideoId,
        prev,
        next,
      }
    },
  }
</script>

<style scoped>
  .app {
    display: grid;
    grid-template-areas:
        "header header"
        "main aside";
    grid-template-columns: minmax(200px, 1fr) minmax(min-content, 240px);
    grid-template-rows: minmax(min-content, max-content) 100%;
    grid-gap: 1rem;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 1rem;
  }

  .app__header {
    grid-area: header;
  }

  .app__main {
    grid-area: main;
  }

  .app__aside {
    grid-area: aside;
  }

  .app__navigation {
    display: flex;
    margin-left: -.25rem;
    margin-right: -.25rem;
    margin-bottom: .5rem;
  }

  .app__navigation-prev,
  .app__navigation-next {
    flex-grow: 1;
    margin-left: .25rem;
    margin-right: .25rem;
    cursor: pointer;
    padding: .5rem .75rem;
    border-radius: 4px;
    border: 0;
    font-size: 1rem;
    background-color: #4CAF50;
    color: #fff;
  }
</style>

<style type="scss">
  @import "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap";

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
