import React from 'react'
import { shallow } from 'enzyme'
import MovieDetails from './MovieDetails'

describe('MovieDetails', () => {
  let wrapper;
  let mockMovie

  beforeEach(() => {
    mockMovie = { 
      title: 'Aquaman', 
      overview: 'Text about movie...',  
      release_date: '2018-02-03', 
      vote_average: 6.9,
      backdrop_path: 'url/suffix/'
    }
    wrapper = shallow(
      <MovieDetails
        {...mockMovie}
      />
    );
  });
  
  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });
})