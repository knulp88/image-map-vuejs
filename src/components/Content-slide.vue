<template lang="pug">
  .slide-wrap
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
      @drop="onDrop($event)"
      @dragstart="onDragStart($event)"
      @dragover="onDragOver($event)"
      @dragend="onDragEnd($event)"
    )
      swiper(
          :options='navSwiperOption'
          ref='navSwiper'
        )
        swiper-slide.items(
          v-for="(image, index) in $store.state.images.images"
          :key="image.length"
        )
          .thumb(
            @click="contSwiperSlideTo($event), inactiveMap($event)"
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
        spaceBetween: 50,
        on: {
          resize: () => {
            // nav swiper slide items full width reset
            this.getNavSlideFullWidth(true)
          }
        }
      },
      dragData: {
        navSlideFullWidth: 0,
        grabSlide: null,
        grabSlideIndex: 0
      }
    }
  },
  mounted () {
    this.getNavSlideFullWidth(true)
  },
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
      // this code need refactoring to finding DOM targets parentsnode
      // https://github.com/nefe/You-Dont-Need-jQuery/blob/master/README.ko-KR.md
      const clickedTarget = e.target.parentElement.parentElement
      this.contSwiper.slideTo(this.getNavSlideIndex(clickedTarget))
    },
    getNavSlideIndex (target) {
      const swiperSlides = document.querySelectorAll('.nav-swiper .swiper-slide')
      for (const [index, value] of Object.entries(swiperSlides)) {
        if (value === target) {
          return parseInt(index)
        }
      }
    },
    // true return width + margin-right, false return width
    getNavSlideFullWidth (bool) {
      const navSwiperSlide = document.querySelectorAll('.nav-swiper .swiper-slide')
      const slideWidth = parseFloat(navSwiperSlide[0].style.width.replace('px', ''))
      this.dragData.navSlideFullWidth = bool ? slideWidth + this.navSwiperOption.spaceBetween : slideWidth
      return bool ? slideWidth + this.navSwiperOption.spaceBetween : slideWidth
    },
    alignNavSlidesOnDrop (e) {
      const { grabSlide } = this.dragData
      const thumbNode = grabSlide.querySelectorAll('.thumb')
      const removeMotion = () => {
        thumbNode[0].style.opacity = 0
        grabSlide.style.width = 0
        grabSlide.style.marginRight = 0 + 'px'
      }
      const rollbackMotion = () => {
        thumbNode[0].style.opacity = 1
        console.log(this.dragData.navSlideFullWidth)
        grabSlide.style.width = (this.dragData.navSlideFullWidth - this.navSwiperOption.spaceBetween) + 'px'
        // console.log((this.dragData.navSlideFullWidth - this.navSwiperOption.spaceBetween) + 'px')
        grabSlide.style.marginRight = this.navSwiperOption.spaceBetween + 'px'
      }
      if (e.type === 'dragstart') {
        removeMotion()
        // this.$store.commit('REMOVE_IMAGES', { grabSlide, grabSlideIndex })
      } else if (e.type === 'dragend') {
        rollbackMotion()
      }
    },
    // DRAG AND DROP
    onDrop (e) {
      e.preventDefault()
      // this.$parent.onDrop(e)
    },
    onDragStart (e) {
      this.dragData.grabSlide = e.target.parentElement.parentElement
      this.dragData.grabSlideIndex = this.getNavSlideIndex(this.dragData.grabSlide)

      this.alignNavSlidesOnDrop(e)

      // console.log(this.dragData.grabSlideIndex)
    },
    onDragOver (e) {
      e.preventDefault()
      // if (!e.target.classList.contains('swiper-wrapper')) return
      // console.log(e.offsetX + '   ' + e.offsetY)
    },
    onDragEnd (e) {
      e.preventDefault()
      this.alignNavSlidesOnDrop(e)
      // this.$parent.onDragEnd(e)
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
<style lang="less">
  .slide-wrap{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .content-swiper{
    height: 100%;
  }
  .nav-swiper{
    display: flex;
    width: 100%;
    height: 80px;
    background: #fff;
    border-top: 1px solid #afafaf;
    .items{
      height: 80px;
      overflow: hidden;
      transition: .2s ease-out;
      transition-property: width, margin;
      overflow: hidden;
      .thumb{
        margin-top: 20px;
        border: 1px solid #afafaf;
        opacity: 1;
        cursor: pointer;
        transition: .2s ease-out;
        transition-property: opacity;
      }
      &.swiper-slide-active{
        .thumb{
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
