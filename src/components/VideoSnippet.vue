<template>
    <div class="video-snippet" :title="title">
        <aspect-ratio :height="thumbnail.height" :width="thumbnail.width">
            <img class="video-snippet__thumbnail" :src="thumbnail.url" :alt="title">
        </aspect-ratio>
        <h3 class="video-snippet__title">{{ title }}</h3>
    </div>
</template>

<script>
    import AspectRatio from './AspectRatio'
    export default {
      name: 'VideoSnippet',
      components: { AspectRatio },
      props: {
        title: String,
        thumbnail: Object,
      },
    }
</script>

<style scoped>
    .video-snippet {
        cursor: pointer;
        padding: .5rem;
        margin-left: -.5rem;
        margin-right: -.5rem;
        transition: background .2s;
        border-radius: 4px;
    }

    .video-snippet:not(:last-child) {
        border-bottom: 1px solid #E0E0E0;
    }

    .video-snippet:hover {
        background: rgba(0, 0, 0, .1);
    }

    .video-snippet__thumbnail {
        width: 100%;
    }

    .video-snippet__title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        font-size: 1rem;
        margin-top: .5rem;
        margin-bottom: 0;
        max-height: 2.25rem;
        -webkit-line-clamp: 2;
        white-space: normal;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>