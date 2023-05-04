function solve() {
  let [generateTextArea, buyTextArea] = Array.from(document.getElementsByTagName('textarea'));
  let [generateButton, buyButton] = Array.from(document.querySelectorAll('button'));
  let tbody = document.querySelector('.table > tbody');
  // ако гръмне jugde, ги направи на Array.from !

  generateButton.addEventListener('click', generateElementsHandler);
  buyButton.addEventListener('click', buyHandler)

  function generateElementsHandler() {
    let data = JSON.parse(generateTextArea.value);
    
    for (const { img, name, price, decFactor } of data) {
      let tableRow = createElement('tr', '', tbody);

      let firstCol = createElement('td', '', tableRow);
      createElement('img', '', firstCol, '', '', { src: img });
      let secondCol = createElement('td', '', tableRow);
      createElement('p', name, secondCol);
      let thirdCol = createElement('td', '', tableRow);
      createElement('p', price, thirdCol);
      let forthCol = createElement('td', '', tableRow);
      createElement('p', decFactor, forthCol);
      let fifthCol = createElement('td', '', tableRow);

      createElement('input', '', fifthCol, '', '', { type: "checkbox" });
    }
  }

  function buyHandler() {
     let markedCheckboxes = Array.from(document.querySelectorAll("input:checked"));
     let furnitures = [];
     let totalPrice = 0;
     let averageDecFactor = 0;

     for (const checkbox of markedCheckboxes) {
       let parentRow = checkbox.parentElement.parentElement;
       furnitures.push(parentRow.children[1].firstChild.textContent);
       totalPrice += Number(parentRow.children[2].firstChild.textContent);
       averageDecFactor += Number(parentRow.children[3].firstChild.textContent)
       
     }
     buyTextArea.value += `Bought furniture: ${furnitures.join(', ')}
Total price: ${totalPrice.toFixed(2)}
Average decoration factor: ${averageDecFactor / markedCheckboxes.length}`
  }

  function createElement(type, content, parentNode, id, classes, attributes) {

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
