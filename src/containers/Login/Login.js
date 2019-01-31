import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import InputFields from '../../components/InputFields/InputFields'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.postData(this.state, '/api/users');
      await console.log(response);
    } catch (error) {
      throw Error(`Error logging in user: ${error.message}`)
    }
    
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
    const inputFields = Object.keys(this.state).map(field => {
      return <InputFields
        key={field}
        type={field}
        value={this.state[field]}
        handleChange={this.handleChange} />
    })

    return (
      <div>
        <Link to='/'>HOME</Link>
        <form onSubmit={this.handleSubmit}>
          {inputFields}
          <input type="submit"/>
        </form>
        <Link to='/signup'>Sign Up Here</Link>
      </div>
    )
  }
}

export default Login;