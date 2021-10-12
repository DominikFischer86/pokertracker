import { buyInMarks } from "./config.js"

// FILTER 
export const scaleValues = valueArray => {
    if (!valueArray[0]){ return [0, scale(valueArray[1])]}
    return [scale(valueArray[0]), scale(valueArray[1])]
}

const scale = (value) => {
    if (!value) return undefined
    const prevMarkIndex = Math.floor(value / 5)
    const prevMark = buyInMarks[prevMarkIndex]
    const remainder = value % 5
    if (remainder === 0) return prevMark.scaledValue
    const nextMark = buyInMarks[prevMarkIndex + 1]
    const increment = (nextMark.scaledValue - prevMark.scaledValue) / 5
    return remainder * increment + prevMark.scaledValue
}

// GRAPH

export const tickValues = tournamentAmount => {               
  let myArray = []
  let factor
  if (tournamentAmount < 10000) factor = 1000;
  if (tournamentAmount < 1000) factor = 100;
  if (tournamentAmount < 500) factor = 20;
  if (tournamentAmount < 250) factor = 5;
  if (tournamentAmount < 10) factor = 1;
  
  for (let i = 0; i < tournamentAmount/factor ;i++){
      myArray.push(i*factor)
  }
  return myArray.splice(1)
}