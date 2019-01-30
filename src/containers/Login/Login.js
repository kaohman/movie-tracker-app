import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
    
    this.setState({
      name: '',
      email: '',
      password: ''
    })
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value })
  }

  render() {
    const {name, email, password} = this.state
    return (
      <div>
        <Link to='/'>HOME</Link>
        <form onSubmit={this.handleSubmit}>
          <label>Name
            <input
              onChange={this.handleChange}
              name="name"
              type="text"
              value={name} />
          </label>
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

        <Link to='/'>sign up page</Link>
      </div>
    )
  }
}

export default Login;