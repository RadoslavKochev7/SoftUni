function dictionary(array) {

    let dict = {};
    for (let element of array) {
        let currElement = JSON.parse(element);
        let entries = Object.entries(currElement);
        let [term, definition] = [entries[0][0], entries[0][1]];
        dict[term] = definition;
    }

    let sortedDict = Object.entries(dict).sort((a,b) => a[0].localeCompare(b[0]));

    for (const [key, value] of sortedDict) {
        console.log(`Term: ${key} => Definition: ${value}`)
    }
}

dictionary([
    '{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
    '{"Bus":"A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare."}',
    '{"Boiler":"A fuel-burning apparatus or container for heating water."}',
    '{"Tape":"A narrow strip of material, typically used to hold or fasten something."}',
    '{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}'
]
)
