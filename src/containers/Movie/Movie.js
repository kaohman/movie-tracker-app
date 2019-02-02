import React from 'react'
import { toggleFavorite, errorToDisplay } from '../../actions';
import { connect } from 'react-redux';

export const Movie = ({ poster_path, id, user, toggleFavorite, errorToDisplay }) => {
  const handleClick = (event) => {
    if (user.favorites) {
      toggleFavorite(event.target.parentElement.id);
    } else {
      errorToDisplay('Please log in to add favorites');
    }
  }

  return (
    <div className='movie-card' id={id}>
      <button 
        onClick={handleClick}
        className=
        {
          (user.favorites && user.favorites.includes(id)) ? 'favorite-icon favorite' : 'favorite-icon'
        }
      ></button>
      <img className='movie-image' src={`http://image.tmdb.org/t/p/w342/${poster_path}`} alt="a" />
    </div>
  )
}

export const mapStateToProps = (state) => ({
  user: state.user
});

export const mapDispatchToProps = (dispatch) => ({
  toggleFavorite: (id) => dispatch(toggleFavorite(id)),
  errorToDisplay: (message) => dispatch(errorToDisplay(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);

// when user logs in, grab all favorites from backend using their user id and store them in redux state
// on movie cards, add active class to favorited movies --> if favorites.includes(movie.id), add active class
// when user clicks favorite icon, toggle favorite in redux state and do api call to add/remove from backend