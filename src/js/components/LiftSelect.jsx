import React, { useState, useEffect } from 'react'

const LiftSelect = props => {
    const { lifts, getSelectedLift, classes } = props
    const [selectedLift, setSelectedLift] = useState(lifts[0])

    const handleLiftSelected = e => {
        let newSelectedLift = e.target.value
        setSelectedLift(newSelectedLift)
        if (getSelectedLift) {
            getSelectedLift(selectedLift)
        }
    }

    useEffect(() => {
        if (getSelectedLift && selectedLift) {
            getSelectedLift(selectedLift)
        }
    })

    const options = lifts.map(liftName => (
        <option key={liftName} value={liftName}>
            {liftName.replace('_', ' ')}
        </option>
    ))

    return (
        <div className="submissionForm">
            <div className="submissionForm__group">
                <div className="submissionForm__wrap">
                    <select
                        name="liftName"
                        required
                        onChange={handleLiftSelected}
                        className={classes ? classes : ''}
                        className="submissionForm__input submissionForm__input--select"
                    >
                        {options}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default LiftSelect
