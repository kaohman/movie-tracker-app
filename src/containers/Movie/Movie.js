import React, { Component } from 'react'
import { toggleFavorite, errorToDisplay } from '../../actions';
import { connect } from 'react-redux';
import API from '../../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Movie extends Component {

  handleClick = async () => {
    const { user, toggleFavorite, errorToDisplay } = this.props;
    if (user.favorites) {
      const { movie_id, title, poster_path, release_date, vote_average, overview } = this.props;
      const favoriteMovie = {
        movie_id: movie_id,
        user_id: user.id,
        title,
        poster_path,
        release_date,
        vote_average,
        overview,
      };
      toggleFavorite(favoriteMovie);
      const favorite = user.favorites.find(favorite => favorite.movie_id === movie_id)
      favorite ? 
        await this.removeFromUserFavorites() : 
        await this.addToUserFavorites(favoriteMovie);
    } else {
      errorToDisplay('Please log in to add favorites');
    }
  }

  addToUserFavorites = async (movie) => {
    try {
      await API.postData(movie, '/favorites/new');
    } catch(error) {
      errorToDisplay(error)
    }
  }

  removeFromUserFavorites = async () => {
    const { movie_id, user } = this.props;
    try {
      await API.deleteData(`/${user.id}/favorites/${movie_id}`)
    } catch (error) {
      errorToDisplay(error)
    }
  }

  render() {
    const { movie_id, poster_path, user } = this.props;
    let favorite;
    if (user.favorites) {
      favorite = user.favorites.find(favorite => favorite.movie_id === movie_id)
    }
    return (
      <div className='movie-card' id={movie_id}>
        {
          user.favorites && 
            <button 
              onClick={this.handleClick}
              className=
              {
                favorite ? 'favorite-icon favorite' : 'favorite-icon'
              }
            ></button>
        }
        <Link to={`/movies/${movie_id}`}>
          <img className='movie-image' src={`http://image.tmdb.org/t/p/w342/${poster_path}`} alt="a" />
        </Link>
      </div>
    )
  }
}

Movie.propTypes = {
  movie_id: PropTypes.number,
  poster_path: PropTypes.string,
  title: PropTypes.string,
  poster_path: PropTypes.string,
  release_date: PropTypes.string,
  vote_average: PropTypes.number,
  overview: PropTypes.string,
  user: PropTypes.object,
  toggleFavorite: PropTypes.func,
  errorToDisplay: PropTypes.func,
}

Movie.defaultProps = {
  movie_id: 0,
  poster_path: '',
  title: PropTypes.string,
  poster_path: '',
  release_date: '',
  vote_average: 0,
  overview: '',
  user: {},
}

export const mapStateToProps = (state) => ({
  user: state.user
});

export const mapDispatchToProps = (dispatch) => ({
  toggleFavorite: (movie) => dispatch(toggleFavorite(movie)),
  errorToDisplay: (message) => dispatch(errorToDisplay(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);