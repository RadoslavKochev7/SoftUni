// TODO
function attachEvents() {
    const loadBtn = document.getElementById('load-button');
    const addBtn = document.getElementById('add-button');
    const ul = document.getElementById('todo-list');
    const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';

    loadBtn.addEventListener('click', loadAllTasks);
    addBtn.addEventListener('click', addTaskHandler);

    async function loadAllTasks(e) {
        if (e) {
            e?.preventDefault();
        }

        let res = await fetch(BASE_URL);
        let data = await res.json();
        ul.innerHTML = '';

        for (const { name, _id } of Object.values(data)) {
            let li = document.createElement('li');
            let span = document.createElement('span');
            let removeBtn = document.createElement('button');
            let editBtn = document.createElement('button');

            span.textContent = name;
            removeBtn.textContent = 'Remove';
            removeBtn.id = _id;
            editBtn.textContent = 'Edit';
            editBtn.id = _id;

            li.appendChild(span);
            li.appendChild(removeBtn);
            li.appendChild(editBtn);
            ul.appendChild(li);

            removeBtn.addEventListener('click', deleteHandler);
            editBtn.addEventListener('click', editHandler)
        }
    };

    function addTaskHandler(e) {
        e.preventDefault();
        let name = document.getElementById('title').value;
        fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify({ name })
        })
            .then(loadAllTasks(e))
    };

    function editHandler(e) {
        e.preventDefault();
        let parent = e.currentTarget.parentNode;
        let span = parent.firstChild;
        let input = document.createElement('input');
        input.value = span.textContent;
        parent.insertBefore(input, span);
        parent.removeChild(span);
        let submitBtn = document.createElement('button');
        submitBtn.textContent = 'Submit';
        submitBtn.id = e.currentTarget.id;
        parent.removeChild(e.currentTarget);
        parent.appendChild(submitBtn);

        submitBtn.addEventListener('click', patchEventHandler)

    }
    function patchEventHandler() {
        const inputValue = this.parentNode.firstChild.value;
        const headers = {
            method: "PATCH",
            body: JSON.stringify({ name: inputValue })
        };

        fetch(`${BASE_URL}${this.id}`, headers)
            .then(loadAllTasks);
    }

    function deleteHandler(e) {
        const id = this.id;
        fetch(BASE_URL + id, {
            method: 'Delete'
        })
            .then(loadAllTasks);
    }
}

attachEvents();
