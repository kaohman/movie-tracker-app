import React, { Component } from 'react';
import '../../normalize.css';
import '../../main.scss';
import { connect } from 'react-redux';
import { setMovies, errorToDisplay, setCurrentUser } from '../../actions';
import API from '../../utils/api';
import { apiKey } from '../../utils/api-key';
import Movies from '../Movies/Movies'
import Login from '../Login/Login'
import { Route, NavLink, withRouter } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';

export class App extends Component {
  
  componentDidMount = async () => {
    const { errorToDisplay, setMovies } = this.props
    const initialCategory = 'popular'
    const root = `https://api.themoviedb.org/3/movie/${initialCategory}`
    const url = `${root}?page=1&api_key=${apiKey}&language=en-US`
    try {
      const movies = await API.fetchData(url);
      await setMovies(movies.results);
    } catch (error) {
      errorToDisplay(error)
    }
  }

  signOut = () => {
    this.props.setCurrentUser({})
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Movie Tracker</h1>
          <div>
            {
              this.props.user.name ? <span className="user-name">Welcome: {this.props.user.name}... </span> : ''
            }
            <NavLink activeClassName='selected' className='nav-links' to='/'>Popular Movies</NavLink>
            <NavLink activeClassName='selected' className='nav-links' to='/favorites'>Favorites</NavLink>
            {
              this.props.user.name ?
                <button className='nav-links' id='sign-out-button' onClick={this.signOut}>Sign Out</button> :
                <NavLink className='nav-links' to="/login">User Login</NavLink>
            }
          </div>
        </header>
        <Route path='/' component={Movies} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  setMovies: (movies) => dispatch(setMovies(movies)),
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  errorToDisplay: (message) => dispatch(errorToDisplay(message)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));