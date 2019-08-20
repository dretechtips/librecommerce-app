const express = require('express');
const router = express.Router();
const pug = require('pug');
const products = require('./products');
const orders = require('./orders');
const viewDir = "./admin/view";
const uuid = require('uuid/v4');
const hconsole = require('../model/Console');

// Validation
// router.use((req, res, next) =>
// {
//   if(!req.session.loginID && req.path !== '/login')
//   {
//     res.redirect('/admin/login');
//   }
//   else{
//     next();
//   }
// });


router.route('/login')
.get((req, res) =>
{
  const error = req.query.error;
  const page = pug.renderFile(viewDir + '/login.pug', {
    error: error ? true : false
  });
  res.send(page);
})
.post((req, res) =>
{
  const user = req.body.user;
  const pass = req.body.pass;
  const validation = new Validation(user, pass);
  if(validation)
  {
    req.session.loginID = uuid();
    res.redirect('/admin/home');
  }
  else 
  {
    res.redirect('/admin/login?error=true');
  }
});

router.get(['/', '/home'], (req, res) =>
{
  const orders = [{name: 'Will Smith', id: 347824032, date: '01/20/2003', products: '5 Magic Mangos(5 Packs)', address: '2500 Frosted Green'}];
  const inventory = [{name: "Magic Mango", price: 19.20, brand: "Teariffic", rating: 4.2, stock: true, id: "34627493289"}];
  const page = pug.renderFile(viewDir + '/index.pug', {
    orders,
    inventory
  });
  res.send(page);
});

router.use('/products', products);

router.use('/orders', orders);

module.exports = router;
