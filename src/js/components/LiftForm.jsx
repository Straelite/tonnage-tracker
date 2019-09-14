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

                <form className="submissionForm" data-js-save-lift onSubmit={this.handleAddLiftClick}>
                    <div className="submissionForm__group">
                        <div className="submissionForm__wrap">

                            <label className="submissionFrom__label">Which lift?</label>
                            <LiftSelect lifts={lifts} classes="submissionForm__input submissionForm__input--select" />
                        </div>
                        <div className="submissionForm__wrap">

                            <label className="submissionFrom__label">When did you do it?</label>
                            <input className="submissionForm__input"
                                placeholder="Date"
                                name="date"
                                type="date"
                                required
                            />
                        </div>
                    </div>

                    <div className="submissionForm__group">
                        <div className="submissionForm__wrap">
                            <label className="submissionFrom__label">How much did you lift?</label>
                            <input className="submissionForm__input"
                                placeholder="Weight"
                                type="number"
                                name="weight"
                                required
                            />
                        </div>
                        <div className="submissionForm__wrap">

                            <label className="submissionFrom__label">How many reps?</label>
                            <input className="submissionForm__input"
                                placeholder="Reps"
                                type="number"
                                name="reps"
                                required
                            />
                        </div>
                    </div>

                    <div className="submissionForm__group">
                        <div className="submissionForm__wrap">
                            <button className="btn btn__primary">Add</button>
                        </div>
                    </div>

                </form>

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

{liftsToAdd && liftsToAdd.length ? 

                <div className="submissionForm__group">

                    <div className="submissionForm__wrap">
                        <button className="btn btn__primary" onClick={this.handleSaveLiftClick}>
                            Save!</button>
                    </div>

                </div>
                : ''
}
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
