function piccolo(input){
let carNumbers = [];

    for (let line of input) {
        
        let [inOut, carNumber] = line.split(', ');
        if (inOut === 'OUT' && carNumbers.includes(carNumber)) {
            let index = carNumbers.indexOf(carNumber);
            carNumbers.splice(index, 1);
            continue;
        }
        if (!carNumbers.includes(carNumber) && inOut === 'IN') {
            carNumbers.push(carNumber);
        }
    }

    if (carNumbers.length > 0) {
        carNumbers
        .sort((carA, carB) => carA.localeCompare(carB))
        .forEach(car => console.log(car))
        return;
    }

    console.log("Parking Lot is Empty");
}

piccolo(['IN, CA2844AA',
'IN, CA1234TA',
'OUT, CA2844AA',
'IN, CA9999TT',
'IN, CA2866HI',
'OUT, CA1234TA',
'IN, CA2844AA',
'OUT, CA2866HI',
'IN, CA9876HH',
'IN, CA2822UU']
)