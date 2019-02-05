import React from 'react'
import { shallow } from 'enzyme'
import { Movie, mapStateToProps, mapDispatchToProps } from './Movie'
import { toggleFavorite, errorToDisplay } from '../../actions';
import API from '../../utils/api';

describe('Movie', () => {
  describe('defaults', () => {
    let wrapper;
    let mockUser;
    let mockMovie;

    beforeEach(() => {
      mockMovie = {
        movie_id: 0,
        poster_path: 'url/',
        title: 'Aquaman',
        poster_path: 'url/2',
        release_date: '02-03-2019',
        vote_average: 6.9,
        overview: 'Text about movie...',
      }
      mockUser = { name: 'Tommy', email: 'a@a', id: 1, password: 'password', favorites: [] }
      wrapper = shallow(
        <Movie
          user={mockUser}
          {...mockMovie}
        />
      );
    });

    it('should match the snapshot with all data passed in', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('handleClick', () => {
    let wrapper;
    let mockUser;
    let mockMovie;
    let mockToggleFavorite;
    let mockErrorToDisplay;

    beforeEach(() => {
      mockToggleFavorite = jest.fn();
      mockErrorToDisplay = jest.fn();
      mockMovie = {
        movie_id: 0,
        poster_path: 'url/',
        title: 'Aquaman',
        poster_path: 'url/2',
        release_date: '02-03-2019',
        vote_average: 6.9,
        overview: 'Text about movie...',
      }
      mockUser = { name: 'Tommy', email: 'a@a', id: 1, password: 'password', favorites: [] };
      wrapper = shallow(
        <Movie
          user={mockUser}
          {...mockMovie}
          toggleFavorite={mockToggleFavorite}
          errorToDisplay={mockErrorToDisplay}
        />
      );
    });

    it('should call toggleFavorite with the correct parameters', () => {
      const expected = {
        movie_id: 0,
        user_id: 1,
        title: 'Aquaman',
        poster_path: 'url/2',
        release_date: '02-03-2019',
        vote_average: 6.9,
        overview: 'Text about movie...',
      }
      wrapper.instance().handleClick();
      expect(mockToggleFavorite).toHaveBeenCalledWith(expected);
    });

    it('should call removeFromUserFavorites', () => {
      mockUser = {
        name: 'Tommy', 
        email: 'a@a', 
        id: 1, 
        password: 'password', 
        favorites: [{
          movie_id: 0,
          user_id: 1,
          title: 'Aquaman',
          poster_path: 'url/2',
          release_date: '02-03-2019',
          vote_average: 6.9,
          overview: 'Text about movie...',
        }],
      };
      wrapper = shallow(
        <Movie
          user={mockUser}
          {...mockMovie}
          toggleFavorite={mockToggleFavorite}
          errorToDisplay={mockErrorToDisplay}
        />
      );
      wrapper.instance().removeFromUserFavorites = jest.fn();
      wrapper.instance().handleClick();
      expect(wrapper.instance().removeFromUserFavorites).toHaveBeenCalled();
    });

    it('should call addToUserFavorites with the correct parameters', () => {
      const expected = {
        movie_id: 0,
        user_id: 1,
        title: 'Aquaman',
        poster_path: 'url/2',
        release_date: '02-03-2019',
        vote_average: 6.9,
        overview: 'Text about movie...',
      }
      wrapper.instance().addToUserFavorites = jest.fn();
      wrapper.instance().handleClick();
      expect(wrapper.instance().addToUserFavorites).toHaveBeenCalledWith(expected);
    });

    it('should call errorToDisplay with the correct parameters if everything is not okay', () => {
      const expected = 'Please log in to add favorites';
      mockUser = {};
      wrapper = shallow(
        <Movie
          user={mockUser}
          {...mockMovie}
          toggleFavorite={mockToggleFavorite}
          errorToDisplay={mockErrorToDisplay}
        />
      );
      wrapper.instance().handleClick();
      expect(mockErrorToDisplay).toHaveBeenCalledWith(expected);
    });
  });

  describe('addToUserFavorites', () => {
    let wrapper;
    let mockMovie;
    let mockUser;
    let mockErrorToDisplay;
    
    beforeEach(() => {
      mockErrorToDisplay = jest.fn();
      API.postData = jest.fn();
      mockMovie = {
        movie_id: 0,
        poster_path: 'url/',
        title: 'Aquaman',
        poster_path: 'url/2',
        release_date: '02-03-2019',
        vote_average: 6.9,
        overview: 'Text about movie...',
      }
      mockUser = { name: 'Tommy', email: 'a@a', id: 1, password: 'password', favorites: [] };
      wrapper = shallow(
        <Movie
          user={mockUser}
          {...mockMovie}
          errorToDisplay={mockErrorToDisplay}
        />
      );
    });

    it('should call API.postData with the correct params', async () => {
      const expected = [{ ...mockMovie, user_id: 1 }, '/favorites/new'];
      await wrapper.instance().addToUserFavorites(expected[0]);
      expect(API.postData).toHaveBeenCalledWith(expected[0], expected[1]);
    });

    it.skip('should call errorToDisplay with the correct parameters if everything is not okay', async () => {
      const expected = 'Error posting data';
      API.postData = jest.fn().mockImplementation(() => Promise.reject({
        ok: false
      }));
      await wrapper.instance().addToUserFavorites(mockMovie);
      expect(mockErrorToDisplay).toHaveBeenCalledWith(expected);
    });
  });

  describe('removeFromUserFavorites', () => {
    let wrapper;
    let mockMovie;
    let mockUser;
    let mockErrorToDisplay;

    beforeEach(() => {
      API.deleteData = jest.fn();
      mockErrorToDisplay = jest.fn();
      mockUser = {
        name: 'Tommy',
        email: 'a@a',
        id: 1,
        password: 'password',
        favorites: [{
          movie_id: 0,
          user_id: 1,
          title: 'Aquaman',
          poster_path: 'url/2',
          release_date: '02-03-2019',
          vote_average: 6.9,
          overview: 'Text about movie...',
        }],
      };
      wrapper = shallow(
        <Movie
          user={mockUser}
          {...mockMovie}
          errorToDisplay={mockErrorToDisplay}
        />
      );
    });
  
    it('should call API.deleteData with the correct params', async () => {
      const expected = '/1/favorites/0'
      await wrapper.instance().removeFromUserFavorites();
      expect(API.deleteData).toHaveBeenCalledWith(expected);
    });
  
    it.skip('should call errorToDisplay with the correct parameters if everything is not okay', async () => {
      const expected = 'Error deleting data';
      API.deleteData = jest.fn().mockImplementation(() => {
        throw new Error(expected)
      });
      await wrapper.instance().removeFromUserFavorites();
      expect(mockErrorToDisplay).toHaveBeenCalledWith(expected);
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object of props', () => {
      const name = 'Taylor';
      const password = 'password';
      const email = 'a@a';
      const id = 1;
      const mockState = {
        user: { name, id, password, email },
        movies: [],
        status: true,
      };
      const expected = {
        user: { name, id, password, email },
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch when using function toggleFavorite from mapDispatchToProps', () => {
      const mockMovie = {
        movie_id: 0,
        poster_path: 'url/',
        title: 'Aquaman',
        poster_path: 'url/2',
        release_date: '02-03-2019',
        vote_average: 6.9,
        overview: 'Text about movie...',
      };
      const mockDispatch = jest.fn();
      const actionToDispatch = toggleFavorite(mockMovie);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.toggleFavorite(mockMovie);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch when using function errorToDisplay from mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = errorToDisplay('Error message');
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.errorToDisplay('Error message');
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});