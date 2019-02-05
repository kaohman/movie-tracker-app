import React from 'react'
import { shallow } from 'enzyme'
import {Movies, mapStateToProps} from './Movies'

describe('Movies', () => {
  let wrapper;


  describe('defaults', () => {
    it('should match the initial snapshot', () => {
      const mockFavorites = undefined;
      const mockLocation = { pathname: '/' };
      wrapper = shallow(
        <Movies
          favorites={mockFavorites}
          location={mockLocation} />
      )
      expect(wrapper).toMatchSnapshot()
    })
    
    it('should match a favorites snapshot', () => {
      const mockFavorites = [{
        movie_id: 424694,
        release_date: "2018-10-24",
        title: "Bohemian Rhapsody",
        user_id: 44,
        vote_average: 8.2,
      }];
      const mockLocation = { pathname: '/favorites' };

      wrapper = shallow(
        <Movies
          favorites={mockFavorites}
          location={mockLocation} />
      )
      // TODO: WOULD LIKE TO SEE BOTH OUTPUTS TESTED...
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('mapStateToProps', () => {
    it('should convert store state to props ', () => {
      const mockMovie = {title: 'movie', id: 1}
      const mockState = { user: {favorites: []}, movies: [mockMovie]};
      const expected = {favorites: [], movies: [mockMovie]}
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected)
    })
  })
})