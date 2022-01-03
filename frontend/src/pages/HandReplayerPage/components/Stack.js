import React from "react"
import { number, array } from "prop-types"

import "./styles/Stack.scss"

const Stack = ({chips, stackAmount}) => 
    chips.map(chip => <div key={chip} className={`coin color-${stackAmount}`} style={{bottom: 5 * chip-8 + 'px'}}></div>)


Stack.propTypes = {
    chips: array,
    stackAmount: number
}

export default Stack