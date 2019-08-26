import React, { Component } from 'react'
import LiftSelect from './LiftSelect'
import axios from 'axios'
import Lift from '../classes/Lift'

class LiftForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            liftsToAdd: [],
        }
    }

    render() {
        const { lifts } = this.props
        const { liftsToAdd } = this.state
        return (
            <>
                {liftsToAdd.map((lift, key) => {
                    return (
                        <div key={key}>
                            <span>{lift.name}</span>
                            <span>{lift.weight}</span>
                            <span>{lift.reps}</span>
                            <span>{lift.date}</span>
                        </div>
                    )
                })}
                <form data-js-save-lift onSubmit={this.handleAddLiftClick}>
                    <input
                        placeholder="Weight"
                        type="number"
                        name="weight"
                        required
                    />
                    <input
                        placeholder="Reps"
                        type="number"
                        name="reps"
                        required
                    />
                    <LiftSelect lifts={lifts} />
                    <input
                        placeholder="Date"
                        name="date"
                        type="date"
                        required
                    />
                    <button>Add</button>
                </form>

                <button onClick={this.handleSaveLiftClick}>Save!</button>
            </>
        )
    }

    handleAddLiftClick = e => {
        e.preventDefault()
        const targetElem = e.target
        let liftInput = new FormData(targetElem)
        let processedLiftData = {}
        liftInput.forEach((value, key) => {
            processedLiftData[key] = value
        })
        let newLift = new Lift(
            processedLiftData.date,
            processedLiftData.liftName,
            processedLiftData.reps,
            processedLiftData.weight
        )

        this.setState({ liftsToAdd: [...this.state.liftsToAdd, newLift] })
    }

    handleSaveLiftClick = () => {
        const { liftsToAdd } = this.state
        const endpoint = '/lift-data/write'
        axios.post(endpoint, liftsToAdd).then(response => {
            this.setState({ liftsToAdd: [] })
        })
    }
}

export default LiftForm
