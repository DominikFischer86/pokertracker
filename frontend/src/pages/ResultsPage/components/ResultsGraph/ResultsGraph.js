import React, { useState } from "react"
import PropTypes from "prop-types"
import { Switch } from "@react-md/form"
import axios from "axios"

import { OverviewTable } from "./OverviewTable"
import { BuyInSlider } from "./filters/BuyInSlider"
import { EntrantsSlider } from "./filters/EntrantsSlider"
import { ResponsiveLineContainer } from "./config"
import { DateRangePicker } from "./filters/DateRangePicker"

import { ImageDownloadModal } from "../../../../components/Modals/ImageDownloadModal"

import "./styles.scss"

const ResultsGraph = ({tournaments, isLoading}) => {
    const [toggleRake, setToggleRake] = useState(false)
    const [toggleFilter, setToggleFilter] = useState(false)
    const [filteredTournaments, setFilteredTournaments] = useState(tournaments)
    const [activeFilters, setActiveFilters] = useState([])
    const [toggleGraphs, setToggleGraphs] = useState(false)
    const [windowWidthReader, setWindowWidthReader] = useState(900)
    const [dataUri, setDataUri] = useState("")

    const [downloadImageModalIsOpen, setDownloadImageModalIsOpen] = useState(false)
    // const [modalContent, setModalContent] = useState("")

    const tournamentAmount = tournaments?.length

    const createGraphs = () => {
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

    const submitToWeb = async () => {
        const key = "1234"
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${key}`
        const image = JSON.stringify(dataUri)

        try {
            await axios({
                method: "post",
                url,
                data: image,
                headers: {
                    'Content-Type': 'application/json', 
                    'accept': 'application/json'
                  },
            })
                .then(res => {
                    console.log(res)
                    if (res.success) {
                        alert("Image successfully uploaded to imgbb.")
                    }
                })
        } catch (e) {
            console.log(e)
        }
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
            {isLoading && <p>Loading...</p>}
            {!isLoading &&
            <>
                <ImageDownloadModal 
                    imageDownloadModalIsOpen={downloadImageModalIsOpen}
                    closeModal={closeModal}
                    submitToWeb={submitToWeb}
                    imageString={dataUri}
                />
                <div className="overViewTable">
                    <OverviewTable filteredTournaments={filteredTournaments}/>
                </div>
                <div className="graph_wrapper">
                    <ResponsiveLineContainer 
                        filteredTournaments={filteredTournaments} 
                        toggleRake={toggleRake}
                        tournamentAmount={tournamentAmount}
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
    tournaments: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    isLoading: PropTypes.bool
}

export default ResultsGraph