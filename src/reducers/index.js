import { combineReducers } from 'redux';
import { moviesReducer } from './moviesReducer';
import { userReducer } from './userReducer';
import { errorReducer } from './errorReducer';
import { loadingReducer } from  './loadingReducer'

const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
  errorMessage: errorReducer,
  loading: loadingReducer,
});

export default rootReducer;