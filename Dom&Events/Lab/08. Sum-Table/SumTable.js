function sumTable() {
    let sumElement = document.getElementById('sum');
    let tableValues = Array.from(document.querySelectorAll('table tbody tr:not(:first-child) td:nth-child(even)'));
    let sum = 0;

    for (let row of tableValues) {
        let amount = row.innerText;
        sum += Number(amount);
        console.log(amount);
    }

    sumElement.textContent = sum;
}