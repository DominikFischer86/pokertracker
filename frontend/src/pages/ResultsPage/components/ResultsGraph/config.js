import React from "react"
import { oneOfType, array, object, bool, number} from "prop-types"
import { data } from "./graphConfig"

import { ResponsiveLine } from '@nivo/line'

export const ResponsiveLineContainer = ({ filteredTournaments, allTournamentsAmount, rakebackData, toggleBounties, toggleRakeback }) => {
  const tournamentAmount = filteredTournaments.length
  const tournamentRatio = tournamentAmount / allTournamentsAmount
  
    return (
        <ResponsiveLine
            data={data(filteredTournaments, tournamentRatio, rakebackData, toggleBounties, toggleRakeback)}
            colors={d => d.color}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            type="linear"
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                format: "",
                tickSize: 5,
                tickPadding: 10,
                tickRotation: 0,
                tickValues: tickValues(tournamentAmount),
                legend: 'Tournaments',
                legendOffset: 40,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Winnings in $',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            enablePoints={false}
            enableArea={true}
            enableGridX={false}
            isInteractive={true}
            useMesh={true}          
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            />
    )
}

ResponsiveLineContainer.propTypes = {
    filteredTournaments: oneOfType([object,array]),
    allTournamentsAmount: number,
    rakebackData: array,
    toggleBounties: bool,
    toggleRakeback: bool
}


// GRAPH

export const tickValues = tournamentAmount => {               
  let myArray = []
  let factor
  if (tournamentAmount < 10000) factor = 100;
  if (tournamentAmount < 1000) factor = 50;
  if (tournamentAmount < 500) factor = 20;
  if (tournamentAmount < 250) factor = 10;
  if (tournamentAmount < 100) factor = 2;
  if (tournamentAmount < 50) factor = 1;
  
  for (let i = 0; i < tournamentAmount/factor ;i++){
      myArray.push(i*factor)
  }
  return myArray.splice(1)
}