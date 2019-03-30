import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      user: {
        username: '',
        password: ''
      },
      loggedIn: false
    }
  }

  onInputChange = event => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }   
    })
  }

  // onRegister = () => {
  //   const newUser = this.state.user;
  //   axios
  //     .post('http://localhost:9000/api/register', newUser)
  //     .then(response =>  console.log(response))
  //     .then(this.setState({ loggedIn: true }))
  //     .catch(err => console.log(err));
  // }

  onLogin = (e) => {
    e.preventDefault();
    const user = this.state.user;
    console.log(user)
    axios
      .post('http://localhost:9000/api/login', user)
      .then(response =>  console.log(response))
      .then(this.setState({ loggedIn: true }))
      .catch(err => console.log(err));
  }

  check
    
  render() {
    if (!this.state.loggedIn) {
      return (
        <div className="App">
          <header className="App-header">
            Welcome to the API!
            <form>
              <div>Register:</div>
              <input type="text" name="username" placeholder="username" onChange={this.onInputChange}/>
              <input type="text" name="password" placeholder="password" onChange={this.onInputChange}/>
              <button onClick={this.onRegister}>Register</button>
            </form>
            <form>
              <div>Login:</div>
              <input type="text" name="username" placeholder="username" onChange={this.onInputChange}/>
              <input type="text" name="password" placeholder="password" onChange={this.onInputChange}/>
              <button onClick={this.onLogin}>Login</button>
            </form>
          </header>
        </div>
      );
    } else {
      return (
        <div>Users:</div>
      )
    }
  }
}

export default App;
