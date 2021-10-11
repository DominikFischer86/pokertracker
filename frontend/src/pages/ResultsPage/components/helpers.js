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
