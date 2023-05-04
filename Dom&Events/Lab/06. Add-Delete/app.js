function addItem() {
    let text = document.getElementById("newItemText").value;
    let list = document.getElementById('items');
    let childToAdd = document.createElement("li"); 
    childToAdd.textContent = text;
    let a = document.createElement('a');
    let linkedText = document.createTextNode("[Delete]");
    a.appendChild(linkedText);
    a.href = '#';
    a.addEventListener('click', deleteItem);
    childToAdd.appendChild(a);
    list.appendChild(childToAdd);

    
    function deleteItem(){
        childToAdd.remove();
    }
}