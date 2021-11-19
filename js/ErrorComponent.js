Vue.component('error', {
    props: ['visibility'],
   
    template:   `
                <div class="error" v-show="visibility">
                    <h1>SERVER ERROR</h1>
                </div>
                `
});