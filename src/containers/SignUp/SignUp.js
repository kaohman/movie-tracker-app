import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import API from '../../utils/api';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.values(this.state).includes('')) {
      try {
        API.postData(this.state, '/api/users/new');
      } catch (error) {
        throw Error(`Error creating user: ${error.message}`);
      }
    }
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <div>
        <Link to='/'>HOME</Link>
        <form onSubmit={this.handleSubmit}>
          <label>User Name
            <input
              onChange={this.handleChange}
              name="name"
              type="name"
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
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default SignUp;