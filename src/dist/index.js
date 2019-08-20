const http = require('http');
const express = require('express');
const app = express();
const session = require('express-session');
const uuid = require('uuid/v4');
const Client = require('./Client');
const Admin = require('./admin/route/Admin');
const hconsole = require('./admin/model/Console');

const server = http.createServer(app).listen(8000, '127.0.0.1', () =>
{
  hconsole.log(`Initalizing Server with the IP Address of ${server.address().address} and the PORT of ${server.address().port}`);
});

app.use((req, res, next) => {
  hconsole.log(`There a new connection from the IP Address ${req.connection.remoteAddress || req.header('x-forward-for')}`);
  next();
});

const sess = {
    genid: req => uuid(),
    secret: 'bdnjkof2342sa',
    cookie: {
      httpOnly: true,
      maxAge: null,
      secure: false
  }
};

if(app.get('env' === 'production'))
{
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

app.use(session(sess));

app.use('/', Client);

app.use('/admin/', Admin);

app.use('/', express.static('public'));

