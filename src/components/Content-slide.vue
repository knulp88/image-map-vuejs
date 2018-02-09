<template lang="pug">
  .slide-wrap(
    @mousemove="alignDragMove($event)"
    @mouseup="alignDragEnd($event)"
  )
    .content-swiper(
      @click='inactiveMap($event)'
    )
      swiper(
        :options='swiperOption'
        ref='contSwiper'
      )
        swiper-slide.slide-item(
          v-for="(image, index) in $store.state.images.images"
          :key="image.length"
        )
          //- img(:src="image.base64")
          map-area(
            :imgData="image.base64"
            :imgIndex="index"
          )
    .nav-swiper(
      @dragstart="onDragStart($event)"
    )
      swiper(
          :options='navSwiperOption'
          ref='navSwiper'
        )
        swiper-slide.nav-swiper-item(
          v-for="(image, index) in $store.state.images.images"
          :key="image.length"
        )
          .thumb(
            @click="contSwiperSlideTo($event), inactiveMap($event)"
            @mousedown="alignDragStart($event)"
          )
            img( :src="image.base64" )
    .swiper-button-prev(
      slot='button-prev'
      @click='inactiveMap($event)'
    )
    .swiper-button-next(
      slot='button-next'
      @click='inactiveMap($event)'
    )

</template>
<script>
// import _ from 'lodash'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MapArea from '@/components/Map-area'
import { mapGetters } from 'vuex'
export default {
  name: 'content-slide',
  data () {
    return {
      item: '',
      swiperOption: {
        touchRatio: 1,
        initialSlide: 0,
        observer: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          slideChangeTransitionStart: () => {
            this.navSwiper.slideTo(this.contSwiper.activeIndex)
          }
        }
      },
      navSwiperOption: {
        simulateTouch: false,
        slidesPerView: 7,
        centeredSlides: true,
        spaceBetween: 50
      },
      navSwiperData: {
        grabbedSlide: null
      }
    }
  },
  mounted () {},
  watch: {
    sliderState () {
      if (this.sliderState) {
        this.contSwiper.params.touchRatio = 0
      } else {
        this.contSwiper.params.touchRatio = 1
      }
    }
  },
  methods: {
    inactiveMap (e) {
      const activeMap = this.activeMap
      if (activeMap) {
        activeMap.classList.remove('is-active')
        this.$store.commit('ACTIVE_MAP', null)
        this.$store.commit('SLIDER_STATE', false)
      }
    },
    contSwiperSlideTo (e) {
      const clickedTarget = e.target.closest('.swiper-slide')
      this.contSwiper.slideTo(this.getNavSlideIndex(clickedTarget))
    },
    getNavSlideIndex (swiperSlide) {
      if (swiperSlide.classList.contains('swiper-slide')) {
        const swiperSlides = document.querySelectorAll('.nav-swiper .swiper-slide')
        for (const [index, value] of Object.entries(swiperSlides)) {
          if (value === swiperSlide) {
            return parseInt(index)
          }
        }
      }
    },

    onDragStart (e) {
      e.preventDefault()
      // console.log(e.target.closest('.swiper-slide'))
    },
    alignDragStart (e) {
      this.navSwiperData.grabbedSlide = e.target.closest('.swiper-slide')
    },
    alignDragMove (e) {
      const { grabbedSlide } = this.navSwiperData

      if (grabbedSlide) {
        const { offsetX, offsetY } = e
        console.log(offsetX + '  ' + offsetY)
      }
    },
    alignDragEnd (e) {
      if (e.target.closest('.nav-swiper')) {
        console.log('nav swiper inside')
      } else {
        console.log('nav swiper outside')
      }
      this.navSwiperData.grabbedSlide = null
    }
  },
  computed: {
    navSwiperSortGaps () {
      const result = []
      const swiperWrap = document.querySelector('.nav-swiper .swiper-wrapper')
      const swiperSlides = swiperWrap.querySelectorAll('.swiper-slide')
      const { spaceBetween } = this.navSwiperOption

      for (const [index, value] of Object.entries(swiperSlides)) {
        const slideWidth = parseInt(value.style.width.replace('px', ''))
        console.log(index + '  ' + slideWidth)
        if (index === 0) {
          result.push([0, spaceBetween])
        } else {
          result.push([
            slideWidth * index + spaceBetween * (index - 1),
            slideWidth * index + spaceBetween * index
          ])
        }
      }
      return result
    },
    contSwiper () {
      return this.$refs.contSwiper.swiper
    },
    navSwiper () {
      return this.$refs.navSwiper.swiper
    },
    ...mapGetters({
      sliderState: 'sliderState',
      activeMap: 'activeMap'
    })
  },
  components: {
    swiper,
    swiperSlide,
    mapArea: MapArea
  }
}
</script>
<style lang="less" scoped>
.slide-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content-swiper {
  height: 100%;
}
.nav-swiper {
  display: flex;
  width: 100%;
  height: 80px;
  background: #fff;
  border-top: 1px solid #afafaf;
  .nav-swiper-item {
    height: 80px;
    overflow: hidden;
    transition: 0.2s ease-out;
    transition-property: width, margin;
    overflow: hidden;
    .thumb {
      margin-top: 20px;
      border: 1px solid #afafaf;
      opacity: 1;
      cursor: pointer;
      transition: 0.2s ease-out;
      transition-property: opacity;
    }
    &.swiper-slide-active {
      .thumb {
        margin-top: 10px;
        border: 2px solid #3c81df;
      }
    }
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
}
</style>
