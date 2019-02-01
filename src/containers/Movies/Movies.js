import React from 'react'
import Movie from '../Movie/Movie'
import { connect } from 'react-redux'

const Movies = (props) => {
  return (
    <div id='movie-container'>
      {
        props.movies.length &&
        props.movies.map(movie => <Movie {...movie} location={props.location} key={movie.id} />)
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return { movies: state.movies, }
}

export default connect(mapStateToProps)(Movies);