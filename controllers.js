const db = require('./index');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getUsers = async (req, res) => {
  try {
    // spraqdzić czy jakiś uzytkownik ma taki hash, jeśli nie to błąd autoryzacji
    // authorization mesage i jaki kod ma
    // wydzielić funkcję
    const users = await db.users.findAll({ raw: true });
    const animals = await db.animals.findAll({ raw: true });
    const data = users.map(user => {
      const userAnimals = animals.filter(animal => animal.ownerId === user.id);
      return { ...user, animals: userAnimals };
    });
    res.status(200).send({ data });
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req, res) => {
  try {
    const seekId = req.params.id;
    if ((seekId !== undefined) && (typeof +seekId == "number")) {
      const user = await db.users.findOne({
        raw: true,
        where: { id: seekId }
      });
      const animals = await db.animals.findAll({
        raw: true,
        where: { ownerId: seekId }
      });
      const data = { ...user, animals: [...animals] };
      if (user === null) {
        console.log('Not found!');
      } else {
        res.status(200).send({ data });
      }
    } else {
      const user = await db.users.findAll(
        {
          raw: true,
          order: [['id', 'DESC'],],
          limit: 1
        },
      );
      if (user === null) {
        console.log('Not found!');
      } else {
        const seekId = user[0].id;
        const animals = await db.animals.findAll({
          raw: true,
          where: { ownerId: seekId }
        });
        const data = { ...user[0], animals: [...animals] };
        res.status(200).send({ data });
      }
    }
  }
  catch (err) {
    console.log(err);
  }
};

const getUserByAnimal = async (req, res) => {
  try {
    const seekId = req.params.id;
    if ((seekId !== undefined) && (typeof +seekId == "number")) {
      let animals = await db.animals.findOne({
        raw: true,
        where: { id: seekId }
      });
      if (animals !== null) {
        const userId = animals.ownerId;
        const user = await db.users.findOne({
          raw: true,
          where: { id: userId }
        });
        animals = await db.animals.findAll({
          raw: true,
          where: { ownerId: userId }
        });
        const data = { ...user, animals: [...animals] };
        res.status(200).send({ data });
      } else {
        getUsers(req, res);
      }
    } else {
      const user = await db.users.findAll(
        { raw: true },
      );
      if (user === null) {
        console.log('Empty database!');
      } else {
        getUsers(req, res);
      }
    }
  }
  catch (err) {
    console.log(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const data = await db.users.create(req.body);
    next();
  } catch (err) {
    console.log(err);
  }
};

const createAnimal = async (req, res, next) => {
  try {
    const users = await db.users.findAll({ raw: true });
    const animalId = req.body.ownerId;
    hasOwner = users.some(user => user.id === animalId);
    if (hasOwner) {
      await db.animals.create(req.body);
      next();
    } else {
      console.log('Owner not found');
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const seekId = req.params.id;
    const allUsers = await db.users.findAll({ raw: true });
    const userExists = allUsers.some(user => user.id = seekId);
    if (userExists) {
      if (req.query['is-active'] === 'true') {
        await db.users.update({ 'isActive': true }, {
          where: {
            id: seekId
          }
        });
      } else if (req.query['is-active'] === 'false') {
        await db.users.update({ 'isActive': false }, {
          where: {
            id: seekId
          }
        });
      } else {
        await db.users.update(req.body, {
          where: {
            id: seekId
          }
        });
      }
    } else {
      console.log('User not found!')
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

const updateAnimal = async (req, res, next) => {
  try {
    const animalId = +req.params.id;
    let animals = await db.animals.findAll({ raw: true });
    const animalExists = animals.some(animal => animal.id === animalId);
    if (animalExists) {
      if (req.query['is-active'] === 'true') {
        await db.animals.update({ 'isActive': true }, {
          where: {
            id: animalId
          }
        });
      } else if (req.query['is-active'] === 'false') {
        await db.animals.update({ 'isActive': false }, {
          where: {
            id: animalId
          }
        });
      } else {
        const users = await db.users.findAll({ raw: true });
        animals = await db.animals.findOne({
          raw: true,
          where: { id: animalId }
        });
        hasOwner = users.some(user => user.id === animals.ownerId);
        if (hasOwner) {
          await db.animals.update(req.body, {
            where: {
              id: animalId
            }
          });
        } else {
          console.log('Owner not found');
        }
      }
    } else {
      console.log('Animal not found');
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getUsers, getUser, createUser, createAnimal, updateUser, updateAnimal, getUserByAnimal };