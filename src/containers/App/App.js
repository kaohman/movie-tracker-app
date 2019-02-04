import React, { Component } from 'react';
import '../../normalize.css';
import '../../main.scss';
import { connect } from 'react-redux';
import { setMovies, errorToDisplay, setCurrentUser, isLoading } from '../../actions';
import API from '../../utils/api';
import { apiKey } from '../../utils/api-key';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import { Route, NavLink, withRouter, Switch } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import MovieDetails from '../../components/MovieDetails/MovieDetails';

export class App extends Component {
  
  componentDidMount = async () => {
    const { errorToDisplay, setMovies, isLoading } = this.props
    const initialCategory = 'popular'
    const root = `https://api.themoviedb.org/3/movie/${initialCategory}`;
    const url = `${root}?page=1&api_key=${apiKey}&language=en-US`;
    try {
      const movies = await API.getData(url);
      await setMovies(movies.results);
      isLoading(false);
    } catch (error) {
      errorToDisplay(error);
    }
  }

  signOut = () => {
    this.props.setCurrentUser({});
  }

  render() {
    if (this.props.loading) {
      return (<h1>Loading Movies...</h1>)
    } else {
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
          <Switch>
            <Route path='/' component={Movies} />
            <Route path='/favorites' render={() => {
              return <Movies location={this.props.location} />
            }} />
          </Switch>
            <Route path='/movies/:id' render={({ match }) => {
              const { id } = match.params;
              const movie = this.props.movies.find(movie => movie.id === parseInt(id))
              
              if (movie) {
                return <MovieDetails {...movie} />
              }
            }} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
        </div>
      )
    }
  }
}

export const mapStateToProps = (state) => ({
  user: state.user,
  movies: state.movies,
  loading: state.status,
})

export const mapDispatchToProps = (dispatch) => ({
  setMovies: (movies) => dispatch(setMovies(movies)),
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  errorToDisplay: (message) => dispatch(errorToDisplay(message)),
  isLoading: (status) => dispatch(isLoading(status)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));