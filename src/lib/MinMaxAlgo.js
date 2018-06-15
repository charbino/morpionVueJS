import {ValueCaseEnum, players} from './Enum.js'
import * as Game from './Game'

export function getCaseIA (cases, depth) {
  console.log('Algo Min max IA')
  let plateauBis = cases
  let max = -10000
  let caseAjouer = 0
  let i = 0
  let tmp = 0
  while (plateauBis.length > i) {
    if (plateauBis[i].value === ValueCaseEnum.L) {
      plateauBis[i].value = ValueCaseEnum.O
      tmp = min(plateauBis, depth - 1)
      if (tmp > max) {
        max = tmp
        caseAjouer = i
      }
      plateauBis[i].value = ValueCaseEnum.L
    }
    i++
  }
  console.log(`Case à jouer : ${caseAjouer}`)
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
      if (tmp > max) {
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
      if (tmp < min) {
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
  return 0
}
