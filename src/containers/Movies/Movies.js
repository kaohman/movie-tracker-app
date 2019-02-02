import React from 'react'
import Movie from '../Movie/Movie'
import { connect } from 'react-redux'

const Movies = ({ movies }) => {
  return (
    <div id='movie-container'>
      {
        movies.length &&
          movies.map(movie => <Movie movie={movie} key={movie.id} />)
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  movies: state.movies
});

export default connect(mapStateToProps)(Movies);