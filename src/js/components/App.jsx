import React from 'react'
import LiftForm from './LiftForm'
import LiftData from './LiftData'
import ProgressChart from './ProgressChart'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://lvh.me:8080'

const lifts = ['bench_press', 'squat', 'overhead_press', 'deadlift']

const testDeletion = () => {
    Axios.delete('/lift-data/delete/5d04d1c6580d7a26f2fb49b3').then(resp => {
        console.log(resp)
    })
}

const App = () => {
    return (
        <>
            <h1>Stats for Meatheads!</h1>

            <LiftForm lifts={lifts} />
            <LiftData lifts={lifts} />
        </>
    )
}

export default App
