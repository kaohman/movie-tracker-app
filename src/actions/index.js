export const setCurrentUser = (user) => ({
  type: 'SET_CURRENT_USER',
  user,
});

export const toggleFavorite = (movie) => ({
  type: 'TOGGLE_FAVORITE',
  movie,
});

export const setUserFavorites = (favorites) => ({
  type: 'SET_USER_FAVORITES',
  favorites,
})

export const setMovies = (movies) => ({
  type: 'SET_MOVIES',
  movies,
});

export const errorToDisplay = (message) => ({
  type: 'ERROR_TO_DISPLAY',
  message,
})

export const isLoading = (status) => ({
  type: 'IS_LOADING',
  status,
})