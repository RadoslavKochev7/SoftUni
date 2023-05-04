function createDOMElement(type, textContent, parentNode, id, className, attributes) {
    let element = document.createElement(type);

    if (textContent && type !== 'input')
        element.textContent = textContent;

    if (textContent && type === 'input')
        element.value = textContent;

    if (id)
        element.id = id;

    if (className)
       element.classList.add(className);
    
    if (attributes){
       for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
       }
    }

    if (parentNode)
       parentNode.appendChild(element);

    return element;
}