import React from 'react';
import ReactDOM from 'react-dom';
import { App, mapDispatchToProps } from './App';
import API from '../../utils/api';
import { apiKey } from '../../utils/api-key';
import { shallow } from 'enzyme';
import { setMovies } from '../../actions';

describe('App', () => {
  describe('defaults', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<App />);
    });

    it('should match the snapshot with all data passed in', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('componentDidMount', () => {
    let wrapper;
    let mockData;
    let mockSetMovies;

    beforeEach(() => {
      mockSetMovies = jest.fn();
      mockData = { results: [{ name: 'AquaMan', id: 1 }, { name: 'Beauty and the Beast', id: 2 }] };
      API.fetchData = jest.fn().mockImplementation(() => {
        return mockData
      });
      wrapper = shallow(
      <App 
        setMovies={mockSetMovies}
      />);
    });

    it('should call fetchData with the correct parameters', async () => {
      const expected = `https://api.themoviedb.org/3/movie/popular?page=1&api_key=${apiKey}&language=en-US`;
      await wrapper.instance().componentDidMount();
      expect(API.fetchData).toHaveBeenCalledWith(expected);
    });

    it('should call setMovies with the correct parameters', async () => {
      const expected = [{ name: 'AquaMan', id: 1 }, { name: 'Beauty and the Beast', id: 2 }];
      await wrapper.instance().componentDidMount();
      expect(mockSetMovies).toHaveBeenCalledWith(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch when using a function from mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setMovies([{ name: 'AquaMan', id: 1 }, { name: 'Beauty and the Beast', id: 2 }]);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setMovies([{ name: 'AquaMan', id: 1 }, { name: 'Beauty and the Beast', id: 2 }]);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});