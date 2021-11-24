const express = require('express'); // импорт модуля 
const fs = require('fs');  // импорт модуля 
const app = express();
const cart = require('./cartRouter'); //обработчик всех запросов корзины (наш модуль)

app.use(express.json());
app.use('/', express.static('public'));  // запуск файла index.html (по умолчанию не пишется)
app.use('/api/cart', cart);


// app.get();   READ
// app.post();  CREATE  ВСТАВИТЬ
// app.put();  UPDATE
// app.delete();  DELETE  УДАЛИТЬ

app.get('/api/products', (req, res) => {
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});

// app.get('/api/cart/:id', (req, res) => {
//    // res.send(req.params.id);
//     res.send(req.query);
// });

const port = process.env.PORT || 3000;  // регистрация порта 3000
app.listen(port, () => console.log(`Listen on port ${port}...`));