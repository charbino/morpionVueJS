<template>
  <div class="grille">
    <div id="grille" class="container">
      <div class="wrapper">
        <div v-for="(item, index) in cases" :key="item.id" class="case" @click="humanPlay($event, index)" >{{ item.value }}</div>
      </div>
    </div>
    <section class="row controls" v-if="!gameIsRunning && !needDifficulte">
      <div class="small-12 columns">
        <button id="start-game" @click="startGame">START NEW GAME</button>
      </div>
    </section>
    <section class="row controls" v-if="gameIsRunning">
      <div class="small-12 columns">
        <button id="reset" @click="stop">STOP</button>
      </div>
    </section>
    <section class="row controls" v-if="needDifficulte">
      <div class="small-12 columns">
        <button :id="difficulte.facile" @click="setDifficulte(difficulteEnum.facile)">{{difficulteEnum.facile}}</button>
        <button :id="difficulte.impossible" @click="setDifficulte(difficulteEnum.impossible)">{{difficulteEnum.impossible}}</button>
      </div>
    </section>
  </div>
</template>

<script>
import {eventBus} from '../main.js'

import * as MinMaxAlgo from '../lib/MinMaxAlgo.js'
import * as AlgoSimple from '../lib/AlgoSimple.js'
import {ValueCaseEnum, players} from '../lib/Enum.js'
import * as Game from '../lib/Game.js'

export default {
  name: 'Grille',
  data () {
    return {
      difficulte: '',
      gameIsRunning: false,
      needDifficulte: true,
      difficulteEnum: {
        facile: 'Facile',
        impossible: 'Impossible'
      },
      cases: [
        {num: 1, value: ValueCaseEnum.L},
        {num: 2, value: ValueCaseEnum.L},
        {num: 3, value: ValueCaseEnum.L},
        {num: 4, value: ValueCaseEnum.L},
        {num: 5, value: ValueCaseEnum.L},
        {num: 6, value: ValueCaseEnum.L},
        {num: 7, value: ValueCaseEnum.L},
        {num: 8, value: ValueCaseEnum.L},
        {num: 9, value: ValueCaseEnum.L}
      ]
    }
  },
  methods: {
    startGame: function () {
      this.cases.forEach(function (item) {
        item.value = ValueCaseEnum.L
      })
      this.gameIsRunning = true
    },
    stop: function () {
      this.gameIsRunning = false
      this.needDifficulte = true
    },
    setDifficulte (difficulte) {
      this.difficulte = difficulte
      this.needDifficulte = false
      eventBus.$emit('difficulteSet', difficulte)
    },
    humanPlay: function (event, index) {
      if (this.gameIsRunning) {
        if (Game.jouerCase(index, players.human, this.cases)) {
          if (Game.checkWin(players.human, this.cases)) {
            this.gameIsRunning = false
            if (confirm('You Won new game ?')) {
              this.startGame()
            }
          }
          if (Game.checkEgalite(this.cases)) {
            this.gameIsRunning = false
            if (confirm('Equality, new game ? ')) {
              this.startGame()
            }
          }
          this.IAPlay()
        }
      }
    },
    IAPlay: function () {
      let nextCase = 0
      if (this.difficulte === this.difficulteEnum.facile) {
        nextCase = AlgoSimple.getNextCaseIA(this.cases)
      }

      if (this.difficulte === this.difficulteEnum.impossible) {
        nextCase = MinMaxAlgo.getCaseIA(this.cases, 10)
      }

      this.cases[nextCase].value = ValueCaseEnum.O
      if (Game.checkWin(players.IA, this.cases)) {
        this.gameIsRunning = false
        if (confirm('IA Won new game ?')) {
          this.startGame()
        }
        if (Game.checkEgalite()) {
          this.gameIsRunning = false
          if (confirm('Equality, new game ? ')) {
            this.startGame()
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
  .container{
    display: grid;
    justify-items : center;
  }

  .wrapper {
    grid-column: 1; grid-row: 1;
    align-items: center;
    display: grid;
    grid-template-columns: 33% 33% 33% ;
    grid-gap: 10px;
    background-color: #fff;
    color: #444;
  }

  .case{
    background-color: #444;
    color: #fff;
    border-radius: 5px;
    padding: 20px;
    font-size: 150%;
  }

  .controls, .log {
    margin-top: 30px;
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0px 3px 6px #ccc;
  }

  button {
    font-size: 20px;
    background-color: #eee;
    padding: 12px;
    box-shadow: 0 1px 1px black;
    margin: 10px;
  }

  #start-game {
    background-color: #aaffb0;
  }
  #reset {
    background-color: #ff7367;
  }
</style>
