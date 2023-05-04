function solve(input) {
    const commands = {
        'Retake': retakeFunc,
        'Trouble': troubleFunc,
        'Rage': rageFunc,
        'Miracle': miracleFunc
    };

    let horses = input.shift().split('|');
    let cmd = input.shift();
    while (cmd !== 'Finish') {
        cmd = cmd.toString().split(' ');
        let currCmd = cmd.shift();

        commands[currCmd](cmd.toString())

        cmd = input.shift();
    }

    console.log(horses.join('->'));
    console.log(`The winner is: ${horses[horses.length - 1]}`)

    function retakeFunc(input) {
        let overtaking = input.split(',')[0];
        let overtaken = input.split(',')[1];
        let overtakingIndex = horses.indexOf(overtaking);
        let overtakenIndex = horses.indexOf(overtaken);

        if (overtakingIndex < overtakenIndex) {
            horses[overtakenIndex] = overtaking;
            horses[overtakingIndex] = overtaken;

            console.log(`${overtaking} retakes ${overtaken}.`)
        }
    }

    function troubleFunc(horseName) {
        let index = horses.indexOf(horseName);
        if (index > 0) {
            let horsetoSwap = horses[index - 1];
            horses[index] = horsetoSwap;
            horses[index - 1] = horseName;

            console.log(`Trouble for ${horseName} - drops one position.`)
        }
    }

    function rageFunc(horseName) {
        let index = horses.indexOf(horseName);
        if (horses.length - 1 === index) {
            return;
        }
        if (horses.length - 2 === index) {
            let onePositionAhead = horses[index + 1];
            horses[index + 1] = horseName;
            horses[index] = onePositionAhead;
            return;
        }

        let horseTwoPositionsAhead = horses[index + 2];
        let onePositionAhead = horses[index + 1];
        horses[index + 2] = horseName;
        horses[index + 1] = horseTwoPositionsAhead;
        horses[index] = onePositionAhead;

        console.log(`${horseName} rages 2 positions ahead.`)
    }

    function miracleFunc() {
    console.log(horses.join('->'));

        let first = horses.shift();
        horses.push(first)

        console.log(`What a miracle - ${horses[horses.length - 1]} becomes first.`)
    }
}

// solve((
//     ['Bella|Alexia|Sugar',
//         'Retake Alexia Sugar',
//         'Rage Bella',
//         'Trouble Bella',
//         'Finish'])
// )

solve((['Onyx|Domino|Sugar|Fiona',
    'Trouble Onyx',
    'Retake Onyx Sugar',
    'Rage Domino',
    'Miracle',
    'Finish'])
)

// solve((['Fancy|Lilly',
//     'Retake Lilly Fancy',
//     'Trouble Lilly',
//     'Trouble Lilly',
//     'Finish',
//     'Rage Lilly'])
// )

