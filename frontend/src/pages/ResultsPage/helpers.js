export const createFolders = (tournaments, setSortedTournaments) => {
    let newArray = []
    const availableYears = tournaments.map(element => {
      return element.startDate.split("/")[0]          
    })

    const uniqueYears = [...new Set(availableYears)]

    uniqueYears.forEach(year => {
        const years = tournaments.filter(tournament => {
            return tournament.startDate.split("/")[0] === year                
        })

        const availableMonths = years.map(element => {
            return element.startDate.split("/")[1]
        })

        const uniqueMonths = [...new Set(availableMonths)]
        
        uniqueMonths.forEach(month => {
            const months = years.filter(tournament => {
                return tournament.startDate.split("/")[1] === month
            })

            const availableDays = months.map(element => {
                return element.startDate.split("/")[2]
            })

            const uniqueDays = [...new Set(availableDays)]

            uniqueDays.forEach(day => {
                const days = months.filter(tournament => {
                    return tournament.startDate.split("/")[2] === day
                })

                newArray.push( { [year]: { [month]: { [day]: days } } } )
            })
        })
    })

    const sortedTournaments = newArray.reduce((groupedYear, allYears) => {
        const years = Object.keys(allYears)[0]
        if (groupedYear[years] == undefined) groupedYear[years] = []
        groupedYear[years].push(allYears)
        return groupedYear
    }, {})

    setSortedTournaments(sortedTournaments)
}