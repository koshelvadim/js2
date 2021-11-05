class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];  //массив корзины для хранения купленных товаров
    this._fetchProducts();
    this.render();
    console.log(this.sum())
  }
  _fetchProducts() {
    this.goods = [
        {id: 1, title: 'Notebook', price: 1000, image: 'https://via.placeholder.com/200x150'},
        {id: 2, title: 'Mouse', price: 100, image: 'https://via.placeholder.com/200x150'},
        {id: 3, title: 'Keyboard', price: 250, image: 'https://via.placeholder.com/200x150'},
        {id: 4, title: 'Gamepad', price: 150, image: 'https://via.placeholder.com/200x150'},
      ];
  }
  // медот суммарной стоимости товаров в корзине
  calcSum(){
    return this.allProducts.reduce((accum, item) => accum + item.price, 0);
  }

  render() {
    const block = document.querySelector(this.container);
    for(let product of this.goods){
      const item = new ProductItem(product);
      block.insertAdjacentHTML("beforeend",item.render());
      // block.innerHTML += item.render();
    }
  }
}

class ProductItem {
  constructor(product) {
      this.title = product.title;
      this.id = product.id;
      this.price = product.price;
      this.image = product.image;
  }
  render() {
        return `<div class="product-item">
                  <img src="${this.image}">
                  <h3>${this.title}</h3>
                  <p>${this.price}</p>
                  <button class="buy-btn">Купить</button>
                </div>`
  }
}

class Busket {
  
}

class BusketItems{

}

let list = new ProductList();


// const products = [
//   {id: 1, title: 'Notebook', price: 1000, image: 'https://via.placeholder.com/200x150'},
//   {id: 2, title: 'Mouse', price: 100, image: 'https://via.placeholder.com/200x150'},
//   {id: 3, title: 'Keyboard', price: 250, image: 'https://via.placeholder.com/200x150'},
//   {id: 4, title: 'Gamepad', price: 150, image: 'https://via.placeholder.com/200x150'},
// ];

// const renderProduct = (items) => 
//         `<div class="product-item" data-id="${items.id}">
//             <img src="${items.image}" alt="Some img">
//             <h3>${items.title}</h3>
//             <p>${items.price} $</p>
//             <button class="buy-btn">Добавить</button>
//         </div>`;

// const renderProducts = list => {
//   const productsList = list.map(item => renderProduct(item)).join(''); // убираем разделитель массива с помощью метода .join('')
//   console.log(productsList);
//   document.querySelector('.products').insertAdjacentHTML('beforeend', productsList); 
// };

// renderProducts(products);
