import express, { Router, Express } from 'express';
import * as http from 'http';
import {
  getUsers,
  getUser,
  createUser,
  createAnimal,
  updateUser,
  updateAnimal,
  getUserByAnimal,
} from './controllers';
import db from './index';

const port: number = Number(process.env.PORT) || 3000;
const hostname: string = process.env.PORT ? '0.0.0.0' : 'localhost';

db.sequelize
  .authenticate()
  .then((): void => console.log('Connected to database'))
  .catch((err: Error): void => console.error(err));

// ROUTER
const router: Router = express
  .Router()
  .get('/', getUsers)
  .get('/:id', getUser)
  .post('/', createUser, getUser)
  .post('/animals/', createAnimal, getUserByAnimal)
  .put('/animals/:id', updateAnimal, getUserByAnimal)
  .put('/:id', updateUser, getUser);

// APP
const app: Express = express();
app
  .set('port', port)
  .use(express.static('.'))
  .use(express.json())
  .use('/api/users', router);

// SERVER
http
  .createServer(app)
  .listen(port, hostname, (): void =>
    console.log(`App listening on port ${port}!`),
  );
