import React from 'react';
import ReactDOM from 'react-dom';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import API from '../../utils/api';
import { apiKey } from '../../utils/api-key';
import { shallow } from 'enzyme';
import { setMovies, errorToDisplay, setCurrentUser, isLoading } from '../../actions';

describe('App', () => {
  describe('defaults', () => {
    let wrapper;
    let mockUser

    beforeEach(() => {
      mockUser = { name: 'Tommy', email: 'a@a', id: 1, password: 'password', favorites: []}
      wrapper = shallow(
        <App 
          user={mockUser}
        />
      );
    });

    it('should match the snapshot with all data passed in', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('componentDidMount', () => {
    let wrapper;
    let mockData;
    let mockSetMovies;
    let mockUser;
    let mockError;
    let mockSetUser;
    let mockLoading;

    beforeEach(() => {
      mockLoading = jest.fn();
      mockSetUser = jest.fn();
      mockSetMovies = jest.fn();
      mockData = { results: [{ name: 'AquaMan', id: 1 }, { name: 'Beauty and the Beast', id: 2 }] };
      mockUser = { name: 'Tommy', email: 'a@a', id: 1, password: 'password', favorites: [] };
      mockError = jest.fn();
      API.getData = jest.fn().mockImplementation(() => {
        return mockData
      });
      wrapper = shallow(
      <App 
        user={mockUser}
        movies={mockData}
        setMovies={mockSetMovies}
        errorToDisplay={mockError}
        setCurrentUser={mockSetUser}
        isLoading={mockLoading}
      />);
    });

    it('should call checkForUser', async () => {
      wrapper.instance().checkForUser = jest.fn();
      await wrapper.instance().componentDidMount();
      expect(wrapper.instance().checkForUser).toHaveBeenCalled();
    });

    it('should call getData with the correct parameters', async () => {
      const expected = `https://api.themoviedb.org/3/movie/popular?page=1&api_key=${apiKey}&language=en-US`;
      await wrapper.instance().componentDidMount();
      expect(API.getData).toHaveBeenCalledWith(expected);
    });

    it('should call setMovies with the correct parameters', async () => {
      const expected = [{ name: 'AquaMan', id: 1 }, { name: 'Beauty and the Beast', id: 2 }];
      await wrapper.instance().componentDidMount();
      expect(mockSetMovies).toHaveBeenCalledWith(expected);
    });

    it('should call isLoading with the correct parameters', async () => {
      const expected = false;
      await wrapper.instance().componentDidMount();
      expect(mockLoading).toHaveBeenCalledWith(expected);
    });

    it('should call errorToDisplay with the correct parameters', async () => {
      API.getData = jest.fn().mockImplementation(() => Promise.reject({
          ok: false
      }));
      const expected = { ok: false };
      await wrapper.instance().componentDidMount();
      expect(mockError).toHaveBeenCalledWith(expected);
    });
  });

  describe('signOutUser', () => {
    let wrapper;
    let mockSetUser;

    beforeEach(() => {
      mockSetUser = jest.fn();
      wrapper = shallow(
        <App
          setCurrentUser={mockSetUser}
        />);
    });

    it('should call removeUserFromStorage', () => {
      wrapper.instance().removeUserFromStorage = jest.fn();
      wrapper.instance().signUserOut();
      expect(mockSetUser).toHaveBeenCalled();
    });

    it('should call setCurrentUser', () => {
      wrapper.instance().signUserOut();
      expect(mockSetUser).toHaveBeenCalled();
    });
  });

  describe('checkForUser', () => {
    let wrapper;
    let mockUser;
    let mockSetUser;

    beforeEach(() => {
      mockSetUser = jest.fn();
      mockUser = { name: 'Tommy', email: 'a@a', id: 1, password: 'password', favorites: [] };
      wrapper = shallow(
        <App
          setCurrentUser={mockSetUser}
        />);
    });

    it('should call setCurrentUser with the correct params', () => {
      localStorage.setItem('movie-user', JSON.stringify(mockUser));
      const expected = mockUser;
      wrapper.instance().checkForUser();
      expect(mockSetUser).toHaveBeenCalledWith(expected);
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object of props', () => {
      const name = 'Taylor';
      const password = 'password';
      const email = 'a@a';
      const id = 1;
      const mockState = {
        user: {name, id, password, email},
        movies: [],
        status: true,
      };
      const expected = {
        user: { name, id, password, email },
        movies: [],
        loading: true,
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch when using function SetMovies from mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setMovies([{ name: 'AquaMan', id: 1 }, { name: 'Beauty and the Beast', id: 2 }]);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setMovies([{ name: 'AquaMan', id: 1 }, { name: 'Beauty and the Beast', id: 2 }]);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch when using function setCurrentUser from mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setCurrentUser({ name: 'Tman', email: 'a@a', password: 'password', id: 1 });
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setCurrentUser({ name: 'Tman', email: 'a@a', password: 'password', id: 1 });
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch when using function errorToDisplay from mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = errorToDisplay('Error message');
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.errorToDisplay('Error message');
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch when using function isLoading from mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = isLoading(false);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.isLoading(false);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});