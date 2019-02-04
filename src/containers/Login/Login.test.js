import React from 'react'
import { shallow } from 'enzyme'
import { Login, mapDispatchToProps } from './Login'
import API from '../../utils/api';
import { setCurrentUser, errorToDisplay } from '../../actions'

describe('Login', () => {
  const mockSetCurrentUser = jest.fn()
  const mockErrorToDisplay = jest.fn()

  let wrapper = shallow(
    <Login
      errorToDisplay={mockErrorToDisplay}
      setCurrentUser={mockSetCurrentUser} />
  )

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
    it('should unsuccessfully log user in', async () => {
      wrapper.instance().formRef = {
        reset: jest.fn()
      }

      API.postData = jest.fn().mockImplementation(() => {
        throw Error('user not logged in');
      })
      const expected = false;

      await wrapper.instance().handleSubmit(mockPreventDefault)

      expect(wrapper.state('isLoggedIn')).toEqual(expected)
      
    })
    
    it('should successfully log user in', async () => {
      const mockData = {
        email: "a@a",
        password: "a",
      }
      
      API.postData = jest.fn().mockImplementation(() => {
        return { data: mockData }
      })
      const expected = true
      await wrapper.instance().handleSubmit(mockPreventDefault)

      expect(wrapper.state('isLoggedIn')).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call setCurrentUser when user successfully logs in', () => {
      const mockDispatch = jest.fn()
      const mockUser = {
        email: "a@a",
        id: 1,
        name: "a",
        password: "a",
      }
      const actionToDispatch = setCurrentUser(mockUser)

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setCurrentUser(mockUser)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call errorToDisplay...', () => {
      const mockDispatch = jest.fn()
      const mockError = 'Oops...something went wrong'
      const actionToDispatch = errorToDisplay(mockError)

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.errorToDisplay(mockError)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
      
    })
  })
})