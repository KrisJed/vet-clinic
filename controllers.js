const db = require('./index');

const getUsers = async (req, res) => {
  try {
    const data = await db.users.findAll();
    res.status(200).send({ data });
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req, res) => {
  try {
    const data = await db.users.findOne(
      { where: { id: req.params.id} }
    );
    if (data === null) {
      console.log('Not found!');
    } else {
    res.status(200).send({ data });
  }} 
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

const deletetUser = async (req, res) => {
  try {
    if (req.params.id !== undefined) {
      const data = await db.users.destroy(
        { where: { id: req.params.id} });
      console.log('Deleted!');    
    } else {
      console.log('Not found!');
  }} catch (err) {
    console.log(err);
  }
};

module.exports = { getUsers, getUser, createUser };

// export const updateUser = async (req, res, next) => {
//   try {
//     await client.query(updateUserQuery(req.body, req.params.id));
//     next();
//   } catch (err) {
//     console.log(err);
//   }
// };