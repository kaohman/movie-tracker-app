export const updatePageToDisplay = (page) => ({
  type: 'UPDATE_PAGE_TO_DISPLAY',
  page,
});

export const updateUser = (user) => ({
  type: 'UPDATE_USER',
  user,
});

export const toggleFavorite = (id) => ({
  type: 'TOGGLE_FAVORITE',
  id,
});

export const getMovies = (movies) => ({
  type: 'GET_MOVIES',
  movies,
})