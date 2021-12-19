export const buyInMarks = [
    {
        value: 0,
        scaledValue: 0,
        label: "$0"
      },
      {
        value: 5,
        scaledValue: 5,
        label: "$5"
      },
      {
        value: 10,
        scaledValue: 10,
        label: "$10"
      },
      {
        value: 15,
        scaledValue: 25,
        label: "$25"
      },
      {
        value: 20,
        scaledValue: 50,
        label: "$50"
      },
      {
        value: 25,
        scaledValue: 100,
        label: "$100"
      },
      {
        value: 30,
        scaledValue: 150,
        label: "$150"
      },
      {
        value: 35,
        scaledValue: 500,
        label: "$500"
      },
      {
        value: 40,
        scaledValue: 1000,
        label: "$1k"
      }
]

export const entrantsMarks = [
  {
      value: 0,
      scaledValue: 2,
      label: "2"
    },
    {
      value: 5,
      scaledValue: 3,
      label: "3"
    },
    {
      value: 10,
      scaledValue: 4,
      label: "4"
    },
    {
      value: 15,
      scaledValue: 6,
      label: "6"
    },
    {
      value: 20,
      scaledValue: 9,
      label: "9"
    },
    {
      value: 25,
      scaledValue: 18,
      label: "18"
    },
    {
      value: 30,
      scaledValue: 45, // down here full numbers
      label: "45"
    },
    {
      value: 35,
      scaledValue: 90,
      label: "90"
    },
    {
      value: 40,
      scaledValue: 500,
      label: "500"
    },
    {
      value: 45,
      scaledValue: 1000,
      label: "1000"
    },
    {
      value: 50,
      scaledValue: 5000,
      label: "5000"
    },
    {
      value: 55,
      scaledValue: 10000,
      label: "10000"
    }
]

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