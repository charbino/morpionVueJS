
import {ValueCaseEnum} from './Enum.js'

export function getNextCaseIA (cases) {
  let result = null
  let continu = true
  let i = 0
  while (cases.length > i && continu) {
    if (cases[i].value === ValueCaseEnum.L) {
      result = i
      continu = false
    }
    i++
  }
  return result
}
