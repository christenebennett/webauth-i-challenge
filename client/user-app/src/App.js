import React, { Component } from 'react';
import logo from './logo.svg';
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
      }
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

  onRegister = () => {
    const newUser = this.state.user;
    axios
      .post('http://localhost:9000/api/register', newUser)
      .then(response =>  console.log(response))
      .catch(err => console.log(err))
  }
  
  render() {
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
          </form>
        </header>
      </div>
    );
  }
}

export default App;
