window.addEventListener('load', solve);

function solve() {
    const inputs = Array.from(document.querySelectorAll('input'));
    const nextStepbtn = document.getElementById('next-btn');
    let editBtn;
    let continueBtn;
    let confirmBtn;
    let cancelBtn; 

    const ticketInfoList = document.getElementsByClassName('ticket-info-list')[0];
    const confirmTicketList = document.getElementsByClassName('confirm-ticket')[0];
    let firstNameValue, lastNameValue, peopleValue, dateValue, daysValue;

    nextStepbtn.addEventListener('click', infoHandler);

    function infoHandler(e) {
        e.preventDefault();
        [firstName, lastName, people, date, days] = inputs;

        firstNameValue = firstName.value;
        lastNameValue = lastName.value;
        peopleValue = people.value;
        dateValue = date.value;
        daysValue = days.value;

        if (inputs.every(i => i.value !== null)) {
            let li = createElement('li', '', ticketInfoList, '', ['ticket']);
            let article = createElement('article', '', li);
            createElement('h3', `Name: ${firstName.value} ${lastName.value}`, article);
            createElement('p', `From date: ${date.value}`, article);
            createElement('p', `For ${days.value} days`, article);
            createElement('p', `For ${people.value} people`, article);
            editBtn = createElement('button', 'Edit', li, '', ['edit-btn']);
            editBtn.disabled = false;
            continueBtn = createElement('button', 'Continue', li, '', ['continue-btn']);
            continueBtn.disabled = false;
            nextStepbtn.disabled = true;
            inputs.forEach(x => x.value = null);
            editBtn.addEventListener('click', editHandler);
            continueBtn.addEventListener('click', continueHandler);
        }
        else return
    }

    function continueHandler() {
      let info = this.parentNode.innerHTML;
      confirmTicketList.innerHTML = info;
      console.log(confirmTicketList.children)
      
      confirmTicketList.children[1].remove();
      confirmTicketList.children[1].remove();
      confirmBtn = createElement('button', 'Confirm', confirmTicketList, '', ['confirm-btn']);
      cancelBtn = createElement('button', 'Cancel', confirmTicketList, '', ['cancel-btn']);
      this.parentNode.innerHTML = '';

      confirmBtn.addEventListener('click', () => {
         nextStepbtn.disabled = false;
         confirmTicketList.remove();
      })

      cancelBtn.addEventListener('click', () => {
         document.getElementById('main').remove();
         document.getElementById('body').appendChild(createElement('h1', "Thank you, have a nice day!", '', 'thank-you'));
         let body = document.getElementById('body');
         let back = createElement('button', 'Back', body, 'back-btn');  
         back.addEventListener('click', () => { window.location.reload() })
    })

    }

    function editHandler() {
       inputs[0].value = firstNameValue;
       inputs[1].value = lastNameValue;
       inputs[2].value = peopleValue;
       inputs[3].value = dateValue;
       inputs[4].value = daysValue;

       nextStepbtn.disabled = false;
       ticketInfoList.innerHTML = '';
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




