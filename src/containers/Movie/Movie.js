import React from 'react'

const Movie = ({ title, poster_path }) => {
  return (
    <div>
      <h2>{title}</h2>
      <img src={`http://image.tmdb.org/t/p/w185/${poster_path}`} alt="a" />
    </div>
  )
}

export default Movie;