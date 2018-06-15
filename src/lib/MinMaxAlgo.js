import {ValueCaseEnum, players} from './Enum.js'
import * as Game from './Game'
import * as AlgoSImple from './AlgoSimple'

export function getCaseIA (cases, depth) {
  let plateauBis = cases
  let max = -10000
  let caseAjouer = AlgoSImple.getNextCaseIA(plateauBis)
  let i = 0
  let tmp = 0
  while (plateauBis.length > i) {
    if (plateauBis[i].value === ValueCaseEnum.L) {
      plateauBis[i].value = ValueCaseEnum.O
      tmp = min(plateauBis, depth - 1)
      if (tmp > max || ((tmp === max) && (Math.random() % 2 === 0))) {
        max = tmp
        caseAjouer = i
      }
      plateauBis[i].value = ValueCaseEnum.L
    }
    i++
  }
  return caseAjouer
}

function max (plateau, depth) {
  if (depth === 0 || Game.endGame(plateau)) {
    return evaluation(plateau)
  }
  let max = -10000
  let tmp = null
  let i = 0

  while (plateau.length > i) {
    if (plateau[i].value === ValueCaseEnum.L) {
      plateau[i].value = ValueCaseEnum.X
      tmp = min(plateau, depth - 1)
      if (tmp > max || ((tmp === max) && (Math.random() % 2 === 0))) {
        max = tmp
      }
      plateau[i].value = ValueCaseEnum.L
    }
    i++
  }
  return max
}

function min (plateau, depth) {
  if (depth === 0 || Game.endGame(plateau)) {
    return evaluation(plateau)
  }
  let min = 10000
  let tmp = null
  let i = 0

  while (plateau.length > i) {
    if (plateau[i].value === ValueCaseEnum.L) {
      plateau[i].value = ValueCaseEnum.O
      tmp = max(plateau, depth - 1)
      if (tmp < min || ((tmp === min) && (Math.random() % 2 === 0))) {
        min = tmp
      }
      plateau[i].value = ValueCaseEnum.L
    }
    i++
  }
  return min
}

function evaluation (plateau) {
  let i = 0
  let nbPions = 0
  while (plateau.length > i) {
    // On compte le nombre de pions
    if (plateau[i].value !== ValueCaseEnum.L) {
      nbPions++
    }
    i++
  }
  if (Game.checkWin(players.IA, plateau)) {
    return (1000 - nbPions)
  }

  if (Game.checkWin(players.human, plateau)) {
    return (-1000 + nbPions)
  }
  return Game.nbSeries(ValueCaseEnum.O) - Game.nbSeries(ValueCaseEnum.X)
}
