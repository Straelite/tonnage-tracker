import { Line } from 'react-chartjs-2'
import React from 'react'

const ProgressChart = props => {
    const { liftData } = props

    const chartData = formatDataForChart(liftData)

    //TODO pass this through
    let LiftName = liftData[0].name
    LiftName = LiftName.replace('_', ' ')

    let data = {
        labels: chartData.dates,
        datasets: [
            {
                label: LiftName,
                borderColor: 'rgb(255, 99, 132)',
                data: chartData.weights,
                options: {
                    scales: {
                        yAxes: [
                            {
                                labelString: 'Weight (Kg)',
                            },
                        ],
                        xAxes: [
                            {
                                labelString: 'Date',
                            },
                        ],
                    },
                },
            },
        ],
    }

    return <Line data={data}></Line>
}

const formatDataForChart = liftData => {
    const data = {
        dates: [],
        weights: [],
    }

    liftData.forEach(element => {
        let calculatedOneRepMax = calculateOneRepMax(element)

        data.dates.push(element.date)
        data.weights.push(calculatedOneRepMax)
    })

    return data
}

const calculateOneRepMax = liftData => {
    //Bryzcki formula
    // weight / ( 1.0278 – 0.0278 × reps )
    return liftData.weight / (1.0278 - 0.0278 * liftData.reps)
}

export default ProgressChart
