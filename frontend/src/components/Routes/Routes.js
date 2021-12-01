import React from "react"
import { Switch, Route } from "react-router-dom"

import HomePage from "../../pages/HomePage/HomePage"
import ImportPage from "../../pages/ImportPage/ImportPage"
import PlayerAnalysisPage from "../../pages/PlayerAnalysisPage/PlayerAnalysisPage"
// import TaxReportPage from "../../pages/TaxReportPage/TaxReportPage"
import ResultsPage from "../../pages/ResultsPage/ResultsPage"
import TournamentPage from "../../pages/TournamentPage/TournamentPage"
import PlayerPage from "../../pages/PlayerPage/PlayerPage"
import RakebackManager from "../../pages/RakebackManager/RakebackManager"

const Routes = () => {
    return (
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
               path="/rakeback-manager"
               render={(props) => (
                 <RakebackManager {...props} />
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
             {/*
             <Route 
               path="/tax-report"
               render={(props) => (
                 <TaxReportPage {...props} />
               )}
             />   
            */} 
        </Switch>
      </div>
    )
}

export default Routes