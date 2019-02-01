import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import API from '../../utils/api';
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

  handleSubmit = async (e) => {
    e.preventDefault();
    let message;
    try {
      const response = await API.postData(this.state.user, '/new');
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
    const { user, response } = this.state
    const inputFields = Object.keys(user).map(field => buildInput(field, this.handleChange))
    return (
      <div className='overlay-div'>
        <div className='login-div'>
          <Link className='home-link' to='/'>HOME</Link>
          <form onSubmit={this.handleSubmit}>
            {inputFields}
            <input className='submit-button' type="submit" />
          </form>
          <h3>{response}</h3>
        </div>
      </div>
    )
  }
}

export default SignUp;