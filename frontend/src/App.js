import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/Navbar/Navbar"
import Routes from "./components/Routes/Routes"

const App = () => {
  return (
   <div className="root_container">
      <Navbar />
      <Routes />
   </div>
  )
}

export default App;
