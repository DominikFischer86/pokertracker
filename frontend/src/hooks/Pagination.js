import React from "react"
import { number, func } from "prop-types"

import "./hooks.scss"

export const Pagination = ({ entriesPerPage, totalEntries, paginate }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); i++) {
        pageNumbers.push(i)
    }


    const changePage = (event, number) => {
        const clickedElement = event.target
        const allElements = document.querySelectorAll(".page-link")
        const classList = clickedElement.classList
        allElements.forEach(element => element.classList.remove("active"))

        classList.forEach(item => {
            if (item === `page-${number}`) classList.add("active")
        })
        paginate(number)
    }

    return (
        <nav className="paginationNav">
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={(event) => changePage(event, number)} className={`page-link page-${number}`}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    entriesPerPage: number,
    totalEntries: number,
    paginate: func
}