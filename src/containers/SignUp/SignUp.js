import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import API from '../../utils/api';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
      },
      response: ''
    }
  }

  handleResponse = (response) => {
    const message = response.message ? response.message : 'User already created'
    this.setState({
      response: message
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(this.state.user).includes('')) {
      try {
        const response = await API.postData(this.state.user, '/api/users/new');
        await this.handleResponse(response);
      } catch (error) {
        throw Error(`Error creating user: ${error.message}`);
      }
    }
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      user: {...this.state.user, [name]: value}
    });
  }

  render() {
    const { name, email, password } = this.state.user;
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
        <h3>{this.state.response}</h3>
      </div>
    )
  }
}

export default SignUp;