export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.user;
    case 'TOGGLE_FAVORITE':
      const { favorites } = state;
      const newFavorites = favorites.filter(favorite => favorite.movie_id !== action.movie.movie_id);
      if (newFavorites.length < favorites.length) {
        return {...state, favorites: newFavorites};
      } else {
        return {...state, favorites: [...favorites, action.movie]};
      }
    case 'SET_USER_FAVORITES':
      return {...state, favorites: action.favorites}
    default:
      return state;
  }
}