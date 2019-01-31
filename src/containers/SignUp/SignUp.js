import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import API from '../../utils/api';
import helpers from '../../utils/helpers'
import buildInput from '../../utils/helpers';

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
    try {
      const response = await API.postData(this.state.user, '/api/users/new');
      await this.handleResponse(response);
    } catch (error) {
      throw Error(`Error creating user: ${error.message}`);
    }

    this.setState({
      user: {
        name: '',
        email: '',
        password: '',
      }
    })
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      user: {...this.state.user, [name]: value}
    });
  }

  render() {
    const { user, response } = this.state
    const inputFields = Object.keys(user).map(field => buildInput(field, user[field], this.handleChange))
    
    return (
      <div>
        <Link to='/'>HOME</Link>
        <form onSubmit={this.handleSubmit}>
          {inputFields}
          <input type="submit" />
        </form>
        <h3>{response}</h3>
      </div>
    )
  }
}

export default SignUp;