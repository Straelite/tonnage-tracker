import axios from 'axios';
 
let liftData = class {
    constructor (date, name, reps, weight) {
    this.date = date;
    this.name = name,
    this.reps = reps,
    this.weight = weight
    }
};

//User Triggered Functions
const handleSaveLiftSubmit = (e) => {
    e.preventDefault();
    const targetElem = e.target;
    let liftInput = new FormData(targetElem);
    let processedLiftData = {};
    liftInput.forEach((value, key) => {processedLiftData[key] = value});
    let newLift = new liftData(processedLiftData.date, processedLiftData.liftName, processedLiftData.reps, processedLiftData.weight);
    _saveLift(newLift);
};

const _saveLift = (liftDataJson) => {
    const endpoint = '/lift-data/write';
    axios.post(endpoint, liftDataJson).then((response) => {
        console.log(response.data);
    });
}

const getLifts = (e) => {
    e.preventDefault();
    const liftName = document.querySelector('[data-js-liftname').value;
    const endpoint = `/lift-data/get/${liftName}`;
    axios.get(endpoint).then((response) => {
        if (!response.data) {
            //todo error handling
        }
        const output = document.querySelector('[data-js-output]');
        output.append(JSON.stringify(response.data));
    });
};

//Bind Events
const saveLiftButton = document.querySelector('[data-js-save-lift]');
saveLiftButton.addEventListener('submit', handleSaveLiftSubmit);

const getLiftsButton = document.querySelector('[data-js-get-lifts]');
getLiftsButton.addEventListener('click', getLifts);