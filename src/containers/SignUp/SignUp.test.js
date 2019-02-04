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
    it('should sucessfully handle a new user signup', async () => {
      const mockData = {
        id: 1,
        message: "New user created",
        status: "success",
      }
      API.postData = jest.fn().mockImplementation(() => {
        return mockData
      })
      const expected = 'New user created'

      await wrapper.instance().handleSubmit(mockPreventDefault)

      expect(wrapper.state('response')).toEqual(expected)
    })

    it('should sucessfully handle a duplicate user signup', async () => {
      const mockData = {
        error: "Key email already exists."
      }
      API.postData = jest.fn().mockImplementation(() => {
        return mockData
      })
      const expected = 'User already created'

      await wrapper.instance().handleSubmit(mockPreventDefault)

      expect(wrapper.state('response')).toEqual(expected)
    })

    it('should unsuccessfully handle user signup', async () => {
      const expected = {"error": 'Key email already exists.'}
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 404,
        ok: false,
      }))
      const url = '/api/users/new'

      await wrapper.instance().handleSubmit(mockPreventDefault)

      await expect(API.postData(url)).toEqual(expected)
    })
  })

})