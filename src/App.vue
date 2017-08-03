<template>
  <div id="app">
    <p><h3>Google Keep</h3></p>
    <hr/>
    <router-view></router-view>
    <hr/>
    <h6><a href="https://github.com/MrClan" target="_blank">MrClan</a></h6>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
