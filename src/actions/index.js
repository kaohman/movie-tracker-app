export const setCurrentUser = (user) => ({
  type: 'SET_CURRENT_USER',
  user,
});

export const toggleFavorite = (id) => ({
  type: 'TOGGLE_FAVORITE',
  id,
});

export const setMovies = (movies) => ({
  type: 'SET_MOVIES',
  movies,
});

// is loading in state tree, starts as true
// error to display
