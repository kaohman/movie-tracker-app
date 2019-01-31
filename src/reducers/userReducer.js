export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.user;
    case 'TOGGLE_FAVORITE':
      const { favorites } = state.user;
      if (favorites.includes(action.id)) {
        return [...favorites, action.id];
      } else {
        return favorites.filter(id => id !== action.id);
      }
    default:
      return state;
  }
}