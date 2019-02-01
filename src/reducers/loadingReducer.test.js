import { loadingReducer } from './loadingReducer';
import * as actions from '../actions';

describe('loadingReducer', () => {
  it('should return the initial state', () => {
    const expected = true;
    const result = loadingReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return state as false', () => {
    const expected = false;
    const result = loadingReducer(undefined, actions.isLoading(expected));
    expect(result).toEqual(expected);
  });
});