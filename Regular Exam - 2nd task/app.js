window.addEventListener("load", solve);

function solve() {

    const inputs = {
        title: document.getElementById('task-title'),
        category: document.getElementById('task-category'),
        content: document.getElementById('task-content')
    };

    const domElements = {
        reviewTasks: document.getElementById('review-list'),
        updatedTasks: document.getElementById('published-list')
    };

    let tasks = {};


    const publishBtn = document.getElementById('publish-btn');
    publishBtn.addEventListener('click', publishEventHandler);

    function publishEventHandler(event) {
        let allInputsAreNonEmpty = Object.values(inputs)
            .every((input) => input.value !== '');

        if (!allInputsAreNonEmpty) {
            return;
        }

        event.preventDefault();

        let title = inputs.title.value;
        let category = inputs.category.value;
        let content = inputs.content.value;
        
        tasks[title + 1] = { title, category, content };
        
        let li = createDOMElement('li', '', domElements.reviewTasks, title + 1, ['rpost']);
        let article = createDOMElement('article', '', li);
        createDOMElement('h4', title, article);
        createDOMElement('p', `Category: ${category}`, article);
        createDOMElement('p', `Content: ${content}`, article);

        const editBtn = createDOMElement('button', 'Edit', li, '', ['action-btn edit']);
        const postBtn = createDOMElement('button', 'Post', li, '', ['action-btn post']);

        editBtn.addEventListener('click', editHandlerFunc);
        postBtn.addEventListener('click', postDataHandler);
        clearInputs();
    }

    function postDataHandler() {
        let parent = this.parentNode;
        let edit = parent.querySelector('.edit');
        let post = parent.querySelector('.post');
        
        edit.remove();
        post.remove();

        domElements.updatedTasks.appendChild(parent);
    }

    function editHandlerFunc() {
       let id = this.parentNode.id;

       inputs.title.value = tasks[id].title;
       inputs.category.value = tasks[id].category;
       inputs.content.value = tasks[id].content;
       
       this.parentNode.remove();
    }

    function clearInputs() {
        Object.values(inputs).forEach(i => i.value = '');
    }

    function createDOMElement(type, textContent, parentNode, id, className, attributes) {
        let element = document.createElement(type);

        if (textContent && type !== 'input')
            element.textContent = textContent;

        if (textContent && type === 'input')
            element.value = textContent;

        if (id)
            element.id = id;

        if (className)
            element.className = className;

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