// домашка к четвертому уроку
'use strict';
 // 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. 
 
 let str = "One: 'Hi Mary.'\nTwo: 'Oh, hi.'\nOne: 'How are you doing?'\nTwo: 'I'm doing alright. How about you?'\nOne: 'Not too bad. The weather is great isn't it?'\nTwo: 'Yes. It's absolutely beautiful today.'\nOne: 'I wish it was like this more frequently.'\nTwo: 'Me too.'\nOne: 'So where are you going now?'\nTwo: 'I'm going to meet a friend of mine at the department store'\nOne: 'Going to do a little shopping?'\nTwo: 'Yeah, I have to buy some presents for my parents.'\nOne: 'What's the occasion?'\nTwo: 'It's their anniversary.'\nOne: 'That's great. Well, you better get going. You don't want to be late.'\nTwo: 'I'll see you next time.'\nOne: 'Sure. Bye.'";
 console.log(str);
 //    Придумать шаблон, который заменяет одинарные кавычки на двойные.
 console.log(str.replace(/'/g, '"'));
 // 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
 console.log(str.replace(/\B'/g, '"'));

 /** 3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. 
 * При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
 * a. Имя содержит только буквы.
 * b. Телефон имеет вид +7(000)000-0000.
 * c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
 * d. Текст произвольный.
 * e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.
 **/

const form = document.querySelector('.formvalidation');
const errorText = document.getElementById('false');
const sucText = document.getElementById('true');
const listInputs = document.querySelectorAll('input');

const nameForm = document.getElementById('name');
const telephoneForm = document.getElementById('telephone');
const emailForm = document.getElementById('email');
const textForm = document.getElementById('comments');

listInputs.forEach(input => (input.addEventListener('input', (event => {
        if (input.validity.valid) {
            input.classList.remove('red');
            input.classList.add('green');
            errorText.classList.add('vision_none');
            } else {
                input.classList.remove('green');
                input.classList.add('red');
            } 
        })
    ))
)

textForm.addEventListener('input', (event => {
    if (textForm.validity.valid) {
        textForm.classList.remove('red');
        textForm.classList.add('green');
        errorText.classList.add('vision_none');
        } else {
            textForm.classList.remove('green');
            textForm.classList.add('red');
        }
    })
)

form.addEventListener('submit', (event => {
    if (nameForm.validity.valueMissing || emailForm.validity.valueMissing || telephoneForm.validity.valueMissing || textForm.validity.valueMissing || !nameForm.validity.valid || !emailForm.validity.valid || !telephoneForm.validity.valid) {
        errorMsg();
        event.preventDefault();  
        } else {
        sucText.classList.remove('vision_none');
        errorText.classList.add('vision_none');
        textForm.value = ''; 
        listInputs.forEach(input => input.value = '');
        }
    })
)

function errorMsg() {
    if (errorText.classList === 'vision_none' && sucText.classList !== 'vision_none'){
    errorText.classList.remove('vision_none');
    sucText.classList.add('vision_none');
    } else {
        sucText.classList.add('vision_none');
        errorText.classList.remove('vision_none');
        textForm.classList.add('red');
        listInputs.forEach(input => input.classList.add('red'));
    }
}
