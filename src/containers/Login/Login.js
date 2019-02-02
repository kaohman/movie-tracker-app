import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import API from '../../utils/api';
import buildInput from '../../utils/helpers';
import { setCurrentUser, errorToDisplay, setUserFavorites } from '../../actions';
import { connect } from 'react-redux';

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
        response: 'User does not exist, please try again or sign up',
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
    this.setState({user: {...this.state.user, [name]: value }})
  }
  
  render() {
    const { isLoggedIn, response, user } = this.state;
    const inputFields = Object.keys(user).map(field => buildInput(field, this.handleChange))  
    if (isLoggedIn) {
      return <Redirect to='/' />
    } else {
      return (
        <div className='overlay-div'>
          <div className='login-div'>
            <Link className='home-link' to='/'>HOME</Link>
            <form onSubmit={this.handleSubmit} ref={(el) => this.formRef = el}>
              {inputFields}
              <input className='submit-button' type="submit"/>
            </form>
            <h3>{response}</h3>
            <Link id='sign-up-link' to='/signup'>Sign Up Here</Link>
          </div>
        </div>
      )
    }
  }
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