<template lang="pug">

  .mainContainer
    h1 {{ initMessage }}

</template>
<script>
export default {
  data () {
    return {
      initMessage: 'INIT'
    }
  }
}
</script>
<style lang="less" scoped>
.mainContainer{
  h1 {
    color: gray;
  }
}
</style>
