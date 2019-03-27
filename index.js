const express = require('express');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./data/dbConfig.js');
const Users = require('./users/users-model.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req,res) => {
  res.send("Welcome to the API! ")
})
// POST - /api/register - Creates a `user` using the information sent inside the `body` of the request. **Hash the password** before saving the user to the database. 
server.get('/api/users', async (req, res) => {
  try {
    const users = await Users.find(); 
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({error})
  }
  
})

//  POST    /api/login     Use the credentials sent inside the `body` to authenticate the user. On successful login, create a new session for the user and send back a 'Logged in' message and a cookie that contains the user id. If login fails, respond with the correct status code and the message: 'You shall not pass!' 


//  GET     /api/users     If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'.   

const port = 9000;
server.listen(port, () => console.log(`Server is listening on ${port}`))