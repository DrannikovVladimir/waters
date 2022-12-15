const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const mailer = require("./nodemailer.js");

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/water', (req, res) => {
  mailer(req.body)
    .then(() => res.status(200).json({ message: 'Наши операторы свяжутся с вами в течении 1 часа' }))
    .catch(() => res.status(400).json({ message: 'Ошибка отправки. Вы можете заказать воду по телефону: +7 (700) 492-54-66'}));  
});

app.listen(PORT, () => {
  console.log('Server is ok!');
});