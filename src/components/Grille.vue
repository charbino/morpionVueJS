<template>
  <div class="grille">
    <h1>{{ msgHello }}</h1>
    <div id="grille" class="container">
      <div class="wrapper">
        <div v-for="(item, index) in cases" :key="item.id" class="case" @click="changeCase($event,'user',index)" >{{ item.value }}</div>
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
  </div>
</template>

<script>
let ValueCaseEnum = {
  X: 'X',
  O: 'O',
  L: 'L'
}

export default {
  name: 'Grille',
  data () {
    return {
      msgHello: 'Bienvenue sur ce morpion',
      gameIsRunning: false,
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
      this.gameIsRunning = true
      this.cases.forEach(function (item) {
        item.value = ValueCaseEnum.L
      })
    },
    stop: function () {
      this.gameIsRunning = false
    },
    changeCase: function (event, player, index) {
      if (this.gameIsRunning) {
        this.cases[index].value = ValueCaseEnum.X
        this.jouerCase(index, player)

        if (this.checkWin(player)) {
          return
        }
        this.IAPlay()
      }
    },
    IAPlay: function () {
      console.log('IA PLAY')
      let nextCase = this.getNextCase()
      console.log(nextCase)
      this.cases[nextCase].value = ValueCaseEnum.O
    },
    getNextCase: function () {
      let result = 23
      this.cases.forEach(function (item) {
        if (item.value !== ValueCaseEnum.X) {
          console.log(item.num)
          result = item.num
        }
      })
      return result
    },
    jouerCase: function (indexCase, player) {
      if (player === 'user') {
        this.cases[indexCase].value = ValueCaseEnum.X
      } else {
        this.cases[indexCase].value = ValueCaseEnum.O
      }
    },
    checkWin: function (player) {
      let text = player === 'user' ? 'You Won new game ?' : 'IA Won new game ?'
      if (this.checkLigne() || this.checkColonne() || this.checkDiagonal()) {
        if (confirm(text)) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
      }
      return false
    },
    checkLigne: function () {
      //  Ligne 1
      if ((this.cases[0].value === this.cases[1].value) &&
         (this.cases[0].value === this.cases[2].value) &&
         this.cases[0].value !== ValueCaseEnum.L) {
        return true
      }

      //  Ligne 2
      if ((this.cases[3].value === this.cases[4].value) &&
        (this.cases[3].value === this.cases[5].value) &&
        this.cases[3].value !== ValueCaseEnum.L) {
        return true
      }

      //  Ligne 3
      if ((this.cases[6].value === this.cases[7].value) &&
        (this.cases[6].value === this.cases[8].value) &&
        this.cases[6].value !== ValueCaseEnum.L) {
        return true
      }
      return false
    },
    checkColonne: function () {
      //  Ligne 1
      if ((this.cases[0].value === this.cases[3].value) &&
         (this.cases[0].value === this.cases[6].value) &&
         this.cases[0].value !== ValueCaseEnum.L) {
        return true
      }

      //  Ligne 2
      if ((this.cases[1].value === this.cases[4].value) &&
        (this.cases[1].value === this.cases[7].value) &&
        this.cases[1].value !== ValueCaseEnum.L) {
        return true
      }

      //  Ligne 3
      if ((this.cases[2].value === this.cases[5].value) &&
        (this.cases[2].value === this.cases[8].value) &&
        this.cases[2].value !== ValueCaseEnum.L) {
        return true
      }
      return false
    },
    checkDiagonal: function () {
      //  Ligne 1
      if ((this.cases[0].value === this.cases[4].value) &&
         (this.cases[0].value === this.cases[8].value) &&
         this.cases[0].value !== ValueCaseEnum.L) {
        return true
      }

      //  Ligne 2
      if ((this.cases[2].value === this.cases[4].value) &&
        (this.cases[2].value === this.cases[6].value) &&
        this.cases[2].value !== ValueCaseEnum.L) {
        return true
      }
      return false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
