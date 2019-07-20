import React, { Component } from 'react';
import LiftSelect from './LiftSelect'
import axios from 'axios';
import moment from 'moment';

class LiftData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'selectedLift': null,
            'outputData': null
        }
    }

    getLifts = () => {
        let liftName = this.state.selectedLift;
        if (!liftName) {
            return;
        }
        let endpoint = `/lift-data/get/${liftName}`;
        axios.get(endpoint).then((response) => {
            if (!response.data) {
                //todo error handling
            }
            this.setState({ 'outputData': response.data.data })
        });
    };

    updateSelectedLift = (lift) => {
        if (lift !== this.state.selectedLift && lift.length) {
            this.setState({ 'selectedLift': lift }, this.getLifts);
        }
    }

    render() {
        const { lifts } = this.props;
        const { outputData, selectedLift } = this.state;
        return (
            <>
                <LiftSelect lifts={lifts} getSelectedLift={this.updateSelectedLift} />
                {outputData && typeof outputData.map === 'function' ?
                    (
                        <>
                            <h2>Check it out, {selectedLift}!</h2>
                            {outputData.map((singleLift, index) => {
                                return ( 
                                    <div key={index}> 
                                        <p>{moment(singleLift.date).format('DD-MM-YYYY')}</p>
                                        <p>{singleLift.weight}kg x {singleLift.reps}</p>
                            
                                        <button onClick={() => {alert(`Delete ${singleLift._id}`)}}>Todo Delete</button>
                                    </div>
                                    );
                            })}
                        </>
                    )
                    :
                    <p>Nothing Doing</p>
                }

            </>
        );
    }
}
export default LiftData