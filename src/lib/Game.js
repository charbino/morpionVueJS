import {ValueCaseEnum, players} from './Enum.js'

export function jouerCase (indexCase, player, cases) {
  if (cases[indexCase].value !== ValueCaseEnum.L) {
    return false
  }
  if (player === players.human) {
    cases[indexCase].value = ValueCaseEnum.X
  } else {
    cases[indexCase].value = ValueCaseEnum.O
  }
  return true
}
export function checkWin (player, cases) {
  let value = player === players.IA ? ValueCaseEnum.O : ValueCaseEnum.X
  return checkLigne(cases, value) || checkColonne(cases, value) || checkDiagonal(cases, value)
}

export function endGame (cases) {
  // check IA win
  let end = checkLigne(cases, ValueCaseEnum.O) || checkColonne(cases, ValueCaseEnum.O) || checkDiagonal(cases, ValueCaseEnum.O)

  // check USER win
  end &= checkLigne(cases, ValueCaseEnum.X) || checkColonne(cases, ValueCaseEnum.X) || checkDiagonal(cases, ValueCaseEnum.X)

  return end
}

export function checkLigne (cases, value) {
  //  Ligne 1
  if (cases[0].value === cases[1].value &&
    cases[0].value === cases[2].value &&
    cases[0].value !== ValueCaseEnum.L &&
    cases[0].value === value) {
    return true
  }

  //  Ligne 2
  if (cases[3].value === cases[4].value &&
    cases[3].value === cases[5].value &&
    cases[3].value !== ValueCaseEnum.L &&
    cases[3].value === value) {
    return true
  }

  //  Ligne 3
  if (cases[6].value === cases[7].value &&
    cases[6].value === cases[8].value &&
    cases[6].value !== ValueCaseEnum.L &&
    cases[6].value === value) {
    return true
  }
  return false
}

export function checkColonne (cases, value) {
  //  Ligne 1
  if (cases[0].value === cases[3].value &&
    cases[0].value === cases[6].value &&
    cases[0].value !== ValueCaseEnum.L &&
    cases[0].value === value) {
    return true
  }

  //  Ligne 2
  if (cases[1].value === cases[4].value &&
    cases[1].value === cases[7].value &&
    cases[1].value !== ValueCaseEnum.L &&
    cases[1].value === value) {
    return true
  }

  //  Ligne 3
  if (cases[2].value === cases[5].value &&
    cases[2].value === cases[8].value &&
    cases[2].value !== ValueCaseEnum.L &&
    cases[2].value === value) {
    return true
  }
  return false
}

export function checkDiagonal (cases, value) {
  //  Ligne 1
  if (cases[0].value === cases[4].value &&
    cases[0].value === cases[8].value &&
    cases[0].value !== ValueCaseEnum.L &&
    cases[0].value === value) {
    return true
  }

  //  Ligne 2
  if (cases[2].value === cases[4].value &&
    cases[2].value === cases[6].value &&
    cases[2].value !== ValueCaseEnum.L &&
    cases[2].value === value) {
    return true
  }
  return false
}

export function checkEgalite (cases) {
  let result = true
  let continu = true
  let i = 0
  while (cases.length > i && continu) {
    if (cases[i].value === ValueCaseEnum.L) {
      result = false
      continu = false
    }
    i++
  }
  return result
}

export function nbSeries (cases, valueCase) {
  return nbSerieLigne(cases, valueCase) + nbSerieColonne(cases, valueCase) + nbSerieDiagonal(cases, valueCase)
}

// nombre de serie de deux en ligne
function nbSerieLigne (cases, valueCase) {
  let serie = 0

  if ((cases[0].value === valueCase &&
      cases[0].value === cases[1].value) ||
      (cases[1].value === valueCase &&
          cases[1].value === cases[2].value)) {
    serie++
  }
  if ((cases[3].value === valueCase &&
          cases[3].value === cases[4].value) ||
      (cases[4].value === valueCase &&
          cases[4].value === cases[5].value)) {
    serie++
  }
  if ((cases[6].value === valueCase &&
          cases[6].value === cases[7].value) ||
      (cases[7].value === valueCase &&
          cases[7].value === cases[8].value)) {
    serie++
  }

  return serie
}

// nombre de serie de deux en colonne
function nbSerieColonne (cases, valueCase) {
  let serie = 0

  if ((cases[0].value === valueCase &&
          cases[0].value === cases[3].value) ||
      (cases[3].value === valueCase &&
          cases[3].value === cases[6].value)) {
    serie++
  }
  if ((cases[1].value === valueCase &&
          cases[1].value === cases[4].value) ||
      (cases[4].value === valueCase &&
          cases[4].value === cases[7].value)) {
    serie++
  }
  if ((cases[2].value === valueCase &&
          cases[2].value === cases[5].value) ||
      (cases[5].value === valueCase &&
          cases[5].value === cases[8].value)) {
    serie++
  }

  return serie
}

// nombre de serie de deux en colonne
function nbSerieDiagonal (cases, valueCase) {
  let serie = 0

  if ((cases[4].value === valueCase &&
          cases[4].value === cases[0].value) ||
      (cases[4].value === valueCase &&
          cases[4].value === cases[8].value)) {
    serie++
  }
  if ((cases[5].value === valueCase &&
          cases[5].value === cases[2].value) ||
      (cases[5].value === valueCase &&
          cases[5].value === cases[6].value)) {
    serie++
  }

  return serie
}
