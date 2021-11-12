const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

// класс каталога товаров
class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];                   // массив товаров  
        this._getJsonList()                // вызов метода парсинга данных каталога  
            .then(data => {                // data - объект js
                this.goods = data;
                console.log(this.goods);
                this.render()
            });
    }

    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }

    _getJsonList() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}
// класс одного товара Каталога
class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

// класс Корзины
class Cart {
    constructor(container = '.cart-block') {
        this.container = container;
        this.allProducts = [];                       // массив товаров корзины
        this._clickBasket();                         // вызов метода для кнопки Корзина
        this._getJsonCart()                          // вызов метода парсинга данных корзины
            .then(data => {                          // data - объект js
                this.allProducts = data.contents;

                console.log(this.calcSum());    
                this.render();
            });
    }

    _getJsonCart() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

     // метод суммы товаров корзины
     calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.allProducts) {
            const productObj = new CartItem(product); 
            block.insertAdjacentHTML('beforeend', productObj.render(product));
        }
    }
    
    _clickBasket() {
        document.querySelector(".btn-cart").addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
    }
}
// класс элемента Корзины
class CartItem{
    constructor(product, img = 'https://via.placeholder.com/50x75') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.quantity = product.quantity;
        this.img = img;
    }
    
    render(product) {
        return `<div class="cart-item" data-id="${this.id}">
                <div class="product-bio">
                <img src="${this.img}" alt="Some image">
                <div class="product-desc">
                <p class="product-title">${this.title}</p>
                <p class="product-quantity">Quantity: ${this.quantity}</p>
            <p class="product-single-price">$${this.price} each</p>
            </div>
            </div>
            <div class="right-block">
                <p class="product-price">$${this.quantity * this.price}</p>
                <button class="del-btn" data-id="${this.id}">&times;</button>
            </div>
            </div>`
    }
}

let list = new ProductsList(); // вызываем конструктор Каталога товаров
let cart = new Cart();         // вызываем конструктор Корзины
