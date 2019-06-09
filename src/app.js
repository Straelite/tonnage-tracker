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
const handleSaveLiftClick = () => {
    let newLift = new liftData(new Date(), 'bench press', 5, 90);
    let encodedData = encodeLift(newLift);
    saveLift(newLift);
};
    
//Internal Functions
const encodeLift = (liftData) => {
    return JSON.stringify(liftData);
}

const saveLift = (liftDataJson) => {
    const endpoint = '/lift-data/write';
    axios.post(endpoint, liftDataJson).then((response) => {
        console.log(response.data);
    });
}

//Bind Events
const saveLiftButton = document.querySelector('[data-js-save-lift]');
saveLiftButton.addEventListener('click', handleSaveLiftClick);