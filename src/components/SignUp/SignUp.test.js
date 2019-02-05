import React from 'react'
import { shallow } from 'enzyme'
import SignUp from './SignUp'
import API from '../../utils/api'

describe('Signup', () => {
  let wrapper = shallow( <SignUp /> )
  const mockPreventDefault = {
    preventDefault: () => { }
  }

  describe('defaults', () => {    
    it('should match snapshot', () => {

      expect(wrapper).toMatchSnapshot();
    })

    it('should have a default state', () => {
      const expected = {
        user: { name: '', email: '', password: '' },
        response: ''
      }

      expect(wrapper.state()).toEqual(expected)
    })
  })

  describe('handleChange', () => {
    it('should update state with the input value', () => {
      const mockEvent = {
        target: { name: 'name', value: 'new value' }
      }
      const expected = {
        name: 'new value', email: '', password: ''
      }

      wrapper.instance().handleChange(mockEvent)

      expect(wrapper.state('user')).toEqual(expected)
    })
  })

  describe('handleSubmit', () => {
    it('should successfully handle a new user signup', async () => {
      const mockData = {
        id: 1,
        message: "New user created",
        status: "success",
      }
      wrapper.instance().formRef = {
        reset: jest.fn()
      }
      API.postData = jest.fn().mockImplementation(() => {
        return mockData
      })
      const expected = 'New user created. Please log in.'

      await wrapper.instance().handleSubmit(mockPreventDefault)

      expect(wrapper.state('response')).toEqual(expected)
    })

    it('should successfully handle a duplicate user signup', async () => {
      API.postData = jest.fn().mockImplementation(() => {
        return undefined
      })
      const expected = 'User email already exists, please try again or log in.'

      await wrapper.instance().handleSubmit(mockPreventDefault)

      expect(wrapper.state('response')).toEqual(expected)
    })

    it('should unsuccessfully handle user signup', async () => {
      const expected = { "message": 'User email already exists, please try again or log in.'}
      API.postData = jest.fn().mockImplementation(() => {
        return {
          message: 'User email already exists, please try again or log in.'
        }
      })
      const url = '/api/users/new'

      await wrapper.instance().handleSubmit(mockPreventDefault)

      await expect(API.postData(url)).toEqual(expected)
    })

    it.skip('should call handleSubmit when form is submitted', () => {
      wrapper.setState({
        user: {
          name: 'Aquaman',
          email: 'a@a.com',
          password: 'password',
        },
      })
      wrapper.instance().handleSubmit = jest.fn();
      wrapper.find('form').simulate('submit', mockPreventDefault);
      expect(wrapper.instance().handleSubmit).toHaveBeenCalled();
    })
  })

})