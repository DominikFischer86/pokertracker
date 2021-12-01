import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { MetaContext } from "../../index"


const Navbar = () => {
    const { heroName } = useContext(MetaContext)

    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Pokertracker
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to={"/import"} className="nav-link">
              Import
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/rakeback-manager"} className="nav-link">
              Rakeback Manager
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/results"} className="nav-link">
              Tournament Results
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/player-analysis"} className="nav-link">
              Player Analysis
            </NavLink>
          </li>
          <li className="nav-item disabled">
            <NavLink to={"/tax-report"} className="nav-link">
              Tax Report
            </NavLink>
          </li>
        </div>
        <p className="navbar hero">Hero: {heroName}</p>
      </nav>
    )
}

export default Navbar