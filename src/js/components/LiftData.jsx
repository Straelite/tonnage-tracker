import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import LiftSelect from './LiftSelect'
import ProgressChart from './ProgressChart'

class LiftData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLift: null,
            outputData: null,
        }
    }

    getLifts = () => {
        let liftName = this.state.selectedLift
        if (!liftName) {
            return
        }
        let endpoint = `/lift-data/get/${liftName}`
        axios.get(endpoint).then(response => {
            if (!response.data) {
                //todo error handling
            }
            this.setState({ outputData: response.data.data })
        })
    }

    updateSelectedLift = lift => {
        if (lift !== this.state.selectedLift && lift.length) {
            this.setState({ selectedLift: lift }, this.getLifts)
        }
    }

    render() {
        const { lifts } = this.props
        const { outputData, selectedLift } = this.state
        return (
            <>
                <LiftSelect
                    lifts={lifts}
                    getSelectedLift={this.updateSelectedLift}
                />
                {outputData &&
                outputData.length &&
                typeof outputData.map === 'function' ? (
                    <>
                        <h2>Check it out, {selectedLift}!</h2>
                        <ProgressChart liftData={outputData}></ProgressChart>

                        <div className={'weight-table'}>
                            <div className={'weight-table__header'}>
                                <div>Date</div>
                                <div>Weight</div>
                                <div>Reps</div>
                                <div>Options</div>
                            </div>

                            {outputData.map((singleLift, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={'weight-table__rows'}
                                    >
                                        <div>
                                            <p>
                                                {moment(singleLift.date).format(
                                                    'DD-MM-YYYY'
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <p>{singleLift.weight}kg </p>
                                        </div>
                                        <div>
                                            <p>{singleLift.reps}</p>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => {
                                                    alert(
                                                        `Delete ${singleLift._id}`
                                                    )
                                                }}
                                            >
                                                Todo Delete
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                ) : (
                    <p>Nothing Doing</p>
                )}
            </>
        )
    }
}
export default LiftData
