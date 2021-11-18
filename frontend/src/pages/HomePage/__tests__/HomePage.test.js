import React from 'react'
import { render } from "@testing-library/react"
import HomePage from '../homePage'

describe("HomePage", () => {
  it("renders", () => {
    const { getByText } = render(<HomePage />)
    expect(getByText("HomePage")).toBeInTheDocument()
  })
})
