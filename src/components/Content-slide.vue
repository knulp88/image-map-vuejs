<template lang="pug">
  .slide-wrap
    .contentSlide(
      @click='inactiveMap($event)'
    )
      swiper(
        :options='swiperOption'
        ref='contSwiper'
      )
        swiper-slide.slide-item(
          v-for="(image, index) in $store.state.images.images"
          :key="image.name"
        )
          //- img(:src="image.base64")
          map-area(
            :imgData="image.base64"
            :imgIndex="index"
          )
    .navSlide(
      @drop="onDrop($event)"
      @dragover="onDragOver($event)"
      @dragend="onDragEnd($event)"
    )
      swiper(
          :options='navSwiperOption'
          ref='navSwiper'
        )
        swiper-slide.items(
          v-for="(image) in $store.state.images.images"
          :key="image.name"
        )
          .thumb
            img( :src="image.base64" )
    .swiper-button-prev(slot='button-prev')
    .swiper-button-next(slot='button-next')

</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MapArea from '@/components/Map-area'
import { mapGetters } from 'vuex'
export default {
  name: 'content-slide',
  data () {
    return {
      item: '',
      swiperOption: {
        simulateTouch: true,
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
        slidesPerView: 5,
        centeredSlides: true,
        spaceBetween: 30
      }
    }
  },
  mounted () {
  },
  watch: {
    sliderState () {
      if (this.sliderState) {
        console.log('active')
        // this.contSwiper.destroy(false, false)
        // console.log(this.contSwiper)
        this.swiperOption.simulateTouch = false
        this.contSwiper.init()
      } else {
        console.log('inactive')
        // this.contSwiper.init()
        // console.log(this.$refs.contSwiper.$options.propsData.options)
        // this.contSwiper.update()
        // console.log(this.contSwiper.navigation)
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
    onDrop (e) {
      e.preventDefault()
      console.log(e.target)
    },
    onDragOver (e) {
      e.preventDefault()
      console.log(e.target)
    },
    onDragEnd (e) {
      e.preventDefault()
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
  .slide-wrap{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .contentSlide{
    height: 100%;
  }
  .navSlide{
    display: flex;
    width: 100%;
    height: 80px;
    background: #fff;
    border-top: 1px solid #afafaf;
    .items{
      height: 80px;
      overflow: hidden;
      .thumb{
        margin: 10px;
        border: 1px solid #000;
      }
    }
    .swiper-container {
      margin: 0 40px;
      width: 100%;
      height: 100%;
    }
  }
</style>
