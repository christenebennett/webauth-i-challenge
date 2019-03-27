const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  add,
  findBy
}

const find = () => db('users').select('id', 'username', 'password');

const findBy = filter => db('users').where(filter);

const findById = id => find().where({ id }).first();

const add = async user => {
  const [ id ] = await db('users').insert(user);
  return findById(id);
}