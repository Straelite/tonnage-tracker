import React, { useState, useEffect } from 'react'

const LiftSelect = props => {
    const { lifts, getSelectedLift } = props
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
        <select name="liftName" required onChange={handleLiftSelected}>
            {options}
        </select>
    )
}

export default LiftSelect
