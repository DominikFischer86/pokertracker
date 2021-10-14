import React, { useState } from "react"
import { Button } from "@react-md/button"
import { Collapse } from "@react-md/transition"

import ResultsTable from "../ResultsTable"

export const ResultsFolder = () => {
  const [collapsed, setCollapsed] = useState(true)
  return (
    <>
      <Button onClick={() => setCollapsed(!collapsed)}>Toggle 1</Button>
      <Button onClick={() => setCollapsed(!collapsed)}>Toggle 2</Button>
      <Button onClick={() => setCollapsed(!collapsed)}>Toggle 3</Button>
      <Button onClick={() => setCollapsed(!collapsed)}>Toggle 4</Button>
      <Collapse collapsed={collapsed}>
        <ResultsTable />
      </Collapse>
    </>
  )
}