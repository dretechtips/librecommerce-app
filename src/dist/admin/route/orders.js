const express = require('express');
const router = express.Router();
const pug = require('pug');
const viewDir = "./admin/view";

router.get('/', (req, res) =>
{
  const page = pug.renderFile(viewDir + '/index.pug');
  res.send(page);
});

router.put('/add', (req, res) =>
{
  const pID = req.body.pID;
  const quan = req.body.quan;
  const size = req.body.size;

});

router.delete('/remove', (req, res) =>
{

});

router.patch('/update', (req, res) =>
{

});

module.exports = router;