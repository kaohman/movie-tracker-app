import React, { Component } from 'react';
import '../../normalize.css';
import '../../main.scss';
import { connect } from 'react-redux';
import { getMovies } from '../../actions';
import API from '../../utils/api';
import { apiKey } from '../../utils/api-key';
import Movie from '../Movie/Movie'

class App extends Component {

  componentDidMount = async () => {
    const initialCategory = 'popular'
    const root = `https://api.themoviedb.org/3/movie/${initialCategory}`
    const url = `${root}?page=1&api_key=${apiKey}&language=en-US`

    const movies = await API.fetchData(url);
    await this.props.getMovies(movies.results);
  }

  render() {
    let { movies } = this.props;

    return (
      <div className="App">
        <h1>Movie Tracker</h1>
        {
          movies.length && 
          movies.map(movie => <Movie {...movie} key={movie.id} />)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {movies: state.movies, }
}

const mapDispatchToProps = (dispatch) => ({
  getMovies: (movies) => dispatch(getMovies(movies)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);