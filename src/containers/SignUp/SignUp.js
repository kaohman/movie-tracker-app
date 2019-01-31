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

  handleSubmit = async (e) => {
    e.preventDefault();
    let message;
    try {
      const response = await API.postData(this.state.user, '/api/users/new');
      message = response.message ? response.message : 'User already created'
    } catch (error) {
      throw Error(`Error creating user: ${error.message}`);
    }

    this.setState({
      user: {
        name: '',
        email: '',
        password: '',
      }, 
      response: message,
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