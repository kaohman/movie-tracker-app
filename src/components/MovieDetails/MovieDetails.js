import React from 'react'
import { Link } from 'react-router-dom'

export const MovieDetails = (props) => {
  console.log(props)
  return (
    <div>
      <Link to='/'>
      <h4>All Movies</h4>
      </Link>
      <img src={`http://image.tmdb.org/t/p/w500/${props.backdrop_path}`} alt=""/>
      <h4>{props.title}</h4>
      <h4>{props.overview}</h4>
      <h4>{props.release_date}</h4>
      <h4>{props.vote_average}</h4>
    </div>
  )
}

export default MovieDetails;