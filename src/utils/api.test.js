import API from './api';

describe('API', () => {
  describe('getData', () => {
    let url;

    beforeEach(() => {
      url = 'https://api.themoviedb.org/3/movie/';
    });

    it('should call fetch with the correct parameters', () => {
      const expected = url;
      window.fetch = jest.fn();
      API.getData(url);
      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should throw an error if everything is not okay', async () => {
      const expected = TypeError(`Cannot read property 'message' of undefined`);
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 401,
        ok: false
      }));
      await expect(API.getData(url)).rejects.toEqual(expected);
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

    it('should throw an error if everything is not okay', async () => {
      const expected = Error('Error posting data: undefined');
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 401,
        ok: false
      }));
      await expect(API.postData(url)).rejects.toEqual(expected);
    });
  });

  describe('deleteData', () => {
    let url;

    beforeEach(() => {
      url = '';
    });

    it('should call fetch with the correct parameters', () => {
      const expected = ['http://localhost:3000/api/users', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      }];
      window.fetch = jest.fn();
      API.deleteData(url);
      expect(window.fetch).toHaveBeenCalledWith(expected[0], expected[1]);
    });

    it('should throw an error if everything is not okay', async () => {
      const expected = Error('Error deleting data: undefined');
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 401,
        ok: false
      }));
      await expect(API.deleteData(url)).rejects.toEqual(expected);
    });
  });
});