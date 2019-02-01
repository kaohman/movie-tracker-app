import React from 'react'
import { shallow } from 'enzyme'
import Login from './Login'

describe('Login', () => {
  let wrapper = shallow(<Login />)
  const mockPreventDefault = {
    preventDefault: () => {}
  }
  
  describe('defaults', () => {
    it('should match snapshot', () => {

      expect(wrapper).toMatchSnapshot();
    })
    
    it.skip('should have a default state', () => {
      const expected = {
        user: { email: '', password: '' },
        response: '',
        isLoggedIn: false,
      }

      expect(wrapper.state()).toEqual(expected)
    })
  })
  
  describe('handleChange', () => {
    it('should update state with the input value', () => {
      const mockEvent = {
        target: {email: 'aa@aa.com', password: 'password'}
      }
      const expected = {
        email: 'aa@aa.com', password: 'password'
      }

      wrapper.instance().handleChange(mockEvent)

      expect(wrapper.state('user')).toEqual(expected)
    })
  })

  describe('handleSubmit', () => {
    it('should successfully handle user login', async () => {
      const mockData; //state info here
      
    })
  })
})