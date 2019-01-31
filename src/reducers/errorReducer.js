export const errorReducer = (state = null, action) => {
  switch (action.type) {
    case 'ERROR_TO_DISPLAY':
      return action.message;
    default:
      return state;
  }
}