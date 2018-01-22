<template lang="pug">
  .wrap
    .dropArea(
      @drop="onDrop($event)"
      @dragover="onDragOver($event)"
      @dragend="onDragEnd($event)"
    )
      p DROP IMAGES
      p or
      button.button.is-primary.is-large UPLOAD IMAGES
    //- loaded images
    .imagesArea( v-if="!!$store.state.images.images.length" )
      .items(
        v-for="(image) in $store.state.images.images"
        :key="image.name"
      )
        img( :src="image.base64" )

</template>

<script>
export default {
  name: 'images-area',
  data () {
    return {
      imageState: null
    }
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

          fileReader.readAsDataURL(dt.files[i])

          fileReader.onload = e => {
            console.log(e.target.result)
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
    overflow-y: scroll;
    .dropArea{
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
  }
</style>
