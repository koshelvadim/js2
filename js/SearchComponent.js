Vue.component('search', {
    data(){
        return{
            userSearch: '',
        }
    },
    template: `<form action="#" class="search-form" @submit.prevent="$root.filter(userSearch)">
                    <input type="text" class="search-field" placeholder="ПОИСК" v-model="userSearch">
                    <button type="submit" class="btn-search">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`
});