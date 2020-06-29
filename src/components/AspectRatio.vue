<template>
    <div class="aspect-ratio" :style="style">
        <div class="aspect-ratio-inner">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  import { computed } from 'vue'
    export default {
      name: 'AspectRatio',
      props: {
        height: Number,
        width: Number,
      },
      setup(props) {
        const ratio = computed(() =>  props.height / props.width * 100)
        const style = computed(() => ({
          paddingTop: `${ratio.value}%`,
        }))

        return { style }
      },
    }
</script>

<style scoped>
    .aspect-ratio {
        position: relative;
    }

    .aspect-ratio-inner {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
</style>