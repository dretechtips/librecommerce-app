const express = require('express');
const router = express.Router();
const pug = require('pug');
const invDir = "./admin/view/inventory";
const viewDir = './admin/view';

router.get('/', (req, res) =>
{
  const actionArray = [{name: 'Search Inventory', link: '/admin/inventory/search', icon: 'fas fa-search'}, 
  {name: 'Add Product', link: '/admin/inventory/add', icon: 'fas fa-plus'},
  {name: 'Remove Product', link: '/admin/inventory/remove', icon: 'fas fa-minus'}];
  const page = pug.renderFile(viewDir + '/layouts/actions.pug', {
    actions: actionArray
  });
  res.send(page);
});

router.get('/search', (req, res) =>
{
  const page = pug.renderFile(invDir + '/search.pug');
  res.send(page);
});

router.get('/add', (req, res) =>
{
  const page = pug.renderFile(invDir + '/add.pug');
  res.send(page);
});

router.delete('/remove', (req, res) =>
{

});

router.patch('/update', (req, res) =>
{

});

module.exports = router;