window.addEventListener('load', solve);

function solve() {
    const inputs = Array.from(document.querySelectorAll('input'));
    const addBtn = document.getElementById('add-btn');
    const collectionInfoDiv = document.getElementsByClassName('all-hits-container')[0];
    const saveContainerDiv = document.getElementsByClassName('saved-container')[0];
    const inputValues = {
        genre: inputs[0],
        songName: inputs[1],
        author: inputs[2],
        date: inputs[3]
    };

    addBtn.addEventListener('click', getInfoHandler)

    function getInfoHandler(event) {
        let allInputsAreNonEmpty = Object.values(inputValues)
            .every((input) => input.value !== '');

        if (!allInputsAreNonEmpty) {
            return;
        }

        event.preventDefault();
        populateData(collectionInfoDiv);
    }

    function deleteEventHandler() {
        this.parentNode.remove();
    }

    function saveEventHandler() {
        const songRef = this.parentNode;
        const saveBtn = songRef.querySelector('.save-btn');
        const likeBtn = songRef.querySelector('.like-btn');
        saveContainerDiv.appendChild(songRef);
        saveBtn.remove();
        likeBtn.remove();
    }

    function populateData(parentElement) {
        let innerDiv = createElement('div', '', parentElement, '', ['hits-info']);
        createElement('img', '', innerDiv, '', '', { src: './static/img/img.png' });
        createElement('h2', `Genre: ${inputValues.genre.value}`, innerDiv);
        createElement('h2', `Name: ${inputValues.songName.value}`, innerDiv);
        createElement('h2', `Author: ${inputValues.author.value}`, innerDiv);
        createElement('h3', `Date: ${inputValues.date.value}`, innerDiv);
        clearInputs();

        const saveBtn = createElement('button', 'Save song', innerDiv, '', ['save-btn']);
        const likeBtn = createElement('button', 'Like song', innerDiv, '', ['like-btn']);
        const deleteBtn = createElement('button', 'Delete', innerDiv, '', ['delete-btn']);

        likeBtn.addEventListener('click', likeHandling);
        saveBtn.addEventListener('click', saveEventHandler);
        deleteBtn.addEventListener('click', deleteEventHandler);
    }
    function likeHandling(e) {
        let totalLikesParagraph = document.querySelector('.likes p').textContent.split(': ').pop();
        document.querySelector('.likes p').textContent = `Total Likes: ${Number(totalLikesParagraph) + 1}`;
        e.currentTarget.disabled = true;
    }

    function clearInputs() {
        inputs.forEach(input => input.value = '');
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