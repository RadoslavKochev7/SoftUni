function focused() {
    let inputs = Array.from(document.querySelectorAll('div div input'));
    console.log(inputs);

    for (let input of inputs) {
        input.addEventListener('focus', focusEvent);
        input.addEventListener('blur', blurEvent);
    }

    function focusEvent() {
        this.parentNode.setAttribute('class', 'focused');
    }

    function blurEvent() {
        this.parentNode.removeAttribute('class', 'focused');
    }
}