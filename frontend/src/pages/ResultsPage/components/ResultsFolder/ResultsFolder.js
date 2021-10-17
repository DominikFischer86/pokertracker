import React, { useState } from "react"
import PropTypes from "prop-types"
import { FaSortDown } from "react-icons/fa"

import ResultsTable from "../ResultsTable"
import { translateMonth, translateDays } from "../../helpers"

import "./styles.scss"


const ResultsFolder = ({isLoading, sortedTournaments, dateFormattedTournaments, onDelete}) => {
  const [selectedTournaments, setSelectedTournaments] = useState(sortedTournaments)  

  const toggleFolder = e => {
    console.log(e)
    const target = (e[1] == "year") 
      ? document.querySelector(`.year-${e[0]}`) 
      : document.querySelector(`.month-${e[0]}`)
    const sibling = target.previousSibling
    console.log(target)
    if (target.classList.contains("active")) {
      target.classList.remove("active")
      sibling.classList.remove("active")
    }

    // Remove all active classes
    const allElements = (e[1] == "year")
      ? Object.values(document.querySelectorAll(".results_nav_year")).concat(Object.values(document.querySelectorAll(".results_nav_year li span")))
      : Object.values(document.querySelectorAll(".results_nav_month")).concat(Object.values(document.querySelectorAll(".results_nav_year li span")))
    allElements.map(element => {
      element.classList.remove("active")
    })
        
    target.classList.add("active")
    sibling.classList.add("active")
  }

  const selectTournaments = e => {
    // Remove all active classes
    const allElements = Object.values(document.querySelectorAll(".results_nav_day li span"))
    allElements.map(element => {
      element.classList.remove("active")
    })
    
    // Set new single active class
    const target = e.target
    const date = target.id
    target.classList.add("active")
    setSelectedTournaments(dateFormattedTournaments[date])
  }

  const allTournamentDates = Object.keys(dateFormattedTournaments)
  const lastSessionTournaments = Object.values(dateFormattedTournaments)[allTournamentDates.length-1]

  return (
    <>
     {isLoading && <p>Loading...</p>}
     {!isLoading && selectedTournaments &&
     <>
         <div className="row">
          <div className="col-lg-3">
            <h3>Choose folder</h3>
            <nav>
              <ul className={`results_nav_year`}>
                {Object.keys(sortedTournaments).map((year, index) => {
                  return (
                    <li key={index}>
                    <span 
                      onClick={() => toggleFolder([year, "year"])}>
                        {year} 
                        <FaSortDown className="year_icon" />
                    </span>
                    <ul className={`results_nav_month year-${year}`}>
                      {Object.keys(sortedTournaments[year]).sort().map((month, index) => {
                        return (
                          <li key={index}>
                              <span 
                                onClick={() => toggleFolder([translateMonth(month), "month"])}
                                >
                                  {translateMonth(month)} 
                                  <FaSortDown className="month_icon" />
                              </span>
                              <ul className={`results_nav_day year-${year} month-${translateMonth(month)}`}>
                                {Object.keys(sortedTournaments[year]?.[month]).sort().map((day, index) => {

                                  return (
                                    <li key={index}>
                                      <span id={`${year}/${month}/${day}`} onClick={selectTournaments}>{translateDays(day)} <FaSortDown className="day_icon" /></span>
                                    </li>
                                   )
                                  })
                                }
                              </ul>
                          </li>
                        )
                      })}
                      
                    </ul>
                  </li>
                  )
                })                 
                }                
              </ul>
            </nav>
          </div>
          <div className="col-lg-9">
          {isLoading && <p>Loading...</p>}
            {selectedTournaments.length < 1 && 
              <>
              <h3>Last session results from {lastSessionTournaments?.[0]?.startDate}</h3>
                <ResultsTable
                  tournaments={lastSessionTournaments}
                  isLoading={isLoading}
                  onDelete={onDelete} 
                />
            </>
            }            
            {!isLoading && selectedTournaments.length > 0 &&
            <>
              <h3>{selectedTournaments?.length} results from {selectedTournaments?.[0]?.startDate}</h3>
                <ResultsTable
                  tournaments={selectedTournaments}
                  isLoading={isLoading}
                  onDelete={onDelete} 
                />
            </>
            }            
          </div>
        </div>
      </>
      }
    </>
  )
}

ResultsFolder.propTypes = {
  sortedTournaments: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
  ]),
  dateFormattedTournaments: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
]),
  isLoading: PropTypes.bool,
  onDelete: PropTypes.func
}

export default ResultsFolder