import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import buildInput from '../../utils/helpers';
import { setCurrentUser, errorToDisplay } from '../../actions';
import { connect } from 'react-redux';

export class Login extends Component {
  constructor() {
    super()
    this.state = {
      user: {
        email: '',
        password: ''
      },
      response: '',
    }
  }

  handleSubmit = async (e) => {
    const { errorToDisplay, setCurrentUser } = this.props
    e.preventDefault();
    let message = '';

    try {
      const response = await API.postData(this.state.user, '');
      
      await setCurrentUser(response.data)
    } catch (error) {
      message = 'User does not exist, please try again or sign up'
      errorToDisplay(error)
    }
    
    await this.setState({
      user: { email: '', password: '' },
      response: message,
    }, this.formRef.reset())
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({user: {...this.state.user, [name]: value }})
  }
  
  render() {
    const { user, response } = this.state;
    const inputFields = Object.keys(user).map(field => buildInput(field, this.handleChange))
    return (
      <div>
        <Link to='/'>HOME</Link>
        <form onSubmit={this.handleSubmit} ref={(el) => this.formRef = el}>
          {inputFields}
          <input type="submit"/>
        </form>
        <h3>{response}</h3>
        <Link to='/signup'>Sign Up Here</Link>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  errorToDisplay: (message) => dispatch(errorToDisplay(message)),
})

export default connect(null, mapDispatchToProps)(Login);