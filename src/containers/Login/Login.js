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
      email: '',
      password: '',
    }
  }

  handleSubmit = async (e) => {
    const { errorToDisplay, setCurrentUser } = this.props
    const { email, password } = this.state
    e.preventDefault();
    try {
      const response = await API.postData({email, password}, '');
      await console.log(response)
      await setCurrentUser(response)
    } catch (error) {
      errorToDisplay(error)
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
    const inputFields = Object.keys(this.state).map(field => buildInput(field, this.handleChange))

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

export const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  errorToDisplay: (message) => dispatch(errorToDisplay(message)),
})

export default connect(null, mapDispatchToProps)(Login);