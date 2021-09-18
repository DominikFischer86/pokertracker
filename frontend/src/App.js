import React, { useState } from "react"
import { Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import Login from "./components/login"
import ImportPage from "./components/ImportPage/ImportPage"
import PlayerAnalysisPage from "./components/playerAnalysisPage"
import TaxReportPage from "./components/taxReportPage"
import ResultsPage from "./components/resultsPage"

function App() {
  const [user, setUser] = useState(null)

  const login = async (user = null) => {
    setUser(user)
  }

  const logout = async () => {
    setUser(null)
  }

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
         <li className="nav-item">
           { user ? (
             <button onClick={logout} className="btn nav-link">
               Logout {user.name}
             </button>
           ) : (
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
           )}
         </li>
       </div>
     </nav>

     <div className="container mt-3">
       <Switch>
            <Route exact path={["/", "/results"]} component={ResultsPage} />
            <Route 
              path="/login"
              render={(props) => (
                <Login {...props} login={login} />
              )}
            />  
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
