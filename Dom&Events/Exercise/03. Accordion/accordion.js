function toggle() {
    let button = document.getElementsByClassName("button")[0];
    let div = document.getElementById('extra');

    if (button.textContent === 'More') {
        button.textContent = 'Less';
        div.style.display = 'block';
    } else {
        button.textContent = 'More';
        div.style.display = 'none';
    }
}