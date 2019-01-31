import * as actions from './index';

describe('actions', () => {
  it('should return a type SET_CURRENT_USER with a user', () => {
    const user = {name: 'Taylor', email: 'tman@aol.com', id: 1, password: 'password'};
    const expected = {
      type: 'SET_CURRENT_USER',
      user,
    }
    const result = actions.setCurrentUser(user);
    expect(result).toEqual(expected);
  });

  it('should return a type TOGGLE_FAVORITE with an id', () => {
    const id = 1;
    const expected = {
      type: 'TOGGLE_FAVORITE',
      id
    }
    const result = actions.toggleFavorite(id);
    expect(result).toEqual(expected);
  });

  it('should return a type SET_MOVIES with movies', () => {
    const movies = [{title: 'Aquaman', id: 1}, {title: 'Beauty and the Beast', id: 2}];
    const expected = {
      type: 'SET_MOVIES',
      movies
    }
    const result = actions.setMovies(movies);
    expect(result).toEqual(expected);
  });
});