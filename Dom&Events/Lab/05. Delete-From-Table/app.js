function deleteByEmail() {
   let input = document.querySelector('input[name="email"]').value;
   let evenTds = Array.from(document.querySelectorAll('td:nth-child(even)'));
   let result = document.getElementById('result');

   let searchedElement = evenTds.find((td) => td.textContent === input)
if (searchedElement) {
    searchedElement.parentElement.remove();
    result.textContent = 'Deleted.';
}
else
    result.textContent = 'Not found.';
}

