import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../Login/Login';
import { toggleFavorite } from '../../actions';
import { connect } from 'react-redux';

export const Movie = ({ poster_path }) => {
  const handleClick = (id) => {
    props.toggleFavorite(id);
  }

  return (
    <div className='movie-card' id={}>
      <button onClick={(event) => handleClick()}></button>
      <img className='movie-image' src={`http://image.tmdb.org/t/p/w342/${poster_path}`} alt="a" />
    </div>
  )
}

export const mapStateToProps = (state) => ({
  favorites: state.user.favorites
});

export const mapDispatchToProps = (dispatch) => ({
  toggleFavorite: (id) => dispatch(toggleFavorite(id)),
});

export default connect(null, mapDispatchToProps)(Movie);

// when user logs in, grab all favorites from backend using their user id and store them in redux state
// on movie cards, add active class to favorited movies --> if favorites.includes(movie.id), add active class
// when user clicks favorite icon, toggle favorite in redux state and do api call to add/remove from backend