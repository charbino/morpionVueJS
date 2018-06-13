<template>
  <div class="grille">
    <div id="grille" class="container">
      <div class="wrapper">
        <div v-for="(item, index) in cases" :key="item.id" class="case" @click="humanPlay($event, index)" >{{ item.value }}</div>
      </div>
    </div>
    <section class="row controls" v-if="!gameIsRunning">
      <div class="small-12 columns">
        <button id="start-game" @click="startGame">START NEW GAME</button>
      </div>
    </section>
    <section class="row controls" v-else>
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

export default {
  name: 'Grille',
  data () {
    return {
      difficulte: '',
      gameIsRunning: false,
      needDifficulte: false,
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
      this.needDifficulte = true
      this.cases.forEach(function (item) {
        item.value = ValueCaseEnum.L
      })
    },
    stop: function () {
      this.gameIsRunning = false
    },
    setDifficulte (difficulte) {
      this.difficulte = difficulte
      this.needDifficulte = false
      this.gameIsRunning = true
      // eventBus.changeDifficulte(difficulte)
      eventBus.$emit('difficulteSet', difficulte)
    },
    humanPlay: function (event, index) {
      if (this.gameIsRunning) {
        if (this.jouerCase(index, players.human)) {
          if (this.checkWin(players.human)) {
            this.gameIsRunning = false
            if (confirm('You Won new game ?')) {
              this.startGame()
            }
          }
          if (this.checkEgalite()) {
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
      if (this.checkWin(players.IA)) {
        this.gameIsRunning = false
        if (confirm('IA Won new game ?')) {
          this.startGame()
        }
        if (this.checkEgalite()) {
          this.gameIsRunning = false
          if (confirm('Equality, new game ? ')) {
            this.startGame()
          }
        }
      }
    },
    jouerCase: function (indexCase, player) {
      if (this.cases[indexCase].value !== ValueCaseEnum.L) {
        return false
      }
      if (player === players.human) {
        this.cases[indexCase].value = ValueCaseEnum.X
      } else {
        this.cases[indexCase].value = ValueCaseEnum.O
      }
      return true
    },
    checkWin: function (player) {
      let value = player === players.IA ? ValueCaseEnum.O : ValueCaseEnum.X
      return this.checkLigne(value) || this.checkColonne(value) || this.checkDiagonal(value)
    },
    checkLigne: function (value) {
      //  Ligne 1
      if (this.cases[0].value === this.cases[1].value &&
          this.cases[0].value === this.cases[2].value &&
          this.cases[0].value !== ValueCaseEnum.L &&
          this.cases[0].value === value) {
        return true
      }

      //  Ligne 2
      if (this.cases[3].value === this.cases[4].value &&
          this.cases[3].value === this.cases[5].value &&
          this.cases[3].value !== ValueCaseEnum.L &&
          this.cases[3].value === value) {
        return true
      }

      //  Ligne 3
      if (this.cases[6].value === this.cases[7].value &&
          this.cases[6].value === this.cases[8].value &&
          this.cases[6].value !== ValueCaseEnum.L &&
          this.cases[6].value === value) {
        return true
      }
      return false
    },
    checkColonne: function (value) {
      //  Ligne 1
      if (this.cases[0].value === this.cases[3].value &&
          this.cases[0].value === this.cases[6].value &&
          this.cases[0].value !== ValueCaseEnum.L &&
          this.cases[0].value === value) {
        return true
      }

      //  Ligne 2
      if (this.cases[1].value === this.cases[4].value &&
          this.cases[1].value === this.cases[7].value &&
          this.cases[1].value !== ValueCaseEnum.L &&
          this.cases[1].value === value) {
        return true
      }

      //  Ligne 3
      if (this.cases[2].value === this.cases[5].value &&
          this.cases[2].value === this.cases[8].value &&
          this.cases[2].value !== ValueCaseEnum.L &&
          this.cases[2].value === value) {
        return true
      }
      return false
    },
    checkDiagonal: function (value) {
      //  Ligne 1
      if (this.cases[0].value === this.cases[4].value &&
          this.cases[0].value === this.cases[8].value &&
          this.cases[0].value !== ValueCaseEnum.L &&
          this.cases[0].value === value) {
        return true
      }

      //  Ligne 2
      if (this.cases[2].value === this.cases[4].value &&
          this.cases[2].value === this.cases[6].value &&
          this.cases[2].value !== ValueCaseEnum.L &&
          this.cases[2].value === value) {
        return true
      }
      return false
    },
    checkEgalite: function () {
      let result = true
      let continu = true
      let i = 0
      while (this.cases.length > i && continu) {
        if (this.cases[i].value === ValueCaseEnum.L) {
          result = false
          continu = false
        }
        i++
      }
      return result
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
