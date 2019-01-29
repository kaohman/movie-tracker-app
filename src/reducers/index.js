import { combineReducers } from 'redux';
import { moviesReducer } from './moviesReducer';
import { userReducer } from './userReducer';
import { pageToDisplayReducer } from './pageToDisplayReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
  pageToDisplay: pageToDisplayReducer,
});

export default rootReducer;