import React, { Component } from 'react';
import Movie from '../Movie/Movie';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Movies extends Component {
  
  render() {
    const { favorites, movies, location } = this.props;
    if (favorites && location.pathname.includes('favorites')) {
      return (
        <div id='movie-container' >
          {
            favorites.length ? favorites.map(movie => <Movie {...movie} key={movie.id} />) :
            <h4 className='no-faves'>No favorites to show... why not favorite some movies?</h4>
          }
        </div>
      )
    } else {
      return (
        <div id='movie-container'>
        {
          location.pathname.includes('favorites') ?
          <h4 className='faves-login'>Please <Link className='login' to='/login'>LOG IN </Link>to view favorites</h4> :
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
  location: {},
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  favorites: state.user.favorites,
});

export default connect(mapStateToProps)(Movies);