import React, { useState } from "react"
import PropTypes from "prop-types"
import { FaSortDown } from "react-icons/fa"

import ResultsTable from "../ResultsTable"
import { translateMonth, translateDays } from "../../../../helpers/monthCalc"

import "./styles.scss"


const ResultsFolder = ({isLoading, sortedTournaments, dateFormattedTournaments, onDelete}) => {
  const [selectedTournaments, setSelectedTournaments] = useState(sortedTournaments)

  const toggleFolder = e => {
    const yearClass = `.year-${e[0]}`
    const monthClass = `.year-${e[0]}-${e[1]}`    
    const target = (e[1] == "year") 
      ? document.querySelector(yearClass) 
      : document.querySelector(monthClass)
    const siblingIcon = target.previousSibling.lastChild
    const itemClassList = Object.values(target.classList)
 
    // TOGGLE YEAR (.results_nav_month)
    if (itemClassList.includes("results_nav_month") && itemClassList.includes("active")){
          siblingIcon.classList.remove("active")
          return target.classList.remove("active")
    }

    if (itemClassList.includes("results_nav_month")) {
        const allYears = Object.values(document.querySelectorAll(".results_nav_month"))
        allYears.map(element => {
          element.previousSibling.lastChild.classList.remove("active")
          element.classList.remove("active")
        })
        siblingIcon.classList.add("active")
        return target.classList.add("active")
    }

    // TOGGLE MONTH (.results_nav_day)
    if (itemClassList.includes("results_nav_day") && itemClassList.includes("active")) {
      siblingIcon.classList.remove("active")
      return target.classList.remove("active")
    }

    if (itemClassList.includes("results_nav_day")) {
      const allMonths = Object.values(document.querySelectorAll(".results_nav_day"))   
      allMonths.map(element => {
        element.previousSibling.lastChild.classList.remove("active")
        element.classList.remove("active")
      })
      siblingIcon.classList.add("active")
      return target.classList.add("active")
    }
    
    target.classList.add("active")
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
            <nav className="results_nav">
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
                       const amountPerMonth = Object.values(sortedTournaments[year][month]).reduce((sum, element) => {
                          return element.length + sum
                        }, 0)
                        return (
                          <li key={index}>
                              <span 
                                onClick={() => toggleFolder([year, month])}
                                >
                                  {translateMonth(month)} ({amountPerMonth})
                                  <FaSortDown className="month_icon" />
                              </span>
                              <ul className={`results_nav_day year-${year}-${month}`}>
                                {Object.keys(sortedTournaments[year]?.[month]).sort().map((day, index) => {
                                  const amountPerDay = sortedTournaments[year][month][day].length
  
                                  return (
                                    <li key={index}>
                                      <span id={`${year}/${month}/${day}`} onClick={selectTournaments}>{translateDays(day)} ({amountPerDay} Tournaments) <FaSortDown className="day_icon" /></span>
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