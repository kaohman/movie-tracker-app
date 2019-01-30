import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SignUp from '../SignUp';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
    
    this.setState({
      email: '',
      password: ''
    })
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value })
  }

  render() {
    const {email, password} = this.state
    return (
      <div>
        <Link to='/'>HOME</Link>
        <form onSubmit={this.handleSubmit}>
          <label>Email
            <input
              onChange={this.handleChange}
              name="email"
              type="email"
              value={email} />
          </label>
          <label>Password
            <input
              onChange={this.handleChange}
              name="password"
              type="password"
              value={password} />
          </label>
          <input type="submit"/>
        </form>

        <Link to='/signup'>sign up page</Link>
        <Route path='/signup' component={SignUp}/>
      </div>
    )
  }
}

export default Login;