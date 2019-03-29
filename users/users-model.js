const db = require('../data/dbConfig');

module.exports = {
  
  find: () => {
    db('users').select('id', 'username', 'password')
  },
  
  findBy: filter => {
    db('users').where(filter)
  },
  
  findById: id => {
    find().where({ id }).first()
  },
  
  add: async user => {
    const [ id ] = await db('users').insert(user);
    return findById(id);
  }
  
}