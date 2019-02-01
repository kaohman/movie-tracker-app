import React from 'react'
import { Link } from 'react-router-dom'

const Movie = (props) => {
  const { id, location, poster_path } = props;
  const singleMovie = location.pathname.includes(id)

  if (singleMovie) {
    return (
      <div>
        <h4>{props.id}</h4>
        <h4>{props.title}</h4>
        <h4>{props.overview}</h4>
      </div>
    )
  } else {
    return (
      <div className='movie-card'>
        <Link to={`/movies/${id}`}>
          <img
            className='movie-image'
            src={`http://image.tmdb.org/t/p/w342/${poster_path}`}
            alt="movie" />
        </Link>
      </div>
    )
  }
}

export default Movie;