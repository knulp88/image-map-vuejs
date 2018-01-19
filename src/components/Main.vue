<template lang="pug">
  .mainContainer
    .mainDesc
      h1
        span.headingIcon
          i.fa.fa-file-image-o
        span IMAGE MAP GENERATOR
        p(v-if="isLoggedIn") logged in
      .authSection
        button.button.is-primary(
          v-if="!isLoggedIn"
          @click="toAuth('login')"
        ) Log in
        button.button.is-primary(
          v-else @click="logout()"
        ) logout
        button.button.is-primary(@click="toAuth('signup')") Sign up
  //- end Templete
</template>

<script>
import firebase from '../firebase/firebase'
export default {
  data () {
    return {
      isLoggedIn: this.$store.state.authentication.isLoggedIn
    }
  },
  methods: {
    toAuth (inOut) {
      this.$router.push({ name: 'auth', params: {inOut} })
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$store.commit('LOGOUT')
        this.$nextTick(() => {
          this.isLoggedIn = this.$store.state.authentication.isLoggedIn
        })
      })
    }
  }
}
</script>

<style lang="less">
.mainContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
  background: #eaeaea;
  .mainDesc .headingIcon {
    display: block;
    margin: 2px 0 3px;
    font-size: 250px;
    line-height: 1.2em;
    transform: rotate(-15deg);
    color: #3c81df;
  }
  .authSection {
    margin-top: 40px;
    button {
      margin: 0 10px;
      width: 100px;
    }
  }
  h1 {
    font-size: 60px;
  }
}
</style>
