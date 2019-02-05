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
      message = `${response.message}. Please log in.`
    } catch (error) {
      message = 'User email already exists, please try again or log in.';
    }

    this.formRef.reset()
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
          <Link to='/'>
            <button className='home-link'></button>
          </Link>
          <form autoComplete='off' onSubmit={this.handleSubmit} ref={(el) => this.formRef = el}>
            {inputFields}
            <input className='submit-button' type="submit" />
          </form>
          <Link className='sign-up-login-link' to='/login'>Login</Link>
          <p className='response'>{response}</p>
        </div>
      </div>
    )
  }
}

export default SignUp;