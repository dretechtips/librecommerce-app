const express = require('express');
const router = express.Router();
const pug = require('pug');
const viewDir = "./admin/view";
const orderDir = "./admin/view/orders";
const Orders = require("../model/Orders");

router.get('/', (req, res) =>
{
  const actionsArray = [{name: "Search Order", link: "/admin/orders/search", icon: "fas fa-search"},
  {name: "Add Order", link: "/admin/orders/add", icon: "fas fa-plus"},
  {name: "Remove Order", link: "/admin/orders/remove", icon: "fas fa-minus"},
  {name: "Refund Order", link: "/admin/orders/refund", icon: "fas fa-money-bill"}]
  const page = pug.renderFile(viewDir + '/layouts/actions.pug',{
    actions: actionsArray
  });
  res.send(page);
});

router.get('/search', (req, res) =>
{
  const page = pug.renderFile(orderDir + '/search.pug');
  res.send(page);
});

router.route('/add')
.get((req, res) =>
{
  if(!req.query.customers)
  {
    const page = pug.renderFile(orderDir + '/add.pug');
    res.send(page);
  }
  else
  {
    const customers = req.query.customers;
    const page = pug.renderFile(orderDir + '/add.pug', 
    {
      customers
    });
    res.send(page);
  }
})
.post((req, res) =>
{
  
});

router.delete('/remove', (req, res) =>
{

});

router.patch('/update', (req, res) =>
{

});

module.exports = router;