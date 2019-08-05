const express = require('express');
const pug = require('pug');
const fs = require('fs');
const router = express.Router();
const publicDir = "./view";
const layouts = "./view/layouts";

router.get(['/', '/home'], (req, res) =>
{
  const page = pug.renderFile(publicDir + '/index.pug');
  res.send(page);
});

router.get('/about', (req, res) => 
{
  const page = pug.renderFile(publicDir + '/about.pug');
  res.send(page);
});

router.get('/products', (req, res) =>
{
  const products = fs.readFile(`${__dirname}/Products.json`, 'utf-8', (err, data) =>
  {
    if(err)
    {
      res.send('Sorry unable to send this page');
      console.log(`[${new Date()}]: Unable to process this page ${req.originalUrl}`);
    }
    const page = pug.renderFile(publicDir + '/products.pug', {
      items: eval(data),
    });
    res.send(page);
  })
});

router.get('/product', (req, res) =>
{
  const id = req.query.id;
  const products = fs.readFile(`${__dirname}/Products.json`, 'utf-8', (err, data) => 
  {
    if(err)
    {
      res.send('Sorry unable to send this page');
      console.log(`[${new Date()}]: Unable to process this page ${req.originalUrl}`);
    }
    const pData = JSON.parse(data);
    for(var i = 0 ; i < pData.length ; i++)
    {
      const cur = pData[i];
      if(cur.uuid == id)
      {
        const page = pug.renderFile(publicDir + '/product.pug', {
          product: cur
        });
        res.send(page);
      }
    }
  });
});

router.get('/contact', (req, res) =>
{
  const page = pug.renderFile(publicDir + '/contact.pug');
});

router.route('/cart')
.get((req, res) =>
{
  let price;
  if(req.session.cart && typeof req.session.cart == "object")
  {
    let subtotal = 0;
    for(let i  = 0 ; i < req.session.cart.length ;i++)
    {
      subtotal+=req.session.cart[i].price;
    }
    price =  {
      subtotal: subtotal.toFixed(2),
      shipFee: 0.00,
      taxFee: 0.00
    }
    price.total = price.subtotal + price.shipFee + price.taxFee;
    price.total = parseFloat(price.total).toFixed(2);
  }
  const page = pug.renderFile(publicDir + '/cart.pug', {
    cart: req.session.cart,
    price
  });
  res.send(page);
})
.put((req, res) =>
{
  if(!req.session.cart) req.session.cart = [];
  const uuid = req.query.add;
  if(!uuid) return;
  fs.readFile('./Products.json', 'utf-8', (err, data) =>
  {
    if(err)
    {
      res.send({success: false});
      return;
    }
    const products = JSON.parse(data);
    for(let i = 0 ; i < products.length ; i++)
    {
      let cur = products[i];
      if(cur.uuid === uuid)
      {
        cur.size = req.query.size;
        cur.quan = req.query.quan;
        if(!cur.size && !cur.quan)
        {
          res.send({success: false});
          return;
        }
        req.session.cart.push(cur);
        res.send({success: true});
        return;
      }
    }
    res.send({success: false});
    return;
  });
})
.delete((req, res) =>
{
  if(req.session.cart.length === 0) 
  {
    res.send({success: false});
    return;
  }
  const index = req.query.index;
  req.session.cart.splice(index, 1);
  res.send({success: true});
  return;
});

router.get('/admin', (req, res)=>
{

});

module.exports = router;