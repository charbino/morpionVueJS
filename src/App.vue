<template>
  <div id="app">
    <img src="./assets/logo.png">
    <morpion></morpion>
  </div>
</template>

<script>
import Morpion from './components/Morpion.vue'

export default {
  name: 'App',
  components: {
    morpion: Morpion
  }
}
</script>

<style>

</style>
