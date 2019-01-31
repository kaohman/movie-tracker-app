import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import API from '../../utils/api';
import InputFields from '../../components/InputFields/InputFields'

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
    const inputFields = Object.keys(this.state.user).map(field => {
      return <InputFields
          key={field}
          type={field}
          value={this.state.user[field]}
          handleChange={this.handleChange} />
    })

    return (
      <div>
        <Link to='/'>HOME</Link>
        <form onSubmit={this.handleSubmit}>
          {inputFields}
          <input type="submit" />
        </form>
        <h3>{this.state.response}</h3>
      </div>
    )
  }
}

export default SignUp;