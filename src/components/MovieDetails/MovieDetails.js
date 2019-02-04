import React from 'react';
import { Link } from 'react-router-dom';

export const MovieDetails = (props) => {
  return (
    <div className='overlay-div'>
      <div className='movie-details-div'>
        <Link to='/'>
          <h4 className='return-link'>Return To All Movies</h4>
        </Link>
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

export default MovieDetails;