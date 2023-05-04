function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      let searchText = document.getElementById('searchField');
      let rowValues = Array.from(document.querySelectorAll('tbody tr'))

      for (let row of rowValues) {
         if (row.textContent.includes(searchText.value))
         {
            row.classList.add('select');
         }
      }
      searchText.value = '';
   }
}