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
    const movie = { name: 'AquaMan', id: 1 };
    const expected = {
      type: 'TOGGLE_FAVORITE',
      movie,
    }
    const result = actions.toggleFavorite(movie);
    expect(result).toEqual(expected);
  });

  it('should return a type SET_USER_FAVORITES with movies', () => {
    const favorites = [{ title: 'Aquaman', id: 1 }, { title: 'Beauty and the Beast', id: 2 }];
    const expected = {
      type: 'SET_USER_FAVORITES',
      favorites
    }
    const result = actions.setUserFavorites(favorites);
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

  it('should return a type ERROR_TO_DISPLAY with movies', () => {
    const message = 'Error message'
    const expected = {
      type: 'ERROR_TO_DISPLAY',
      message
    }
    const result = actions.errorToDisplay(message);
    expect(result).toEqual(expected);
  });

  it('should return a type IS_LOADING with movies', () => {
    const status = true;
    const expected = {
      type: 'IS_LOADING',
      status
    }
    const result = actions.isLoading(status);
    expect(result).toEqual(expected);
  });
});