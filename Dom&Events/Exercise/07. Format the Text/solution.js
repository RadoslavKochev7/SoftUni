function solve() {
  let output = document.getElementById('output');
  let input = document.getElementById('input').value;
  let formattedParagraphs = input.split('.');
  formattedParagraphs.pop();

  while (formattedParagraphs.length > 0) {
    let p = document.createElement('p');
    let content = formattedParagraphs.splice(0, 3)
    .map(p => p.trimStart());
    p.textContent = content.join('.') + '.';
    output.appendChild(p);
  }
}