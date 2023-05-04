function StoreProvision(currentStock, productsOrdered) {
    let objArr = [];

    for (let index = 0; index < currentStock.length; index+= 2) {
        let stock = currentStock[index];
        let quantity = Number(currentStock[index + 1]);
        let stockObj = {product: stock, quantity};
        objArr.push(stockObj);

        if (productsOrdered.includes(stock)) {
            let indexOfStock = productsOrdered.indexOf(stock);
            stockObj.quantity += Number(productsOrdered[indexOfStock + 1]);
            productsOrdered.splice(indexOfStock, 2);
        }
    }

    for (let index = 0; index < productsOrdered.length; index+= 2) {
        let stock = productsOrdered[index];
        let quantity = Number(productsOrdered[index + 1]);
        let stockObj = {product: stock, quantity};
        objArr.push(stockObj);
    }

    for (let obj of objArr) {
        console.log(`${obj.product} -> ${obj.quantity}`)
    }
}

StoreProvision(
    ['Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'],
    ['Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30']
    )