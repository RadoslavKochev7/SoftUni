function solve() {
    const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';
    const progressDiv = document.getElementById('list');
    const buttons = {
        load: document.getElementById('load-course'),
        edit: document.getElementById('edit-course'),
        add: document.getElementById('add-course')
    };

    // const courseTypes = ['Long', 'Medium', 'Short'];

    const inputs = {
        title: document.getElementById('course-name'),
        type: document.getElementById('course-type'),
        description: document.getElementById('description'),
        teacher: document.getElementById('teacher-name')
    };

    let courses = {};
    // let allCourses = [];

    buttons.load.addEventListener('click', loadCoursesHandler);
    buttons.add.addEventListener('click', addCourseHandler);
    buttons.edit.addEventListener('click', putReqHandler);

    function putReqHandler(e) {
        e.preventDefault();

        let title = inputs.title.value;
        let type = inputs.type.value;
        let description = inputs.description.value;
        let teacher = inputs.teacher.value;

        let httpHeaders = {
            method: 'PUT',
            body: JSON.stringify({ title, type, description, teacher })
        };
        
        let id = e.currentTarget.className;
        fetch(`${BASE_URL}${id}`, httpHeaders)
        .then(loadCoursesHandler(e))

        buttons.add.disabled = false;
        buttons.edit.disabled = true;
    }

    function addCourseHandler(e) {
        e.preventDefault();

        let title = inputs.title.value;
        let type = inputs.type.value;
        let description = inputs.description.value;
        let teacher = inputs.teacher.value;

        let httpHeaders = {
            method: 'POST',
            body: JSON.stringify({ title, type, description, teacher })
        }

        fetch(BASE_URL, httpHeaders)
            .then(loadCoursesHandler(e))
            .catch(err => console.error(err));

        Object.values(inputs).forEach(i => i.value = '');
    }


    function loadCoursesHandler(event) {
        if (event) {
            event.preventDefault();
        }

        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => {
                for (const { title, type, description, teacher, _id } of Object.values(data)) {
                    courses[_id] = { title, type, description, teacher };

                    const div = createElement('div', '', progressDiv, _id, ['container']);
                    createElement('h2', title, div);
                    createElement('h3', teacher, div);
                    createElement('h3', type, div);
                    createElement('h4', description, div);

                    const editBtn = createElement('button', 'Edit Course', div, '', ['edit-btn']);
                    const finishBtn = createElement('button', 'Finish Course', div, '', ['finish-btn']);

                    editBtn.addEventListener('click', editbtnHandler)
                    finishBtn.addEventListener('click', finishCourseHandler)

                    buttons.edit.disabled = true;
                }
            })
            .catch(err => console.error(err))
    }


    function finishCourseHandler(e) {
        let id = e.currentTarget.parentNode.id;
        const httpHeaders = {
            method: 'Delete',
        };

        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then(loadAllTasksHandler(e))
    }

    function editbtnHandler(event) {
        event.preventDefault();

        const id = event.currentTarget.parentNode.id;
        inputs.title.value = courses[id].title;
        inputs.type.value = courses[id].type;
        inputs.description.value = courses[id].description;
        inputs.teacher.value = courses[id].teacher;

        buttons.add.disabled = true;
        buttons.edit.disabled = false;
        buttons.edit.className = id;
    }

    function createElement(
        type, content, parentNode, id, classes, attributes) {

        let element = document.createElement(type);

        if (content && type !== 'input')
            element.textContent = content;

        if (content && type === 'input')
            element.value = content;

        if (id)
            element.id = id;

        if (classes)
            element.classList.add(...classes);

        if (attributes) {
            for (const key in attributes) {
                element.setAttribute(key, attributes[key]);
            }
        }

        if (parentNode)
            parentNode.appendChild(element);

        return element;
    }
}

solve();