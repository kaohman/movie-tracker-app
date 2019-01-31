import { combineReducers } from 'redux';
import { moviesReducer } from './moviesReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
});

export default rootReducer;