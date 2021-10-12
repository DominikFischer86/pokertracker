import React from "react"
import PropTypes from "prop-types"
import { data } from "./graphConfig"
import {  tickValues } from "./helpers"

import { ResponsiveLine } from '@nivo/line'

export const ResponsiveLineContainer = ({ filteredTournaments, toggleRake, tournamentAmount }) => {
    return (
        <ResponsiveLine
                    data={data(filteredTournaments, toggleRake)}
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
                        legend: 'Tournaments Amount',
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
    filteredTournaments: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    toggleRake: PropTypes.bool,
    tournamentAmount: PropTypes.number
}

export const buyInMarks = [
    {
        value: 0,
        scaledValue: 0,
        label: "$0"
      },
      {
        value: 5,
        scaledValue: 5,
        label: "$5"
      },
      {
        value: 10,
        scaledValue: 10,
        label: "$10"
      },
      {
        value: 15,
        scaledValue: 25,
        label: "$25"
      },
      {
        value: 20,
        scaledValue: 50,
        label: "$50"
      },
      {
        value: 25,
        scaledValue: 100,
        label: "$100"
      },
      {
        value: 30,
        scaledValue: 150,
        label: "$150"
      },
      {
        value: 35,
        scaledValue: 500,
        label: "$500"
      },
      {
        value: 40,
        scaledValue: 1000,
        label: "$1k"
      }
]

export const entrantsMarks = [
  {
      value: 0,
      scaledValue: 2,
      label: "2"
    },
    {
      value: 5,
      scaledValue: 3,
      label: "3"
    },
    {
      value: 10,
      scaledValue: 4,
      label: "4"
    },
    {
      value: 15,
      scaledValue: 6,
      label: "6"
    },
    {
      value: 20,
      scaledValue: 9,
      label: "9"
    },
    {
      value: 25,
      scaledValue: 18,
      label: "18"
    },
    {
      value: 30,
      scaledValue: 45, // down here full numbers
      label: "45"
    },
    {
      value: 35,
      scaledValue: 90,
      label: "90"
    },
    {
      value: 40,
      scaledValue: 500,
      label: "500"
    },
    {
      value: 45,
      scaledValue: 1000,
      label: "1000"
    },
    {
      value: 50,
      scaledValue: 5000,
      label: "5000"
    },
    {
      value: 55,
      scaledValue: 10000,
      label: "10000"
    }
]