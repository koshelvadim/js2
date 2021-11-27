// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cartcomp', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          showCart: false,
          countGoods: 0,
          amount: 0      
      }
    },
    mounted(){
        this.$root.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    this.$data.cartItems.push(item);
                    this.countGoods += item.quantity;  //подсчет кол-ва товара в корзине
                    this.amount +=item.product_price * item.quantity;  //подсчет стоимости всего товара в корзине
                }
                console.log(this.countGoods);
                console.log(this.amount);
            });
    },
    methods: {
        addProduct(item){
            this.countGoods++;
            let find = this.cartItems.find(el => el.product_id === item.product_id);
            if(find){
                this.$root.putJson(`/api/cart/${find.product_id}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++ 
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$root.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(item) {
            this.countGoods--;
            if (item.quantity > 1) {
                this.$root.putJson(`/api/cart/${item.product_id}`, {quantity: -1})
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$root.deleteJson(`/api/cart/${item.product_id}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
        calcSum(){
            return this.cartItems.reduce((accum, item) => accum += item.product_price * item.quantity, 0);
          }
    },
    
    template:   ` 
                <div class="menu_padding vision_none">
                    <i class="fas fa-shopping-cart" @click="showCart = !showCart"></i>
                    <span class="basket_count">{{ countGoods }}</span>
                    <div class="cart-block" v-show="showCart">
                        <h2 v-if="!cartItems.length">К сожалению, в корзине ничего нет</h2>
                        <cart-item 
                            v-for="item of cartItems" 
                            :key="item.product_id" 
                            :cart-item="item" 
                            @remove="remove" 
                            @add-product="addProduct">
                        </cart-item>
                        <h2 v-if="cartItems.length">Общая стоимость товаров: <span class="cart_red"> $ {{ calcSum() }}</span></h2>
                    </div>
                </div>
                `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template:   `
                <div class="cart_shoping_cart">
                    <a href="#" class="cart_shoping_cart_link">
                        <img class="images_card" :src="cartItem.product_image" alt="picture">
                    </a>
                    <div class="cart_shoping_cart_text">
                        <p class="cart_text_name">Product ID: <span class="cart_red">{{ cartItem.product_id }}</span></p>
                        <p class="cart_text_price">Price: <span class="cart_red"> $ {{ cartItem.product_price }}</span></p>
                        <p class="cart_text_color">Color: </p>
                        <p class="cart_text_size">Size: </p>
                        <div class="flex">
                            <p class="cart_text_quantity">Quantity: <span class="cart_red">{{ cartItem.quantity }}</span></p>
                            <button 
                                class="countminus"
                                @click="$emit('remove', cartItem)">
                                -
                            </button>
                            <button 
                                class="countplus"
                                @click="$emit('add-product', cartItem)">
                                +
                            </button>
                        </div> 
                    </div>
                    <a href="#"><i class="fas fa-times cart_shoping_close_button" @click="$emit('remove', cartItem)"></i></a>
                </div>
                `
})