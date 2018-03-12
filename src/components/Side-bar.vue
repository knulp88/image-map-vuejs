<template lang="pug">
  .side-bar
    button.button.is-primary.is-large PUBLISH
    ul.item-list(
      v-for="(image, index) in images"
      :key="image.length"
    )
      li {{image.name}}
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'side-bar',
  data () {
    return {

    }
  },
  mounted () {
    console.log(this.images)
  },
  computed: {
    ...mapGetters({
      sliderState: 'sliderState',
      activeMap: 'activeMap',
      images: 'images'
    })
  }
}
</script>
<style lang="less" scoped>
  .side-bar{
    border-left: 1px solid #afafaf;
    box-sizing: border-box;
    padding: 15px;
    width: 200px;
    height: 100%;
    background: #fff;
  }
  button.button.is-primary.is-large{
    width: 100%;
  }
</style>
