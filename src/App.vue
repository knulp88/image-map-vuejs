<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import firebase from './firebase/firebase'
export default {
  name: 'App',
  mounted () {
    // firebase authentication observer
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        this.$store.commit('LOGIN_SUCCESS')
      } else {
        console.log('log out')
        console.log(this.$store.state.authentication.isLoggedIn)
      }
    })
  }
}
</script>

<style lang="less">
/* GLOBAL */
// reset base CSS
html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
li,
p {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
img {
  vertical-align: top;
}

// Variables
@mainbgcolor : #eaeaea;
@colornavy : #2c3e50;

html,
body {
  background: @mainbgcolor;
  // Set base font size 10px
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
