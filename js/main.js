const products = [
  {id: 1, title: 'Notebook', price: 1000, image: 'https://via.placeholder.com/200x150'},
  {id: 2, title: 'Mouse', price: 100, image: 'https://via.placeholder.com/200x150'},
  {id: 3, title: 'Keyboard', price: 250, image: 'https://via.placeholder.com/200x150'},
  {id: 4, title: 'Gamepad', price: 150, image: 'https://via.placeholder.com/200x150'},
];

const renderProduct = (items) => 
        `<div class="product-item" data-id="${items.id}">
            <img src="${items.image}" alt="Some img">
            <h3>${items.title}</h3>
            <p>${items.price} $</p>
            <button class="by-btn">Добавить</button>
        </div>`;

const renderProducts = list => {
  const productsList = list.map(item => renderProduct(item)).join(''); // убираем разделитель массива с помощью метода .join('')
  console.log(productsList);
  document.querySelector('.products').insertAdjacentHTML('beforeend', productsList); 
};

renderProducts(products);
