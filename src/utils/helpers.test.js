import buildInput from './helpers';

describe('helpers', () => {
  it('should take a type and handleChange function and return JSX for the input', () => {
    let mockType = 'email';
    let mockHandleChange = jest.fn();
    const result = buildInput(mockType, mockHandleChange);
    expect(result.key).toEqual(mockType);
  });
});