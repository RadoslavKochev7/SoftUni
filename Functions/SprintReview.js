function solve(data) {
    let amount = Number(data.shift());
    let tasks = {};

    const statuses = {
        'ToDo': 0,
        'In Progress': 0,
        'Code Review': 0,
        'Done': 0
    };

    for (let i = 0; i < amount; i++) {
        let [assignee, taskId, title, status, estimatedPoints] = data.shift().split(':');
        if (!tasks.hasOwnProperty(assignee)) {
            tasks[assignee] = {
                tasks: [{
                    taskId, title, status, estimatedPoints
                }]
            }
            statuses[status] += Number(estimatedPoints);
        }
        else {
            tasks[assignee].tasks.push({ taskId, title, status, estimatedPoints });
            statuses[status] += Number(estimatedPoints);
        }

    }

    for (const line of data) {
        let currLine = line.split(':');
        let cmd = currLine.shift();

        if (cmd === 'Add New') {
            let [assignee, taskId, title, status, estimatedPoints] = currLine;
            if (tasks.hasOwnProperty(assignee) && !tasks[assignee].tasks.includes(t => t.taskId === taskId)) {
                tasks[assignee].tasks.push({ taskId, title, status, estimatedPoints });
                statuses[status] += Number(estimatedPoints);

            } else {
                console.log(`Assignee ${assignee} does not exist on the board!`);
            }
        }
        else if (cmd === 'Change Status') {
            let [assignee, taskId, newStatus] = currLine;
            if (!tasks.hasOwnProperty(assignee)) {
                console.log(`Assignee ${assignee} does not exist on the board!`);
                continue;
            }
            let task = tasks[assignee].tasks.find(t => t.taskId === taskId);
            if (task) {
                statuses[task.status] -= Number(task.estimatedPoints);
                statuses[newStatus] += Number(task.estimatedPoints);
                task.status = newStatus;
            } else {
                console.log(`Task with ID ${taskId} does not exist for ${assignee}!`)
            }
        }
        else if (cmd === 'Remove Task') {
            let [assignee, index] = currLine;
            index = Number(index);
            if (!tasks.hasOwnProperty(assignee)) {
                console.log(`Assignee ${assignee} does not exist on the board!`)
            }
            else if (tasks[assignee].tasks.length <= index || index < 0) {
                console.log("Index is out of range!");
            }
            else {
                let task = tasks[assignee].tasks[index];
                statuses[task.status] -= Number(task.estimatedPoints);
                tasks[assignee].tasks.splice(index, 1);
            }
        }
    }

    
    let totalPoints = Object.values(statuses).reduce((a, b) => a + b);
    let donePoints = statuses["Done Points"];
    let message = donePoints > totalPoints || donePoints === totalPoints ? 'Sprint was successful!' : 'Sprint was unsuccessful...'
    console.log(message)
}

solve([
    '4',
    'Kiril:BOP-1213:Fix Typo:Done:1',
    'Peter:BOP-1214:New Products Page:In Progress:2',
    'Mariya:BOP-1215:Setup Routing:ToDo:8',
    'Georgi:BOP-1216:Add Business Card:Code Review:3',
    'Add New:Sam:BOP-1237:Testing Home Page:Done:3',
    'Change Status:Georgi:BOP-1216:Done',
    'Change Status:Will:BOP-1212:In Progress',
    'Remove Task:Georgi:3',
    'Change Status:Mariya:BOP-1215:Done',
]
);
