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
import HandReplayer from "../../pages/HandReplayer/HandReplayer"

const Routes = () => {
    return (
        <div className="container mt-3">
        <Switch>
             <Route exact path={["/"]} component={HomePage} />
             <Route
               path="/import"
               component={ImportPage}
             />
              <Route
               path="/rakeback-manager"
               component={RakebackManager}
             />
             <Route
               path="/results"
               component={ResultsPage}
             />
             <Route
               path="/tournament"
               component={TournamentPage}
             />
             <Route
               path="/hand-replayer"
               component={HandReplayer}
             />
             <Route
               path="/player-analysis"
               component={PlayerAnalysisPage}
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
