<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Grille/>
  </div>
</template>

<script>
import Grille from './components/Grille'

export default {
  name: 'App',
  components: {
    Grille
  }
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
