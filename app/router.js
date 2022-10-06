// init de Express et du router
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config()

const mainController = require('./controllers/mainController');



router.get('/', mainController.homePage);
router.get('/login', mainController.getLoginPage);
router.get('/sign-up', mainController.getSignupPage);


/*router.get('/', (req, res) => {
  res.render('home', {
    city: null,
    des: null,
    icon: null,
    temp: null
  });
});*/

router.post('/', async (req, res) => {
  const city = req.body.city;
  const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

  try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'city not found') {
          res.render('home', {
            city: data.message,
            des: null,
            icon: null,
            temp: null
          })
        } else {
          const city = data.name;
          const des = data.weather[0].description;
          const icon = data.weather[0].icon;
          const temp = data.main.temp;

          res.render('home', {
            city, des, icon, temp
          });
        }
      });

  } catch (err) {
    res.render('home', {
      city: 'something wrong',
      des: null,
      icon: null,
      temp: null
    })
  }

})

module.exports = router;