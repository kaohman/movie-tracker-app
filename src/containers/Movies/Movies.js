import React, { Component } from 'react';
import Movie from '../Movie/Movie';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Movies extends Component {
  
  render() {
    const { favorites, movies, location } = this.props;
    if (favorites && location.pathname.includes('favorites')) {
      return (
        <div id='movie-container'>
          {
            favorites.length ? favorites.map(movie => <Movie {...movie} key={movie.id} />) :
            <h4>No favorites to show</h4>
          }
        </div>
      )
    } else {
      return (
        <div id='movie-container'>
        {
          location.pathname.includes('favorites') ?
          <Redirect to='/login' /> :
          movies.map(movie => <Movie {...movie} location={location} key={movie.id} />)
        }
        </div>
      )
    }
  }
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  favorites: PropTypes.arrayOf(PropTypes.object),
  location: PropTypes.object,
}

Movies.defaultProps = {
  movies: [{}],
  favorites: [{}],
  location: {},
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  favorites: state.user.favorites,
});

export default connect(mapStateToProps)(Movies);