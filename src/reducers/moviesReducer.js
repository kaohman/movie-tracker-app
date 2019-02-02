export const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      const allMovies = action.movies.map(movie => {
        return { ...movie, movie_id: movie.id }
      })
      return allMovies;
    default:
      return state;
  }
}