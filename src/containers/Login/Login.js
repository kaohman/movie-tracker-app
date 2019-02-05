import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import API from '../../utils/api';
import buildInput from '../../utils/helpers';
import { setCurrentUser, errorToDisplay, setUserFavorites } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        password: ''
      },
      response: '',
      isLoggedIn: false,
    }
  }

  handleSubmit = async (e) => {
    const { errorToDisplay, setCurrentUser } = this.props
    e.preventDefault();

    try {
      const response = await API.postData(this.state.user, '');
      await setCurrentUser({...response.data, favorites: []});
      await this.fetchFavorites(this.props.user);
      await this.setState({isLoggedIn: true})
    } catch (error) {
      this.formRef.reset()
      errorToDisplay(error)
      await this.setState({
        user: { email: '', password: '' },
        response: 'Email and password do not match or user does not exist'
      })
    }
  }

  fetchFavorites = async (user) => {
    try {
      const results = await API.getData(`http://localhost:3000/api/users/${user.id}/favorites`);
      this.props.setUserFavorites(results.data);
    } catch (error) {
      errorToDisplay(error)
    }
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'email') {
      value = value.toLowerCase();
    }
    this.setState({user: {...this.state.user, [name]: value }})
  }
  
  render() {
    const { isLoggedIn, response, user } = this.state;
    const inputFields = Object.keys(user).map(field => buildInput(field, this.handleChange))  
    if (isLoggedIn) {
      return <Redirect to={'/'} />
    } else {
      return (
        <div className='overlay-div'>
          <div className='login-div'>
          <Link to='/'>
            <button className='home-link'></button>
          </Link>
            <form autoComplete='off' onSubmit={this.handleSubmit} ref={(el) => this.formRef = el}>
              <h4 className='form-title'>Please sign in</h4>
              {inputFields}
              <input className='submit-button' type="submit"/>
            </form>
            <Link className='sign-up-login-link' to='/signup'>Sign Up Here</Link>
            <p className='response'>{response}</p>
          </div>
        </div>
      )
    }
  }
}

Login.propTypes = {
  user: PropTypes.object,
  setCurrentUser: PropTypes.func,
  errorToDisplay: PropTypes.func,
  setUserFavorites: PropTypes.func,
}

Login.defaultProps = {
  user: {},
}

export const mapStateToProps = (state) => ({
  user: state.user,
})

export const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  errorToDisplay: (message) => dispatch(errorToDisplay(message)),
  setUserFavorites: (favorites) => dispatch(setUserFavorites(favorites)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);