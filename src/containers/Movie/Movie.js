import React from 'react'

const Movie = ({ poster_path }) => {
  return (
    <div className='movie-card'>
      <img className='movie-image' src={`http://image.tmdb.org/t/p/w342/${poster_path}`} alt="a" />
    </div>
  )
}

export default Movie;