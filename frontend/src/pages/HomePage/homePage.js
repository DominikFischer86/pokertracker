import React, { useContext } from "react"

import Spinner from "../../components/Spinner/Spinner"
import { MetaContext } from "../../index"

const HomePage = () => {
    const { appName } = useContext(MetaContext)

    return (
        <div>
           <Spinner message={appName} />
        </div>
    )
}

export default HomePage
