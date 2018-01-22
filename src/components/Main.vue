<template lang="pug">
  .mainContainer
    .mainDesc(:class="{mainBar : isLoggedIn}")
      h1
        span.headingIcon
          i.fa.fa-file-image-o
        span IMAGE MAP GENERATOR
      .authSection
        span.authEmail(v-if="isLoggedIn") {{ userEmail }}
        button.button.is-primary(
          v-if="!isLoggedIn"
          @click="toAuth('login')"
        ) Log in
        button.button.is-primary.is-small(
          v-else
          @click="logout()"
        ) logout
        button.button.is-primary(
          v-if="!isLoggedIn"
          @click="toAuth('signup')"
        ) Sign up
    images-area(
      v-if="isLoggedIn"
    )
    .footer(v-if="isLoggedIn") fooooooooter
</template>

<script>
import firebase from '../assets/firebase/firebase'
import ImagesArea from './ImagesArea'

export default {
  data () {
    return {
      isLoggedIn: false,
      userEmail: ''
    }
  },
  components: {
    'images-area': ImagesArea
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        this.$store.commit('LOGIN_SUCCESS')
        this.$nextTick(() => {
          this.isLoggedIn = this.$store.state.authentication.isLoggedIn
          this.userEmail = firebase.auth().currentUser.email
        })
      } else {
        console.log('log out')
        console.log(this.$store.state.authentication.isLoggedIn)
      }
    })
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
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background: #eaeaea;
  .footer{
    width: 100%;
    height: 25px;
    padding: 0;
    border-top: 1px solid #afafaf;
    background: #fff;
    font-size: 12px;
    line-height: 25px;
  }
  .mainDesc{
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    .headingIcon {
      display: block;
      margin: 2px 0 3px;
      font-size: 250px;
      line-height: 1.2em;
      color: #3c81df;
      &>i{
        transform: rotate(-15deg);
      }
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
  .mainDesc.mainBar{
    flex: none;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #afafaf;
    background: #fff;
    .headingIcon {
      padding-left: 20px;
      padding-right: 8px;
      font-size: 26px;
      line-height: 1em;
    }
    .authSection {
       display: flex;
      align-items: center;
      margin-top:0;
      .authEmail{
        line-height: 1.2em;
      }
      .button{
        width: 50px;
      }
    }
    h1{
      font-size: 20px;
      &>span{
        display: inline-block;
      }
    }
  }
}
</style>
