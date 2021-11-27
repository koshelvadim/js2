Vue.component('productscomp', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
       }
   },
    mounted(){
        this.$root.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_id));
        }
    },
   template:    `
                <div class="card_container">
                    <product v-for="item of filtered" 
                        :key="item.product_id" 
                        :product="item"
                        @add-product="$root.$refs.cartcomp.addProduct">
                    </product>
                </div>
                `
});
Vue.component('product', {
    props: ['product'],
    template:   `
                <div class="card_box">
                    <a class="card">
                        <img class="images_card" :src="product.product_image" alt="picture">
                        <div class="card_text">
                            <h5 class="text_card_h5">Product ID: {{ product.product_id }}</h5>
                            <p class="text_card_p">{{ product.product_text }}</p>
                            <p class="text_cash">$ {{ product.product_price }}</p>
                        </div>
                    </a>
                    <div class="add_box">
                        <a class="add_to_cart" @click="$emit('add-product', product)">
                            <img class="images_add" src="images/add_to_cart.png" alt="picture">
                            <p class="text_add_to_cart_p">Add to Cart</p>
                        </a>
                    </div>
                </div>
                `
})