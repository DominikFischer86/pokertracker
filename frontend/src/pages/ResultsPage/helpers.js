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

export const translateMonth = monthNumber => {
    if (monthNumber == undefined) return
    const index = parseFloat(monthNumber)
    return monthNames[index-1]
}

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

export const translateDays = dayNumber => {
    if (dayNumber == undefined) return
    const index = parseFloat(dayNumber)
    return dayNames[index-1]
}

const dayNames = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
    "13th",
    "14th",
    "15th",
    "16th",
    "17th",
    "18th",
    "19th",
    "20th",
    "21st",
    "22nd",
    "23rd",
    "24th",
    "25th",
    "26th",
    "27th",
    "28th",
    "29th",
    "30th",
    "31st",
]