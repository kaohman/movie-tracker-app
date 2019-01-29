export const updatePageToDisplay = (page) => ({
  type: 'UPDATE_PAGE_TO_DISPLAY',
  page,
});

export const updateUser = ({ email, password }) => ({
  type: 'UPDATE_USER',
  email,
  password,
});

export const toggleFavorite = (id) => ({
  type: 'TOGGLE_FAVORITE',
  id,
});