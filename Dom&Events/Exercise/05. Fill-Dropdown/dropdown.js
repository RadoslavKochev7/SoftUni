function addItem() {
    let text = document.getElementById('newItemText');
    let value = document.getElementById('newItemValue');
    let dropdownItem = document.getElementById('menu');
    let option = document.createElement('option');
    option.textContent = text.value;
    option.value = value.value;
    text.value = '';
    value.value = '';
    dropdownItem.appendChild(option);
}