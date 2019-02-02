import React from 'react'
import { shallow } from 'enzyme'
import { Login } from './Login'
import api from '../../utils/api';
import { errorToDisplay } from '../../actions'

describe('Login', () => {
  let wrapper = shallow(<Login />)
  const mockPreventDefault = {
    preventDefault: () => {}
  }
  
  describe('defaults', () => {
    it('should match snapshot', () => {

      expect(wrapper).toMatchSnapshot();
    })
    
    it('should have a default state', () => {
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
        target: { name: 'email', value: 'aa@aa.com'}
      }
      const expected = {
        email: 'aa@aa.com', password: ''
      }

      wrapper.instance().handleChange(mockEvent)

      expect(wrapper.state('user')).toEqual(expected)
    })
  })

  describe('handleSubmit', () => {
    it.skip('should unsuccessfully log user in', async () => {
      const mockData = {
        a: 'a'
      }
      wrapper.instance().formRef = {
        reset: jest.fn()
      }
      // errorToDisplay.mockImplementation(() => {
      //   error: ''
      // })

      api.postData = jest.fn().mockImplementation(() => {
        return mockData
      })
      const expected = true;

      await wrapper.instance().handleSubmit(mockPreventDefault)

      expect(wrapper.state('isLoggedIn')).toEqual(expected)
      
    })
  })
})