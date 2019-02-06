import { userReducer } from './userReducer';
import * as actions from '../actions';

describe('userReducer', () => {
  it('should return the initial state', () => {
    const expected = {};
    const result = userReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return state with current user', () => {
    const expected = {name: 'Toby', email: 'toby@aol.com', id: 1, password: 'password'};
    const result = userReducer(undefined, actions.setCurrentUser(expected));
    expect(result).toEqual(expected);
  });

  it('should return state with an added favorite', () => {
    const expected = { favorites: [{ movie_id: 1 }, { movie_id: 2 }, { movie_id: 3 }] };
    const result = userReducer({favorites: [{movie_id: 1}, {movie_id:2}]}, actions.toggleFavorite({movie_id: 3}));
    expect(result).toEqual(expected);
  });

  it('should return state with a removed favorite', () => {
    const expected = {favorites: [{ movie_id: 2 }]};
    const result = userReducer({ favorites: [{ movie_id: 1 }, { movie_id: 2 }] }, actions.toggleFavorite({ movie_id: 1 }));
    expect(result).toEqual(expected);
  });

  it('should return state with user favorites', () => {
    const expected = { favorites: [{id: 1}, {id: 2}] };
    const result = userReducer(undefined, actions.setUserFavorites(expected.favorites));
    expect(result).toEqual(expected);
  });
});