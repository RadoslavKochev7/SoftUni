function addItem() {
   let text = document.getElementById("newItemText").value;
   let childToAdd = document.createElement("li"); 
   childToAdd.appendChild(document.createTextNode(text));
   document.getElementById('items').appendChild(childToAdd);
   document.getElementById("newItemText").value = '';
}