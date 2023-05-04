window.addEventListener("load", solve);

function solve() {
  const inputs = {
    firstName: document.getElementById('first-name'),
    lastName: document.getElementById('last-name'),
    age: document.getElementById('age'),
    gender: document.getElementById('genderSelect'),
    dishDescription: document.getElementById('task'),
  };

  const buttons = {
    submit: document.getElementById('form-btn'),
    clear: document.getElementById('clear-btn')
  };

  const elements = {
    inProgress: document.getElementById('in-progress'),
    finishedCooking: document.getElementById('finished'),
    progressCounter: document.getElementById('progress-count')
  };

  let tasks = {};
  let counter = 0;

  buttons.submit.addEventListener('click', getInfoHandler);
  buttons.clear.addEventListener('click', () => {
    elements.finishedCooking.innerHTML = '';
  });

  function getInfoHandler(e) {
    let allInputsAreNonEmpty = Object.values(inputs)
      .every((input) => input.value !== '');

    if (!allInputsAreNonEmpty) {
      return;
    }

    e.preventDefault();
    counter++;
    let [ firstName, lastName, age, gender, dishDescription ] = Object.values(inputs);
    firstName = firstName.value;
    lastName = lastName.value;
    age = age.value;
    gender = gender.value;
    dishDescription = dishDescription.value;

    tasks[counter] = { firstName, lastName, age, gender, dishDescription };
    let li = createDOMElement('li', '', elements.inProgress, `${counter}`, ['each-line']);
    let article = createDOMElement('article', '', li);
    createDOMElement('h4', `${firstName} ${lastName}`, article);
    createDOMElement('p', `${gender}, ${age}`, article);
    createDOMElement('p', `Dish description: ${dishDescription}`, article);
    let editBtn = createDOMElement('button', 'Edit', li, '', ['edit-btn']);
    let completeBtn = createDOMElement('button', 'Mark as complete', li, '', ['complete-btn']);

    clearInputs();
    elements.progressCounter.textContent = counter;

    editBtn.addEventListener('click', editHandler);
    completeBtn.addEventListener('click', completeHandler);
  }

  function completeHandler() {
    let parent = this.parentNode;
    elements.finishedCooking.appendChild(parent);
    parent.querySelector('.complete-btn').remove();
    parent.querySelector('.edit-btn').remove();
    elements.progressCounter.textContent = --counter
  }

  function editHandler() {
    let id = this.parentNode.id;

    inputs.firstName.value = tasks[id].firstName;
    inputs.lastName.value = tasks[id].lastName;
    inputs.age.value = tasks[id].age;
    inputs.gender.value = tasks[id].gender;
    inputs.dishDescription.value = tasks[id].dishDescription;

    elements.progressCounter.textContent = --counter;
    this.parentNode.remove();
  }

  function clearInputs() {
    Object.values(inputs).forEach(i => i.value = '');
  }

  function createDOMElement(type, textContent, parentNode, id, classes, attributes) {
    let element = document.createElement(type);

    if (textContent && type !== 'input')
      element.textContent = textContent;

    if (textContent && type === 'input')
      element.value = textContent;

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
