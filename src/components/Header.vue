<template>
  <div>
    <h1>{{ msgHello }}</h1>
    <h2 v-if="difficulte">Difficulté : {{difficulte}}</h2>
  </div>
</template>

<script>
import {eventBus} from '../main'

export default {
  name: 'Header',
  data () {
    return {
      msgHello: 'Bienvenue sur ce morpion',
      difficulte: ''
    }
  },
  created () {
    eventBus.$on('difficulteSet', (difficulte) => {
      this.difficulte = difficulte
    })
  }
}
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>
