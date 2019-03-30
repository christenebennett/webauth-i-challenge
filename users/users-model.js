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


// module.exports = {
  
//   find: () => {
//     db('users').select('id', 'username', 'password')
//   },
  
//   findBy: filter => {
//     db('users').where(filter)
//   },
  
//   findById: id => {
//     find().where({ id }).first()
//   },
  
//   add: async user => {
//     const [ id ] = await db('users').insert(user);
//     return findById(id);
//   }

// }