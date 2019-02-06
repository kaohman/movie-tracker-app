import React from 'react';
import PropTypes from 'prop-types';

export const MovieDetails = (props) => {
  return (
    <div className='overlay-div'>
      <div className='movie-details-div'>
        <h4 onClick={props.history.goBack} className='return-link'>Return To All Movies</h4>
        <img className='movie-backdrop' src={`http://image.tmdb.org/t/p/w1280/${props.backdrop_path}`} alt=""/>
        <div className='movie-text-div'>
          <h2 className='movie-details' id='title-text'>{props.title}</h2>
          <p className='movie-details' id='overview-text'>{props.overview}</p>
          <p className='movie-details'>Release Date: {props.release_date}</p>
          <p className='movie-details'>Average Rating: {props.vote_average}</p>
        </div>
      </div>
    </div>
  )
}

MovieDetails.propTypes = {
  backdrop_path: PropTypes.string,
  title: PropTypes.string,
  overview: PropTypes.string,
  release_date: PropTypes.string,
  vote_average: PropTypes.number,
}

MovieDetails.defaultProps = {
  backdrop_path: '',
  title: '',
  overview: '',
  release_date: '',
  vote_average: 0,
}

export default MovieDetails;