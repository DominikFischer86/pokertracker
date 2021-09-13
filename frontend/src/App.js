import React, { useState } from "react"
import { Switch, Route, Link } from "react-router-dom"
import { Button } from "@material-ui/core"
import "bootstrap/dist/css/bootstrap.min.css"

import AddReview from "./components/addReview"
import Restaurant from "./components/restaurant"
import RestaurantsList from "./components/restaurantsList"
import Login from "./components/login"

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
       <a href="/restaurants" className="navbar-brand">
         Restaurant Reviews
       </a>
       <div className="navbar-nav mr-auto">
         <li className="nav-item">
           <Link to={"/restaurants"} className="nav-link">
             Restaurants
           </Link>
         </li>
         <li className="nav-item">
           { user ? (
             <Button onClick={logout} className="nav-link">
               Logout {user.name}
             </Button>
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
            <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
            <Route 
              path="/restaurants/:id/review"
              render={(props) => (
                <AddReview {...props} user={user} />
              )}
            />
            <Route 
              path="/restaurants/:id"
              render={(props) => (
                <Restaurant {...props} user={user} />
              )}
            />
            <Route 
              path="/login"
              render={(props) => (
                <Login {...props} login={login} />
              )}
            />      
       </Switch>
     </div>
   </div>
  );
}

export default App;
