const db = require('../data/dbConfig');

module.exports = {
  find,
  findBy,
  findById,
  add
}

function find() {
  return db('users').select('id', 'username', 'password')
};

function findBy(filter) {
  return db('users').where(filter)
};

function findById(id) {
  return find().where({
    id
  }).first();
}

async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}
// I can't figure out why the code below doesn't work
// module.exports = {
//   find,
//   findById,
//   add,
//   findBy
// }

// const find = () => db('users').select('id', 'username', 'password');

// const findBy = filter => db('users').where(filter);

// const findById = id => find().where({ id }).first();

// const add = async user => {
//   const [ id ] = await db('users').insert(user);
//   return findById(id);
// }