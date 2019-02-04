import { moviesReducer } from './moviesReducer';
import * as actions from '../actions';

describe('moviesReducer', () => {
  it('should return the initial state', () => {
    const expected = [];
    const result = moviesReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return state with new movies', () => {
    const expected = [{title: 'Aquaman', id: 1, movie_id: 1}, {title: 'Beauty and the Beast', id: 2, movie_id: 2}];
    const result = moviesReducer([], actions.setMovies(expected));
    expect(result).toEqual(expected);
  });
});