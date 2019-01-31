import React, { Component } from 'react';
import '../../normalize.css';
import '../../main.scss';
import { connect } from 'react-redux';
import { setMovies } from '../../actions';
import API from '../../utils/api';
import { apiKey } from '../../utils/api-key';
import Movies from '../Movies/Movies'
import Login from '../Login/Login'
import { Route, NavLink, withRouter } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';

export class App extends Component {
  
  componentDidMount = async () => {
    const initialCategory = 'popular'
    const root = `https://api.themoviedb.org/3/movie/${initialCategory}`
    const url = `${root}?page=1&api_key=${apiKey}&language=en-US`
    const movies = await API.fetchData(url);
    await this.props.setMovies(movies.results);
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Movie Tracker</h1>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/login">User Login</NavLink>
        </header>
        <Route exact path='/' component={Movies} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setMovies: (movies) => dispatch(setMovies(movies)),
})

export default withRouter(connect(null, mapDispatchToProps)(App));