function colorize() {
    let tr = Array.from(document.querySelectorAll('table tr:nth-child(even)'));
    return tr.forEach(row => row.style.background = 'teal');
}