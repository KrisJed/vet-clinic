const db = require('./index');

const getUsers = async (req, res) => {
  try {
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
    if (req.params.id !== undefined) {
      const data = await db.users.findOne(
        { where: { id: req.params.id } }
      );
      if (data === null) {
        console.log('Not found!');
      } else {
        res.status(200).send({ data });
      }
    } else {
      const data = await db.users.findAll(
        {
          order: [['id', 'DESC'],],
          limit: 1
        },
      );
      if (data === null) {
        console.log('Not found!');
      } else {
        res.status(200).send({ data });
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

const deleteUser = async (req, res, next) => {
  try {
    const data = await db.users.destroy(
      { where: { id: req.params.id } });
    console.log('Deleted!');
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = { getUsers, getUser, createUser, deleteUser };

// export const updateUser = async (req, res, next) => {
//   try {
//     await client.query(updateUserQuery(req.body, req.params.id));
//     next();
//   } catch (err) {
//     console.log(err);
//   }
// };