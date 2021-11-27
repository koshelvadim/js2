Vue.component('filtercomp', {
    data(){
      return {
          userSearch: ''
      }
    },
    template: `
                <form action="#" class="menu_search" @submit.prevent="$root.$refs.productscomp.filter(userSearch)">
                    <input 
                        type="text" 
                        class="menu_search_input" 
                        v-model="userSearch"
                        placeholder="Поиск">
                    <button type="submit" class="btn-search">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`
})