const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();


app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layout') }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));



app.use((req, res, next) => {
  res.status(404).render('error404');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error500');
});


app.get('/', (req, res) => {
  res.render('main');
});

app.get('/r1', (req, res) => {
  const images = ['icon1.jpeg', 'icon2.jpeg'];
  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];
  const url = 'https://www.youtube.com';

  res.render('r1', { image: randomImage, url: url });
});

app.get('/r2', (req, res) => {
  res.render('r2');
});
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

