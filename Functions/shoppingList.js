function shoppingList(input) {

    const commands = {
        'Urgent': urgent,
        'Unnecessary': unnecessary,
        'Correct': correct,
        'Rearrange': rearrange
    };

    let groceries = input.shift().split('!');

    for (const line of input) {
        if (line === 'Go Shopping!') {
            break;
        }

        let currLine = line.split(' ');
        let cmd = currLine.shift();
        commands[cmd](currLine.toString());
    }

    console.log(groceries.join(', '));

    function urgent(item) {
        if (!groceries.includes(item)) {
            groceries.unshift(item);
        }
    }

    function unnecessary(item) {
        if (groceries.includes(item)) {
            let index = groceries.indexOf(item);
            groceries.splice(index, 1);
        }
    }

    function correct(items) {
        const [oldItem, newItem] = items.split(',');
        if (groceries.includes(oldItem)) {
            let index = groceries.indexOf(oldItem);
            groceries[index] = newItem;
        }
    }

    function rearrange(item) {
        if (groceries.includes(item)) {
            let index = groceries.indexOf(item);
            let newItem = groceries.splice(index, 1);
            groceries.push(newItem);
        }
    }
}


shoppingList(
    ["Tomatoes!Potatoes!Bread",
        "Unnecessary Milk",
        "Urgent Tomatoes",
        "Go Shopping!"]
);


shoppingList(
    ["Milk!Pepper!Salt!Water!Banana",
        "Urgent Salt",
        "Unnecessary Grapes",
        "Correct Pepper Onion",
        "Rearrange Grapes",
        "Correct Tomatoes Potatoes",
        "Go Shopping!"]
);
