<template lang="pug">
  .slide-wrap(
  )
    .content-swiper(
      @click='inactiveMap($event)'
    )
      swiper(
        :options='swiperOption'
        ref='contSwiper'
      )
        swiper-slide.slide-item(
          v-for="(image, index) in images"
          :key="image.length"
        )
          map-area(
            :imgData="image.base64"
            :imgIndex="index"
          )
    .nav-swiper(
      @drop="onDropAddImage($event)"
      @dragover="onDragOverAddImage($event)"
      @dragend="onDragEndAddImage($event)"
    )
      swiper(
          :options='navSwiperOption'
          ref='navSwiper'
        )
        swiper-slide.nav-swiper-item.transition(
          :style="{ transform : 'translateX(' + (navSwiperData.slideWidth * index) + 'px)' }"
          v-for="(image, index) in images"
          :key="image.length"
        )
          .thumb(
            @click="contSwiperSlideTo($event), inactiveMap($event)"
            @mouseover="slideInfo($event)"
            @mouseleave="slideInfo($event)"
          )
            button.remove-slide.button.is-danger(
              @click="removeSlide($event)"
            )
              i.fa.fa-close
            .index-number {{ index + 1 }}
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
import _ from 'lodash'
import Event from '../assets/event-namespace'
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
        grabbedSlide: null,
        insertPosition: null,
        slideWidth: 0,
        insertIndex: null
      }
    }
  },
  beforeDestroy () {
    Event.removeEventListener(window, 'resize-window')
    Event.removeEventListener(window, 'mouseout-window')
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
  mounted () {
    this.navSwiperData.slideWidth = this.getNavSwiperPosition()
    Event.addEventListener(window, 'resize-window', _.debounce(() => {
      const slides = Array.slice(this.navSwiper.slides, 0)
      if (slides) {
        for (const [index, value] of Object.entries(slides)) {
          value.style.transform = 'translateX(' + this.getNavSwiperPosition() * index + 'px)'
        }
      }
    }, 200))
    // mouse out on window
    Event.addEventListener(window, 'mouseout-window', (e) => {
      if (!this.navSwiperData.grabbedSlide) return
      const from = e.relatedTarget || e.toElement
      if (!from || from.nodeName === 'HTML') {
        this.navSwiperData.grabbedSlide.querySelector('.thumb').classList.remove('over')
        this.onDragEnd(e)
      }
    })
  },
  methods: {
    removeSlide (e) {
      e.stopPropagation()
      const removeSlide = e.target.closest('.swiper-slide')
      const idx = this.getNavSlideIndex(removeSlide)
      removeSlide.querySelector('.thumb').classList.remove('over')
      removeSlide.style.transform = removeSlide.style.transform + ' translateY(100px)'

      Event.addEventListener(removeSlide, 'transitionend-removeSlide', () => {
        this.$store.commit('REMOVE_IMAGES', idx)
        const slides = document.querySelectorAll('.nav-swiper .swiper-slide')
        for (const [index, value] of Object.entries(slides)) {
          value.classList.remove('transition')
          if (parseFloat(index) >= idx) {
            value.style.transform = 'translateX(' + this.getNavSwiperPosition() * (parseFloat(index) + 1) + 'px)'
          } else {
            value.style.transform = 'translateX(' + this.getNavSwiperPosition() * index + 'px)'
          }
        }
        setTimeout(() => {
          if (slides.length === 1) return
          for (const [index, value] of Object.entries(slides)) {
            value.classList.add('transition')
            value.style.transform = 'translateX(' + this.getNavSwiperPosition() * index + 'px)'
          }
        }, 100)
        Event.removeEventListener(removeSlide, 'transitionend-removeSlide')
      })
    },
    slideInfo (e) {
      if (!this.navSwiperData.grabbedSlide) {
        if (e.type === 'mouseover') {
          if (!this.navSwiperData.grabbedSlide) {
            e.target.closest('.thumb').classList.add('over')
          }
        } else {
          e.target.closest('.thumb').classList.remove('over')
        }
      }
    },
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
    getNavSwiperPosition () {
      const navSlide = document.querySelectorAll('.nav-swiper .swiper-slide')
      const result = parseFloat(navSlide[0].style.width.replace('px', '')) + this.navSwiperOption.spaceBetween
      return result.toFixed(3)
    },
    onDropAddImage (e) {
      this.$parent.onDrop(e)
    },
    onDragOverAddImage (e) {
      this.$parent.onDragOver(e)
    },
    onDragEndAddImage (e) {
      this.$parent.onDragEnd(e)
    }
  },
  computed: {
    contSwiper () {
      return this.$refs.contSwiper.swiper
    },
    navSwiper () {
      return this.$refs.navSwiper.swiper
    },
    ...mapGetters({
      sliderState: 'sliderState',
      activeMap: 'activeMap',
      images: 'images'
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
  position: relative;
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
}
.content-swiper {
  width: 100%;
  height: 100%;
}
.nav-swiper {
  position: relative;
  width: 100%;
  height: 80px;
  background: #fff;
  border-top: 1px solid #afafaf;
  .nav-swiper-item {
    position: absolute;
    left: 0;
    height: 80px;
    &.transition{
      transition: .2s ease-out;
      transition-property: transform;
    }
    &.swiper-slide-active {
      .thumb {
        margin-top: 10px;
        border: 2px solid #3c81df;
      }
    }
    .thumb {
      position: relative;
      margin-top: 20px;
      min-height: 400px;
      border: 1px solid #afafaf;
      background: #eaeaea;
      opacity: 1;
      cursor: pointer;
      transition: 0.2s ease-out;
      transition-property: opacity border margin;
    }
    .thumb .index-number{
      position: absolute;
      top:0;
      width: 100%;
      height: 100%;
      font-size: 35px;
      font-weight: 700;
      color: #fff;
      text-shadow: 0px 0px 10px rgba(0, 0, 0, .5);
      background: rgba(0, 0, 0, .5);
      opacity: 0;
      transition: .1s ease-in opacity;
    }
    .thumb.over .index-number{
      opacity: 1;
    }
    .thumb .remove-slide{
      position: absolute;
      top: 5px;
      right: 5px;
      width: 20px;
      height: 20px;
      padding: 0;
      line-height: 20px;
      opacity: 0;
      z-index: 1;
    }
    .thumb.over .remove-slide{
      opacity: 1;
    }
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
}
</style>
