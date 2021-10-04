import React from "react"
import { Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import HomePage from "./pages/HomePage/homePage"
import ImportPage from "./pages/ImportPage/importPage"
import PlayerAnalysisPage from "./pages/PlayerAnalysisPage/playerAnalysisPage"
import TaxReportPage from "./pages/TaxReportPage/taxReportPage"
import ResultsPage from "./pages/ResultsPage/resultsPage"

function App() {
  return (
   <div>
     <nav className="navbar navbar-expand navbar-dark bg-dark">
       <a href="/" className="navbar-brand">
         Pokertracker
       </a>
       <div className="navbar-nav mr-auto">
         <li className="nav-item">
           <Link to={"/import"} className="nav-link">
             Import
           </Link>
         </li>
         <li className="nav-item">
           <Link to={"/results"} className="nav-link">
             Results
           </Link>
         </li>
         <li className="nav-item">
           <Link to={"/player-analysis"} className="nav-link">
             Player Analysis
           </Link>
         </li>
         <li className="nav-item">
           <Link to={"/tax-report"} className="nav-link">
             Tax Report
           </Link>
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
              path="/player-analysis"
              render={(props) => (
                <PlayerAnalysisPage {...props} />
              )}
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
