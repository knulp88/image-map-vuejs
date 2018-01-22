<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
html,body{
  height: 100%;
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
  height: 100%;
}
</style>
