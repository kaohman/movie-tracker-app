export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.user;
    case 'TOGGLE_FAVORITE':
      const { favorites } = state;
      if (favorites.includes(action.id)) {
        const newFavorites = favorites.filter(id => id !== action.id);
        return {...state, favorites: newFavorites};
      } else {
        return {...state, favorites: [...favorites, action.id]};
      }
    default:
      return state;
  }
}