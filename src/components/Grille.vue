<template>
  <div class="grille">
    <h1>{{ msgHello }}</h1>
    <h2 v-if="difficulte">Difficulté : {{difficulte}}</h2>
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
let ValueCaseEnum = {
  X: 'X',
  O: 'O',
  L: 'L'
}

let players = {
  IA: 'IA',
  human: 'human'
}

export default {
  name: 'Grille',
  data () {
    return {
      msgHello: 'Bienvenue sur ce morpion',
      gameIsRunning: false,
      difficulte: 'Facile',
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
    setDifficulte: function (difficulte) {
      this.difficulte = difficulte
      this.needDifficulte = false
      this.gameIsRunning = true
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
      console.log(`Difficulte ${this.difficulte}`)
      if (this.difficulte === this.difficulteEnum.facile) {
        nextCase = this.getNextCaseIA()
      }

      if (this.difficulte === this.difficulteEnum.impossible) {
        nextCase = this.minMaxAlgo(10)
        console.log(`IA play ${nextCase}`)
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
    getNextCaseIA: function () {
      let result = null
      let continu = true
      let i = 0
      while (this.cases.length > i && continu) {
        if (this.cases[i].value === ValueCaseEnum.L) {
          result = i
          continu = false
        }
        i++
      }
      return result
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
    },
    minMaxAlgo: function (depth) {
      console.log('Algo Min max IA')
      let plateauBis = this.cases
      let max = -10000
      let caseAjouer = 0
      let i = 0
      let tmp = 0
      while (plateauBis.length > i) {
        if (plateauBis[i].value === ValueCaseEnum.L) {
          console.log(`i = ${i}`)
          plateauBis[i].value = ValueCaseEnum.O
          tmp = this.min(plateauBis, depth - 1)
          console.log(`tmp = ${tmp}`)
          console.log(`max = ${max}`)
          if (tmp > max) {
            max = tmp
            caseAjouer = i
            console.log(`caseAjouer = ${caseAjouer}`)
          }
          plateauBis[i].value = ValueCaseEnum.L
        }
        i++
      }
      console.log('caseAjouer ' + caseAjouer)
      return caseAjouer
    },
    max: function (plateau, depth) {
      if (depth === 0 || !this.gameIsRunning) {
        return this.eval(plateau)
      }
      let max = -10000
      let tmp = null
      let i = 0

      while (plateau.length > i) {
        if (plateau[i].value === ValueCaseEnum.L) {
          plateau[i].value = ValueCaseEnum.X
          tmp = this.min(plateau, depth - 1)
          if (tmp > max) {
            max = tmp
          }
          plateau[i].value = ValueCaseEnum.L
        }
        i++
      }
      return max
    },
    min: function (plateau, depth) {
      if (depth === 0 || !this.gameIsRunning) {
        return this.eval(plateau)
      }
      let min = 10000
      let tmp = null
      let i = 0

      while (plateau.length > i) {
        if (plateau[i].value === ValueCaseEnum.L) {
          plateau[i].value = ValueCaseEnum.O
          tmp = this.max(plateau, depth - 1)
          if (tmp < min) {
            min = tmp
          }
          plateau[i].value = ValueCaseEnum.L
        }
        i++
      }
      console.log('[MIN] min ' + min)
      return min
    },
    eval: function (plateau) {
      let i = 0
      let nbPions = 0
      while (plateau.length > i) {
        // On compte le nombre de pions
        if (plateau[i].value !== ValueCaseEnum.L) {
          nbPions++
        }
        i++
      }
      if (this.checkWin(players.IA)) {
        return (1000 - nbPions)
      }

      if (this.checkWin(players.human)) {
        return (-1000 + nbPions)
      }
      return 0
    }
  }
}
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

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
