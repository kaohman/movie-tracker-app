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

  it('should return state with a toggled favorite', () => {
    const expected = [1, 2, 4, 3];
    const result = userReducer([1, 2, 4], actions.setCurrentUser(expected));
    expect(result).toEqual(expected);
  });
});