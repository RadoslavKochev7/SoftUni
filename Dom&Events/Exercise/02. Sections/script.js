function create(words) {
   let parentDiv = document.getElementById('content');

   for (let word of words) {
      let div = document.createElement('div');
      let paragraph = document.createElement('p');
      paragraph.textContent = word;
      paragraph.style.display = 'none';
      div.addEventListener('click', styleChangerEvent);
      div.appendChild(paragraph);
      parentDiv.appendChild(div);
   }

   function styleChangerEvent(){
      this.firstChild.style.display = 'block';
   }
}