export const createFolders = (tournaments, setSortedTournaments, setDateFormattedTournaments) => {
    let newArray = []

    const selectTournaments = tournaments.reduce((groupedTournaments, allTournaments) => {
        const tournament = allTournaments.startDate
        if (groupedTournaments[tournament] == undefined) groupedTournaments[tournament] = []
        groupedTournaments[tournament].push(allTournaments)
        return groupedTournaments
      }, {})

      setDateFormattedTournaments(selectTournaments)

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

            uniqueDays.forEach((day) => {
                const days = months.filter(tournament => {
                    return tournament.startDate.split("/")[2] === day
                })
 
                return newArray = {
                    ...newArray, [year]: {
                        ...newArray[year], [month]: {
                            ...newArray[year]?.[month], [day]: days
                        }
                    }
                }
            })
        })
    })

    setSortedTournaments(newArray)
}