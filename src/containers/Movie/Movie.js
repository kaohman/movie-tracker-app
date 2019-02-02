import React from 'react'
import { toggleFavorite, errorToDisplay } from '../../actions';
import { connect } from 'react-redux';
import API from '../../utils/api';

export const Movie = ({ movie, user, toggleFavorite, errorToDisplay }) => {
  const handleClick = (event) => {
    if (user.favorites) {
      toggleFavorite(event.target.parentElement.id);
      user.favorites.includes(movie.id.toString()) ? removeFromUserFavorites() : addToUserFavorites();
    } else {
      errorToDisplay('Please log in to add favorites');
    }
  }

  const addToUserFavorites = async () => {
    const { id, title, poster_path, release_date, vote_average, overview } = movie;
    const favoriteMovie = {
      movie_id: id,
      user_id: user.id,
      title,
      poster_path,
      release_date,
      vote_average,
      overview,
    };

    try {
      await API.postData(favoriteMovie, '/favorites/new');
    } catch(error) {
      errorToDisplay(error)
    }
  }

  const removeFromUserFavorites = async () => {
    try {
      await API.deleteData(`/${user.id}/favorites/${movie.id}`)
    } catch (error) {
      errorToDisplay(error)
    }
  }

  return (
    <div className='movie-card' id={movie.id}>
      <button 
        onClick={handleClick}
        className=
        {
          (user.favorites && user.favorites.includes(movie.id.toString())) ? 'favorite-icon favorite' : 'favorite-icon'
        }
      ></button>
      <img className='movie-image' src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt="a" />
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