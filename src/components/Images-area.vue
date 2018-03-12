<template lang="pug">
  .wrap
    .dropArea(
      v-if="!$store.state.images.images.length"
      @drop="onDrop($event)"
      @dragover="onDragOver($event)"
      @dragend="onDragEnd($event)"
    )
      p DROP IMAGES
      p or
      button.button.is-primary.is-large UPLOAD IMAGES
    //- loaded images
    .imagesArea( v-if="!!$store.state.images.images.length" )
      cont-slide
      side-bar
</template>

<script>
import ContentSlide from '@/components/Content-slide'
import SideBar from '@/components/Side-bar'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'images-area',
  data () {
    return {
      imageState: null
    }
  },
  components: {
    'cont-slide': ContentSlide,
    'side-bar': SideBar
  },
  methods: {
    onDrop (e) {
      e.preventDefault()
      console.log('DROP')
      const dt = e.dataTransfer
      if (dt.items) {
        for (let i = 0; i < dt.items.length; i++) {
          if (dt.items[i].kind === 'file') {
            const f = dt.items[i].getAsFile()
            // console.log('... file[' + i + '].name = ' + f.name)
            const fileReader = new FileReader()

            fileReader.readAsDataURL(f)

            fileReader.onload = e => {
              this.$store.commit('ADD_IMAGES', {
                name: f.name,
                base64: e.target.result
              })
            }
          }
        }
      } else {
        for (let i = 0; i < dt.files.length; i++) {
          // console.log('... file[' + i + '].name = ' + dt.files[i].name)
          const fileReader = new FileReader()
          const fileName = dt.files[i].name
          fileReader.readAsDataURL(dt.files[i])
          fileReader.onload = e => {
            this.$store.commit('ADD_IMAGES', {
              name: fileName,
              base64: e.target.result
            })
          }
        }
      }
    },
    onDragOver (e) {
      e.preventDefault()
      console.log('DRAG_OVER')
    },
    onDragEnd (e) {
      console.log('dragEnd')
      var dt = e.dataTransfer
      if (dt.items) {
        for (var i = 0; i < dt.items.length; i++) {
          dt.items.remove(i)
        }
      } else {
        e.dataTransfer.clearData()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .wrap{
    width:100%;
    flex: 1;
    .dropArea{
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      border: 4px dashed #2c3e506d;
      margin: 0 auto;
      padding: 50px 20px;
      width: 80%;
      p {
        margin-bottom: 20px;
        font-size: 30px;
        font-weight: 700;
      }
    }
    .imagesArea{
      display: flex;
      flex-direction: row;
      height: 100%;
    }
  }
</style>
