import "./index.scss"
import React, { createContext } from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom"

const meta = {
  heroName: "KeinKönich"
}
export const MetaContext = createContext(meta)

ReactDOM.render(
  <BrowserRouter>
    <MetaContext.Provider value={meta}>
      <App />
    </MetaContext.Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
