import API from './api';

describe('API', () => {
  describe('fetchData', () => {
    let url;
    let mockPeople;

    beforeEach(() => {
      url = 'https://swapi.co/api/people';
      mockPeople = [{ name: 'R2D2', homeworld: 'basement', population: '5000', species: 'droid' }, { name: 'Luke Skywalker', homeworld: 'Tatooine', population: '2000', species: 'human' }];
    });

    it('should call fetch with the correct parameters', () => {
      // setup
      const expected = url;
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockPeople),
        ok: true,
      }));

      //  execution
      API.fetchData(url);

      // expectation
      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should console log an error if everything is not okay', async () => {
      // setup
      const expectedError = Error('Error fetching data: response.json is not a function');
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 401,
        ok: false
      }));

      // execution & expectation
      await expect(API.fetchData(url)).rejects.toEqual(expectedError);
    });
  });

  

});