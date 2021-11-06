document.getElementById('btn').addEventListener('click', (event) => {
    let burger = new Burger('price', 'calories');
    event.preventDefault();
    burger._showPrice();
    burger._showCalories();
    console.log(burger.price);
    console.log(burger.calories);
})

class Burger {
        constructor(price, calories){
            this.price = [this.#priceSize(), this.#priceIngredients(), this.#priceAdd()];
            this.calories = [this.#caloriesSize(), this.#caloriesIngredients(), this.#caloriesAdd()];    
        }
        #priceSize() {
            return Number(document.querySelector('input[name="size"]:checked').dataset.price);
        }
        #caloriesSize() {
            return Number(document.querySelector('input[name="size"]:checked').dataset.calories);
        }
        #priceIngredients() {
            return Number(document.querySelector('input[name="ingredients"]:checked').dataset.price);
        }
        #caloriesIngredients() {
            return Number(document.querySelector('input[name="ingredients"]:checked').dataset.calories);
        }
        #priceAdd() {
            let sum = 0;
            let result = [];
            let listIngredients = document.querySelectorAll('input[name="add"]');
            listIngredients.forEach(element => {
                if(element.checked){
                    result.push(element.dataset.price);
                } else {
                    result.push(0);
                }             
            });
            sum = result.reduce((a,b) => Number(a) + Number(b));
            return sum;
        }
        #caloriesAdd() {
            let sum = 0;
            let result = [];
            let listIngredients = document.querySelectorAll('input[name="add"]');
            listIngredients.forEach(element => {
                if(element.checked){
                    result.push(element.dataset.calories);
                } else {
                    result.push(0);
                }             
            });
            sum = result.reduce((a,b) => Number(a) + Number(b));
            return sum;
        }
        _showPrice() { 
            let sumPrice = 0;
            this.price.forEach((el) => sumPrice += el)
            document.querySelector('#coast').textContent = sumPrice;
        }
        _showCalories() {
            let sumCalories = 0;
            this.calories.forEach((el) => sumCalories += el)
            document.querySelector('#calories').textContent = sumCalories;
        }
    }
