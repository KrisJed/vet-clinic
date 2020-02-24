const express = require('express');
const http = require('http');
const { getUsers, getUser, createUser, deleteUser } = require('./controllers');
const db = require('./index');

const port = process.env.PORT || 3000;
const hostname = 'localhost';

db.sequelize
.authenticate()
.then(() =>  console.log('Connected to database')) 
.catch(err => console.error(err));


// ROUTER
const router = express
  .Router()
  .get('/', getUsers)
  .get('/:id', getUser)
  .post('/', createUser, getUser)
//  .put('/:id', updateUser, getUser)
  .delete('/:id', deleteUser, getUsers);

// APP
const app = express();
app
  .set('port', port)
  .use(express.static('.'))
  .use(express.json())
  .use('/api/users', router);

// SERVER
http
  .createServer(app)
  .listen(port, hostname, () => console.log(`App listening on port ${port}!`));