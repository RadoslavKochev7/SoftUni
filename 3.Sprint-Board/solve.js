// TODO:
function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';
    const buttons = {
        load: document.getElementById('load-board-btn'),
        create: document.getElementById('create-task-btn')
    };

    const inputs = {
        title: document.getElementById('title'),
        description: document.getElementById('description')
    };

    const statuses = {
        'ToDo': 'In Progress',
        'In Progress': 'Code Review',
        'Code Review': 'Done',
        'Done': 'Close'
    };

    const articles = {
        'ToDo': document.querySelector('#todo-section ul'),
        'In Progress': document.querySelector('#in-progress-section ul'),
        'Code Review': document.querySelector('#code-review-section ul'),
        'Done': document.querySelector('#done-section > ul')
    };

    const moveButtons = {
        'ToDo': 'Move to In Progress',
        'In Progress': 'Move to Code Review',
        'Code Review': 'Move to Done',
        'Done': 'Close'
    };

    const tasks = {};
    const initialStatus = 'ToDo';

    buttons.load.addEventListener('click', loadAllTasksHandler);
    buttons.create.addEventListener('click', createTaskHandler);


    function createTaskHandler(e) {
        e.preventDefault();

        let title = inputs.title.value;
        let description = inputs.description.value;
        let status = initialStatus;

        const httpHeaders = {
            method: 'Post',
            body: JSON.stringify({ title, description, status })
        };

        fetch(BASE_URL, httpHeaders)
            .then(loadAllTasksHandler(e))
            .catch(err => console.error(err));

        Object.values(inputs).forEach(i => i.value = '');
    }

    function loadAllTasksHandler(event) {
        if (event) {
            event?.preventDefault();
        }

        Object.values(articles).forEach(ul => ul.innerHTML = '');
        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                for (const { title, description, status, _id } of Object.values(data)) {
                    tasks[_id] = { title, description, status };
                    let ul = articles[status];
                    
                    const li = document.createElement('li');
                    const h3 = document.createElement('h3');
                    const p = document.createElement('p');
                    const moveBtn = document.createElement('button');

                    li.className = 'task';
                    li.id = _id;
                    h3.textContent = title;
                    p.textContent = description;
                    moveBtn.textContent = moveButtons[status];

                    li.append(h3, p, moveBtn);
                    ul.appendChild(li);

                    if (moveBtn.textContent === moveButtons.Done) {
                        moveBtn.addEventListener('click', deleteTaskHandler);
                        continue;
                    }

                    moveBtn.addEventListener('click', changeStatusHandler);
                }
            })
            .catch(err => console.error(err))
    }

    function deleteTaskHandler(e) {
        let id = e.currentTarget.parentNode.id;
        const httpHeaders = {
            method: 'Delete',
        };

        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then(loadAllTasksHandler(e))
    };


    function changeStatusHandler(e) {
        let id = e.currentTarget.parentNode.id;
        let status = tasks[id].status;
        status = statuses[status];

        const httpHeaders = {
            method: "PATCH",
            body: JSON.stringify({ status })
        };

        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then(loadAllTasksHandler())
            .catch(err => console.error(err));
    };
}

attachEvents();