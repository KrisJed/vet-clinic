import * as db from './index';

// import * as bcrypt from 'bcrypt';
// const saltRounds : number = 10;

/* Dodać autoryzację:
  sprawdzić czy jakiś uzytkownik ma taki hash, jeśli nie to błąd autoryzacji
  authorization message i jaki kod ma
  wydzielić funkcję */

const getUsers = async (req, res) => {
  try {
    const users = await db.users.findAll({ raw: true });
    console.log(users);
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
    let seekId = req.params.id;

    if ((seekId !== undefined) && (typeof Number(seekId) === 'number')) {
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
        res.status(404);
        console.log('Not found!');
        return;
      }
      res.status(200).send({ data });
      return;
    }

    const user = await db.users.findAll(
      {
        raw: true,
        order: [['id', 'DESC'],],
        limit: 1
      },
    );

    if (user === null) {
      res.status(404);
      console.log('Not found!');
      return;
    }

    seekId = user[0].id;
    const animals = await db.animals.findAll({
      raw: true,
      where: { ownerId: seekId }
    });
    const data = { ...user[0], animals: [...animals] };
    res.status(200).send({ data });

  }
  catch (err) {
    console.log(err);
  }
};

const getUserByAnimal = async (req, res) => {
  try {
    // For updateAnimal
    let seekId = req.params.id;

    if ((seekId !== undefined) && (seekId !== null) && (typeof Number(seekId) === 'number')) {
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
        return;
      }
      res.status(404);
      console.log('Not found!');
      getUsers(req, res);
      return;
    }

    // For createAnimal
    const ownerId = req.body.ownerId;

    if ((ownerId !== null) && (typeof Number(ownerId) === 'number')) {
      const user = await db.users.findOne({
        raw: true,
        where: { id: ownerId }
      });
      const animals = await db.animals.findAll({
        raw: true,
        where: { ownerId: ownerId }
      });
      const data = { ...user, animals: [...animals] };
      if (user === null) {
        res.status(404);
        console.log('Not found!');
        return;
      }
      res.status(200).send({ data });
      return;
    }

    const user = await db.users.findAll(
      { raw: true },
    );
    if (user === null) {
      res.status(404);
      console.log('Empty database!');
      return;
    }
    getUsers(req, res);
  }
  catch (err) {
    console.log(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    await db.users.create(req.body);
    res.status(200);
    next();
  } catch (err) {
    console.log(err);
  }
};

const createAnimal = async (req, res, next) => {
  try {
    const users = await db.users.findAll({ raw: true });
    const animalId = req.body.ownerId;
    const hasOwner = users.some(user => user.id === animalId);

    if (hasOwner) {
      await db.animals.create(req.body);
      res.status(200);
      return next();
    }

    res.status(404);
    console.log('Owner id not found');
    next();
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const seekId = req.params.id;
    const allUsers = await db.users.findAll({ raw: true });
    const userExists = allUsers.some(user => user.id = seekId);

    if (!userExists) {
      res.status(404);
      return next();
    }

    if (req.query['is-active'] === 'true') {
      await db.users.update({ 'isActive': true }, {
        where: {
          id: seekId
        }
      });
      res.status(200);
      return next();
    }

    if (req.query['is-active'] === 'false') {
      await db.users.update({ 'isActive': false }, {
        where: {
          id: seekId
        }
      });
      res.status(200);
      return next();
    }

    await db.users.update(req.body, {
      where: {
        id: seekId
      }
    });

    res.status(200);
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

    if (!animalExists) {
      res.status(404);
      return next();;
    }

    if (req.query['is-active'] === 'true') {
      await db.animals.update({ 'isActive': true }, {
        where: {
          id: animalId
        }
      });
      res.status(200);
      return next();
    }

    if (req.query['is-active'] === 'false') {
      await db.animals.update({ 'isActive': false }, {
        where: {
          id: animalId
        }
      });
      res.status(200);
      return next();
    }

    const users = await db.users.findAll({ raw: true });
    animals = await db.animals.findOne({
      raw: true,
      where: { id: animalId }
    });
    const hasOwner = users.some(user => user.id === animals.ownerId);

    if (hasOwner) {
      await db.animals.update(req.body, {
        where: {
          id: animalId
        }
      });
      res.status(200);
      return next();
    }

    res.status(404);
    next();

  } catch (err) {
    console.log(err);
  }
};

export { getUsers, getUser, createUser, createAnimal, updateUser, updateAnimal, getUserByAnimal };