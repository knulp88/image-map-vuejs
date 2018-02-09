<template lang='pug'>
  div(:id="'map-'+imgIndex" class="map-section")
    .map-item(
      @click="activeteArea($event)"
      @mousemove="movemove($event)"
    )
      canvas(
        :width="areaData.canvas.wid"
        :height="areaData.canvas.hei"
      )
      img(:src='imgData')
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      areaEl: null,
      areaData: {
        display: false,
        canvas: {
          el: null,
          wid: 0,
          hei: 0
        },
        ctx: null,
        img: null
      }
    }
  },
  props: ['imgData', 'imgIndex'],
  mounted () {
    // INITIALIZE CANVAS
    const areaEl = document.querySelector('#map-' + this.imgIndex)
    this.areaEl = areaEl
    // const ctx = canvas.getContext('2d')
    const img = areaEl.querySelector('img')

    img.onload = () => {
      this.areaData.canvas.el = areaEl.querySelector('canvas')
      this.areaData.canvas.wid = areaEl.querySelector('.map-item').getClientRects()[0].width
      this.areaData.canvas.hei = areaEl.getClientRects()[0].height
    }
  },
  methods: {
    activeteArea (e) {
      e.stopPropagation()
      const targetItem = document.querySelector(`#map-${this.imgIndex} .map-item`)

      if (this.activeMap) this.activeMap.classList.remove('is-active')
      targetItem.classList.add('is-active')

      this.$store.commit('ACTIVE_MAP', targetItem)
      this.$store.commit('SLIDER_STATE', !!targetItem.classList.contains('is-active'))
    },
    movemove (e) {
      // e.stopPropagation()
      // console.log('movemove')
    }
  },
  computed: {
    ...mapGetters({
      sliderState: 'sliderState',
      activeMap: 'activeMap'
    })
  }
}
</script>

<style lang='less' scoped>
  .map-section{
    position: relative;
    display: flex;
    margin: 30px 30px;
    justify-content: center;
    .map-item.is-active{
      margin-top: -2px;
      border: 2px solid #3c81df;
    }
    canvas{
      position: absolute;
      left:50%;
      transform: translateX(-50%);
      margin: -1px 0 0 0;
      // border: 1px solid black;
    }
  }
</style>
