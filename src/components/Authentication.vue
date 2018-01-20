<template lang="pug">
  .auth
    h2 {{ authType === 'login' ? 'LOG IN' : 'SIGN UP' }}
    .login(v-if="authType==='login'")
      .box
        label.label E-mail
        p.control
          input.input(
            type='email'
            placeholder='e-mail'
            v-model='email'
          )
        label.label Password
        p.control
          input.input(
            type='password'
            placeholder=''
            v-model='password'
          )
        .btn-box
          button.button.is-primary.is-medium(
            @click="login(email, password)"
          ) SUBMIT
          button.button.is-outlined.is-primary.is-medium(
            @click="authType = 'signup'"
          ) SIGN UP
    .signup(v-if="authType==='signup'")
      .box
        label.label E-mail
        p.control
          input.input(
            type='email'
            placeholder='e-mail'
            v-model='sEmail'
          )
        label.label Password
        p.control
          input.input(
            type='password'
            placeholder=''
            v-model='sPassword'
          )
        .btn-box
          button.button.is-primary.is-medium(
            @click="signup(sEmail, sPassword)"
          ) SUBMIT
</template>

<script>
import firebase from '../firebase/firebase'
export default {
  data () {
    return {
      authType: this.$route.params.inOut,
      email: '',
      password: ''
    }
  },
  firebase () {
    return {
      testData: firebase.database().ref('testDb')
    }
  },
  mounted () {
    if (!this.authType) {
      this.$router.push({name: 'main'})
    }
  },
  methods: {
    signup (sEmail, sPassword) {
      firebase.auth().createUserWithEmailAndPassword(sEmail, sPassword).then(() => {
        console.log('resist success')
        this.authType = 'login'
      }).catch((error) => {
        const errorMessage = error.message
        this.$notify.open({
          content: errorMessage,
          icon: 'smile-o',
          placement: 'left-center',
          transition: 'bounce',
          type: 'danger'
        })
      })
    },
    login (email, password) {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        this.$store.dispatch('login')
        this.$router.push({name: 'main'})
      }).catch((error) => {
        // const errorCode = error.code
        const errorMessage = error.message
        this.$notify.open({
          content: errorMessage,
          icon: 'smile-o',
          placement: 'left-center',
          transition: 'bounce',
          type: 'danger'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.auth {
  margin-top: 200px;
  h2 {
    margin-bottom: 20px;
    font-size: 50px;
  }
}
.box {
  width: 500px;
  margin: 0 auto;
  text-align: left;
  .label {
    font-size: 13px;
  }
  .btn-box {
    border-top: 1px solid #eaeaea;
    padding-top: 20px;
    button {
      width: 100%;
      font-size: 18px;
      &:nth-of-type(2){
        margin-top: 20px;
      }
    }
  }
}
</style>
