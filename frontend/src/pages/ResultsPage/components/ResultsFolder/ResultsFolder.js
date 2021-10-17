import React, { useState } from "react"
import PropTypes from "prop-types"
import { FaSortDown } from "react-icons/fa"

import ResultsTable from "../ResultsTable"
import { translateMonth, translateDays } from "../../helpers"

import "./styles.scss"


const ResultsFolder = ({isLoading, sortedTournaments, dateFormattedTournaments, onDelete}) => {
  const [selectedTournaments, setSelectedTournaments] = useState(sortedTournaments)

  const selectTournaments = e => {
    const date = e.target.id
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
              <ul className="results_nav_year">
                {Object.keys(sortedTournaments).map((year, index) => {
                  return (
                    <li key={index}>
                    <span>{year} <FaSortDown className="year_icon" /></span>
                    <ul className="results_nav_month">
                      {Object.keys(sortedTournaments[year]).map((month, index) => {
                        return (
                          <li key={index}>
                              <span>{translateMonth(month)} <FaSortDown className="month_icon" /></span>
                              <ul className="results_nav_day">
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