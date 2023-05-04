function solve() {
    const BASE_URL = 'http://localhost:3030/jsonstore/grocery/';
    const tbody = document.getElementById('tbody');
    const buttons = {
        load: document.getElementById('load-product'),
        update: document.getElementById('update-product'),
        add: document.getElementById('add-product')
    };
    const inputs = Array.from(document.querySelectorAll('input'));
    let productToEdit = {};
    let currentProducts = [];
    buttons.load.addEventListener('click', loadProductsHandler);
    buttons.add.addEventListener('click', addProductHandler);
    buttons.update.addEventListener('click', updateProductHandler);

    async function addProductHandler(e) {
        e.preventDefault();

        let product = inputs[0].value;
        let count = inputs[1].value;
        let price = inputs[2].value;

        let httpHeaders = {
            method: 'POST',
            body: JSON.stringify({ product, count, price })
        }

        try {
            await fetch(BASE_URL, httpHeaders);
            loadProductsHandler(e);
        } catch (error) {
            console.error(error);
        }
    }

    async function loadProductsHandler(event) {
        if (event) {
            event.preventDefault();
        }

        let res = await fetch(BASE_URL);
        let data = await res.json();
        currentProducts = Object.values(data);
        tbody.innerHTML = '';

        for (const { product, count, price, _id } of currentProducts) {

            let currentRow = createElement('tr', '', tbody, _id);

            createElement('td', product, currentRow, '', ['name']);
            createElement('td', count, currentRow, '', ['count-product']);
            createElement('td', price, currentRow, '', ['product-price']);

            let btnTd = createElement('td', '', currentRow, '', ['btn']);
            let updateBtn = createElement('button', 'Update', btnTd, '', ['update']);
            let deleteBtn = createElement('button', 'Delete', btnTd, '', ['delete']);

            deleteBtn.addEventListener('click', deleteProductHandler);
            updateBtn.addEventListener('click', enableUpdateButton);
        }
    }

    function enableUpdateButton() {
        buttons.update.disabled = false;
        buttons.add.disabled = true;
        buttons.update.id = this.parentNode.parentNode.id;

        productToEdit = currentProducts.find((p) => p._id === this.parentNode.parentNode.id);
        inputs[0].value = productToEdit.product;
        inputs[1].value = productToEdit.count;
        inputs[2].value = productToEdit.price;
    }

    async function updateProductHandler(event) {
        event.preventDefault();
        const id = event.currentTarget.id;
        let product = inputs[0].value;
        let count = inputs[1].value;
        let price = inputs[2].value;

        let httpHeaders = {
            method: 'PATCH',
            body: JSON.stringify({ product, count, price })
        };

        try {
            await fetch(`${BASE_URL}${id}`, httpHeaders);
            loadProductsHandler(event);
         
        } catch (error) {
            console.error(error);
        }
    }
    async function deleteProductHandler(e) {
        const id = e.currentTarget.parentNode.parentNode.id;

        try {
            await fetch(`${BASE_URL}${id}`, { method: 'DELETE' });
            loadProductsHandler(e);
        } catch (error) {
            console.error(error);
        }
    }

    function createElement(
        type, content, parentNode, id, classes, attributes) {

        let element = document.createElement(type);

        if (content && type !== 'input')
            element.textContent = content;

        if (content && type === 'input')
            element.value = content;

        if (id)
            element.id = id;

        if (classes)
            element.classList.add(...classes);

        if (attributes) {
            for (const key in attributes) {
                element.setAttribute(key, attributes[key]);
            }
        }

        if (parentNode)
            parentNode.appendChild(element);

        return element;
    }
}

solve()