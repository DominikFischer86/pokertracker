import React from "react"
import { Switch, Route, NavLink } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import HomePage from "./pages/HomePage/homePage"
import ImportPage from "./pages/ImportPage/importPage"
import PlayerAnalysisPage from "./pages/PlayerAnalysisPage/playerAnalysisPage"
import TaxReportPage from "./pages/TaxReportPage/taxReportPage"
import ResultsPage from "./pages/ResultsPage/resultsPage"
import TournamentPage from "./pages/TournamentPage/tournamentPage"
import PlayerPage from "./pages/PlayerPage/playerPage"

function App() {
  return (
   <div className="root_container">
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
           <NavLink to={"/results"} className="nav-link">
             Results
           </NavLink>
         </li>
         <li className="nav-item">
           <NavLink to={"/player-analysis"} className="nav-link">
             Player Analysis
           </NavLink>
         </li>
         <li className="nav-item">
           <NavLink to={"/tax-report"} className="nav-link">
             Tax Report
           </NavLink>
         </li>
       </div>
     </nav>

     <div className="container mt-3">
       <Switch>
            <Route exact path={["/"]} component={HomePage} />
            <Route 
              path="/import"
              render={(props) => (
                <ImportPage {...props} />
              )}
            />
            <Route 
              path="/results"
              render={(props) => (
                <ResultsPage {...props} />
              )}
            />
            <Route
              path="/tournament"
              component={TournamentPage}
            />
            <Route 
              path="/player-analysis"
              render={(props) => (
                <PlayerAnalysisPage {...props} />
              )}
            />
            <Route
              path="/player"
              component={PlayerPage}
            />
            <Route 
              path="/tax-report"
              render={(props) => (
                <TaxReportPage {...props} />
              )}
            />    
       </Switch>
     </div>
   </div>
  );
}

export default App;
