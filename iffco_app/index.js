const express = require("express");
const path = require('path');
const app = express()
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const homeRoutes = require('./routes/home');
const productRoutes = require('./routes/products');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoutes);
app.use('/products', productRoutes)

//Error Middlewares

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
});

const port = 8080;
app.listen(port, () =>{
  console.log(`Server started on port: ${port}`);
});

var request = require('request');

var options = {
  'method': 'POST',
  'url': 'https://graph.facebook.com/v13.0/104592059045673/messages',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer EAAIldmAOd9ABADFBUVyHzLW4J6e1fdUSNp4G25RpPhv4mTRT600ryzACi2S0NuyxJ4Qvopr4hlj1MnnZAR32uG1dJgrdYHFTvUxl3uVnEqUYoLMFKWknKZCbd4gfmTlB4Atz2xd0DpsR5PhTGV8hFrwvOsXd5ZCZB4FikgAQSYHbXpPRCah4ZCyPqyKvgtoHNlHt6wrCztQZDZD'
  },
  body: JSON.stringify({
    "messaging_product": "whatsapp",
    "to": "919340146989",
    "type": "template",
    "template": {
      "name": "hello_world",
      "language": {
        "code": "en_US"
      }
    }
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});