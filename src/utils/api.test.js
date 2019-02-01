import API from './api';

describe('API', () => {
  describe('fetchData', () => {
    let url;

    beforeEach(() => {
      url = 'https://api.themoviedb.org/3/movie/';
    });

    it('should call fetch with the correct parameters', () => {
      const expected = url;
      window.fetch = jest.fn();
      API.fetchData(url);
      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    // happy path when ok data are returned

    it('should throw an error if everything is not okay', async () => {
      const expected = TypeError(`Cannot read property 'message' of undefined`);
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 401,
        ok: false
      }));
      await expect(API.fetchData(url)).rejects.toEqual(expected);
    });
  });

  describe('postData', () => {
    let url;
    let mockUser;

    beforeEach(() => {
      url = '';
      mockUser = { name: 'Taylor', email: 'tman@aol.com', id: 1, password: 'password' }
    });
    
    it('should call fetch with the correct parameters', () => {
      const expected = ['http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify(mockUser),
        headers: {
          'Content-type': 'application/json'
        }
      }];
      window.fetch = jest.fn();
      API.postData(mockUser, url);
      expect(window.fetch).toHaveBeenCalledWith(expected[0], expected[1]);
    });

    // happy path when ok data are returned

    it('should throw an error if everything is not okay', async () => {
      const expected = TypeError(`Cannot read property 'message' of undefined`);
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 401,
        ok: false
      }));
      await expect(API.postData(url)).rejects.toEqual(expected);
    });
  });
});