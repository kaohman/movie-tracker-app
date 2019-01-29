export const pageToDisplayReducer = (state = 'loading', action) => {
  switch (action.type) {
    case 'UPDATE_PAGE_TO_DISPLAY':
      return action.page;
    default:
      return state;
  }
}