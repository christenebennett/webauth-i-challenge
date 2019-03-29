const express = require('express');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const db = require('./data/dbConfig.js');
const UsersModel = require('./users/users-model.js');

const server = express();

const sessionOptions = {
  name: 'bennett',
  secret: 'keep it secret, keep it safe.',
  cookie: {
    maxAge: 1000 * 60 * 60,  // 1 hour
    secure: false, 
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false
}

server.use(session(sessionOptions))
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req,res) => {
  res.send("Welcome to the API! ")
})


// authentication middleware
function restricted(req, res, next) { 
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'You shall not pass!' })
  }
}

//  GET - /api/users - If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'.   
server.get('/api/users', restricted, async (req, res) => {
  try {
    const users = await UsersModel.find(); 
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({error})
  }
})

// GET by id
server.get('/api/users/:id', restricted, async (req, res) => {
  const {id} = req.params;
  try {
    const user = await UsersModel.findById(id);
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({message: "User with specified ID not found."})
    }
  } catch (error) {
    res.status(500).json({error})
  }
})

// POST - /api/register - Creates a `user` using the information sent inside the `body` of the request. **Hash the password** before saving the user to the database. 
server.post('/api/register', (req, res) => {
  let user = req.body;
  // generates hash from user's password
  const hash = bcrypt.hashSync(user.password, 12);
  // overrides user password with hash
  user.password = hash;
  UsersModel.add(user)
    .then(saved => {
      res.status(200).json(saved);
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

//  POST    /api/login     Use the credentials sent inside the `body` to authenticate the user. On successful login, create a new session for the user and send back a 'Logged in' message and a cookie that contains the user id. If login fails, respond with the correct status code and the message: 'You shall not pass!' 
server.post('/api/login', (req, res) => {
  let { username, password } = req.body;
  UsersModel.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${user.username}!` })
      } else {
        res.status(401).json({ message: "Invalid Credentials" })
      }
    })
    .catch(error =>  {
      res.status(500).json({ error })
    })
})

// Destroy the session
server.get('/api/logout', (req, res) => {
  if(req.session){
    req.session.destroy(err => {
      if (err) {
        res.send("you can never leave!")
      } else {
        res.send('logged out')
      }
    })
  } else {
    res.end();
  }
})

const port = 9000;
server.listen(port, () => console.log(`Server is listening on ${port}`))