import React, { useState } from "react"
import { object, array, oneOfType, bool } from "prop-types"
import { Switch } from "@react-md/form"

import { OverviewTable } from "./OverviewTable"
import { BuyInSlider } from "./filters/BuyInSlider"
import { EntrantsSlider } from "./filters/EntrantsSlider"
import { ResponsiveLineContainer } from "./config"
import { DateRangePicker } from "./filters/DateRangePicker"

import { ImageDownloadModal } from "../../../../components/Modals/ImageDownloadModal"
import Spinner from "../../../../components/Spinner/Spinner"

import "./styles.scss"

const ResultsGraph = ({tournaments, rakebackData, isLoading}) => {
    const [toggleRake, setToggleRake] = useState(false)
    const [toggleBounties, setToggleBounties] = useState(false)
    const [toggleFilter, setToggleFilter] = useState(false)
    const [filteredTournaments, setFilteredTournaments] = useState(tournaments)
    const [activeFilters, setActiveFilters] = useState([])
    const [toggleGraphs, setToggleGraphs] = useState(false)
    const [windowWidthReader, setWindowWidthReader] = useState(900)
    const [dataUri, setDataUri] = useState("")

    const [downloadImageModalIsOpen, setDownloadImageModalIsOpen] = useState(false)

    const createGraphs = () => {
        document.querySelector(".graph_wrapper svg rect").setAttribute("fill", "white")
        setWindowWidthReader(window.innerWidth)
        setToggleGraphs(true)        
        svgTojpg()
    }

    const svgTojpg = async () => {
        let svgString = new XMLSerializer().serializeToString(document.querySelector(".graph_wrapper svg"))
        await setToggleGraphs(true)
        let canvas = document.getElementById("canvas")
        let ctx = canvas.getContext("2d")
        let DOMURL = self.Url || self.webkitURL || self
        let img = new Image()
        var svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8"})
        let url = DOMURL.createObjectURL(svg)
    
        img.onload = () => {
            ctx.drawImage(img, 0, 0)
            let jpg = canvas.toDataURL("image/jpg")
            setDataUri(jpg)
            document.querySelector("#jpg-container").innerHTML = `<img src=${url} />`
            DOMURL.revokeObjectURL(jpg)
        }

        img.src = url
        
        openModal()
    }

    const openModal = () => {
        setDownloadImageModalIsOpen(true)
    }

    const closeModal = () => {
        setDownloadImageModalIsOpen(false)
        setDataUri("")        
    }

    const filterTournaments = filterType => {
        let filterResult
        let hasSameElements
        const values = filterType[0]
        const type = filterType[1]
        
        switch(type){
            case "buy-in-slider":
                filterResult = filteredTournaments.filter(element => {
                    return element.buyIn >= values[0] && element.buyIn <= values[1]
                })      
                if (filterResult.length < 1) return alert("No tournaments left. Use less restrictive filters.")
                hasSameElements = activeFilters.some(element => element === type)
                if (hasSameElements) return
                activeFilters.push(type)
                setActiveFilters(activeFilters)
                break
            case "entrants-slider":
                filterResult = filteredTournaments.filter(element => {
                    return element.playerAmount >= values[0] && element.playerAmount <= values[1]
                })      
                if (filterResult.length < 1) return alert("No tournaments left. Use less restrictive filters.")
                hasSameElements = activeFilters.some(element => element === type)
                if (hasSameElements) return
                activeFilters.push(type)
                setActiveFilters(activeFilters)
                break
            case "date_range_picker":
                filterResult = filteredTournaments.filter(element => {
                    return element.timeStamp >= values[0] && element.timeStamp <= values[1]
                })      
                if (filterResult.length < 1) return alert("No tournaments left. Use less restrictive filters.")
                hasSameElements = activeFilters.some(element => element === type)
                if (hasSameElements) return
                activeFilters.push(type)
                setActiveFilters(activeFilters)
                break
            case "reset":
                filterResult = tournaments
                setActiveFilters([])
                break
            default:
                filterResult = tournaments
        }
        
        setFilteredTournaments(filterResult)
    }

    if (!tournaments) isLoading = true
    return (
        <div className="pb-4">
            {isLoading && <Spinner />}
            {!isLoading &&
            <>
                <ImageDownloadModal 
                    imageDownloadModalIsOpen={downloadImageModalIsOpen}
                    closeModal={closeModal}
                    imageString={dataUri}
                />
                <div className="overViewTable">
                    <OverviewTable filteredTournaments={filteredTournaments} rakebackData={rakebackData} />
                </div>
                <div className="graph_wrapper">
                    <ResponsiveLineContainer 
                        filteredTournaments={filteredTournaments} 
                        toggleRake={toggleRake}
                        toggleBounties={toggleBounties}
                    />
                </div>
                <div className="switch_list">
                    <Switch 
                        id="rake-switcher" 
                        name="rake-switcher" 
                        label={!toggleRake ? "Show Rake" : "Hide Rake"}
                        onChange={() => setToggleRake(!toggleRake)} 
                    />
                    <Switch 
                        id="bounty-switcher" 
                        name="bounty-switcher" 
                        label={!toggleBounties ? "Show Bounties" : "Hide Bounties"}
                        onChange={() => setToggleBounties(!toggleBounties)} 
                    />
                    <Switch 
                        id="filter-switcher" 
                        name="filter-switcher" 
                        label={!toggleFilter ? "Show Filter" : "Hide Filter"}
                        onChange={() => setToggleFilter(!toggleFilter)} 
                    />
                    {windowWidthReader > 899 &&
                        <button onClick={createGraphs}>Save image</button>
                    }                    
                    </div>
                <hr />
                <div style={toggleFilter ? {opacity: "100"}: {opacity: "0", pointerEvents: "none"}} className="filter_list">
                    <div className="row">
                        <div className="col-lg-10">                             
                            <BuyInSlider width={600} activeFilters={activeFilters} onBuyInSliderSubmit={filterTournaments} />
                            <hr />
                            <EntrantsSlider width={600} activeFilters={activeFilters} onEntrantsSliderSubmit={filterTournaments} />
                            <hr />
                            <DateRangePicker activeFilters={activeFilters} onDateRangePickerSubmit={filterTournaments}/>
                        </div>
                        <div className="col-lg-2 reset_button_container">
                            <span>
                                <button className="reset_button" onClick={() => filterTournaments([[], "reset"])}>
                                    Remove Filter
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                {toggleGraphs &&
                    <>
                        <canvas 
                            id="canvas" 
                            width={document.querySelector(".graph_wrapper").offsetWidth}
                            height={document.querySelector(".graph_wrapper").offsetWidth * 0.6 - (windowWidthReader / 5)}
                        >                            
                        </canvas>
                        <div id="jpg-container"></div> 
                    </>
                }
            </>   
            }    
        </div>
    )
}

ResultsGraph.propTypes = {
    rakebackData: array,
    tournaments: oneOfType([object,array]),
    isLoading: bool
}

export default ResultsGraph