import React, { useEffect } from "react"

import { BackgroundCoin } from "../../components/BackgroundCoin/BackgroundCoin"

const HomePage = () => {
    useEffect(() => {
        document.title = "StarsTracker - Home"
    }, [])
    return (
        <div>
            <BackgroundCoin />
        </div>
    )
}

export default HomePage
