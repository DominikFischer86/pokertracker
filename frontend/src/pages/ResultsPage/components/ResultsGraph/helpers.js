import { buyInMarks, entrantsMarks } from "./config.js"

// FILTER 
export const buyInScaleValues = valueArray => {
    if (!valueArray[0]){ return [0, buyInscale(valueArray[1])]}
    return [buyInscale(valueArray[0]), buyInscale(valueArray[1])]
}

export const entrantsScaleValues = valueArray => {
  if (!valueArray[0]){ return [0, entrantsScale(valueArray[1])]}
  return [entrantsScale(valueArray[0]), entrantsScale(valueArray[1])]
}

const buyInscale = (value) => {
    if (!value) return undefined
    const prevMarkIndex = Math.floor(value / 5)
    const prevMark = buyInMarks[prevMarkIndex]
    const remainder = value % 5
    if (remainder === 0) return prevMark.scaledValue
    const nextMark = buyInMarks[prevMarkIndex + 1]
    const increment = (nextMark.scaledValue - prevMark.scaledValue) / 5
    return remainder * increment + prevMark.scaledValue
}

const entrantsScale = (value) => {
  if (!value) return undefined
  const prevMarkIndex = Math.floor(value / 5)
  const prevMark = entrantsMarks[prevMarkIndex]
  const remainder = value % 5
  if (remainder === 0) return prevMark.scaledValue
  const nextMark = entrantsMarks[prevMarkIndex + 1]
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