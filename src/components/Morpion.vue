<template>
  <div id="morpion">
    <app-header></app-header>
    <grille></grille>
  </div>
</template>

<script>
import Header from './Header.vue'
import Grille from './Grille.vue'

export default {
  name: 'Morpion',
  components: {
    appHeader: Header,
    grille: Grille
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
