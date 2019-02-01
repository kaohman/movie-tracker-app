import { errorReducer } from './errorReducer';
import * as actions from '../actions';

describe('errorReducer', () => {
  it('should return the initial state', () => {
    const expected = null;
    const result = errorReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return state with a new message', () => {
    const expected = 'error message';
    const result = errorReducer(undefined, actions.errorToDisplay(expected));
    expect(result).toEqual(expected);
  });
});