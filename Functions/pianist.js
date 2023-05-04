function pianist(input) {

    let num = input.shift();
    let pieces = [];

    for (let index = 0; index < num; index++) {
        let line = input.shift();
        let [piece, composer, key] = line.split('|');
        pieces.push({ piece, composer, key });
    }

    line = input.shift();
    while (line !== 'Stop') {
        let [cmd, piece, composer, key] = line.split('|');
        let play = pieces.find(p => p.piece === piece);

        switch (cmd) {
            case 'Add':
                if (play) {
                    console.log(`${piece} is already in the collection!`);
                    continue;
                }
                console.log(`${piece} by ${composer} in ${key} added to the collection!`);
                pieces.push({ piece, composer, key });
                break;
            case 'Remove':
                if (play) {
                    pieces.filter(p => p.piece !== piece);
                    console.log(`Successfully removed ${piece}!`);
                    continue;
                }
                console.log(`Invalid operation! ${piece} does not exist in the collection.`);
                break;

            case 'ChangeKey':
                if (play) {
                    console.log(`Changed the key of ${piece} to ${composer}!`);
                    pieces[piece] = composer;
                    continue;
                }
                console.log(`Invalid operation! ${piece} does not exist in the collection.`);
                break;
        }
        line = input.shift();
    }

    for (const {piece, composer, key} of pieces) {
        console.log(`${piece} -> Composer: ${composer}, Key: ${key}`);
    }
}

pianist([
    '3',
    'Fur Elise|Beethoven|A Minor',
    'Moonlight Sonata|Beethoven|C# Minor',
    'Clair de Lune|Debussy|C# Minor',
    'Add|Sonata No.2|Chopin|B Minor',
    'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
    'Add|Fur Elise|Beethoven|C# Minor',
    'Remove|Clair de Lune',
    'ChangeKey|Moonlight Sonata|C# Major',
    'Stop'
]
)